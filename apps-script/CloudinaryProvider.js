/** Cloudinary Storage Provider implementation */
const CloudinaryProvider = {
  
  uploadFile: function(base64Data, filename, mimeType, moduleName) {
    const props = PropertiesService.getScriptProperties();
    const cloudName = props.getProperty('CLOUDINARY_CLOUD_NAME');
    const apiKey = props.getProperty('CLOUDINARY_API_KEY');
    const apiSecret = props.getProperty('CLOUDINARY_API_SECRET');
    
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary credentials are not configured in Script Properties.');
    }
    
    // Dynamic Year and Month
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    // UUID Generation for filename
    const uuid = Utilities.getUuid();
    
    // Folder Structure: Kelurahan-Watang-Soreang/[module]/[YYYY]/[MM]/[UUID]
    const rootPath = 'Kelurahan-Watang-Soreang';
    const cleanModule = (moduleName || 'attachment').toLowerCase().replace(/[^a-z0-9]/g, '');
    const publicId = `${rootPath}/${cleanModule}/${year}/${month}/${uuid}`;
    
    const timestamp = Math.floor(Date.now() / 1000).toString();
    
    // Construct SHA-1 Signature
    // Cloudinary signature includes: context, public_id, timestamp
    const context = `module=${cleanModule}|uploaded_by=CMS|year=${year}`;
    
    const paramsToSign = `context=${context}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = this._sha1(paramsToSign);
    
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
    
    // Ensure Data URI format
    if (!base64Data.startsWith('data:')) {
      base64Data = `data:${mimeType};base64,${base64Data}`;
    }
    
    const payload = {
      file: base64Data,
      api_key: apiKey,
      timestamp: timestamp,
      public_id: publicId,
      context: context,
      signature: signature
    };
    
    const options = {
      method: 'post',
      payload: payload,
      muteHttpExceptions: true
    };
    
    Logger.log("Before UrlFetchApp in uploadFile");
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    if (result.error) {
      AppLogger.error('Cloudinary', 'Upload', result.error.message);
      throw new Error('Gagal mengupload file: ' + result.error.message);
    }
    
    // Apply optimizations f_auto, q_auto only for images
    // secure_url format: https://res.cloudinary.com/<cloud_name>/<resource_type>/upload/v12345/<public_id>.<ext>
    let optimizedUrl = result.secure_url;
    if (result.resource_type === 'image' && !optimizedUrl.toLowerCase().endsWith('.pdf')) {
      optimizedUrl = optimizedUrl.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    
    Audit.logEvent('Cloudinary', 'Upload', (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), `Uploaded ${publicId} successfully.`);
    
    return {
      fileUrl: optimizedUrl,
      publicId: result.public_id,
      provider: 'cloudinary'
    };
  },
  
  deleteFile: function(publicId) {
    const props = PropertiesService.getScriptProperties();
    const cloudName = props.getProperty('CLOUDINARY_CLOUD_NAME');
    const apiKey = props.getProperty('CLOUDINARY_API_KEY');
    const apiSecret = props.getProperty('CLOUDINARY_API_SECRET');
    
    if (!cloudName || !apiKey || !apiSecret) {
      AppLogger.warn('Cloudinary', 'Delete', 'Missing credentials during delete attempt for ' + publicId);
      return;
    }
    
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = this._sha1(paramsToSign);
    
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
    
    const payload = {
      api_key: apiKey,
      timestamp: timestamp,
      public_id: publicId,
      signature: signature
    };
    
    const options = {
      method: 'post',
      payload: payload,
      muteHttpExceptions: true
    };
    
    Logger.log("Before UrlFetchApp in deleteFile");
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    if (result.result !== 'ok' && result.result !== 'not found') {
      AppLogger.error('Cloudinary', 'Delete', `Failed to delete ${publicId}: ${JSON.stringify(result)}`);
    } else {
      Audit.logEvent('Cloudinary', 'Delete', (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), `Deleted ${publicId} successfully.`);
    }
  },
  
  _sha1: function(string) {
    const signature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, string, Utilities.Charset.UTF_8);
    let hexString = '';
    for (let i = 0; i < signature.length; i++) {
      let byteStr = (signature[i] < 0 ? signature[i] + 256 : signature[i]).toString(16);
      if (byteStr.length == 1) byteStr = '0' + byteStr;
      hexString += byteStr;
    }
    return hexString;
  }
};
