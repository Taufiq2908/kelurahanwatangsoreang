/** Storage Layer Abstraction */
const Storage = {
  
  /**
   * Uploads a file to the configured storage provider.
   * @param {string} base64Data The base64 data URI (e.g. data:image/jpeg;base64,...)
   * @param {string} filename Original filename
   * @param {string} mimeType File mime type
   * @param {string} moduleName CMS Module name (e.g., 'berita', 'profil')
   * @returns {Object} { fileUrl, publicId, provider }
   */
  uploadFile: function(base64Data, filename, mimeType, moduleName) {
    if (!base64Data) throw new Error("No data provided for upload.");
    
    // Enforce size limits (approximate base64 size)
    const sizeInBytes = Math.ceil(base64Data.length * 0.75);
    if (sizeInBytes > 5 * 1024 * 1024) {
      throw new Error('File terlalu besar. Maksimal 5MB.');
    }
    
    // Delegate to Cloudinary Provider
    return CloudinaryProvider.uploadFile(base64Data, filename, mimeType, moduleName);
  },

  /**
   * Deletes a file from the configured storage provider using its public ID.
   * @param {string} publicId The provider-specific public ID
   * @param {string} provider The name of the provider (e.g., 'cloudinary')
   */
  deleteFile: function(publicId, provider) {
    if (!publicId) return;
    
    if (provider === 'cloudinary') {
      CloudinaryProvider.deleteFile(publicId);
    } else if (provider === 'drive' || !provider) {
      // Legacy Google Drive deletion is not supported via this interface to protect legacy assets.
      // Do nothing for legacy records.
      Audit.logEvent('Storage', 'Delete File (Legacy)', (typeof session !== 'undefined' ? session.userId : 'SYSTEM'), 'Skipping deletion of legacy Drive asset: ' + publicId);
    }
  }
};
