
      window.onerror = function(msg, url, line, col, error) {
        if(url && url.indexOf('userCodeAppPanel') > -1 && line) {
           var html = document.documentElement.outerHTML;
           var lines = html.split('\n');
           var failingLine = lines[line - 1] || "Line not found";
           alert("CRITICAL ERROR: " + msg + "\nLine " + line + ":\n" + failingLine);
        } else {
           alert("CRITICAL ERROR: " + msg + " at line " + line + ":" + col);
        }
      };
    

      tailwind.config = {
        theme: {
          extend: {
            colors: {
              surface: {
                50: '#f8fafc',
                100: '#f1f5f9',
                200: '#e2e8f0',
                300: '#cbd5e1',
                400: '#94a3b8',
                500: '#64748b',
                600: '#475569',
                700: '#334155',
                800: '#1e293b',
                900: '#0f172a',
              }
            },
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
            }
          }
        }
      }
    

      window.CMS_SHELL = {
        title: <?!= JSON.stringify(appTitle) ?>,
        user: <?!= JSON.stringify(user) ?>,
        config: <?!= shellConfig ?>,
      };
    

window.CMS_API = {
  getToken: function() {
    return sessionStorage.getItem('cms_auth_token') || localStorage.getItem('cms_auth_token');
  },

  setToken: function(token, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('cms_auth_token', token);
    } else {
      sessionStorage.setItem('cms_auth_token', token);
    }
  },

  clearToken: function() {
    sessionStorage.removeItem('cms_auth_token');
    localStorage.removeItem('cms_auth_token');
  },

  call: function(methodName, ...args) {
    const token = this.getToken();
    
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(res => {
          // New Middleware Response format
          if (res && typeof res === 'object' && res.hasOwnProperty('success')) {
            if (res.success) {
              resolve(res.data);
            } else {
              if (res.code === 401) {
                // Token expired or invalid
                this.clearToken();
                if (window.CMS_UI && window.CMS_UI.toast) {
                  window.CMS_UI.toast('Sesi Anda telah berakhir. Silakan login kembali.', 'error');
                }
                setTimeout(() => window.location.reload(), 1500);
              }
              reject(new Error(res.message || 'API Error'));
            }
          } else {
            // Legacy response (fallback)
            resolve(res);
          }
        })
        .withFailureHandler(err => {
          console.error("google.script.run." + methodName + " FAILURE:", err);
          reject(err);
        })
        [methodName](token, ...args);
    });
  },

  // Auth
  login: function(username, password, rememberMe) {
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(res => {
          if (res && typeof res === 'object' && res.hasOwnProperty('success')) {
            if (res.success) {
              resolve(res.data);
            } else {
              reject(new Error(res.message || 'Login gagal'));
            }
          } else {
            resolve(res);
          }
        })
        .withFailureHandler(reject)
        .apiLogin(username, password, rememberMe);
    });
  },

  logout: function() {
    const token = this.getToken();
    return new Promise((resolve) => {
      if (!token) {
        this.clearToken();
        resolve();
        return;
      }
      google.script.run
        .withSuccessHandler(() => {
          this.clearToken();
          resolve();
        })
        .withFailureHandler(() => {
          this.clearToken();
          resolve();
        })
        .apiLogout(token);
    });
  },

  // Helpers
  getRecords: function(sheetName, options) { return this.call('cmsGetRecords', sheetName, options); },
  getRecord: function(sheetName, id) { return this.call('cmsGetRecord', sheetName, id); },
  createRecord: function(sheetName, data) { return this.call('cmsCreateRecord', sheetName, data); },
  updateRecord: function(sheetName, id, data) { return this.call('cmsUpdateRecord', sheetName, id, data); },
  deleteRecord: function(sheetName, id) { return this.call('cmsDeleteRecord', sheetName, id); },
  uploadFile: function(base64, filename, mime, folder) { return this.call('cmsUploadFile', base64, filename, mime, folder); },
  
  uploadMedia: function(file, moduleName) {
    return new Promise((resolve, reject) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage || file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          const base64 = result.split(',')[1];
          this.uploadFile(base64, file.name, file.type, moduleName).then(resolve).catch(reject);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }
      
      const MAX_WIDTH = 1920;
      const MAX_HEIGHT = 1920;
      const QUALITY = 0.8;
      
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        } else if (height > MAX_WIDTH) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const exportType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(exportType, QUALITY);
        const base64 = dataUrl.split(',')[1];
        
        this.uploadFile(base64, file.name, exportType, moduleName).then(resolve).catch(reject);
      };
      
      img.onerror = (e) => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Gagal membaca file gambar"));
      };
      
      img.src = objectUrl;
    });
  },

  getTrashRecords: function() { return this.call('cmsGetTrashRecords'); },
  restoreRecord: function(sheetName, id) { return this.call('cmsRestoreRecord', sheetName, id); },
  hardDeleteRecord: function(sheetName, id) { return this.call('cmsHardDeleteRecord', sheetName, id); },

  getProfil: function() { return this.call('cmsGetProfil'); },
  updateProfil: function(payload) { return this.call('cmsUpdateProfil', payload); },

  getKontak: function(options) { return this.call('cmsGetKontak', options); },
  createKontak: function(data) { return this.call('cmsCreateKontak', data); },
  updateKontak: function(id, data) { return this.call('cmsUpdateKontak', id, data); },
  deleteKontak: function(id) { return this.call('cmsDeleteKontak', id); },
  restoreKontak: function(id) { return this.call('cmsRestoreKontak', id); },

  getAparatur: function(options) { return this.call('cmsGetAparatur', options); },
  createAparatur: function(data) { return this.call('cmsCreateAparatur', data); },
  updateAparatur: function(id, data) { return this.call('cmsUpdateAparatur', id, data); },
  deleteAparatur: function(id) { return this.call('cmsDeleteAparatur', id); },
  restoreAparatur: function(id) { return this.call('cmsRestoreAparatur', id); },

  getLayanan: function(options) { return this.call('cmsGetLayanan', options); },
  createLayanan: function(data) { return this.call('cmsCreateLayanan', data); },
  updateLayanan: function(id, data) { return this.call('cmsUpdateLayanan', id, data); },
  deleteLayanan: function(id) { return this.call('cmsDeleteLayanan', id); },

  getFaq: function(options) { return this.call('cmsGetFaq', options); },
  createFaq: function(data) { return this.call('cmsCreateFaq', data); },
  updateFaq: function(id, data) { return this.call('cmsUpdateFaq', id, data); },
  deleteFaq: function(id) { return this.call('cmsDeleteFaq', id); },

  getPeta: function(options) { return this.call('cmsGetPeta', options); },
  createPeta: function(data) { return this.call('cmsCreatePeta', data); },
  updatePeta: function(id, data) { return this.call('cmsUpdatePeta', id, data); },
  deletePeta: function(id) { return this.call('cmsDeletePeta', id); },

  getDashboardStats: function() { return this.call('cmsGetDashboardStats'); },
  getRecentLogs: function(limit) { return this.call('cmsGetRecentLogs', limit); },
  getSystemHealth: function() { return this.call('cmsGetSystemHealth'); },
  getPetaKategori: function(options) { return this.call('cmsGetPetaKategori', options); },
  extractGoogleMapsUrl: function(url) { return this.call('cmsExtractGoogleMapsUrl', url); }
};


window.CMS_UI = {
  toast: function(message, type) {
    type = type || 'success';
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML = message;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }, 3000);
  },

  showLoader: function(text = 'Memuat...') {
    document.getElementById('loader-text').innerText = text;
    document.getElementById('full-loader').classList.add('is-active');
  },
  
  hideLoader: function() {
    document.getElementById('full-loader').classList.remove('is-active');
  },
  
  escapeHtml: function(value) {
    if (!value) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
  
  confirm: function(title, message, confirmText, confirmClass) {
    confirmText = confirmText || 'Ya, Lanjutkan';
    confirmClass = confirmClass || 'btn-primary';
    return new Promise((resolve) => {
      const modal = document.getElementById('confirm-modal');
      document.getElementById('confirm-title').innerText = title;
      document.getElementById('confirm-body').innerText = message;
      
      const btnOk = document.getElementById('confirm-ok');
      const btnCancel = document.getElementById('confirm-cancel');
      
      btnOk.innerText = confirmText;
      btnOk.className = 'btn ' + confirmClass;
      
      const cleanup = () => {
        modal.classList.remove('is-open');
        btnOk.removeEventListener('click', onOk);
        btnCancel.removeEventListener('click', onCancel);
      };
      
      const onOk = () => { cleanup(); resolve(true); };
      const onCancel = () => { cleanup(); resolve(false); };
      
      btnOk.addEventListener('click', onOk);
      btnCancel.addEventListener('click', onCancel);
      
      modal.classList.add('is-open');
    });
  },
  
  getDriveImageUrl: function(urlOrId) {
    if (!urlOrId) return '';
    // If it's already a full HTTP URL (like Cloudinary), return as is
    if (urlOrId.startsWith('http://') || urlOrId.startsWith('https://')) {
      return urlOrId;
    }
    // Otherwise assume it's a Drive ID
    return 'https://drive.google.com/uc?export=view&id=' + urlOrId;
  }
};


window.Module_Dashboard = {
  render: async function(container) {
    try {
    container.innerHTML = `
      <section class="fade-in">
        <div class="flex justify-between items-end mb-8 border-b border-surface-200 pb-6">
          <div>
            <p class="text-xs font-bold text-emerald-600 tracking-wider uppercase mb-1">Dashboard</p>
            <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Ringkasan Sistem</h1>
            <p class="text-sm text-surface-500 mt-2">Ikhtisar aktivitas dan data CMS Kelurahan Watang Soreang.</p>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10" id="dash-summary">
          <!-- Stats will be loaded here -->
        </div>
        
        <section class="mt-8">
          <h2 class="text-lg font-bold text-surface-900 mb-6">Aksi Cepat</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button class="flex flex-col items-center justify-center p-6 bg-white border border-surface-200 hover:border-emerald-500 hover:shadow-md rounded-2xl transition-all text-surface-700 hover:text-emerald-700 font-semibold" onclick="window.navigate('berita', 'create')">
              <span class="material-icons-outlined text-3xl mb-3 text-emerald-500">post_add</span>
              Tulis Berita Baru
            </button>
            <button class="flex flex-col items-center justify-center p-6 bg-white border border-surface-200 hover:border-emerald-500 hover:shadow-md rounded-2xl transition-all text-surface-700 hover:text-emerald-700 font-semibold" onclick="window.navigate('pengumuman', 'create')">
              <span class="material-icons-outlined text-3xl mb-3 text-emerald-500">campaign</span>
              Buat Pengumuman
            </button>
            <button class="flex flex-col items-center justify-center p-6 bg-white border border-surface-200 hover:border-emerald-500 hover:shadow-md rounded-2xl transition-all text-surface-700 hover:text-emerald-700 font-semibold" onclick="window.navigate('laporan')">
              <span class="material-icons-outlined text-3xl mb-3 text-emerald-500">inbox</span>
              Tinjau Laporan
            </button>
            <button class="flex flex-col items-center justify-center p-6 bg-white border border-surface-200 hover:border-emerald-500 hover:shadow-md rounded-2xl transition-all text-surface-700 hover:text-emerald-700 font-semibold" onclick="window.navigate('faq')">
              <span class="material-icons-outlined text-3xl mb-3 text-emerald-500">help_outline</span>
              Kelola FAQ
            </button>
          </div>
        </section>
      </section>
    `;



      CMS_UI.showLoader('Memuat data dashboard...');
      const [stats, logs, health] = await Promise.all([
        window.CMS_API.getDashboardStats(),
        window.CMS_API.getRecentLogs(5),
        window.CMS_API.getSystemHealth()
      ]);

      const reportColor = stats.laporan > 0 ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-surface-500 bg-surface-50 border-surface-100';
      
      const summaryContainer = document.getElementById('dash-summary');
      if (!summaryContainer) {
        return;
      }
      
      summaryContainer.innerHTML = `
        <div class="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-icons-outlined text-emerald-500">article</span>
            <span class="text-xs md:text-sm font-bold text-surface-500 uppercase tracking-wider">Total Berita</span>
          </div>
          <strong class="block text-3xl md:text-4xl font-black text-surface-900 mb-4">${stats.berita}</strong>
          <span class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            Publikasi
          </span>
        </div>
        
        <div class="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-icons-outlined text-emerald-500">campaign</span>
            <span class="text-xs md:text-sm font-bold text-surface-500 uppercase tracking-wider">Pengumuman</span>
          </div>
          <strong class="block text-3xl md:text-4xl font-black text-surface-900 mb-4">${stats.pengumuman}</strong>
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
            Terpublikasi
          </span>
        </div>
        
        <div class="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-icons-outlined text-emerald-500">inbox</span>
            <span class="text-xs md:text-sm font-bold text-surface-500 uppercase tracking-wider">Laporan</span>
          </div>
          <strong class="block text-3xl md:text-4xl font-black text-surface-900 mb-4">${stats.laporan}</strong>
          <span class="inline-block px-3 py-1 text-xs font-bold rounded-full border ${reportColor}">
            Tersimpan
          </span>
        </div>
        
        <div class="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-icons-outlined text-emerald-500">assignment</span>
            <span class="text-xs md:text-sm font-bold text-surface-500 uppercase tracking-wider">Total Layanan</span>
          </div>
          <strong class="block text-3xl md:text-4xl font-black text-surface-900 mb-4">${stats.layanan}</strong>
          <span class="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
            Layanan Aktif
          </span>
        </div>
      `;
      
            const safeLogs = logs || [];
        const reportsHtml = safeLogs.map(r => `
          <div class="flex items-center justify-between p-4 border-b border-surface-200 last:border-0 hover:bg-surface-50">
          <div>
            <div class="font-semibold text-surface-900">${r.action} - ${r.module}</div>
            <div class="text-xs text-surface-500">${new Date(r.timestamp).toLocaleString('id-ID')} | ${r.message}</div>
          </div>
          <span class="px-2 py-1 text-xs font-bold rounded border ${r.level === 'ERROR' ? 'bg-rose-50 text-rose-700 border-rose-200' : (r.level === 'INFO' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200')}">
            ${r.level}
          </span>
        </div>
      `).join('');
      
      const dashboardHtml = document.getElementById('dash-summary').parentElement;
      if (!document.getElementById('recent-activities')) {
        const activitiesSection = document.createElement('section');
        activitiesSection.id = 'recent-activities';
        activitiesSection.className = 'mt-10 grid grid-cols-1 md:grid-cols-2 gap-8';
        activitiesSection.innerHTML = `
          <div class="bg-white border border-surface-200 rounded-2xl shadow-sm overflow-hidden">
            <div class="bg-surface-50 border-b border-surface-200 px-6 py-4 flex justify-between items-center">
              <h3 class="font-bold text-surface-900">Log Aktivitas Terbaru</h3>
            </div>
            <div class="p-2">
              ${reportsHtml || '<div class="p-4 text-center text-surface-500">Belum ada aktivitas</div>'}
            </div>
          </div>
          <div class="bg-white border border-surface-200 rounded-2xl shadow-sm overflow-hidden">
            <div class="bg-surface-50 border-b border-surface-200 px-6 py-4">
              <h3 class="font-bold text-surface-900">Status Sistem (Asinkron)</h3>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex justify-between items-center border-b border-surface-200 pb-3">
                <span class="text-surface-600">Google Apps Script</span>
                <span class="flex items-center font-semibold ${health.apps_script === 'OK' ? 'text-emerald-600' : 'text-rose-600'}">
                  <span class="w-2 h-2 rounded-full mr-2 ${health.apps_script === 'OK' ? 'bg-emerald-500' : 'bg-rose-500'}"></span>${health.apps_script}
                </span>
              </div>
              <div class="flex justify-between items-center border-b border-surface-200 pb-3">
                <span class="text-surface-600">Google Sheets Database</span>
                <span class="flex items-center font-semibold ${health.google_sheets === 'OK' ? 'text-emerald-600' : 'text-rose-600'}">
                  <span class="w-2 h-2 rounded-full mr-2 ${health.google_sheets === 'OK' ? 'bg-emerald-500' : 'bg-rose-500'}"></span>${health.google_sheets}
                </span>
              </div>
              <div class="flex justify-between items-center pb-3">
                <span class="text-surface-600">Authentication Service</span>
                <span class="flex items-center font-semibold ${health.auth === 'OK' ? 'text-emerald-600' : 'text-rose-600'}">
                  <span class="w-2 h-2 rounded-full mr-2 ${health.auth === 'OK' ? 'bg-emerald-500' : 'bg-rose-500'}"></span>${health.auth}
                </span>
              </div>
            </div>
          </div>
        `;
        dashboardHtml.appendChild(activitiesSection);
      }
      CMS_UI.hideLoader();
      console.log("EXIT Module_Dashboard.render");
    } catch (e) {
      CMS_UI.hideLoader();
      console.error("Dashboard Render Error:", e);
      window.CMS_UI.toast('Gagal memuat data dashboard', 'error');
    }
  }
};


window.Module_Berita = (function() {
  let state = {
    view: 'list', // 'list' or 'form'
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    search: '',
    status: '',
    currentId: null,
    draftData: null
  };

  const getLocalDraft = () => {
    try { return JSON.parse(localStorage.getItem('cms_draft_berita')); } catch(e) { return null; }
  };
  const saveLocalDraft = (data) => {
    localStorage.setItem('cms_draft_berita', JSON.stringify(data));
  };
  const clearLocalDraft = () => {
    localStorage.removeItem('cms_draft_berita');
  };

  async function loadData() {
    try {
      CMS_UI.showLoader('Memuat berita...');
      const res = await CMS_API.getRecords('Berita', { page: state.page, limit: state.limit, search: state.search, status: state.status, sortBy: 'published_at', sortOrder: 'desc' });
      state.items = res.items || [];
      state.total = res.total || 0;
      renderList();
    } catch(e) {
      console.error(e);
      CMS_UI.toast('Error loadData: ' + e.message, 'error');
      const el = document.getElementById('berita-content');
      if (el) el.innerHTML = '<div style="color:red; padding:20px;">Error loadData: ' + e.message + '</div>';
    } finally {
      CMS_UI.hideLoader();
    }
  }

  function renderList() {
    const container = document.getElementById('berita-content');
    if (!container) {
      CMS_UI.toast('Error: container #berita-content tidak ditemukan!', 'error');
      return;
    }
    
    try {
      let html = `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div class="flex flex-wrap gap-3 items-center w-full md:w-auto">
            <input type="text" id="berita-search" class="w-full md:w-64 px-4 py-2 border border-surface-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Cari judul..." value="${state.search}">
            <select id="berita-filter" class="w-full md:w-40 px-4 py-2 border border-surface-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
              <option value="">Semua Status</option>
              <option value="publish" ${state.status==='publish'?'selected':''}>Publish</option>
              <option value="draft" ${state.status==='draft'?'selected':''}>Draft</option>
            </select>
            <button class="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 text-sm font-semibold rounded-xl border border-surface-200 transition-colors w-full md:w-auto" id="berita-btn-search">Cari</button>
          </div>
          <button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors w-full md:w-auto flex justify-center items-center gap-2" id="berita-btn-create">
            <span class="material-icons-outlined text-sm">add</span> Tulis Berita
          </button>
        </div>
        
        <div class="bg-white border border-surface-200 rounded-2xl overflow-hidden shadow-sm mb-6">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface-50 border-b border-surface-200 text-xs uppercase tracking-wider text-surface-500 font-bold">
                  <th class="p-4">Judul</th>
                  <th class="p-4 hidden md:table-cell">Kategori</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 hidden sm:table-cell">Tanggal</th>
                  <th class="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-100">
      `;
      
      if (state.items.length === 0) {
        html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada berita yang dipublikasikan.</td></tr>`;
      } else {
        html += state.items.map(item => `
          <tr class="hover:bg-surface-50/50 transition-colors group">
            <td class="p-4">
              <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
            </td>
            <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category}</td>
            <td class="p-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                ${item.status}
              </span>
            </td>
            <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
              ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
            </td>
            <td class="p-4 text-right">
              <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
                  <span class="material-icons-outlined text-[18px]">edit</span>
                </button>
                <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" title="Hapus">
                  <span class="material-icons-outlined text-[18px]">delete</span>
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
      
      html += `
              </tbody>
            </table>
          </div>
          
          <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
            <div class="flex gap-2">
              <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="berita-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
              <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="berita-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        </div>
      `;
      
      container.innerHTML = html;
    } catch(e) {
      console.error(e);
      container.innerHTML = '<div style="color:red; padding:20px;">Error renderList: ' + e.message + '</div>';
    }
    
    // Bind events
    document.getElementById('berita-btn-create').onclick = () => showForm();
    document.getElementById('berita-btn-search').onclick = () => {
      state.search = document.getElementById('berita-search').value;
      state.status = document.getElementById('berita-filter').value;
      state.page = 1;
      loadData();
    };
    document.getElementById('berita-btn-prev').onclick = () => { state.page--; loadData(); };
    document.getElementById('berita-btn-next').onclick = () => { state.page++; loadData(); };
    
    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.onclick = () => showForm(btn.dataset.id);
    });
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.onclick = () => deleteItem(btn.dataset.id, btn.dataset.title);
    });
  }

  async function showForm(id = null) {
    state.view = 'form';
    state.currentId = id;
    let data = { title: '', slug: '', excerpt: '', content: '', thumbnail: '', category: 'Kegiatan Kelurahan', tags: '', status: 'draft', author: window.CMS_SHELL.user.name };
    
    if (id) {
      CMS_UI.showLoader('Memuat data...');
      try {
        data = await CMS_API.getRecord('Berita', id);
      } catch(e) {
        CMS_UI.toast('Gagal memuat berita', 'error');
        window.CMS_FORM_DIRTY = false;
        state.view = 'list';
        render();
        return;
      } finally {
        CMS_UI.hideLoader();
      }
    } else {
      const draft = getLocalDraft();
      if (draft && confirm('Anda memiliki draft yang belum disimpan. Lanjutkan draft tersebut?')) {
        data = draft;
      }
    }
    
    const container = document.getElementById('berita-content');
    container.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <button class="btn" id="berita-btn-back">← Kembali</button>
        <div class="flex gap-4">
          <button class="btn btn-primary" id="berita-btn-save">Simpan Data</button>
        </div>
      </div>
      
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
        <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
          <div class="form-group">
            <label class="form-label">Judul Berita</label>
            <input type="text" id="form-title" class="form-control" value="${(data.title||'').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group">
            <label class="form-label">Isi Berita</label>
            <textarea id="form-content" class="form-control" style="min-height:300px">${data.content}</textarea>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:24px;">
          <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select id="form-status" class="form-control">
                <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
                <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Tanggal Publikasi</label>
              <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
              <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
            </div>
            <div class="form-group">
              <label class="form-label">Kategori</label>
              <select id="form-category" class="form-control">
                <option value="Kegiatan Kelurahan" ${data.category==='Kegiatan Kelurahan'?'selected':''}>Kegiatan Kelurahan</option>
                <option value="UMKM" ${data.category==='UMKM'?'selected':''}>UMKM</option>
                <option value="Masyarakat" ${data.category==='Masyarakat'?'selected':''}>Masyarakat</option>
                <option value="Lingkungan" ${data.category==='Lingkungan'?'selected':''}>Lingkungan</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Tags (Pisahkan dengan koma)</label>
              <input type="text" id="form-tags" class="form-control" value="${(data.tags||'').replace(/"/g, '&quot;')}">
            </div>
            <div class="form-group">
              <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
                <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
                <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
              </div>
              <label class="form-label">URL Cover / Upload Baru</label>
              <input type="text" id="form-image" class="form-control mb-2" value="${(data.image||'').replace(/"/g, '&quot;')}" placeholder="https://...">
              <input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
              <input type="hidden" id="form-image_public_id" value="${data.imageMeta ? data.imageMeta.publicId : ''}">
              <input type="hidden" id="form-image_provider" value="${data.imageMeta ? data.imageMeta.provider : ''}">
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Bind Form Events
    const checkUnsaved = () => {
       window.CMS_FORM_DIRTY = true;
       if (!id) {
         saveLocalDraft(getFormData());
       }
    };
    document.getElementById('form-title').addEventListener('input', checkUnsaved);
    document.getElementById('form-content').addEventListener('input', checkUnsaved);
    document.getElementById('form-status').addEventListener('change', checkUnsaved);
    document.getElementById('form-category').addEventListener('change', checkUnsaved);
    document.getElementById('form-tags').addEventListener('input', checkUnsaved);
    
    document.getElementById('berita-btn-back').onclick = async () => {
      if (window.CMS_FORM_DIRTY) {
        const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
        if (!confirmExit) return;
      }
      window.CMS_FORM_DIRTY = false;
      state.view = 'list';
      render();
    };
    
    document.getElementById('berita-btn-save').onclick = async () => {
      await saveItem(id);
    };
    
    document.getElementById('form-upload').onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      CMS_UI.showLoader('Mengupload gambar...');
      try {
        const res = await CMS_API.uploadMedia(file, 'Berita');
        document.getElementById('form-image').value = res.fileUrl;
        document.getElementById('form-image_public_id').value = res.publicId;
        document.getElementById('form-image_provider').value = res.provider;
        
        const previewEl = document.getElementById('image-preview');
        previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:100%; border-radius:4px;"><div class="mt-2 text-sm text-surface-500 break-all">${res.fileUrl}</div>`;
        previewEl.classList.remove('hidden');
        
        CMS_UI.toast('Gambar berhasil diupload');
        checkUnsaved();
      } catch(err) {
        CMS_UI.toast(err.message, 'error');
      } finally {
        CMS_UI.hideLoader();
      }
    };
  }

  function getFormData() {
    return {
      title: document.getElementById('form-title').value,
      content: document.getElementById('form-content').value,
      status: document.getElementById('form-status').value,
      published_at: document.getElementById('form-published-at').value ? new Date(document.getElementById('form-published-at').value).toISOString() : '',
      category: document.getElementById('form-category').value,
      tags: document.getElementById('form-tags').value,
      image: document.getElementById('form-image').value,
      image_public_id: document.getElementById('form-image_public_id').value,
      image_provider: document.getElementById('form-image_provider').value,
      author: window.CMS_SHELL.user.name
    };
  }

  async function saveItem(id) {
    const data = getFormData();
    if (!data.title) { CMS_UI.toast('Judul wajib diisi', 'error'); return; }
    
    CMS_UI.showLoader('Menyimpan berita...');
    try {
      if (id) {
        await CMS_API.updateRecord('Berita', id, data);
        CMS_UI.toast('Berita berhasil diperbarui');
      } else {
        await CMS_API.createRecord('Berita', data);
        CMS_UI.toast('Berita berhasil dibuat');
        clearLocalDraft();
      }
      window.CMS_FORM_DIRTY = false;
      state.view = 'list';
      render();
    } catch(e) {
      CMS_UI.toast(e.message, 'error');
    } finally {
      CMS_UI.hideLoader();
    }
  }

  async function deleteItem(id, title) {
    const confirmed = await CMS_UI.confirm('Hapus Berita', `Berita "${title}" akan dipindahkan ke Data Terhapus. Lanjutkan?`, 'Ya, Hapus', 'btn-danger');
    if (!confirmed) return;
    
    CMS_UI.showLoader('Menghapus berita...');
    try {
      await CMS_API.deleteRecord('Berita', id);
      CMS_UI.toast('Berita berhasil dihapus');
      loadData();
    } catch(e) {
      CMS_UI.toast(e.message, 'error');
    } finally {
      CMS_UI.hideLoader();
    }
  }

  function render(container, action) {
    if (container) {
      container.innerHTML = `
        <section>
          <div class="page-heading">
            <div>
              <p class="eyebrow">CMS INTERNAL</p>
              <h1>Kelola Berita</h1>
              <p>Tambah, ubah, atau hapus artikel berita kelurahan.</p>
            </div>
          </div>
          <div id="berita-content"></div>
        </section>
      `;
    }
    
    if (action === 'create') {
      showForm();
    } else if (state.view === 'list') {
      loadData();
    } else {
      showForm(state.currentId);
    }
  }

  return { render };
})();


window.Module_Pengumuman = (function() {
  let state = {
    view: 'list',
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    search: '',
    status: '',
    currentId: null
  };

  async function loadData() {
    try {
      CMS_UI.showLoader('Memuat pengumuman...');
      const res = await CMS_API.getRecords('Pengumuman', { page: state.page, limit: state.limit, search: state.search, status: state.status, sortBy: 'published_at', sortOrder: 'desc' });
      state.items = res.items || [];
      state.total = res.total || 0;
      renderList();
    } catch(e) {
      console.error(e);
      CMS_UI.toast('Error loadData: ' + e.message, 'error');
      const el = document.getElementById('pengumuman-content');
      if (el) el.innerHTML = '<div style="color:red; padding:20px;">Error loadData: ' + e.message + '</div>';
    } finally {
      CMS_UI.hideLoader();
    }
  }

  function renderList() {
    const container = document.getElementById('pengumuman-content');
    if (!container) {
      CMS_UI.toast('Error: container #pengumuman-content tidak ditemukan!', 'error');
      return;
    }
    
    let html = `
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div class="flex flex-wrap gap-3 items-center w-full md:w-auto">
          <input type="text" id="pengumuman-search" class="w-full md:w-64 px-4 py-2 border border-surface-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Cari judul..." value="${state.search}">
          <select id="pengumuman-filter" class="w-full md:w-40 px-4 py-2 border border-surface-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
            <option value="">Semua Status</option>
            <option value="publish" ${state.status==='publish'?'selected':''}>Publish</option>
            <option value="draft" ${state.status==='draft'?'selected':''}>Draft</option>
          </select>
          <button class="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 text-sm font-semibold rounded-xl border border-surface-200 transition-colors w-full md:w-auto" id="pengumuman-btn-search">Cari</button>
        </div>
        <button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors w-full md:w-auto flex justify-center items-center gap-2" id="pengumuman-btn-create">
          <span class="material-icons-outlined text-sm">add</span> Buat Pengumuman
        </button>
      </div>
      
      <div class="bg-white border border-surface-200 rounded-2xl overflow-hidden shadow-sm mb-6">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-50 border-b border-surface-200 text-xs uppercase tracking-wider text-surface-500 font-bold">
                <th class="p-4">Judul</th>
                <th class="p-4 hidden md:table-cell">Status</th>
                <th class="p-4 hidden sm:table-cell">Tanggal Publish</th>
                <th class="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
    `;
    
    if (state.items.length === 0) {
      html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada pengumuman yang dipublikasikan.</td></tr>`;
    } else {
      html += state.items.map(item => `
        <tr class="hover:bg-surface-50/50 transition-colors group">
          <td class="p-4">
            <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
          </td>
          <td class="p-4 hidden md:table-cell">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
              ${item.status}
            </span>
          </td>
          <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
            ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : '-'}
          </td>
          <td class="p-4 text-right">
            <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
                <span class="material-icons-outlined text-[18px]">edit</span>
              </button>
              <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" title="Hapus">
                <span class="material-icons-outlined text-[18px]">delete</span>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }
    
    html += `
            </tbody>
          </table>
        </div>
        
        <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="pengumuman-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
            <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="pengumuman-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    document.getElementById('pengumuman-btn-create').onclick = () => showForm();
    document.getElementById('pengumuman-btn-search').onclick = () => {
      state.search = document.getElementById('pengumuman-search').value;
      state.status = document.getElementById('pengumuman-filter').value;
      state.page = 1;
      loadData();
    };
    document.getElementById('pengumuman-btn-prev').onclick = () => { state.page--; loadData(); };
    document.getElementById('pengumuman-btn-next').onclick = () => { state.page++; loadData(); };
    
    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.onclick = () => showForm(btn.dataset.id);
    });
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.onclick = () => deleteItem(btn.dataset.id, btn.dataset.title);
    });
  }

  async function showForm(id = null) {
    state.view = 'form';
    state.currentId = id;
    let data = { title: '', content: '', priority: 'normal', start_date: '', end_date: '', attachment: '', status: 'draft' };
    
    if (id) {
      CMS_UI.showLoader('Memuat data...');
      try {
        data = await CMS_API.getRecord('Pengumuman', id);
      } catch(e) {
        CMS_UI.toast('Gagal memuat pengumuman', 'error');
        window.CMS_FORM_DIRTY = false;
        state.view = 'list';
        render();
        return;
      } finally {
        CMS_UI.hideLoader();
      }
    }
    
    const container = document.getElementById('pengumuman-content');
    container.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <button class="btn" id="pengumuman-btn-back">← Kembali</button>
        <button class="btn btn-primary" id="pengumuman-btn-save">Simpan Data</button>
      </div>
      
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
        <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
          <div class="form-group">
            <label class="form-label">Judul Pengumuman</label>
            <input type="text" id="form-title" class="form-control" value="${data.title}">
          </div>
          <div class="form-group">
            <label class="form-label">Isi Pengumuman</label>
            <textarea id="form-content" class="form-control" style="min-height:200px">${data.content}</textarea>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:24px;">
          <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select id="form-status" class="form-control">
                <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
                <option value="publish" ${data.status==='publish'?'selected':''}>Publish (Aktif)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Tanggal Publikasi</label>
              <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
              <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
            </div>
            <div class="form-group">
              <label class="form-label">Lampiran (URL, PDF, DOC, atau Gambar)</label>
              <input type="text" id="form-attachment" class="form-control mb-2" value="${data.attachment || ''}" placeholder="https://...">
              <input type="file" id="form-upload" accept="application/pdf, .doc, .docx, image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
              <input type="hidden" id="form-attachment_public_id" value="${data.attachmentMeta ? data.attachmentMeta.publicId : ''}">
              <input type="hidden" id="form-attachment_provider" value="${data.attachmentMeta ? data.attachmentMeta.provider : ''}">
            </div>
          </div>
        </div>
      </div>
    `;
    
    const checkUnsaved = () => { window.CMS_FORM_DIRTY = true; };
    document.getElementById('form-title').addEventListener('input', checkUnsaved);
    document.getElementById('form-content').addEventListener('input', checkUnsaved);
    document.getElementById('form-status').addEventListener('change', checkUnsaved);

    document.getElementById('pengumuman-btn-back').onclick = async () => {
      if (window.CMS_FORM_DIRTY) {
        const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
        if (!confirmExit) return;
      }
      window.CMS_FORM_DIRTY = false;
      state.view = 'list';
      render();
    };
    
    document.getElementById('pengumuman-btn-save').onclick = async () => {
      const payload = {
        title: document.getElementById('form-title').value,
        content: document.getElementById('form-content').value,
        status: document.getElementById('form-status').value,
        published_at: document.getElementById('form-published-at').value ? new Date(document.getElementById('form-published-at').value).toISOString() : '',
        priority: 'normal',
        start_date: '',
        end_date: '',
        attachment: document.getElementById('form-attachment').value,
        attachment_public_id: document.getElementById('form-attachment_public_id').value,
        attachment_provider: document.getElementById('form-attachment_provider').value
      };
      
      if (!payload.title) { CMS_UI.toast('Judul wajib diisi', 'error'); return; }
      
      CMS_UI.showLoader('Menyimpan pengumuman...');
      try {
        if (id) {
          await CMS_API.updateRecord('Pengumuman', id, payload);
          CMS_UI.toast('Pengumuman berhasil diperbarui');
        } else {
          await CMS_API.createRecord('Pengumuman', payload);
          CMS_UI.toast('Pengumuman berhasil dibuat');
        }
        window.CMS_FORM_DIRTY = false;
        window.CMS_FORM_DIRTY = false;
        state.view = 'list';
        render();
      } catch(e) {
        CMS_UI.toast(e.message, 'error');
      } finally {
        CMS_UI.hideLoader();
      }
    };
    
    document.getElementById('form-upload').onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      CMS_UI.showLoader('Mengupload lampiran...');
      try {
        const res = await CMS_API.uploadMedia(file, 'Pengumuman');
        document.getElementById('form-attachment').value = res.fileUrl;
        document.getElementById('form-attachment_public_id').value = res.publicId;
        document.getElementById('form-attachment_provider').value = res.provider;
        CMS_UI.toast('Lampiran berhasil diupload');
        checkUnsaved();
      } catch(err) {
        CMS_UI.toast(err.message, 'error');
      } finally {
        CMS_UI.hideLoader();
      }
    };
  }

  async function deleteItem(id, title) {
    const confirmed = await CMS_UI.confirm('Hapus Pengumuman', `Pengumuman "${title}" akan dipindahkan ke Data Terhapus. Lanjutkan?`, 'Ya, Hapus', 'btn-danger');
    if (!confirmed) return;
    
    CMS_UI.showLoader('Menghapus pengumuman...');
    try {
      await CMS_API.deleteRecord('Pengumuman', id);
      CMS_UI.toast('Pengumuman berhasil dihapus');
      loadData();
    } catch(e) {
      CMS_UI.toast(e.message, 'error');
    } finally {
      CMS_UI.hideLoader();
    }
  }

  function render(container, action) {
    if (container) {
      container.innerHTML = `
        <section>
          <div class="page-heading">
            <div>
              <p class="eyebrow">CMS INTERNAL</p>
              <h1>Kelola Pengumuman</h1>
              <p>Tambah, ubah, atau hapus pengumuman resmi kelurahan.</p>
            </div>
          </div>
          <div id="pengumuman-content"></div>
        </section>
      `;
    }
    
    if (action === 'create') {
      showForm();
    } else if (state.view === 'list') {
      loadData();
    } else {
      showForm(state.currentId);
    }
  }

  return { render };
})();


window.Module_Edukasi = (function() {
  let state = {
    view: 'list',
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    search: '',
    status: '',
    currentId: null
  };

  async function loadData() {
    try {
      CMS_UI.showLoader('Memuat edukasi...');
      const res = await CMS_API.getRecords('Edukasi', { page: state.page, limit: state.limit, search: state.search, status: state.status, sortBy: 'published_at', sortOrder: 'desc' });
      state.items = res.items || [];
      state.total = res.total || 0;
      renderList();
    } catch(e) {
      console.error(e);
      CMS_UI.toast('Error loadData: ' + e.message, 'error');
      const el = document.getElementById('edukasi-content');
      if (el) el.innerHTML = '<div style="color:red; padding:20px;">Error loadData: ' + e.message + '</div>';
    } finally {
      CMS_UI.hideLoader();
    }
  }

  function renderList() {
    const container = document.getElementById('edukasi-content');
    if (!container) {
      CMS_UI.toast('Error: container #edukasi-content tidak ditemukan!', 'error');
      return;
    }
    
    try {
      let html = `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div class="flex flex-wrap gap-3 items-center w-full md:w-auto">
            <input type="text" id="edukasi-search" class="w-full md:w-64 px-4 py-2 border border-surface-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Cari artikel..." value="${state.search}">
            <select id="edukasi-filter" class="w-full md:w-40 px-4 py-2 border border-surface-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
              <option value="">Semua Status</option>
              <option value="publish" ${state.status==='publish'?'selected':''}>Publish</option>
              <option value="draft" ${state.status==='draft'?'selected':''}>Draft</option>
            </select>
            <button class="px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 text-sm font-semibold rounded-xl border border-surface-200 transition-colors w-full md:w-auto" id="edukasi-btn-search">Cari</button>
          </div>
          <button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors w-full md:w-auto flex justify-center items-center gap-2" id="edukasi-btn-create">
            <span class="material-icons-outlined text-sm">add</span> Tulis Artikel
          </button>
        </div>
        
        <div class="bg-white border border-surface-200 rounded-2xl overflow-hidden shadow-sm mb-6">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surface-50 border-b border-surface-200 text-xs uppercase tracking-wider text-surface-500 font-bold">
                  <th class="p-4">Judul</th>
                  <th class="p-4 hidden md:table-cell">Kategori</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 hidden sm:table-cell">Tanggal</th>
                  <th class="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-100">
      `;
      
      if (state.items.length === 0) {
        html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada artikel edukasi yang dipublikasikan.</td></tr>`;
      } else {
        html += state.items.map(item => `
          <tr class="hover:bg-surface-50/50 transition-colors group">
            <td class="p-4">
              <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
            </td>
            <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category || 'Lingkungan'}</td>
            <td class="p-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                ${item.status}
              </span>
            </td>
            <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
              ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
            </td>
            <td class="p-4 text-right">
              <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
                  <span class="material-icons-outlined text-[18px]">edit</span>
                </button>
                <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" title="Hapus">
                  <span class="material-icons-outlined text-[18px]">delete</span>
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
      
      html += `
              </tbody>
            </table>
          </div>
          
          <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
            <div class="flex gap-2">
              <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="edukasi-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
              <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="edukasi-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        </div>
      `;
      
      container.innerHTML = html;
    } catch(e) {
      console.error(e);
    }
    
    document.getElementById('edukasi-btn-create').onclick = () => showForm();
    document.getElementById('edukasi-btn-search').onclick = () => {
      state.search = document.getElementById('edukasi-search').value;
      state.status = document.getElementById('edukasi-filter').value;
      state.page = 1;
      loadData();
    };
    document.getElementById('edukasi-btn-prev').onclick = () => { state.page--; loadData(); };
    document.getElementById('edukasi-btn-next').onclick = () => { state.page++; loadData(); };
    
    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.onclick = () => showForm(btn.dataset.id);
    });
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.onclick = () => deleteItem(btn.dataset.id, btn.dataset.title);
    });
  }

  async function showForm(id = null) {
    state.view = 'form';
    state.currentId = id;
    let data = { title: '', excerpt: '', content: '', thumbnail: '', category: 'Perubahan Iklim', tags: '', source: '', status: 'draft' };
    
    if (id) {
      CMS_UI.showLoader('Memuat data...');
      try {
        data = await CMS_API.getRecord('Edukasi', id);
      } catch(e) {
        CMS_UI.toast('Gagal memuat edukasi', 'error');
        window.CMS_FORM_DIRTY = false;
        state.view = 'list';
        render();
        return;
      } finally {
        CMS_UI.hideLoader();
      }
    }
    
    const container = document.getElementById('edukasi-content');
    container.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <button class="btn" id="edukasi-btn-back">← Kembali</button>
        <button class="btn btn-primary" id="edukasi-btn-save">Simpan Data</button>
      </div>
      
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
        <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
          <div class="form-group">
            <label class="form-label">Judul Artikel</label>
            <input type="text" id="form-title" class="form-control" value="${data.title}">
          </div>
          <div class="form-group">
            <label class="form-label">Isi Artikel</label>
            <textarea id="form-content" class="form-control" style="min-height:250px">${data.content}</textarea>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:24px;">
          <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
              <div class="form-group">
                <label class="form-label">Status</label>
                <select id="form-status" class="form-control">
                  <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
                  <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Tanggal Publikasi</label>
                <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
                <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
              </div>
            <div class="form-group">
              <label class="form-label">Kategori</label>
              <select id="form-category" class="form-control">
                <option value="Perubahan Iklim" ${data.category==='Perubahan Iklim'?'selected':''}>Perubahan Iklim</option>
                <option value="Sampah" ${data.category==='Sampah'?'selected':''}>Sampah</option>
                <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
                <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
              </select>
            </div>
              <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
                <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
                <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
              </div>
            <div class="form-group">
              <label class="form-label">Tags (Koma separated)</label>
              <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Sumber Referensi (Opsional)</label>
              <input type="text" id="form-source" class="form-control" value="${data.source || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">URL Cover / Upload Baru</label>
              <input type="text" id="form-image" class="form-control mb-2" value="${data.image || ''}" placeholder="https://...">
              <input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
              <input type="hidden" id="form-image_public_id" value="${data.imageMeta ? data.imageMeta.publicId : ''}">
              <input type="hidden" id="form-image_provider" value="${data.imageMeta ? data.imageMeta.provider : ''}">
            </div>
          </div>
        </div>
      </div>
    `;
    
    const checkUnsaved = () => { window.CMS_FORM_DIRTY = true; };
    document.getElementById('form-title').addEventListener('input', checkUnsaved);
    document.getElementById('form-content').addEventListener('input', checkUnsaved);
    document.getElementById('form-status').addEventListener('change', checkUnsaved);
    
    document.getElementById('edukasi-btn-back').onclick = async () => {
      if (window.CMS_FORM_DIRTY) {
        const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
        if (!confirmExit) return;
      }
      window.CMS_FORM_DIRTY = false;
      state.view = 'list';
      render();
    };
    
    document.getElementById('edukasi-btn-save').onclick = async () => {
      const payload = {
        title: document.getElementById('form-title').value,
        content: document.getElementById('form-content').value,
        status: document.getElementById('form-status').value,
        published_at: document.getElementById('form-published-at').value ? new Date(document.getElementById('form-published-at').value).toISOString() : '',
        category: document.getElementById('form-category').value,
        tags: document.getElementById('form-tags').value,
        source: document.getElementById('form-source').value,
        image: document.getElementById('form-image').value,
        image_public_id: document.getElementById('form-image_public_id').value,
        image_provider: document.getElementById('form-image_provider').value,
        author: window.CMS_SHELL.user.name
      };
      
      if (!payload.title) { CMS_UI.toast('Judul wajib diisi', 'error'); return; }
      
      CMS_UI.showLoader('Menyimpan edukasi...');
      try {
        if (id) {
          await CMS_API.updateRecord('Edukasi', id, payload);
          CMS_UI.toast('Edukasi berhasil diperbarui');
        } else {
          await CMS_API.createRecord('Edukasi', payload);
          CMS_UI.toast('Edukasi berhasil dibuat');
        }
        window.CMS_FORM_DIRTY = false;
        window.CMS_FORM_DIRTY = false;
        state.view = 'list';
        render();
      } catch(e) {
        CMS_UI.toast(e.message, 'error');
      } finally {
        CMS_UI.hideLoader();
      }
    };
    
    document.getElementById('form-upload').onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      CMS_UI.showLoader('Mengupload gambar...');
      try {
        const res = await CMS_API.uploadMedia(file, 'Edukasi');
        document.getElementById('form-image').value = res.fileUrl;
        document.getElementById('form-image_public_id').value = res.publicId;
        document.getElementById('form-image_provider').value = res.provider;
        
        const previewEl = document.getElementById('image-preview');
        previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:100%; border-radius:4px;"><div class="mt-2 text-sm text-surface-500 break-all">${res.fileUrl}</div>`;
        previewEl.classList.remove('hidden');
        
        CMS_UI.toast('Gambar berhasil diupload');
        checkUnsaved();
      } catch(err) {
        CMS_UI.toast(err.message, 'error');
      } finally {
        CMS_UI.hideLoader();
      }
    };
  }

  async function deleteItem(id, title) {
    const confirmed = await CMS_UI.confirm('Hapus Edukasi', `Artikel edukasi "${title}" akan dipindahkan ke Data Terhapus. Lanjutkan?`, 'Ya, Hapus', 'btn-danger');
    if (!confirmed) return;
    
    CMS_UI.showLoader('Menghapus edukasi...');
    try {
      await CMS_API.deleteRecord('Edukasi', id);
      CMS_UI.toast('Edukasi berhasil dihapus');
      loadData();
    } catch(e) {
      CMS_UI.toast(e.message, 'error');
    } finally {
      CMS_UI.hideLoader();
    }
  }

  function render(container) {
    if (container) {
      container.innerHTML = `
        <section>
          <div class="page-heading">
            <div>
              <p class="eyebrow">CMS INTERNAL</p>
              <h1>Kelola Edukasi</h1>
              <p>Kelola artikel edukasi iklim dan lingkungan.</p>
            </div>
          </div>
          <div id="edukasi-content"></div>
        </section>
      `;
    }
    
    if (state.view === 'list') {
      loadData();
    } else {
      showForm(state.currentId);
    }
  }

  return { render };
})();

