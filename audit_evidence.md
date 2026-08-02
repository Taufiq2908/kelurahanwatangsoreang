# XSS Security Audit Report
## TASK 1 & TASK 2 & TASK 3: Raw Evidence
### File: App.html, Line: 42
**Escaped:** No
```javascript
  32:         if (grouped[groupName] && grouped[groupName].length > 0) {
  33:           if (groupName !== 'DASHBOARD' && groupName !== 'OTHER') {
  34:             html += '<div style="margin-top:12px; margin-bottom:4px; padding-left:16px; font-size:10px; font-weight:700; color:#94a3b8; letter-spacing:0.05em;">' + groupName + '</div>';
  35:           }
  36:           grouped[groupName].forEach(function(item) {
  37:             html += '<button class="nav-button ' + (item.id === activePage ? 'is-active' : '') + '" data-page="' + item.id + '"><span class="material-icons-outlined text-[20px]" aria-hidden="true">' + item.icon + '</span><span class="ml-3">' + CMS_UI.escapeHtml(item.label) + '</span></button>';
  38:           });
  39:         }
  40:       });
  41:       
> 42:       container.innerHTML = html;
  43:       container.querySelectorAll('[data-page]').forEach(function (button) {
  44:         button.addEventListener('click', function () { navigate(button.dataset.page); });
  45:       });
  46:     }
  47: 
  48:     function renderBottomNavigation() {
  49:       const ids = ['dashboard', 'berita', 'pengumuman', 'laporan'];
  50:       let items = [];
  51:       ids.forEach(id => {
  52:         const found = shell.config.navigation.find(i => i.id === id);
```
### File: App.html, Line: 60
**Escaped:** No
```javascript
  50:       let items = [];
  51:       ids.forEach(id => {
  52:         const found = shell.config.navigation.find(i => i.id === id);
  53:         if (found) items.push(found);
  54:       });
  55:       
  56:       const markup = items.map(function (item) {
  57:         return '<button class="nav-button ' + (item.id === activePage ? 'is-active' : '') + '" data-page="' + item.id + '"><span class="material-icons-outlined text-[24px]" aria-hidden="true">' + item.icon + '</span><span class="text-[10px] mt-1">' + CMS_UI.escapeHtml(item.label) + '</span></button>';
  58:       }).join('') + '<button class="nav-button" data-open-menu="true"><span class="material-icons-outlined text-[24px]" aria-hidden="true">menu</span><span class="text-[10px] mt-1">Menu</span></button>';
  59:       const container = document.getElementById('bottom-nav');
> 60:       container.innerHTML = markup;
  61:       container.querySelectorAll('[data-page]').forEach(function (button) {
  62:         button.addEventListener('click', function () { navigate(button.dataset.page); });
  63:       });
  64:       container.querySelector('[data-open-menu]').addEventListener('click', openDrawer);
  65:     }
  66: 
  67:     function renderPage() {
  68:       const main = document.getElementById('main-content');
  69:       main.innerHTML = '';
  70:       
```
### File: App.html, Line: 69
**Escaped:** No
```javascript
  59:       const container = document.getElementById('bottom-nav');
  60:       container.innerHTML = markup;
  61:       container.querySelectorAll('[data-page]').forEach(function (button) {
  62:         button.addEventListener('click', function () { navigate(button.dataset.page); });
  63:       });
  64:       container.querySelector('[data-open-menu]').addEventListener('click', openDrawer);
  65:     }
  66: 
  67:     function renderPage() {
  68:       const main = document.getElementById('main-content');
> 69:       main.innerHTML = '';
  70:       
  71:       try {
  72:         switch(activePage) {
  73:           case 'dashboard':
  74:             if (window.Module_Dashboard) window.Module_Dashboard.render(main, activeAction);
  75:             else main.innerHTML = placeholderHtml(activePage);
  76:             break;
  77:           case 'berita':
  78:             if (window.Module_Berita) window.Module_Berita.render(main, activeAction);
  79:             else main.innerHTML = placeholderHtml(activePage);
```
### File: App.html, Line: 75
**Escaped:** No
```javascript
  65:     }
  66: 
  67:     function renderPage() {
  68:       const main = document.getElementById('main-content');
  69:       main.innerHTML = '';
  70:       
  71:       try {
  72:         switch(activePage) {
  73:           case 'dashboard':
  74:             if (window.Module_Dashboard) window.Module_Dashboard.render(main, activeAction);
> 75:             else main.innerHTML = placeholderHtml(activePage);
  76:             break;
  77:           case 'berita':
  78:             if (window.Module_Berita) window.Module_Berita.render(main, activeAction);
  79:             else main.innerHTML = placeholderHtml(activePage);
  80:             break;
  81:           case 'pengumuman':
  82:             if (window.Module_Pengumuman) window.Module_Pengumuman.render(main, activeAction);
  83:             else main.innerHTML = placeholderHtml(activePage);
  84:             break;
  85:           case 'edukasi':
```
### File: App.html, Line: 79
**Escaped:** No
```javascript
  69:       main.innerHTML = '';
  70:       
  71:       try {
  72:         switch(activePage) {
  73:           case 'dashboard':
  74:             if (window.Module_Dashboard) window.Module_Dashboard.render(main, activeAction);
  75:             else main.innerHTML = placeholderHtml(activePage);
  76:             break;
  77:           case 'berita':
  78:             if (window.Module_Berita) window.Module_Berita.render(main, activeAction);
> 79:             else main.innerHTML = placeholderHtml(activePage);
  80:             break;
  81:           case 'pengumuman':
  82:             if (window.Module_Pengumuman) window.Module_Pengumuman.render(main, activeAction);
  83:             else main.innerHTML = placeholderHtml(activePage);
  84:             break;
  85:           case 'edukasi':
  86:             if (window.Module_Edukasi) window.Module_Edukasi.render(main);
  87:             else main.innerHTML = placeholderHtml(activePage);
  88:             break;
  89:           case 'laporan':
```
### File: App.html, Line: 83
**Escaped:** No
```javascript
  73:           case 'dashboard':
  74:             if (window.Module_Dashboard) window.Module_Dashboard.render(main, activeAction);
  75:             else main.innerHTML = placeholderHtml(activePage);
  76:             break;
  77:           case 'berita':
  78:             if (window.Module_Berita) window.Module_Berita.render(main, activeAction);
  79:             else main.innerHTML = placeholderHtml(activePage);
  80:             break;
  81:           case 'pengumuman':
  82:             if (window.Module_Pengumuman) window.Module_Pengumuman.render(main, activeAction);
> 83:             else main.innerHTML = placeholderHtml(activePage);
  84:             break;
  85:           case 'edukasi':
  86:             if (window.Module_Edukasi) window.Module_Edukasi.render(main);
  87:             else main.innerHTML = placeholderHtml(activePage);
  88:             break;
  89:           case 'laporan':
  90:             if (window.Module_Aspirasi) window.Module_Aspirasi.render(main);
  91:             else main.innerHTML = placeholderHtml(activePage);
  92:             break;
  93:           case 'layanan':
```
### File: App.html, Line: 87
**Escaped:** No
```javascript
  77:           case 'berita':
  78:             if (window.Module_Berita) window.Module_Berita.render(main, activeAction);
  79:             else main.innerHTML = placeholderHtml(activePage);
  80:             break;
  81:           case 'pengumuman':
  82:             if (window.Module_Pengumuman) window.Module_Pengumuman.render(main, activeAction);
  83:             else main.innerHTML = placeholderHtml(activePage);
  84:             break;
  85:           case 'edukasi':
  86:             if (window.Module_Edukasi) window.Module_Edukasi.render(main);
> 87:             else main.innerHTML = placeholderHtml(activePage);
  88:             break;
  89:           case 'laporan':
  90:             if (window.Module_Aspirasi) window.Module_Aspirasi.render(main);
  91:             else main.innerHTML = placeholderHtml(activePage);
  92:             break;
  93:           case 'layanan':
  94:             if (window.Module_Layanan) window.Module_Layanan.render(main);
  95:             else main.innerHTML = placeholderHtml(activePage);
  96:             break;
  97:           case 'faq':
```
### File: App.html, Line: 91
**Escaped:** No
```javascript
  81:           case 'pengumuman':
  82:             if (window.Module_Pengumuman) window.Module_Pengumuman.render(main, activeAction);
  83:             else main.innerHTML = placeholderHtml(activePage);
  84:             break;
  85:           case 'edukasi':
  86:             if (window.Module_Edukasi) window.Module_Edukasi.render(main);
  87:             else main.innerHTML = placeholderHtml(activePage);
  88:             break;
  89:           case 'laporan':
  90:             if (window.Module_Aspirasi) window.Module_Aspirasi.render(main);
> 91:             else main.innerHTML = placeholderHtml(activePage);
  92:             break;
  93:           case 'layanan':
  94:             if (window.Module_Layanan) window.Module_Layanan.render(main);
  95:             else main.innerHTML = placeholderHtml(activePage);
  96:             break;
  97:           case 'faq':
  98:             if (window.Module_FAQ) window.Module_FAQ.render(main);
  99:             else main.innerHTML = placeholderHtml(activePage);
  100:             break;
  101:           case 'peta':
```
### File: App.html, Line: 95
**Escaped:** No
```javascript
  85:           case 'edukasi':
  86:             if (window.Module_Edukasi) window.Module_Edukasi.render(main);
  87:             else main.innerHTML = placeholderHtml(activePage);
  88:             break;
  89:           case 'laporan':
  90:             if (window.Module_Aspirasi) window.Module_Aspirasi.render(main);
  91:             else main.innerHTML = placeholderHtml(activePage);
  92:             break;
  93:           case 'layanan':
  94:             if (window.Module_Layanan) window.Module_Layanan.render(main);
> 95:             else main.innerHTML = placeholderHtml(activePage);
  96:             break;
  97:           case 'faq':
  98:             if (window.Module_FAQ) window.Module_FAQ.render(main);
  99:             else main.innerHTML = placeholderHtml(activePage);
  100:             break;
  101:           case 'peta':
  102:             if (window.Module_Peta) window.Module_Peta.render(main);
  103:             else main.innerHTML = placeholderHtml(activePage);
  104:             break;
  105:           case 'sampah':
```
### File: App.html, Line: 99
**Escaped:** No
```javascript
  89:           case 'laporan':
  90:             if (window.Module_Aspirasi) window.Module_Aspirasi.render(main);
  91:             else main.innerHTML = placeholderHtml(activePage);
  92:             break;
  93:           case 'layanan':
  94:             if (window.Module_Layanan) window.Module_Layanan.render(main);
  95:             else main.innerHTML = placeholderHtml(activePage);
  96:             break;
  97:           case 'faq':
  98:             if (window.Module_FAQ) window.Module_FAQ.render(main);
> 99:             else main.innerHTML = placeholderHtml(activePage);
  100:             break;
  101:           case 'peta':
  102:             if (window.Module_Peta) window.Module_Peta.render(main);
  103:             else main.innerHTML = placeholderHtml(activePage);
  104:             break;
  105:           case 'sampah':
  106:             if (window.Module_Sampah) window.Module_Sampah.render(main);
  107:             else main.innerHTML = placeholderHtml(activePage);
  108:             break;
  109:           case 'profil':
```
### File: App.html, Line: 103
**Escaped:** No
```javascript
  93:           case 'layanan':
  94:             if (window.Module_Layanan) window.Module_Layanan.render(main);
  95:             else main.innerHTML = placeholderHtml(activePage);
  96:             break;
  97:           case 'faq':
  98:             if (window.Module_FAQ) window.Module_FAQ.render(main);
  99:             else main.innerHTML = placeholderHtml(activePage);
  100:             break;
  101:           case 'peta':
  102:             if (window.Module_Peta) window.Module_Peta.render(main);
> 103:             else main.innerHTML = placeholderHtml(activePage);
  104:             break;
  105:           case 'sampah':
  106:             if (window.Module_Sampah) window.Module_Sampah.render(main);
  107:             else main.innerHTML = placeholderHtml(activePage);
  108:             break;
  109:           case 'profil':
  110:             if (window.Module_Profil) window.Module_Profil.render(main);
  111:             else main.innerHTML = placeholderHtml(activePage);
  112:             break;
  113:           case 'kontak':
```
### File: App.html, Line: 107
**Escaped:** No
```javascript
  97:           case 'faq':
  98:             if (window.Module_FAQ) window.Module_FAQ.render(main);
  99:             else main.innerHTML = placeholderHtml(activePage);
  100:             break;
  101:           case 'peta':
  102:             if (window.Module_Peta) window.Module_Peta.render(main);
  103:             else main.innerHTML = placeholderHtml(activePage);
  104:             break;
  105:           case 'sampah':
  106:             if (window.Module_Sampah) window.Module_Sampah.render(main);
> 107:             else main.innerHTML = placeholderHtml(activePage);
  108:             break;
  109:           case 'profil':
  110:             if (window.Module_Profil) window.Module_Profil.render(main);
  111:             else main.innerHTML = placeholderHtml(activePage);
  112:             break;
  113:           case 'kontak':
  114:             if (window.Module_Kontak) window.Module_Kontak.render(main);
  115:             else main.innerHTML = placeholderHtml(activePage);
  116:             break;
  117:           case 'aparatur':
```
### File: App.html, Line: 111
**Escaped:** No
```javascript
  101:           case 'peta':
  102:             if (window.Module_Peta) window.Module_Peta.render(main);
  103:             else main.innerHTML = placeholderHtml(activePage);
  104:             break;
  105:           case 'sampah':
  106:             if (window.Module_Sampah) window.Module_Sampah.render(main);
  107:             else main.innerHTML = placeholderHtml(activePage);
  108:             break;
  109:           case 'profil':
  110:             if (window.Module_Profil) window.Module_Profil.render(main);
> 111:             else main.innerHTML = placeholderHtml(activePage);
  112:             break;
  113:           case 'kontak':
  114:             if (window.Module_Kontak) window.Module_Kontak.render(main);
  115:             else main.innerHTML = placeholderHtml(activePage);
  116:             break;
  117:           case 'aparatur':
  118:             if (window.Module_Aparatur) window.Module_Aparatur.render(main);
  119:             else main.innerHTML = placeholderHtml(activePage);
  120:             break;
  121:           default:
```
### File: App.html, Line: 115
**Escaped:** No
```javascript
  105:           case 'sampah':
  106:             if (window.Module_Sampah) window.Module_Sampah.render(main);
  107:             else main.innerHTML = placeholderHtml(activePage);
  108:             break;
  109:           case 'profil':
  110:             if (window.Module_Profil) window.Module_Profil.render(main);
  111:             else main.innerHTML = placeholderHtml(activePage);
  112:             break;
  113:           case 'kontak':
  114:             if (window.Module_Kontak) window.Module_Kontak.render(main);
> 115:             else main.innerHTML = placeholderHtml(activePage);
  116:             break;
  117:           case 'aparatur':
  118:             if (window.Module_Aparatur) window.Module_Aparatur.render(main);
  119:             else main.innerHTML = placeholderHtml(activePage);
  120:             break;
  121:           default:
  122:             main.innerHTML = placeholderHtml(activePage);
  123:             break;
  124:         }
  125:       } catch(e) {
```
### File: App.html, Line: 119
**Escaped:** No
```javascript
  109:           case 'profil':
  110:             if (window.Module_Profil) window.Module_Profil.render(main);
  111:             else main.innerHTML = placeholderHtml(activePage);
  112:             break;
  113:           case 'kontak':
  114:             if (window.Module_Kontak) window.Module_Kontak.render(main);
  115:             else main.innerHTML = placeholderHtml(activePage);
  116:             break;
  117:           case 'aparatur':
  118:             if (window.Module_Aparatur) window.Module_Aparatur.render(main);
> 119:             else main.innerHTML = placeholderHtml(activePage);
  120:             break;
  121:           default:
  122:             main.innerHTML = placeholderHtml(activePage);
  123:             break;
  124:         }
  125:       } catch(e) {
  126:         main.innerHTML = '<div style="padding:20px; color:red"><h2>Error in rendering ' + activePage + '</h2><p>' + e.message + '</p><pre>' + e.stack + '</pre></div>';
  127:       }
  128:       
  129:       // Since quick actions are internal to Dashboard now, we don't bind here
```
### File: App.html, Line: 122
**Escaped:** No
```javascript
  112:             break;
  113:           case 'kontak':
  114:             if (window.Module_Kontak) window.Module_Kontak.render(main);
  115:             else main.innerHTML = placeholderHtml(activePage);
  116:             break;
  117:           case 'aparatur':
  118:             if (window.Module_Aparatur) window.Module_Aparatur.render(main);
  119:             else main.innerHTML = placeholderHtml(activePage);
  120:             break;
  121:           default:
> 122:             main.innerHTML = placeholderHtml(activePage);
  123:             break;
  124:         }
  125:       } catch(e) {
  126:         main.innerHTML = '<div style="padding:20px; color:red"><h2>Error in rendering ' + activePage + '</h2><p>' + e.message + '</p><pre>' + e.stack + '</pre></div>';
  127:       }
  128:       
  129:       // Since quick actions are internal to Dashboard now, we don't bind here
  130:       // But we expose window.navigate for them
  131:       main.focus();
  132:     }
```
### File: App.html, Line: 126
**Escaped:** No
```javascript
  116:             break;
  117:           case 'aparatur':
  118:             if (window.Module_Aparatur) window.Module_Aparatur.render(main);
  119:             else main.innerHTML = placeholderHtml(activePage);
  120:             break;
  121:           default:
  122:             main.innerHTML = placeholderHtml(activePage);
  123:             break;
  124:         }
  125:       } catch(e) {
> 126:         main.innerHTML = '<div style="padding:20px; color:red"><h2>Error in rendering ' + activePage + '</h2><p>' + e.message + '</p><pre>' + e.stack + '</pre></div>';
  127:       }
  128:       
  129:       // Since quick actions are internal to Dashboard now, we don't bind here
  130:       // But we expose window.navigate for them
  131:       main.focus();
  132:     }
  133: 
  134:     function placeholderHtml(page) {
  135:       const copy = pageCopy[page] || { title: 'Modul', icon: '⚙' };
  136:       return '<section><div class="page-heading"><div><p class="eyebrow">CMS INTERNAL</p><h1>' + copy.title + '</h1><p>Kelola data ' + copy.title.toLowerCase() + '.</p></div></div><article class="placeholder-card"><div class="placeholder-icon mb-4" aria-hidden="true"><span class="material-icons-outlined text-4xl text-gray-400">' + copy.icon + '</span></div><h2>Modul sedang disiapkan</h2><p>Halaman ini saat ini hanya menyediakan navigasi. Fitur pengelolaan data akan ditambahkan pada sprint berikutnya.</p></article></section>';
```
### File: App.html, Line: 220
**Escaped:** No
```javascript
  210: 
  211:     function initialize() {
  212:       console.log("ENTER initialize");
  213:       
  214:       // Check Auth
  215:       if (!CMS_API.getToken()) {
  216:         console.log("No token found. Rendering Login.");
  217:         if (window.ModuleLogin) {
  218:           window.ModuleLogin.render();
  219:         } else {
> 220:           document.body.innerHTML = '<h1>Sistem Keamanan Gagal Dimuat.</h1>';
  221:         }
  222:         return;
  223:       }
  224:       
  225:       // Initialize Shell
  226:       document.getElementById('user-initials').textContent = 'AD'; // Admin Initial
  227:       bindShellActions();
  228:       window.navigate(activePage);
  229:       console.log("EXIT initialize");
  230:     }
```
### File: CMS_Api.html, Line: 37
**Escaped:** No
```javascript
  27:           if (res && typeof res === 'object' && res.hasOwnProperty('success')) {
  28:             if (res.success) {
  29:               resolve(res.data);
  30:             } else {
  31:               if (res.code === 401) {
  32:                 // Token expired or invalid
  33:                 this.clearToken();
  34:                 if (window.CMS_UI && window.CMS_UI.toast) {
  35:                   window.CMS_UI.toast('Sesi Anda telah berakhir. Silakan login kembali.', 'error');
  36:                 }
> 37:                 setTimeout(() => window.location.reload(), 1500);
  38:               }
  39:               reject(new Error(res.message || 'API Error'));
  40:             }
  41:           } else {
  42:             // Legacy response (fallback)
  43:             resolve(res);
  44:           }
  45:         })
  46:         .withFailureHandler(err => {
  47:           console.error("google.script.run." + methodName + " FAILURE:", err);
```
### File: CMS_UI.html, Line: 26
**Escaped:** No
```javascript
  16:   <div id="loader-text" class="loader-text">Memuat...</div>
  17: </div>
  18: 
  19: <script>
  20: window.CMS_UI = {
  21:   toast: function(message, type) {
  22:     type = type || 'success';
  23:     const container = document.getElementById('toast-container');
  24:     const el = document.createElement('div');
  25:     el.className = 'toast toast-' + type;
> 26:     el.innerHTML = message;
  27:     container.appendChild(el);
  28:     setTimeout(() => {
  29:       el.style.opacity = '0';
  30:       setTimeout(() => el.remove(), 300);
  31:     }, 3000);
  32:   },
  33: 
  34:   showLoader: function(text = 'Memuat...') {
  35:     document.getElementById('loader-text').innerText = text;
  36:     document.getElementById('full-loader').classList.add('is-active');
```
### File: CMS_UI.html, Line: 28
**Escaped:** No
```javascript
  18: 
  19: <script>
  20: window.CMS_UI = {
  21:   toast: function(message, type) {
  22:     type = type || 'success';
  23:     const container = document.getElementById('toast-container');
  24:     const el = document.createElement('div');
  25:     el.className = 'toast toast-' + type;
  26:     el.innerHTML = message;
  27:     container.appendChild(el);
> 28:     setTimeout(() => {
  29:       el.style.opacity = '0';
  30:       setTimeout(() => el.remove(), 300);
  31:     }, 3000);
  32:   },
  33: 
  34:   showLoader: function(text = 'Memuat...') {
  35:     document.getElementById('loader-text').innerText = text;
  36:     document.getElementById('full-loader').classList.add('is-active');
  37:   },
  38:   
```
### File: CMS_UI.html, Line: 30
**Escaped:** No
```javascript
  20: window.CMS_UI = {
  21:   toast: function(message, type) {
  22:     type = type || 'success';
  23:     const container = document.getElementById('toast-container');
  24:     const el = document.createElement('div');
  25:     el.className = 'toast toast-' + type;
  26:     el.innerHTML = message;
  27:     container.appendChild(el);
  28:     setTimeout(() => {
  29:       el.style.opacity = '0';
> 30:       setTimeout(() => el.remove(), 300);
  31:     }, 3000);
  32:   },
  33: 
  34:   showLoader: function(text = 'Memuat...') {
  35:     document.getElementById('loader-text').innerText = text;
  36:     document.getElementById('full-loader').classList.add('is-active');
  37:   },
  38:   
  39:   hideLoader: function() {
  40:     document.getElementById('full-loader').classList.remove('is-active');
```
### File: Module_Aparatur.html, Line: 65
**Escaped:** No
```javascript
  55:             <tbody class="divide-y divide-surface-100">
  56:     `;
  57:     
  58:     if (state.items.length === 0) {
  59:       html += `<tr><td colspan="6" class="p-12 text-center text-surface-500">Belum ada struktur aparatur yang ditambahkan.</td></tr>`;
  60:     } else {
  61:       html += state.items.map(item => `
  62:         <tr class="hover:bg-surface-50/50 group">
  63:           <td class="p-4">
  64:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
> 65:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">person</span>`}
  66:             </div>
  67:           </td>
  68:           <td class="p-4">
  69:             <p class="font-bold text-surface-900">${item.name}</p>
  70:             <p class="text-xs text-surface-500">${item.nip || '-'}</p>
  71:           </td>
  72:           <td class="p-4 text-sm text-surface-600">${item.position || '-'}</td>
  73:           <td class="p-4 text-sm text-surface-600">${item.sort_order || '0'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
```
### File: Module_Aparatur.html, Line: 69
**Escaped:** No
```javascript
  59:       html += `<tr><td colspan="6" class="p-12 text-center text-surface-500">Belum ada struktur aparatur yang ditambahkan.</td></tr>`;
  60:     } else {
  61:       html += state.items.map(item => `
  62:         <tr class="hover:bg-surface-50/50 group">
  63:           <td class="p-4">
  64:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
  65:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">person</span>`}
  66:             </div>
  67:           </td>
  68:           <td class="p-4">
> 69:             <p class="font-bold text-surface-900">${item.name}</p>
  70:             <p class="text-xs text-surface-500">${item.nip || '-'}</p>
  71:           </td>
  72:           <td class="p-4 text-sm text-surface-600">${item.position || '-'}</td>
  73:           <td class="p-4 text-sm text-surface-600">${item.sort_order || '0'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
  76:               ${(item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true) ? 'Aktif' : 'Nonaktif'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4 text-right">
```
### File: Module_Aparatur.html, Line: 70
**Escaped:** No
```javascript
  60:     } else {
  61:       html += state.items.map(item => `
  62:         <tr class="hover:bg-surface-50/50 group">
  63:           <td class="p-4">
  64:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
  65:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">person</span>`}
  66:             </div>
  67:           </td>
  68:           <td class="p-4">
  69:             <p class="font-bold text-surface-900">${item.name}</p>
> 70:             <p class="text-xs text-surface-500">${item.nip || '-'}</p>
  71:           </td>
  72:           <td class="p-4 text-sm text-surface-600">${item.position || '-'}</td>
  73:           <td class="p-4 text-sm text-surface-600">${item.sort_order || '0'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
  76:               ${(item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true) ? 'Aktif' : 'Nonaktif'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4 text-right">
  80:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
```
### File: Module_Aparatur.html, Line: 72
**Escaped:** No
```javascript
  62:         <tr class="hover:bg-surface-50/50 group">
  63:           <td class="p-4">
  64:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
  65:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">person</span>`}
  66:             </div>
  67:           </td>
  68:           <td class="p-4">
  69:             <p class="font-bold text-surface-900">${item.name}</p>
  70:             <p class="text-xs text-surface-500">${item.nip || '-'}</p>
  71:           </td>
> 72:           <td class="p-4 text-sm text-surface-600">${item.position || '-'}</td>
  73:           <td class="p-4 text-sm text-surface-600">${item.sort_order || '0'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
  76:               ${(item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true) ? 'Aktif' : 'Nonaktif'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4 text-right">
  80:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  81:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  82:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
```
### File: Module_Aparatur.html, Line: 73
**Escaped:** No
```javascript
  63:           <td class="p-4">
  64:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
  65:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">person</span>`}
  66:             </div>
  67:           </td>
  68:           <td class="p-4">
  69:             <p class="font-bold text-surface-900">${item.name}</p>
  70:             <p class="text-xs text-surface-500">${item.nip || '-'}</p>
  71:           </td>
  72:           <td class="p-4 text-sm text-surface-600">${item.position || '-'}</td>
> 73:           <td class="p-4 text-sm text-surface-600">${item.sort_order || '0'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
  76:               ${(item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true) ? 'Aktif' : 'Nonaktif'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4 text-right">
  80:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  81:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  82:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  83:             </div>
```
### File: Module_Aparatur.html, Line: 75
**Escaped:** No
```javascript
  65:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">person</span>`}
  66:             </div>
  67:           </td>
  68:           <td class="p-4">
  69:             <p class="font-bold text-surface-900">${item.name}</p>
  70:             <p class="text-xs text-surface-500">${item.nip || '-'}</p>
  71:           </td>
  72:           <td class="p-4 text-sm text-surface-600">${item.position || '-'}</td>
  73:           <td class="p-4 text-sm text-surface-600">${item.sort_order || '0'}</td>
  74:           <td class="p-4">
> 75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
  76:               ${(item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true) ? 'Aktif' : 'Nonaktif'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4 text-right">
  80:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  81:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  82:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  83:             </div>
  84:           </td>
  85:         </tr>
```
### File: Module_Aparatur.html, Line: 81
**Escaped:** No
```javascript
  71:           </td>
  72:           <td class="p-4 text-sm text-surface-600">${item.position || '-'}</td>
  73:           <td class="p-4 text-sm text-surface-600">${item.sort_order || '0'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
  76:               ${(item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true) ? 'Aktif' : 'Nonaktif'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4 text-right">
  80:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
> 81:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  82:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  83:             </div>
  84:           </td>
  85:         </tr>
  86:       `).join('');
  87:     }
  88:     
  89:     html += `
  90:             </tbody>
  91:           </table>
```
### File: Module_Aparatur.html, Line: 82
**Escaped:** Yes
```javascript
  72:           <td class="p-4 text-sm text-surface-600">${item.position || '-'}</td>
  73:           <td class="p-4 text-sm text-surface-600">${item.sort_order || '0'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
  76:               ${(item.is_active === 'TRUE' || item.is_active === 'true' || item.is_active === true) ? 'Aktif' : 'Nonaktif'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4 text-right">
  80:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  81:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
> 82:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  83:             </div>
  84:           </td>
  85:         </tr>
  86:       `).join('');
  87:     }
  88:     
  89:     html += `
  90:             </tbody>
  91:           </table>
  92:         </div>
```
### File: Module_Aparatur.html, Line: 103
**Escaped:** No
```javascript
  93:         <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
  94:           <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
  95:           <div class="flex gap-2">
  96:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm" id="aparatur-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  97:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm" id="aparatur-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  98:           </div>
  99:         </div>
  100:       </div>
  101:     `;
  102:     
> 103:     container.innerHTML = html;
  104:     
  105:     document.getElementById('aparatur-btn-create').onclick = () => showForm();
  106:     document.getElementById('aparatur-btn-search').onclick = () => {
  107:       state.search = document.getElementById('aparatur-search').value;
  108:       state.page = 1;
  109:       loadData();
  110:     };
  111:     document.getElementById('aparatur-btn-prev').onclick = () => { state.page--; loadData(); };
  112:     document.getElementById('aparatur-btn-next').onclick = () => { state.page++; loadData(); };
  113:     container.querySelectorAll('.btn-edit').forEach(btn => btn.onclick = () => showForm(btn.dataset.id));
```
### File: Module_Aparatur.html, Line: 138
**Escaped:** No
```javascript
  128:         window.CMS_FORM_DIRTY = false;
  129:         state.view = 'list';
  130:         render();
  131:         return;
  132:       } finally {
  133:         CMS_UI.hideLoader();
  134:       }
  135:     }
  136:     
  137:     const container = document.getElementById('aparatur-content');
> 138:     container.innerHTML = `
  139:       <div class="flex justify-between items-center mb-6">
  140:         <button class="btn" id="aparatur-btn-back">← Kembali</button>
  141:         <button class="btn btn-primary" id="aparatur-btn-save">Simpan Data</button>
  142:       </div>
  143:       
  144:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:600px; margin:0 auto;">
  145:         <div class="form-group">
  146:           <label class="form-label">Nama Lengkap</label>
  147:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  148:         </div>
```
### File: Module_Aparatur.html, Line: 147
**Escaped:** No
```javascript
  137:     const container = document.getElementById('aparatur-content');
  138:     container.innerHTML = `
  139:       <div class="flex justify-between items-center mb-6">
  140:         <button class="btn" id="aparatur-btn-back">← Kembali</button>
  141:         <button class="btn btn-primary" id="aparatur-btn-save">Simpan Data</button>
  142:       </div>
  143:       
  144:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:600px; margin:0 auto;">
  145:         <div class="form-group">
  146:           <label class="form-label">Nama Lengkap</label>
> 147:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  148:         </div>
  149:         <div class="form-group">
  150:           <label class="form-label">NIP (Opsional)</label>
  151:           <input type="text" id="form-nip" class="form-control" value="${data.nip || ''}">
  152:         </div>
  153:         <div class="form-group">
  154:           <label class="form-label">Jabatan</label>
  155:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  156:         </div>
  157:         <div class="form-group">
```
### File: Module_Aparatur.html, Line: 151
**Escaped:** No
```javascript
  141:         <button class="btn btn-primary" id="aparatur-btn-save">Simpan Data</button>
  142:       </div>
  143:       
  144:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:600px; margin:0 auto;">
  145:         <div class="form-group">
  146:           <label class="form-label">Nama Lengkap</label>
  147:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  148:         </div>
  149:         <div class="form-group">
  150:           <label class="form-label">NIP (Opsional)</label>
> 151:           <input type="text" id="form-nip" class="form-control" value="${data.nip || ''}">
  152:         </div>
  153:         <div class="form-group">
  154:           <label class="form-label">Jabatan</label>
  155:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  156:         </div>
  157:         <div class="form-group">
  158:           <label class="form-label">Urutan Tampil</label>
  159:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  160:         </div>
  161:         <div class="form-group">
```
### File: Module_Aparatur.html, Line: 155
**Escaped:** No
```javascript
  145:         <div class="form-group">
  146:           <label class="form-label">Nama Lengkap</label>
  147:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  148:         </div>
  149:         <div class="form-group">
  150:           <label class="form-label">NIP (Opsional)</label>
  151:           <input type="text" id="form-nip" class="form-control" value="${data.nip || ''}">
  152:         </div>
  153:         <div class="form-group">
  154:           <label class="form-label">Jabatan</label>
> 155:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  156:         </div>
  157:         <div class="form-group">
  158:           <label class="form-label">Urutan Tampil</label>
  159:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  160:         </div>
  161:         <div class="form-group">
  162:           <label class="form-label">Status Aktif</label>
  163:           <select id="form-active" class="form-control">
  164:             <option value="TRUE" ${(data.is_active === 'TRUE' || data.is_active === 'true' || data.is_active === true) ? 'selected' : ''}>Aktif</option>
  165:             <option value="FALSE" ${(data.is_active === 'FALSE' || data.is_active === 'false' || data.is_active === false) ? 'selected' : ''}>Nonaktif</option>
```
### File: Module_Aparatur.html, Line: 159
**Escaped:** No
```javascript
  149:         <div class="form-group">
  150:           <label class="form-label">NIP (Opsional)</label>
  151:           <input type="text" id="form-nip" class="form-control" value="${data.nip || ''}">
  152:         </div>
  153:         <div class="form-group">
  154:           <label class="form-label">Jabatan</label>
  155:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  156:         </div>
  157:         <div class="form-group">
  158:           <label class="form-label">Urutan Tampil</label>
> 159:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  160:         </div>
  161:         <div class="form-group">
  162:           <label class="form-label">Status Aktif</label>
  163:           <select id="form-active" class="form-control">
  164:             <option value="TRUE" ${(data.is_active === 'TRUE' || data.is_active === 'true' || data.is_active === true) ? 'selected' : ''}>Aktif</option>
  165:             <option value="FALSE" ${(data.is_active === 'FALSE' || data.is_active === 'false' || data.is_active === false) ? 'selected' : ''}>Nonaktif</option>
  166:           </select>
  167:         </div>
  168:         <div class="form-group">
  169:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
```
### File: Module_Aparatur.html, Line: 169
**Escaped:** No
```javascript
  159:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  160:         </div>
  161:         <div class="form-group">
  162:           <label class="form-label">Status Aktif</label>
  163:           <select id="form-active" class="form-control">
  164:             <option value="TRUE" ${(data.is_active === 'TRUE' || data.is_active === 'true' || data.is_active === true) ? 'selected' : ''}>Aktif</option>
  165:             <option value="FALSE" ${(data.is_active === 'FALSE' || data.is_active === 'false' || data.is_active === false) ? 'selected' : ''}>Nonaktif</option>
  166:           </select>
  167:         </div>
  168:         <div class="form-group">
> 169:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  170:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  171:           </div>
  172:           <label class="form-label">Foto URL / Upload</label>
  173:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}">
  174:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  175:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
  176:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
  177:         </div>
  178:       </div>
  179:     `;
```
### File: Module_Aparatur.html, Line: 173
**Escaped:** No
```javascript
  163:           <select id="form-active" class="form-control">
  164:             <option value="TRUE" ${(data.is_active === 'TRUE' || data.is_active === 'true' || data.is_active === true) ? 'selected' : ''}>Aktif</option>
  165:             <option value="FALSE" ${(data.is_active === 'FALSE' || data.is_active === 'false' || data.is_active === false) ? 'selected' : ''}>Nonaktif</option>
  166:           </select>
  167:         </div>
  168:         <div class="form-group">
  169:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  170:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  171:           </div>
  172:           <label class="form-label">Foto URL / Upload</label>
> 173:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}">
  174:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  175:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
  176:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
  177:         </div>
  178:       </div>
  179:     `;
  180:     
  181:     document.getElementById('aparatur-btn-back').onclick = async () => {
  182:       if (window.CMS_FORM_DIRTY) {
  183:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
```
### File: Module_Aparatur.html, Line: 175
**Escaped:** No
```javascript
  165:             <option value="FALSE" ${(data.is_active === 'FALSE' || data.is_active === 'false' || data.is_active === false) ? 'selected' : ''}>Nonaktif</option>
  166:           </select>
  167:         </div>
  168:         <div class="form-group">
  169:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  170:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  171:           </div>
  172:           <label class="form-label">Foto URL / Upload</label>
  173:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}">
  174:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
> 175:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
  176:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
  177:         </div>
  178:       </div>
  179:     `;
  180:     
  181:     document.getElementById('aparatur-btn-back').onclick = async () => {
  182:       if (window.CMS_FORM_DIRTY) {
  183:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  184:         if (!confirmExit) return;
  185:       }
```
### File: Module_Aparatur.html, Line: 176
**Escaped:** No
```javascript
  166:           </select>
  167:         </div>
  168:         <div class="form-group">
  169:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  170:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  171:           </div>
  172:           <label class="form-label">Foto URL / Upload</label>
  173:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}">
  174:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  175:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
> 176:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
  177:         </div>
  178:       </div>
  179:     `;
  180:     
  181:     document.getElementById('aparatur-btn-back').onclick = async () => {
  182:       if (window.CMS_FORM_DIRTY) {
  183:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  184:         if (!confirmExit) return;
  185:       }
  186:       window.CMS_FORM_DIRTY = false;
```
### File: Module_Aparatur.html, Line: 202
**Escaped:** No
```javascript
  192:       const file = e.target.files[0];
  193:       if (!file) return;
  194:       CMS_UI.showLoader('Mengupload foto...');
  195:       try {
  196:         const res = await CMS_API.uploadMedia(file, 'Aparatur');
  197:         document.getElementById('form-photo').value = res.fileUrl;
  198:         document.getElementById('form-photo_public_id').value = res.publicId;
  199:         document.getElementById('form-photo_provider').value = res.provider;
  200:         
  201:         const previewEl = document.getElementById('image-preview');
> 202:         previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:200px; border-radius:8px;">`;
  203:         previewEl.classList.remove('hidden');
  204:         
  205:         CMS_UI.toast('Foto berhasil diupload');
  206:       } catch(err) {
  207:         CMS_UI.toast(err.message, 'error');
  208:       } finally {
  209:         CMS_UI.hideLoader();
  210:       }
  211:     };
  212:   }
```
### File: Module_Aparatur.html, Line: 264
**Escaped:** No
```javascript
  254:       loadData();
  255:     } catch(e) {
  256:       CMS_UI.toast(e.message, 'error');
  257:     } finally {
  258:       CMS_UI.hideLoader();
  259:     }
  260:   }
  261: 
  262:   function render(container) {
  263:     if (container) {
> 264:       container.innerHTML = `
  265:         <section>
  266:           <div class="page-heading">
  267:             <div>
  268:               <p class="eyebrow">CMS INTERNAL</p>
  269:               <h1>Kelola Aparatur</h1>
  270:               <p>Daftar pegawai dan aparatur kelurahan.</p>
  271:             </div>
  272:           </div>
  273:           <div id="aparatur-content"></div>
  274:         </section>
```
### File: Module_Aspirasi.html, Line: 25
**Escaped:** No
```javascript
  15:     try {
  16:       CMS_UI.showLoader('Memuat laporan...');
  17:       const res = await CMS_API.getRecords('Laporan', { page: state.page, limit: state.limit, search: state.search, status: state.status, sortBy: 'created_at', sortOrder: 'desc' });
  18:       state.items = res.items || [];
  19:       state.total = res.total || 0;
  20:       renderList();
  21:     } catch(e) {
  22:       console.error(e);
  23:       CMS_UI.toast('Error loadData: ' + e.message, 'error');
  24:       const el = document.getElementById('aspirasi-content');
> 25:       if (el) el.innerHTML = '<div style="color:red; padding:20px;">Error loadData: ' + e.message + '</div>';
  26:     } finally {
  27:       CMS_UI.hideLoader();
  28:     }
  29:   }
  30: 
  31:   function renderList() {
  32:     const container = document.getElementById('aspirasi-content');
  33:     if (!container) {
  34:       CMS_UI.toast('Error: container #aspirasi-content tidak ditemukan!', 'error');
  35:       return;
```
### File: Module_Aspirasi.html, Line: 85
**Escaped:** No
```javascript
  75:         html += state.items.map(item => {
  76:           let badgeClass = 'bg-surface-100 text-surface-700';
  77:           if (item.status === 'Selesai') badgeClass = 'bg-emerald-100 text-emerald-700';
  78:           if (item.status === 'Diproses') badgeClass = 'bg-blue-100 text-blue-700';
  79:           if (item.status === 'Masuk') badgeClass = 'bg-amber-100 text-amber-700';
  80:           if (item.status === 'Ditolak') badgeClass = 'bg-rose-100 text-rose-700';
  81:           
  82:           return `
  83:           <tr class="hover:bg-surface-50/50 transition-colors group">
  84:             <td class="p-4">
> 85:               <p class="font-bold text-surface-900 text-sm tracking-wider mb-1">${item.tracking_code}</p>
  86:               <p class="text-xs text-surface-500">${item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '-'}</p>
  87:             </td>
  88:             <td class="p-4 hidden md:table-cell">
  89:               <p class="text-sm font-semibold text-surface-700 mb-1">${item.category}</p>
  90:               <p class="text-xs text-surface-500 truncate max-w-[200px]">${item.location}</p>
  91:             </td>
  92:             <td class="p-4">
  93:               ${item.anonymous === 'TRUE' || item.anonymous === true 
  94:                 ? '<span class="text-xs font-semibold px-2 py-1 bg-surface-100 text-surface-500 rounded-md">Anonim</span>'
  95:                 : `<p class="text-sm font-semibold text-surface-700 mb-1">${item.reporter_name}</p><p class="text-xs text-surface-500">${item.reporter_phone}</p>`
```
### File: Module_Aspirasi.html, Line: 86
**Escaped:** No
```javascript
  76:           let badgeClass = 'bg-surface-100 text-surface-700';
  77:           if (item.status === 'Selesai') badgeClass = 'bg-emerald-100 text-emerald-700';
  78:           if (item.status === 'Diproses') badgeClass = 'bg-blue-100 text-blue-700';
  79:           if (item.status === 'Masuk') badgeClass = 'bg-amber-100 text-amber-700';
  80:           if (item.status === 'Ditolak') badgeClass = 'bg-rose-100 text-rose-700';
  81:           
  82:           return `
  83:           <tr class="hover:bg-surface-50/50 transition-colors group">
  84:             <td class="p-4">
  85:               <p class="font-bold text-surface-900 text-sm tracking-wider mb-1">${item.tracking_code}</p>
> 86:               <p class="text-xs text-surface-500">${item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '-'}</p>
  87:             </td>
  88:             <td class="p-4 hidden md:table-cell">
  89:               <p class="text-sm font-semibold text-surface-700 mb-1">${item.category}</p>
  90:               <p class="text-xs text-surface-500 truncate max-w-[200px]">${item.location}</p>
  91:             </td>
  92:             <td class="p-4">
  93:               ${item.anonymous === 'TRUE' || item.anonymous === true 
  94:                 ? '<span class="text-xs font-semibold px-2 py-1 bg-surface-100 text-surface-500 rounded-md">Anonim</span>'
  95:                 : `<p class="text-sm font-semibold text-surface-700 mb-1">${item.reporter_name}</p><p class="text-xs text-surface-500">${item.reporter_phone}</p>`
  96:               }
```
### File: Module_Aspirasi.html, Line: 89
**Escaped:** No
```javascript
  79:           if (item.status === 'Masuk') badgeClass = 'bg-amber-100 text-amber-700';
  80:           if (item.status === 'Ditolak') badgeClass = 'bg-rose-100 text-rose-700';
  81:           
  82:           return `
  83:           <tr class="hover:bg-surface-50/50 transition-colors group">
  84:             <td class="p-4">
  85:               <p class="font-bold text-surface-900 text-sm tracking-wider mb-1">${item.tracking_code}</p>
  86:               <p class="text-xs text-surface-500">${item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '-'}</p>
  87:             </td>
  88:             <td class="p-4 hidden md:table-cell">
> 89:               <p class="text-sm font-semibold text-surface-700 mb-1">${item.category}</p>
  90:               <p class="text-xs text-surface-500 truncate max-w-[200px]">${item.location}</p>
  91:             </td>
  92:             <td class="p-4">
  93:               ${item.anonymous === 'TRUE' || item.anonymous === true 
  94:                 ? '<span class="text-xs font-semibold px-2 py-1 bg-surface-100 text-surface-500 rounded-md">Anonim</span>'
  95:                 : `<p class="text-sm font-semibold text-surface-700 mb-1">${item.reporter_name}</p><p class="text-xs text-surface-500">${item.reporter_phone}</p>`
  96:               }
  97:             </td>
  98:             <td class="p-4">
  99:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeClass}">
```
### File: Module_Aspirasi.html, Line: 90
**Escaped:** No
```javascript
  80:           if (item.status === 'Ditolak') badgeClass = 'bg-rose-100 text-rose-700';
  81:           
  82:           return `
  83:           <tr class="hover:bg-surface-50/50 transition-colors group">
  84:             <td class="p-4">
  85:               <p class="font-bold text-surface-900 text-sm tracking-wider mb-1">${item.tracking_code}</p>
  86:               <p class="text-xs text-surface-500">${item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '-'}</p>
  87:             </td>
  88:             <td class="p-4 hidden md:table-cell">
  89:               <p class="text-sm font-semibold text-surface-700 mb-1">${item.category}</p>
> 90:               <p class="text-xs text-surface-500 truncate max-w-[200px]">${item.location}</p>
  91:             </td>
  92:             <td class="p-4">
  93:               ${item.anonymous === 'TRUE' || item.anonymous === true 
  94:                 ? '<span class="text-xs font-semibold px-2 py-1 bg-surface-100 text-surface-500 rounded-md">Anonim</span>'
  95:                 : `<p class="text-sm font-semibold text-surface-700 mb-1">${item.reporter_name}</p><p class="text-xs text-surface-500">${item.reporter_phone}</p>`
  96:               }
  97:             </td>
  98:             <td class="p-4">
  99:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeClass}">
  100:                 ${item.status}
```
### File: Module_Aspirasi.html, Line: 93
**Escaped:** No
```javascript
  83:           <tr class="hover:bg-surface-50/50 transition-colors group">
  84:             <td class="p-4">
  85:               <p class="font-bold text-surface-900 text-sm tracking-wider mb-1">${item.tracking_code}</p>
  86:               <p class="text-xs text-surface-500">${item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '-'}</p>
  87:             </td>
  88:             <td class="p-4 hidden md:table-cell">
  89:               <p class="text-sm font-semibold text-surface-700 mb-1">${item.category}</p>
  90:               <p class="text-xs text-surface-500 truncate max-w-[200px]">${item.location}</p>
  91:             </td>
  92:             <td class="p-4">
> 93:               ${item.anonymous === 'TRUE' || item.anonymous === true 
  94:                 ? '<span class="text-xs font-semibold px-2 py-1 bg-surface-100 text-surface-500 rounded-md">Anonim</span>'
  95:                 : `<p class="text-sm font-semibold text-surface-700 mb-1">${item.reporter_name}</p><p class="text-xs text-surface-500">${item.reporter_phone}</p>`
  96:               }
  97:             </td>
  98:             <td class="p-4">
  99:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeClass}">
  100:                 ${item.status}
  101:               </span>
  102:             </td>
  103:             <td class="p-4 text-right">
```
### File: Module_Aspirasi.html, Line: 95
**Escaped:** No
```javascript
  85:               <p class="font-bold text-surface-900 text-sm tracking-wider mb-1">${item.tracking_code}</p>
  86:               <p class="text-xs text-surface-500">${item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : '-'}</p>
  87:             </td>
  88:             <td class="p-4 hidden md:table-cell">
  89:               <p class="text-sm font-semibold text-surface-700 mb-1">${item.category}</p>
  90:               <p class="text-xs text-surface-500 truncate max-w-[200px]">${item.location}</p>
  91:             </td>
  92:             <td class="p-4">
  93:               ${item.anonymous === 'TRUE' || item.anonymous === true 
  94:                 ? '<span class="text-xs font-semibold px-2 py-1 bg-surface-100 text-surface-500 rounded-md">Anonim</span>'
> 95:                 : `<p class="text-sm font-semibold text-surface-700 mb-1">${item.reporter_name}</p><p class="text-xs text-surface-500">${item.reporter_phone}</p>`
  96:               }
  97:             </td>
  98:             <td class="p-4">
  99:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeClass}">
  100:                 ${item.status}
  101:               </span>
  102:             </td>
  103:             <td class="p-4 text-right">
  104:               <button class="btn-edit px-3 py-1.5 bg-white border border-surface-200 text-surface-700 hover:bg-surface-50 rounded-lg text-xs font-semibold shadow-sm transition-colors" data-id="${item.id}">Tinjau</button>
  105:             </td>
```
### File: Module_Aspirasi.html, Line: 100
**Escaped:** No
```javascript
  90:               <p class="text-xs text-surface-500 truncate max-w-[200px]">${item.location}</p>
  91:             </td>
  92:             <td class="p-4">
  93:               ${item.anonymous === 'TRUE' || item.anonymous === true 
  94:                 ? '<span class="text-xs font-semibold px-2 py-1 bg-surface-100 text-surface-500 rounded-md">Anonim</span>'
  95:                 : `<p class="text-sm font-semibold text-surface-700 mb-1">${item.reporter_name}</p><p class="text-xs text-surface-500">${item.reporter_phone}</p>`
  96:               }
  97:             </td>
  98:             <td class="p-4">
  99:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeClass}">
> 100:                 ${item.status}
  101:               </span>
  102:             </td>
  103:             <td class="p-4 text-right">
  104:               <button class="btn-edit px-3 py-1.5 bg-white border border-surface-200 text-surface-700 hover:bg-surface-50 rounded-lg text-xs font-semibold shadow-sm transition-colors" data-id="${item.id}">Tinjau</button>
  105:             </td>
  106:           </tr>
  107:         `}).join('');
  108:       }
  109:       
  110:       html += `
```
### File: Module_Aspirasi.html, Line: 104
**Escaped:** No
```javascript
  94:                 ? '<span class="text-xs font-semibold px-2 py-1 bg-surface-100 text-surface-500 rounded-md">Anonim</span>'
  95:                 : `<p class="text-sm font-semibold text-surface-700 mb-1">${item.reporter_name}</p><p class="text-xs text-surface-500">${item.reporter_phone}</p>`
  96:               }
  97:             </td>
  98:             <td class="p-4">
  99:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeClass}">
  100:                 ${item.status}
  101:               </span>
  102:             </td>
  103:             <td class="p-4 text-right">
> 104:               <button class="btn-edit px-3 py-1.5 bg-white border border-surface-200 text-surface-700 hover:bg-surface-50 rounded-lg text-xs font-semibold shadow-sm transition-colors" data-id="${item.id}">Tinjau</button>
  105:             </td>
  106:           </tr>
  107:         `}).join('');
  108:       }
  109:       
  110:       html += `
  111:               </tbody>
  112:             </table>
  113:           </div>
  114:           
```
### File: Module_Aspirasi.html, Line: 125
**Escaped:** No
```javascript
  115:           <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
  116:             <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} laporan</p>
  117:             <div class="flex gap-2">
  118:               <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="aspirasi-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  119:               <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="aspirasi-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  120:             </div>
  121:           </div>
  122:         </div>
  123:       `;
  124:       
> 125:       container.innerHTML = html;
  126:     } catch(e) {}
  127:     
  128:     document.getElementById('aspirasi-btn-search').onclick = () => {
  129:       state.search = document.getElementById('aspirasi-search').value;
  130:       state.status = document.getElementById('aspirasi-filter').value;
  131:       state.page = 1;
  132:       loadData();
  133:     };
  134:     document.getElementById('aspirasi-btn-prev').onclick = () => { state.page--; loadData(); };
  135:     document.getElementById('aspirasi-btn-next').onclick = () => { state.page++; loadData(); };
```
### File: Module_Aspirasi.html, Line: 174
**Escaped:** No
```javascript
  164:       timelineHtml = timeline.map(t => `
  165:         <div style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid #e2e8f0;">
  166:           <div style="font-size:11px; color:#64748b; font-weight:700;">${new Date(t.time).toLocaleString('id-ID')}</div>
  167:           <div><strong>Status: ${t.status}</strong></div>
  168:           <div style="color:#475569; font-size:13px; margin-top:4px;">${t.note || '-'}</div>
  169:         </div>
  170:       `).join('');
  171:     } catch(e) {}
  172:     
  173:     const container = document.getElementById('aspirasi-content');
> 174:     container.innerHTML = `
  175:       <div class="flex justify-between items-center mb-6">
  176:         <button class="btn" id="aspirasi-btn-back">← Kembali</button>
  177:         <button class="btn btn-primary" id="aspirasi-btn-save">Simpan Update</button>
  178:       </div>
  179:       
  180:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  181:         <div style="display:flex; flex-direction:column; gap:24px;">
  182:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  183:             <div class="page-heading" style="margin-bottom:16px;">
  184:               <div>
```
### File: Module_Aspirasi.html, Line: 185
**Escaped:** No
```javascript
  175:       <div class="flex justify-between items-center mb-6">
  176:         <button class="btn" id="aspirasi-btn-back">← Kembali</button>
  177:         <button class="btn btn-primary" id="aspirasi-btn-save">Simpan Update</button>
  178:       </div>
  179:       
  180:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  181:         <div style="display:flex; flex-direction:column; gap:24px;">
  182:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  183:             <div class="page-heading" style="margin-bottom:16px;">
  184:               <div>
> 185:                 <p class="eyebrow">DETAIL TIKET: ${data.tracking_code}</p>
  186:                 <h2 style="font-size:18px; margin:0 0 16px;">${data.category} - Lokasi: ${data.location}</h2>
  187:               </div>
  188:             </div>
  189:             
  190:             <div style="background:#f8fafc; padding:16px; border-radius:8px; margin-bottom:16px;">
  191:               <strong>Deskripsi Laporan:</strong><br/>
  192:               <p style="margin:8px 0 0; color:#334155; line-height:1.6;">${data.description}</p>
  193:             </div>
  194:             
  195:             ${data.image ? `<div style="margin-bottom:16px;"><strong>Lampiran Gambar:</strong><br/><img src="${CMS_UI.getDriveImageUrl(data.image)}" style="max-width:100%; max-height:300px; margin-top:8px; border-radius:8px; border:1px solid #e2e8f0;" alt="Lampiran Laporan"></div>` : ''}
```
### File: Module_Aspirasi.html, Line: 186
**Escaped:** No
```javascript
  176:         <button class="btn" id="aspirasi-btn-back">← Kembali</button>
  177:         <button class="btn btn-primary" id="aspirasi-btn-save">Simpan Update</button>
  178:       </div>
  179:       
  180:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  181:         <div style="display:flex; flex-direction:column; gap:24px;">
  182:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  183:             <div class="page-heading" style="margin-bottom:16px;">
  184:               <div>
  185:                 <p class="eyebrow">DETAIL TIKET: ${data.tracking_code}</p>
> 186:                 <h2 style="font-size:18px; margin:0 0 16px;">${data.category} - Lokasi: ${data.location}</h2>
  187:               </div>
  188:             </div>
  189:             
  190:             <div style="background:#f8fafc; padding:16px; border-radius:8px; margin-bottom:16px;">
  191:               <strong>Deskripsi Laporan:</strong><br/>
  192:               <p style="margin:8px 0 0; color:#334155; line-height:1.6;">${data.description}</p>
  193:             </div>
  194:             
  195:             ${data.image ? `<div style="margin-bottom:16px;"><strong>Lampiran Gambar:</strong><br/><img src="${CMS_UI.getDriveImageUrl(data.image)}" style="max-width:100%; max-height:300px; margin-top:8px; border-radius:8px; border:1px solid #e2e8f0;" alt="Lampiran Laporan"></div>` : ''}
  196:             
```
### File: Module_Aspirasi.html, Line: 192
**Escaped:** No
```javascript
  182:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  183:             <div class="page-heading" style="margin-bottom:16px;">
  184:               <div>
  185:                 <p class="eyebrow">DETAIL TIKET: ${data.tracking_code}</p>
  186:                 <h2 style="font-size:18px; margin:0 0 16px;">${data.category} - Lokasi: ${data.location}</h2>
  187:               </div>
  188:             </div>
  189:             
  190:             <div style="background:#f8fafc; padding:16px; border-radius:8px; margin-bottom:16px;">
  191:               <strong>Deskripsi Laporan:</strong><br/>
> 192:               <p style="margin:8px 0 0; color:#334155; line-height:1.6;">${data.description}</p>
  193:             </div>
  194:             
  195:             ${data.image ? `<div style="margin-bottom:16px;"><strong>Lampiran Gambar:</strong><br/><img src="${CMS_UI.getDriveImageUrl(data.image)}" style="max-width:100%; max-height:300px; margin-top:8px; border-radius:8px; border:1px solid #e2e8f0;" alt="Lampiran Laporan"></div>` : ''}
  196:             
  197:             <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; padding-top:16px; border-top:1px solid #e2e8f0;">
  198:               <div>
  199:                 <strong>Pelapor:</strong><br/>
  200:                 <span style="color:#475569">${isAnon ? 'Anonim' : (data.reporter_name || '-')}</span>
  201:               </div>
  202:               <div>
```
### File: Module_Aspirasi.html, Line: 195
**Escaped:** No
```javascript
  185:                 <p class="eyebrow">DETAIL TIKET: ${data.tracking_code}</p>
  186:                 <h2 style="font-size:18px; margin:0 0 16px;">${data.category} - Lokasi: ${data.location}</h2>
  187:               </div>
  188:             </div>
  189:             
  190:             <div style="background:#f8fafc; padding:16px; border-radius:8px; margin-bottom:16px;">
  191:               <strong>Deskripsi Laporan:</strong><br/>
  192:               <p style="margin:8px 0 0; color:#334155; line-height:1.6;">${data.description}</p>
  193:             </div>
  194:             
> 195:             ${data.image ? `<div style="margin-bottom:16px;"><strong>Lampiran Gambar:</strong><br/><img src="${CMS_UI.getDriveImageUrl(data.image)}" style="max-width:100%; max-height:300px; margin-top:8px; border-radius:8px; border:1px solid #e2e8f0;" alt="Lampiran Laporan"></div>` : ''}
  196:             
  197:             <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; padding-top:16px; border-top:1px solid #e2e8f0;">
  198:               <div>
  199:                 <strong>Pelapor:</strong><br/>
  200:                 <span style="color:#475569">${isAnon ? 'Anonim' : (data.reporter_name || '-')}</span>
  201:               </div>
  202:               <div>
  203:                 <strong>Kontak:</strong><br/>
  204:                 <span style="color:#475569">${isAnon ? 'Dirahasiakan' : (data.reporter_phone || '-')}</span>
  205:               </div>
```
### File: Module_Aspirasi.html, Line: 214
**Escaped:** No
```javascript
  204:                 <span style="color:#475569">${isAnon ? 'Dirahasiakan' : (data.reporter_phone || '-')}</span>
  205:               </div>
  206:             </div>
  207:           </div>
  208:           
  209:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  210:             <h3 style="margin:0 0 16px; font-size:16px;">Tindak Lanjut & Tanggapan Admin</h3>
  211:             <div class="form-group">
  212:               <label class="form-label">Ubah Status</label>
  213:               <select id="form-status" class="form-control">
> 214:                 <option value="Masuk" ${data.status==='Masuk'?'selected':''}>Baru (Masuk)</option>
  215:                 <option value="Diproses" ${data.status==='Diproses'?'selected':''}>Diproses (Sedang ditindaklanjuti)</option>
  216:                 <option value="Selesai" ${data.status==='Selesai'?'selected':''}>Selesai (Kasus ditutup)</option>
  217:                 <option value="Ditolak" ${data.status==='Ditolak'?'selected':''}>Ditolak (Laporan invalid)</option>
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Catatan Admin (Untuk publik/pelapor)</label>
  222:               <textarea id="form-response" class="form-control" style="min-height:100px">${data.response || ''}</textarea>
  223:             </div>
  224:             <div class="form-group">
```
### File: Module_Aspirasi.html, Line: 215
**Escaped:** No
```javascript
  205:               </div>
  206:             </div>
  207:           </div>
  208:           
  209:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  210:             <h3 style="margin:0 0 16px; font-size:16px;">Tindak Lanjut & Tanggapan Admin</h3>
  211:             <div class="form-group">
  212:               <label class="form-label">Ubah Status</label>
  213:               <select id="form-status" class="form-control">
  214:                 <option value="Masuk" ${data.status==='Masuk'?'selected':''}>Baru (Masuk)</option>
> 215:                 <option value="Diproses" ${data.status==='Diproses'?'selected':''}>Diproses (Sedang ditindaklanjuti)</option>
  216:                 <option value="Selesai" ${data.status==='Selesai'?'selected':''}>Selesai (Kasus ditutup)</option>
  217:                 <option value="Ditolak" ${data.status==='Ditolak'?'selected':''}>Ditolak (Laporan invalid)</option>
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Catatan Admin (Untuk publik/pelapor)</label>
  222:               <textarea id="form-response" class="form-control" style="min-height:100px">${data.response || ''}</textarea>
  223:             </div>
  224:             <div class="form-group">
  225:               <label class="form-label">Catatan Internal (Hanya terlihat di Timeline)</label>
```
### File: Module_Aspirasi.html, Line: 216
**Escaped:** No
```javascript
  206:             </div>
  207:           </div>
  208:           
  209:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  210:             <h3 style="margin:0 0 16px; font-size:16px;">Tindak Lanjut & Tanggapan Admin</h3>
  211:             <div class="form-group">
  212:               <label class="form-label">Ubah Status</label>
  213:               <select id="form-status" class="form-control">
  214:                 <option value="Masuk" ${data.status==='Masuk'?'selected':''}>Baru (Masuk)</option>
  215:                 <option value="Diproses" ${data.status==='Diproses'?'selected':''}>Diproses (Sedang ditindaklanjuti)</option>
> 216:                 <option value="Selesai" ${data.status==='Selesai'?'selected':''}>Selesai (Kasus ditutup)</option>
  217:                 <option value="Ditolak" ${data.status==='Ditolak'?'selected':''}>Ditolak (Laporan invalid)</option>
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Catatan Admin (Untuk publik/pelapor)</label>
  222:               <textarea id="form-response" class="form-control" style="min-height:100px">${data.response || ''}</textarea>
  223:             </div>
  224:             <div class="form-group">
  225:               <label class="form-label">Catatan Internal (Hanya terlihat di Timeline)</label>
  226:               <input type="text" id="form-internal-note" class="form-control" placeholder="Cth: Diteruskan ke DLH Parepare...">
```
### File: Module_Aspirasi.html, Line: 217
**Escaped:** No
```javascript
  207:           </div>
  208:           
  209:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  210:             <h3 style="margin:0 0 16px; font-size:16px;">Tindak Lanjut & Tanggapan Admin</h3>
  211:             <div class="form-group">
  212:               <label class="form-label">Ubah Status</label>
  213:               <select id="form-status" class="form-control">
  214:                 <option value="Masuk" ${data.status==='Masuk'?'selected':''}>Baru (Masuk)</option>
  215:                 <option value="Diproses" ${data.status==='Diproses'?'selected':''}>Diproses (Sedang ditindaklanjuti)</option>
  216:                 <option value="Selesai" ${data.status==='Selesai'?'selected':''}>Selesai (Kasus ditutup)</option>
> 217:                 <option value="Ditolak" ${data.status==='Ditolak'?'selected':''}>Ditolak (Laporan invalid)</option>
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Catatan Admin (Untuk publik/pelapor)</label>
  222:               <textarea id="form-response" class="form-control" style="min-height:100px">${data.response || ''}</textarea>
  223:             </div>
  224:             <div class="form-group">
  225:               <label class="form-label">Catatan Internal (Hanya terlihat di Timeline)</label>
  226:               <input type="text" id="form-internal-note" class="form-control" placeholder="Cth: Diteruskan ke DLH Parepare...">
  227:             </div>
```
### File: Module_Aspirasi.html, Line: 222
**Escaped:** No
```javascript
  212:               <label class="form-label">Ubah Status</label>
  213:               <select id="form-status" class="form-control">
  214:                 <option value="Masuk" ${data.status==='Masuk'?'selected':''}>Baru (Masuk)</option>
  215:                 <option value="Diproses" ${data.status==='Diproses'?'selected':''}>Diproses (Sedang ditindaklanjuti)</option>
  216:                 <option value="Selesai" ${data.status==='Selesai'?'selected':''}>Selesai (Kasus ditutup)</option>
  217:                 <option value="Ditolak" ${data.status==='Ditolak'?'selected':''}>Ditolak (Laporan invalid)</option>
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Catatan Admin (Untuk publik/pelapor)</label>
> 222:               <textarea id="form-response" class="form-control" style="min-height:100px">${data.response || ''}</textarea>
  223:             </div>
  224:             <div class="form-group">
  225:               <label class="form-label">Catatan Internal (Hanya terlihat di Timeline)</label>
  226:               <input type="text" id="form-internal-note" class="form-control" placeholder="Cth: Diteruskan ke DLH Parepare...">
  227:             </div>
  228:           </div>
  229:         </div>
  230:         
  231:         <div>
  232:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
```
### File: Module_Aspirasi.html, Line: 320
**Escaped:** No
```javascript
  310:     const link = document.createElement("a");
  311:     link.setAttribute("href", encodedUri);
  312:     link.setAttribute("download", "Laporan_Aspirasi_" + new Date().getTime() + ".csv");
  313:     document.body.appendChild(link);
  314:     link.click();
  315:     link.remove();
  316:   }
  317: 
  318:   function render(container) {
  319:     if (container) {
> 320:       container.innerHTML = `
  321:         <section>
  322:           <div class="page-heading">
  323:             <div>
  324:               <p class="eyebrow">CMS INTERNAL</p>
  325:               <h1>Laporan & Aspirasi</h1>
  326:               <p>Tinjau dan tindaklanjuti laporan masyarakat.</p>
  327:             </div>
  328:           </div>
  329:           <div id="aspirasi-content"></div>
  330:         </section>
```
### File: Module_Berita.html, Line: 48
**Escaped:** No
```javascript
  38:     try {
  39:       CMS_UI.showLoader('Memuat berita...');
  40:       const res = await CMS_API.getRecords('Berita', { page: state.page, limit: state.limit, search: state.search, status: state.status, sortBy: 'published_at', sortOrder: 'desc' });
  41:       state.items = res.items || [];
  42:       state.total = res.total || 0;
  43:       renderList();
  44:     } catch(e) {
  45:       console.error(e);
  46:       CMS_UI.toast('Error loadData: ' + e.message, 'error');
  47:       const el = document.getElementById('berita-content');
> 48:       if (el) el.innerHTML = '<div style="color:red; padding:20px;">Error loadData: ' + e.message + '</div>';
  49:     } finally {
  50:       CMS_UI.hideLoader();
  51:     }
  52:   }
  53: 
  54:   function renderList() {
  55:     const container = document.getElementById('berita-content');
  56:     if (!container) {
  57:       CMS_UI.toast('Error: container #berita-content tidak ditemukan!', 'error');
  58:       return;
```
### File: Module_Berita.html, Line: 99
**Escaped:** No
```javascript
  89:               </thead>
  90:               <tbody class="divide-y divide-surface-100">
  91:       `;
  92:       
  93:       if (state.items.length === 0) {
  94:         html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada berita yang dipublikasikan.</td></tr>`;
  95:       } else {
  96:         html += state.items.map(item => `
  97:           <tr class="hover:bg-surface-50/50 transition-colors group">
  98:             <td class="p-4">
> 99:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  100:             </td>
  101:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category}</td>
  102:             <td class="p-4">
  103:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  104:                 ${item.status}
  105:               </span>
  106:             </td>
  107:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  108:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  109:             </td>
```
### File: Module_Berita.html, Line: 101
**Escaped:** No
```javascript
  91:       `;
  92:       
  93:       if (state.items.length === 0) {
  94:         html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada berita yang dipublikasikan.</td></tr>`;
  95:       } else {
  96:         html += state.items.map(item => `
  97:           <tr class="hover:bg-surface-50/50 transition-colors group">
  98:             <td class="p-4">
  99:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  100:             </td>
> 101:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category}</td>
  102:             <td class="p-4">
  103:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  104:                 ${item.status}
  105:               </span>
  106:             </td>
  107:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  108:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  109:             </td>
  110:             <td class="p-4 text-right">
  111:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
```
### File: Module_Berita.html, Line: 103
**Escaped:** No
```javascript
  93:       if (state.items.length === 0) {
  94:         html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada berita yang dipublikasikan.</td></tr>`;
  95:       } else {
  96:         html += state.items.map(item => `
  97:           <tr class="hover:bg-surface-50/50 transition-colors group">
  98:             <td class="p-4">
  99:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  100:             </td>
  101:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category}</td>
  102:             <td class="p-4">
> 103:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  104:                 ${item.status}
  105:               </span>
  106:             </td>
  107:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  108:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  109:             </td>
  110:             <td class="p-4 text-right">
  111:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  112:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  113:                   <span class="material-icons-outlined text-[18px]">edit</span>
```
### File: Module_Berita.html, Line: 104
**Escaped:** No
```javascript
  94:         html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada berita yang dipublikasikan.</td></tr>`;
  95:       } else {
  96:         html += state.items.map(item => `
  97:           <tr class="hover:bg-surface-50/50 transition-colors group">
  98:             <td class="p-4">
  99:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  100:             </td>
  101:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category}</td>
  102:             <td class="p-4">
  103:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
> 104:                 ${item.status}
  105:               </span>
  106:             </td>
  107:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  108:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  109:             </td>
  110:             <td class="p-4 text-right">
  111:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  112:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  113:                   <span class="material-icons-outlined text-[18px]">edit</span>
  114:                 </button>
```
### File: Module_Berita.html, Line: 108
**Escaped:** No
```javascript
  98:             <td class="p-4">
  99:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  100:             </td>
  101:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category}</td>
  102:             <td class="p-4">
  103:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  104:                 ${item.status}
  105:               </span>
  106:             </td>
  107:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
> 108:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  109:             </td>
  110:             <td class="p-4 text-right">
  111:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  112:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  113:                   <span class="material-icons-outlined text-[18px]">edit</span>
  114:                 </button>
  115:                 <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" title="Hapus">
  116:                   <span class="material-icons-outlined text-[18px]">delete</span>
  117:                 </button>
  118:               </div>
```
### File: Module_Berita.html, Line: 112
**Escaped:** No
```javascript
  102:             <td class="p-4">
  103:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  104:                 ${item.status}
  105:               </span>
  106:             </td>
  107:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  108:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  109:             </td>
  110:             <td class="p-4 text-right">
  111:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
> 112:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  113:                   <span class="material-icons-outlined text-[18px]">edit</span>
  114:                 </button>
  115:                 <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" title="Hapus">
  116:                   <span class="material-icons-outlined text-[18px]">delete</span>
  117:                 </button>
  118:               </div>
  119:             </td>
  120:           </tr>
  121:         `).join('');
  122:       }
```
### File: Module_Berita.html, Line: 115
**Escaped:** No
```javascript
  105:               </span>
  106:             </td>
  107:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  108:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  109:             </td>
  110:             <td class="p-4 text-right">
  111:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  112:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  113:                   <span class="material-icons-outlined text-[18px]">edit</span>
  114:                 </button>
> 115:                 <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" title="Hapus">
  116:                   <span class="material-icons-outlined text-[18px]">delete</span>
  117:                 </button>
  118:               </div>
  119:             </td>
  120:           </tr>
  121:         `).join('');
  122:       }
  123:       
  124:       html += `
  125:               </tbody>
```
### File: Module_Berita.html, Line: 139
**Escaped:** No
```javascript
  129:           <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
  130:             <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
  131:             <div class="flex gap-2">
  132:               <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="berita-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  133:               <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="berita-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  134:             </div>
  135:           </div>
  136:         </div>
  137:       `;
  138:       
> 139:           const parser = document.createElement("div");`r`n    parser.innerHTML = html;`r`n    console.log(parser.innerHTML);`r`n    container.innerHTML = parser.innerHTML;
  140:     } catch(e) {
  141:       console.error(e);
  142:       container.innerHTML = '<div style="color:red; padding:20px;">Error renderList: ' + e.message + '</div>';
  143:     }
  144:     
  145:     // Bind events
  146:     document.getElementById('berita-btn-create').onclick = () => showForm();
  147:     document.getElementById('berita-btn-search').onclick = () => {
  148:       state.search = document.getElementById('berita-search').value;
  149:       state.status = document.getElementById('berita-filter').value;
```
### File: Module_Berita.html, Line: 142
**Escaped:** No
```javascript
  132:               <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="berita-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  133:               <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="berita-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  134:             </div>
  135:           </div>
  136:         </div>
  137:       `;
  138:       
  139:           const parser = document.createElement("div");`r`n    parser.innerHTML = html;`r`n    console.log(parser.innerHTML);`r`n    container.innerHTML = parser.innerHTML;
  140:     } catch(e) {
  141:       console.error(e);
> 142:       container.innerHTML = '<div style="color:red; padding:20px;">Error renderList: ' + e.message + '</div>';
  143:     }
  144:     
  145:     // Bind events
  146:     document.getElementById('berita-btn-create').onclick = () => showForm();
  147:     document.getElementById('berita-btn-search').onclick = () => {
  148:       state.search = document.getElementById('berita-search').value;
  149:       state.status = document.getElementById('berita-filter').value;
  150:       state.page = 1;
  151:       loadData();
  152:     };
```
### File: Module_Berita.html, Line: 216
**Escaped:** No
```javascript
  206:             <label class="form-label">Isi Berita</label>
  207:             <textarea id="form-content" class="form-control" style="min-height:300px">${CMS_UI.escapeHtml(data.content)}</textarea>
  208:           </div>
  209:         </div>
  210:         
  211:         <div style="display:flex; flex-direction:column; gap:24px;">
  212:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  213:             <div class="form-group">
  214:               <label class="form-label">Status</label>
  215:               <select id="form-status" class="form-control">
> 216:                 <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
  217:                 <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Tanggal Publikasi</label>
  222:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  223:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  224:             </div>
  225:             <div class="form-group">
  226:               <label class="form-label">Kategori</label>
```
### File: Module_Berita.html, Line: 217
**Escaped:** No
```javascript
  207:             <textarea id="form-content" class="form-control" style="min-height:300px">${CMS_UI.escapeHtml(data.content)}</textarea>
  208:           </div>
  209:         </div>
  210:         
  211:         <div style="display:flex; flex-direction:column; gap:24px;">
  212:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  213:             <div class="form-group">
  214:               <label class="form-label">Status</label>
  215:               <select id="form-status" class="form-control">
  216:                 <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
> 217:                 <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Tanggal Publikasi</label>
  222:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  223:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  224:             </div>
  225:             <div class="form-group">
  226:               <label class="form-label">Kategori</label>
  227:               <select id="form-category" class="form-control">
```
### File: Module_Berita.html, Line: 222
**Escaped:** No
```javascript
  212:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  213:             <div class="form-group">
  214:               <label class="form-label">Status</label>
  215:               <select id="form-status" class="form-control">
  216:                 <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
  217:                 <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Tanggal Publikasi</label>
> 222:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  223:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  224:             </div>
  225:             <div class="form-group">
  226:               <label class="form-label">Kategori</label>
  227:               <select id="form-category" class="form-control">
  228:                 <option value="Kegiatan Kelurahan" ${data.category==='Kegiatan Kelurahan'?'selected':''}>Kegiatan Kelurahan</option>
  229:                 <option value="UMKM" ${data.category==='UMKM'?'selected':''}>UMKM</option>
  230:                 <option value="Masyarakat" ${data.category==='Masyarakat'?'selected':''}>Masyarakat</option>
  231:                 <option value="Lingkungan" ${data.category==='Lingkungan'?'selected':''}>Lingkungan</option>
  232:               </select>
```
### File: Module_Berita.html, Line: 228
**Escaped:** No
```javascript
  218:               </select>
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Tanggal Publikasi</label>
  222:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  223:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  224:             </div>
  225:             <div class="form-group">
  226:               <label class="form-label">Kategori</label>
  227:               <select id="form-category" class="form-control">
> 228:                 <option value="Kegiatan Kelurahan" ${data.category==='Kegiatan Kelurahan'?'selected':''}>Kegiatan Kelurahan</option>
  229:                 <option value="UMKM" ${data.category==='UMKM'?'selected':''}>UMKM</option>
  230:                 <option value="Masyarakat" ${data.category==='Masyarakat'?'selected':''}>Masyarakat</option>
  231:                 <option value="Lingkungan" ${data.category==='Lingkungan'?'selected':''}>Lingkungan</option>
  232:               </select>
  233:             </div>
  234:             <div class="form-group">
  235:               <label class="form-label">Tags (Pisahkan dengan koma)</label>
  236:               <input type="text" id="form-tags" class="form-control" value="${CMS_UI.escapeHtml(data.tags)}">
  237:             </div>
  238:             <div class="form-group">
```
### File: Module_Berita.html, Line: 229
**Escaped:** No
```javascript
  219:             </div>
  220:             <div class="form-group">
  221:               <label class="form-label">Tanggal Publikasi</label>
  222:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  223:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  224:             </div>
  225:             <div class="form-group">
  226:               <label class="form-label">Kategori</label>
  227:               <select id="form-category" class="form-control">
  228:                 <option value="Kegiatan Kelurahan" ${data.category==='Kegiatan Kelurahan'?'selected':''}>Kegiatan Kelurahan</option>
> 229:                 <option value="UMKM" ${data.category==='UMKM'?'selected':''}>UMKM</option>
  230:                 <option value="Masyarakat" ${data.category==='Masyarakat'?'selected':''}>Masyarakat</option>
  231:                 <option value="Lingkungan" ${data.category==='Lingkungan'?'selected':''}>Lingkungan</option>
  232:               </select>
  233:             </div>
  234:             <div class="form-group">
  235:               <label class="form-label">Tags (Pisahkan dengan koma)</label>
  236:               <input type="text" id="form-tags" class="form-control" value="${CMS_UI.escapeHtml(data.tags)}">
  237:             </div>
  238:             <div class="form-group">
  239:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
```
### File: Module_Berita.html, Line: 230
**Escaped:** No
```javascript
  220:             <div class="form-group">
  221:               <label class="form-label">Tanggal Publikasi</label>
  222:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  223:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  224:             </div>
  225:             <div class="form-group">
  226:               <label class="form-label">Kategori</label>
  227:               <select id="form-category" class="form-control">
  228:                 <option value="Kegiatan Kelurahan" ${data.category==='Kegiatan Kelurahan'?'selected':''}>Kegiatan Kelurahan</option>
  229:                 <option value="UMKM" ${data.category==='UMKM'?'selected':''}>UMKM</option>
> 230:                 <option value="Masyarakat" ${data.category==='Masyarakat'?'selected':''}>Masyarakat</option>
  231:                 <option value="Lingkungan" ${data.category==='Lingkungan'?'selected':''}>Lingkungan</option>
  232:               </select>
  233:             </div>
  234:             <div class="form-group">
  235:               <label class="form-label">Tags (Pisahkan dengan koma)</label>
  236:               <input type="text" id="form-tags" class="form-control" value="${CMS_UI.escapeHtml(data.tags)}">
  237:             </div>
  238:             <div class="form-group">
  239:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  240:                 <img src="${CMS_UI.escapeHtml(CMS_UI.getDriveImageUrl(data.image))}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
```
### File: Module_Berita.html, Line: 231
**Escaped:** No
```javascript
  221:               <label class="form-label">Tanggal Publikasi</label>
  222:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  223:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  224:             </div>
  225:             <div class="form-group">
  226:               <label class="form-label">Kategori</label>
  227:               <select id="form-category" class="form-control">
  228:                 <option value="Kegiatan Kelurahan" ${data.category==='Kegiatan Kelurahan'?'selected':''}>Kegiatan Kelurahan</option>
  229:                 <option value="UMKM" ${data.category==='UMKM'?'selected':''}>UMKM</option>
  230:                 <option value="Masyarakat" ${data.category==='Masyarakat'?'selected':''}>Masyarakat</option>
> 231:                 <option value="Lingkungan" ${data.category==='Lingkungan'?'selected':''}>Lingkungan</option>
  232:               </select>
  233:             </div>
  234:             <div class="form-group">
  235:               <label class="form-label">Tags (Pisahkan dengan koma)</label>
  236:               <input type="text" id="form-tags" class="form-control" value="${CMS_UI.escapeHtml(data.tags)}">
  237:             </div>
  238:             <div class="form-group">
  239:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  240:                 <img src="${CMS_UI.escapeHtml(CMS_UI.getDriveImageUrl(data.image))}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  241:                 <div class="mt-2 text-sm text-surface-500 break-all">${CMS_UI.escapeHtml(data.image)}</div>
```
### File: Module_Berita.html, Line: 239
**Escaped:** No
```javascript
  229:                 <option value="UMKM" ${data.category==='UMKM'?'selected':''}>UMKM</option>
  230:                 <option value="Masyarakat" ${data.category==='Masyarakat'?'selected':''}>Masyarakat</option>
  231:                 <option value="Lingkungan" ${data.category==='Lingkungan'?'selected':''}>Lingkungan</option>
  232:               </select>
  233:             </div>
  234:             <div class="form-group">
  235:               <label class="form-label">Tags (Pisahkan dengan koma)</label>
  236:               <input type="text" id="form-tags" class="form-control" value="${CMS_UI.escapeHtml(data.tags)}">
  237:             </div>
  238:             <div class="form-group">
> 239:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  240:                 <img src="${CMS_UI.escapeHtml(CMS_UI.getDriveImageUrl(data.image))}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  241:                 <div class="mt-2 text-sm text-surface-500 break-all">${CMS_UI.escapeHtml(data.image)}</div>
  242:               </div>
  243:               <label class="form-label">URL Cover / Upload Baru</label>
  244:               <input type="text" id="form-image" class="form-control mb-2" value="${CMS_UI.escapeHtml(data.image)}" placeholder="https://...">
  245:               <input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
  246:               <input type="hidden" id="form-image_public_id" value="${CMS_UI.escapeHtml(data.imageMeta ? data.imageMeta.publicId : '')}">
  247:               <input type="hidden" id="form-image_provider" value="${CMS_UI.escapeHtml(data.imageMeta ? data.imageMeta.provider : '')}">
  248:             </div>
  249:           </div>
```
### File: Module_Berita.html, Line: 263
**Escaped:** No
```javascript
  253:     console.log('================================');
  254:     console.log('RAW IMAGE:');
  255:     console.log(data.image);
  256:     console.log('RAW IMAGE TYPE:');
  257:     console.log(typeof data.image);
  258:     console.log('ESCAPED IMAGE:');
  259:     console.log(CMS_UI.escapeHtml(data.image));
  260:     console.log('FINAL HTML:');
  261:     console.log(html);
  262:     const temp = document.createElement('div');
> 263:     temp.innerHTML = html;
  264:     console.log('TEMP FILE INPUT:');
  265:     console.log(temp.querySelector('#form-upload'));
  266:     console.log('TEMP TEXT INPUT:');
  267:     console.log(temp.querySelector('#form-image'));
  268:     console.log('================================');
  269:         const parser = document.createElement("div");`r`n    parser.innerHTML = html;`r`n    console.log(parser.innerHTML);`r`n    container.innerHTML = parser.innerHTML;
  270:     
  271:     // Bind Form Events
  272:     const checkUnsaved = () => {
  273:        window.CMS_FORM_DIRTY = true;
```
### File: Module_Berita.html, Line: 269
**Escaped:** No
```javascript
  259:     console.log(CMS_UI.escapeHtml(data.image));
  260:     console.log('FINAL HTML:');
  261:     console.log(html);
  262:     const temp = document.createElement('div');
  263:     temp.innerHTML = html;
  264:     console.log('TEMP FILE INPUT:');
  265:     console.log(temp.querySelector('#form-upload'));
  266:     console.log('TEMP TEXT INPUT:');
  267:     console.log(temp.querySelector('#form-image'));
  268:     console.log('================================');
> 269:         const parser = document.createElement("div");`r`n    parser.innerHTML = html;`r`n    console.log(parser.innerHTML);`r`n    container.innerHTML = parser.innerHTML;
  270:     
  271:     // Bind Form Events
  272:     const checkUnsaved = () => {
  273:        window.CMS_FORM_DIRTY = true;
  274:        if (!id) {
  275:          const draft = getFormData();
  276:          draft.image = sanitizeImageUrl(draft.image);
  277:          saveLocalDraft(draft);
  278:        }
  279:     };
```
### File: Module_Berita.html, Line: 312
**Escaped:** No
```javascript
  302:       const file = e.target.files[0];
  303:       if (!file) return;
  304:       CMS_UI.showLoader('Mengupload gambar...');
  305:       try {
  306:         const res = await CMS_API.uploadMedia(file, 'Berita');
  307:         document.getElementById('form-image').value = res.fileUrl;
  308:         document.getElementById('form-image_public_id').value = res.publicId;
  309:         document.getElementById('form-image_provider').value = res.provider;
  310:         
  311:         const previewEl = document.getElementById('image-preview');
> 312:         previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:100%; border-radius:4px;"><div class="mt-2 text-sm text-surface-500 break-all">${res.fileUrl}</div>`;
  313:         previewEl.classList.remove('hidden');
  314:         
  315:         CMS_UI.toast('Gambar berhasil diupload');
  316:         checkUnsaved();
  317:       } catch(err) {
  318:         CMS_UI.toast(err.message, 'error');
  319:       } finally {
  320:         CMS_UI.hideLoader();
  321:       }
  322:     };
```
### File: Module_Berita.html, Line: 382
**Escaped:** No
```javascript
  372:       loadData();
  373:     } catch(e) {
  374:       CMS_UI.toast(e.message, 'error');
  375:     } finally {
  376:       CMS_UI.hideLoader();
  377:     }
  378:   }
  379: 
  380:   function render(container, action) {
  381:     if (container) {
> 382:       container.innerHTML = `
  383:         <section>
  384:           <div class="page-heading">
  385:             <div>
  386:               <p class="eyebrow">CMS INTERNAL</p>
  387:               <h1>Kelola Berita</h1>
  388:               <p>Tambah, ubah, atau hapus artikel berita kelurahan.</p>
  389:             </div>
  390:           </div>
  391:           <div id="berita-content"></div><div style="font-size:24px; color:red; padding:20px; font-weight:bold; border:2px solid red;">BUKTI REFRESH BERHASIL</div><div style="font-size:24px; color:red; padding:20px; font-weight:bold; border:2px solid red;">SCRIPT ID: <?= ScriptApp.getScriptId() ?></div>
  392:         </section>
```
### File: Module_Dashboard.html, Line: 5
**Escaped:** No
```javascript
  1: <script>
  2: window.Module_Dashboard = {
  3:   render: async function(container) {
  4:     try {
> 5:     container.innerHTML = `
  6:       <section class="fade-in">
  7:         <div class="flex justify-between items-end mb-8 border-b border-surface-200 pb-6">
  8:           <div>
  9:             <p class="text-xs font-bold text-emerald-600 tracking-wider uppercase mb-1">Dashboard</p>
  10:             <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Ringkasan Sistem</h1>
  11:             <p class="text-sm text-surface-500 mt-2">Ikhtisar aktivitas dan data CMS Kelurahan Watang Soreang.</p>
  12:           </div>
  13:         </div>
  14:         
  15:         <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10" id="dash-summary">
```
### File: Module_Dashboard.html, Line: 59
**Escaped:** No
```javascript
  49:         window.CMS_API.getSystemHealth()
  50:       ]);
  51: 
  52:       const reportColor = stats.laporan > 0 ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-surface-500 bg-surface-50 border-surface-100';
  53:       
  54:       const summaryContainer = document.getElementById('dash-summary');
  55:       if (!summaryContainer) {
  56:         return;
  57:       }
  58:       
> 59:       summaryContainer.innerHTML = `
  60:         <div class="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
  61:           <div class="flex items-center gap-3 mb-2">
  62:             <span class="material-icons-outlined text-emerald-500">article</span>
  63:             <span class="text-xs md:text-sm font-bold text-surface-500 uppercase tracking-wider">Total Berita</span>
  64:           </div>
  65:           <strong class="block text-3xl md:text-4xl font-black text-surface-900 mb-4">${stats.berita}</strong>
  66:           <span class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
  67:             Publikasi
  68:           </span>
  69:         </div>
```
### File: Module_Dashboard.html, Line: 123
**Escaped:** No
```javascript
  113:             ${r.level}
  114:           </span>
  115:         </div>
  116:       `).join('');
  117:       
  118:       const dashboardHtml = document.getElementById('dash-summary').parentElement;
  119:       if (!document.getElementById('recent-activities')) {
  120:         const activitiesSection = document.createElement('section');
  121:         activitiesSection.id = 'recent-activities';
  122:         activitiesSection.className = 'mt-10 grid grid-cols-1 md:grid-cols-2 gap-8';
> 123:         activitiesSection.innerHTML = `
  124:           <div class="bg-white border border-surface-200 rounded-2xl shadow-sm overflow-hidden">
  125:             <div class="bg-surface-50 border-b border-surface-200 px-6 py-4 flex justify-between items-center">
  126:               <h3 class="font-bold text-surface-900">Log Aktivitas Terbaru</h3>
  127:             </div>
  128:             <div class="p-2">
  129:               ${reportsHtml || '<div class="p-4 text-center text-surface-500">Belum ada aktivitas</div>'}
  130:             </div>
  131:           </div>
  132:           <div class="bg-white border border-surface-200 rounded-2xl shadow-sm overflow-hidden">
  133:             <div class="bg-surface-50 border-b border-surface-200 px-6 py-4">
```
### File: Module_Edukasi.html, Line: 25
**Escaped:** No
```javascript
  15:     try {
  16:       CMS_UI.showLoader('Memuat edukasi...');
  17:       const res = await CMS_API.getRecords('Edukasi', { page: state.page, limit: state.limit, search: state.search, status: state.status, sortBy: 'published_at', sortOrder: 'desc' });
  18:       state.items = res.items || [];
  19:       state.total = res.total || 0;
  20:       renderList();
  21:     } catch(e) {
  22:       console.error(e);
  23:       CMS_UI.toast('Error loadData: ' + e.message, 'error');
  24:       const el = document.getElementById('edukasi-content');
> 25:       if (el) el.innerHTML = '<div style="color:red; padding:20px;">Error loadData: ' + e.message + '</div>';
  26:     } finally {
  27:       CMS_UI.hideLoader();
  28:     }
  29:   }
  30: 
  31:   function renderList() {
  32:     const container = document.getElementById('edukasi-content');
  33:     if (!container) {
  34:       CMS_UI.toast('Error: container #edukasi-content tidak ditemukan!', 'error');
  35:       return;
```
### File: Module_Edukasi.html, Line: 76
**Escaped:** No
```javascript
  66:               </thead>
  67:               <tbody class="divide-y divide-surface-100">
  68:       `;
  69:       
  70:       if (state.items.length === 0) {
  71:         html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada artikel edukasi yang dipublikasikan.</td></tr>`;
  72:       } else {
  73:         html += state.items.map(item => `
  74:           <tr class="hover:bg-surface-50/50 transition-colors group">
  75:             <td class="p-4">
> 76:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  77:             </td>
  78:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category || 'Lingkungan'}</td>
  79:             <td class="p-4">
  80:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:                 ${item.status}
  82:               </span>
  83:             </td>
  84:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  85:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  86:             </td>
```
### File: Module_Edukasi.html, Line: 78
**Escaped:** No
```javascript
  68:       `;
  69:       
  70:       if (state.items.length === 0) {
  71:         html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada artikel edukasi yang dipublikasikan.</td></tr>`;
  72:       } else {
  73:         html += state.items.map(item => `
  74:           <tr class="hover:bg-surface-50/50 transition-colors group">
  75:             <td class="p-4">
  76:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  77:             </td>
> 78:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category || 'Lingkungan'}</td>
  79:             <td class="p-4">
  80:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:                 ${item.status}
  82:               </span>
  83:             </td>
  84:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  85:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  86:             </td>
  87:             <td class="p-4 text-right">
  88:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
```
### File: Module_Edukasi.html, Line: 80
**Escaped:** No
```javascript
  70:       if (state.items.length === 0) {
  71:         html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada artikel edukasi yang dipublikasikan.</td></tr>`;
  72:       } else {
  73:         html += state.items.map(item => `
  74:           <tr class="hover:bg-surface-50/50 transition-colors group">
  75:             <td class="p-4">
  76:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  77:             </td>
  78:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category || 'Lingkungan'}</td>
  79:             <td class="p-4">
> 80:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:                 ${item.status}
  82:               </span>
  83:             </td>
  84:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  85:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  86:             </td>
  87:             <td class="p-4 text-right">
  88:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  89:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  90:                   <span class="material-icons-outlined text-[18px]">edit</span>
```
### File: Module_Edukasi.html, Line: 81
**Escaped:** No
```javascript
  71:         html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada artikel edukasi yang dipublikasikan.</td></tr>`;
  72:       } else {
  73:         html += state.items.map(item => `
  74:           <tr class="hover:bg-surface-50/50 transition-colors group">
  75:             <td class="p-4">
  76:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  77:             </td>
  78:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category || 'Lingkungan'}</td>
  79:             <td class="p-4">
  80:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
> 81:                 ${item.status}
  82:               </span>
  83:             </td>
  84:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  85:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  86:             </td>
  87:             <td class="p-4 text-right">
  88:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  89:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  90:                   <span class="material-icons-outlined text-[18px]">edit</span>
  91:                 </button>
```
### File: Module_Edukasi.html, Line: 85
**Escaped:** No
```javascript
  75:             <td class="p-4">
  76:               <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  77:             </td>
  78:             <td class="p-4 hidden md:table-cell text-sm text-surface-600">${item.category || 'Lingkungan'}</td>
  79:             <td class="p-4">
  80:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:                 ${item.status}
  82:               </span>
  83:             </td>
  84:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
> 85:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  86:             </td>
  87:             <td class="p-4 text-right">
  88:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  89:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  90:                   <span class="material-icons-outlined text-[18px]">edit</span>
  91:                 </button>
  92:                 <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" title="Hapus">
  93:                   <span class="material-icons-outlined text-[18px]">delete</span>
  94:                 </button>
  95:               </div>
```
### File: Module_Edukasi.html, Line: 89
**Escaped:** No
```javascript
  79:             <td class="p-4">
  80:               <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:                 ${item.status}
  82:               </span>
  83:             </td>
  84:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  85:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  86:             </td>
  87:             <td class="p-4 text-right">
  88:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
> 89:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  90:                   <span class="material-icons-outlined text-[18px]">edit</span>
  91:                 </button>
  92:                 <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" title="Hapus">
  93:                   <span class="material-icons-outlined text-[18px]">delete</span>
  94:                 </button>
  95:               </div>
  96:             </td>
  97:           </tr>
  98:         `).join('');
  99:       }
```
### File: Module_Edukasi.html, Line: 92
**Escaped:** No
```javascript
  82:               </span>
  83:             </td>
  84:             <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  85:               ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'}) : '-'}
  86:             </td>
  87:             <td class="p-4 text-right">
  88:               <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  89:                 <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  90:                   <span class="material-icons-outlined text-[18px]">edit</span>
  91:                 </button>
> 92:                 <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" title="Hapus">
  93:                   <span class="material-icons-outlined text-[18px]">delete</span>
  94:                 </button>
  95:               </div>
  96:             </td>
  97:           </tr>
  98:         `).join('');
  99:       }
  100:       
  101:       html += `
  102:               </tbody>
```
### File: Module_Edukasi.html, Line: 116
**Escaped:** No
```javascript
  106:           <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
  107:             <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
  108:             <div class="flex gap-2">
  109:               <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="edukasi-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  110:               <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="edukasi-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  111:             </div>
  112:           </div>
  113:         </div>
  114:       `;
  115:       
> 116:       container.innerHTML = html;
  117:     } catch(e) {
  118:       console.error(e);
  119:     }
  120:     
  121:     document.getElementById('edukasi-btn-create').onclick = () => showForm();
  122:     document.getElementById('edukasi-btn-search').onclick = () => {
  123:       state.search = document.getElementById('edukasi-search').value;
  124:       state.status = document.getElementById('edukasi-filter').value;
  125:       state.page = 1;
  126:       loadData();
```
### File: Module_Edukasi.html, Line: 160
**Escaped:** No
```javascript
  150:         window.CMS_FORM_DIRTY = false;
  151:         state.view = 'list';
  152:         render();
  153:         return;
  154:       } finally {
  155:         CMS_UI.hideLoader();
  156:       }
  157:     }
  158:     
  159:     const container = document.getElementById('edukasi-content');
> 160:     container.innerHTML = `
  161:       <div class="flex justify-between items-center mb-6">
  162:         <button class="btn" id="edukasi-btn-back">← Kembali</button>
  163:         <button class="btn btn-primary" id="edukasi-btn-save">Simpan Data</button>
  164:       </div>
  165:       
  166:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  167:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  168:           <div class="form-group">
  169:             <label class="form-label">Judul Artikel</label>
  170:             <input type="text" id="form-title" class="form-control" value="${data.title}">
```
### File: Module_Edukasi.html, Line: 170
**Escaped:** No
```javascript
  160:     container.innerHTML = `
  161:       <div class="flex justify-between items-center mb-6">
  162:         <button class="btn" id="edukasi-btn-back">← Kembali</button>
  163:         <button class="btn btn-primary" id="edukasi-btn-save">Simpan Data</button>
  164:       </div>
  165:       
  166:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  167:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  168:           <div class="form-group">
  169:             <label class="form-label">Judul Artikel</label>
> 170:             <input type="text" id="form-title" class="form-control" value="${data.title}">
  171:           </div>
  172:           <div class="form-group">
  173:             <label class="form-label">Isi Artikel</label>
  174:             <textarea id="form-content" class="form-control" style="min-height:250px">${data.content}</textarea>
  175:           </div>
  176:         </div>
  177:         
  178:         <div style="display:flex; flex-direction:column; gap:24px;">
  179:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  180:               <div class="form-group">
```
### File: Module_Edukasi.html, Line: 174
**Escaped:** No
```javascript
  164:       </div>
  165:       
  166:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  167:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  168:           <div class="form-group">
  169:             <label class="form-label">Judul Artikel</label>
  170:             <input type="text" id="form-title" class="form-control" value="${data.title}">
  171:           </div>
  172:           <div class="form-group">
  173:             <label class="form-label">Isi Artikel</label>
> 174:             <textarea id="form-content" class="form-control" style="min-height:250px">${data.content}</textarea>
  175:           </div>
  176:         </div>
  177:         
  178:         <div style="display:flex; flex-direction:column; gap:24px;">
  179:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  180:               <div class="form-group">
  181:                 <label class="form-label">Status</label>
  182:                 <select id="form-status" class="form-control">
  183:                   <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
  184:                   <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
```
### File: Module_Edukasi.html, Line: 183
**Escaped:** No
```javascript
  173:             <label class="form-label">Isi Artikel</label>
  174:             <textarea id="form-content" class="form-control" style="min-height:250px">${data.content}</textarea>
  175:           </div>
  176:         </div>
  177:         
  178:         <div style="display:flex; flex-direction:column; gap:24px;">
  179:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  180:               <div class="form-group">
  181:                 <label class="form-label">Status</label>
  182:                 <select id="form-status" class="form-control">
> 183:                   <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
  184:                   <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
  185:                 </select>
  186:               </div>
  187:               <div class="form-group">
  188:                 <label class="form-label">Tanggal Publikasi</label>
  189:                 <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  190:                 <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  191:               </div>
  192:             <div class="form-group">
  193:               <label class="form-label">Kategori</label>
```
### File: Module_Edukasi.html, Line: 184
**Escaped:** No
```javascript
  174:             <textarea id="form-content" class="form-control" style="min-height:250px">${data.content}</textarea>
  175:           </div>
  176:         </div>
  177:         
  178:         <div style="display:flex; flex-direction:column; gap:24px;">
  179:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  180:               <div class="form-group">
  181:                 <label class="form-label">Status</label>
  182:                 <select id="form-status" class="form-control">
  183:                   <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
> 184:                   <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
  185:                 </select>
  186:               </div>
  187:               <div class="form-group">
  188:                 <label class="form-label">Tanggal Publikasi</label>
  189:                 <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  190:                 <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  191:               </div>
  192:             <div class="form-group">
  193:               <label class="form-label">Kategori</label>
  194:               <select id="form-category" class="form-control">
```
### File: Module_Edukasi.html, Line: 189
**Escaped:** No
```javascript
  179:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  180:               <div class="form-group">
  181:                 <label class="form-label">Status</label>
  182:                 <select id="form-status" class="form-control">
  183:                   <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
  184:                   <option value="publish" ${data.status==='publish'?'selected':''}>Publish</option>
  185:                 </select>
  186:               </div>
  187:               <div class="form-group">
  188:                 <label class="form-label">Tanggal Publikasi</label>
> 189:                 <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  190:                 <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  191:               </div>
  192:             <div class="form-group">
  193:               <label class="form-label">Kategori</label>
  194:               <select id="form-category" class="form-control">
  195:                 <option value="Perubahan Iklim" ${data.category==='Perubahan Iklim'?'selected':''}>Perubahan Iklim</option>
  196:                 <option value="Sampah" ${data.category==='Sampah'?'selected':''}>Sampah</option>
  197:                 <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
  198:                 <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
  199:               </select>
```
### File: Module_Edukasi.html, Line: 195
**Escaped:** No
```javascript
  185:                 </select>
  186:               </div>
  187:               <div class="form-group">
  188:                 <label class="form-label">Tanggal Publikasi</label>
  189:                 <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  190:                 <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  191:               </div>
  192:             <div class="form-group">
  193:               <label class="form-label">Kategori</label>
  194:               <select id="form-category" class="form-control">
> 195:                 <option value="Perubahan Iklim" ${data.category==='Perubahan Iklim'?'selected':''}>Perubahan Iklim</option>
  196:                 <option value="Sampah" ${data.category==='Sampah'?'selected':''}>Sampah</option>
  197:                 <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
  198:                 <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
  199:               </select>
  200:             </div>
  201:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  202:                 <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  203:                 <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
  204:               </div>
  205:             <div class="form-group">
```
### File: Module_Edukasi.html, Line: 196
**Escaped:** No
```javascript
  186:               </div>
  187:               <div class="form-group">
  188:                 <label class="form-label">Tanggal Publikasi</label>
  189:                 <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  190:                 <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  191:               </div>
  192:             <div class="form-group">
  193:               <label class="form-label">Kategori</label>
  194:               <select id="form-category" class="form-control">
  195:                 <option value="Perubahan Iklim" ${data.category==='Perubahan Iklim'?'selected':''}>Perubahan Iklim</option>
> 196:                 <option value="Sampah" ${data.category==='Sampah'?'selected':''}>Sampah</option>
  197:                 <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
  198:                 <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
  199:               </select>
  200:             </div>
  201:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  202:                 <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  203:                 <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
  204:               </div>
  205:             <div class="form-group">
  206:               <label class="form-label">Tags (Koma separated)</label>
```
### File: Module_Edukasi.html, Line: 197
**Escaped:** No
```javascript
  187:               <div class="form-group">
  188:                 <label class="form-label">Tanggal Publikasi</label>
  189:                 <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  190:                 <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  191:               </div>
  192:             <div class="form-group">
  193:               <label class="form-label">Kategori</label>
  194:               <select id="form-category" class="form-control">
  195:                 <option value="Perubahan Iklim" ${data.category==='Perubahan Iklim'?'selected':''}>Perubahan Iklim</option>
  196:                 <option value="Sampah" ${data.category==='Sampah'?'selected':''}>Sampah</option>
> 197:                 <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
  198:                 <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
  199:               </select>
  200:             </div>
  201:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  202:                 <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  203:                 <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
  204:               </div>
  205:             <div class="form-group">
  206:               <label class="form-label">Tags (Koma separated)</label>
  207:               <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
```
### File: Module_Edukasi.html, Line: 198
**Escaped:** No
```javascript
  188:                 <label class="form-label">Tanggal Publikasi</label>
  189:                 <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  190:                 <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  191:               </div>
  192:             <div class="form-group">
  193:               <label class="form-label">Kategori</label>
  194:               <select id="form-category" class="form-control">
  195:                 <option value="Perubahan Iklim" ${data.category==='Perubahan Iklim'?'selected':''}>Perubahan Iklim</option>
  196:                 <option value="Sampah" ${data.category==='Sampah'?'selected':''}>Sampah</option>
  197:                 <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
> 198:                 <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
  199:               </select>
  200:             </div>
  201:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  202:                 <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  203:                 <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
  204:               </div>
  205:             <div class="form-group">
  206:               <label class="form-label">Tags (Koma separated)</label>
  207:               <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
  208:             </div>
```
### File: Module_Edukasi.html, Line: 201
**Escaped:** No
```javascript
  191:               </div>
  192:             <div class="form-group">
  193:               <label class="form-label">Kategori</label>
  194:               <select id="form-category" class="form-control">
  195:                 <option value="Perubahan Iklim" ${data.category==='Perubahan Iklim'?'selected':''}>Perubahan Iklim</option>
  196:                 <option value="Sampah" ${data.category==='Sampah'?'selected':''}>Sampah</option>
  197:                 <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
  198:                 <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
  199:               </select>
  200:             </div>
> 201:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  202:                 <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  203:                 <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
  204:               </div>
  205:             <div class="form-group">
  206:               <label class="form-label">Tags (Koma separated)</label>
  207:               <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
  208:             </div>
  209:             <div class="form-group">
  210:               <label class="form-label">Sumber Referensi (Opsional)</label>
  211:               <input type="text" id="form-source" class="form-control" value="${data.source || ''}">
```
### File: Module_Edukasi.html, Line: 203
**Escaped:** No
```javascript
  193:               <label class="form-label">Kategori</label>
  194:               <select id="form-category" class="form-control">
  195:                 <option value="Perubahan Iklim" ${data.category==='Perubahan Iklim'?'selected':''}>Perubahan Iklim</option>
  196:                 <option value="Sampah" ${data.category==='Sampah'?'selected':''}>Sampah</option>
  197:                 <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
  198:                 <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
  199:               </select>
  200:             </div>
  201:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  202:                 <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
> 203:                 <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
  204:               </div>
  205:             <div class="form-group">
  206:               <label class="form-label">Tags (Koma separated)</label>
  207:               <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
  208:             </div>
  209:             <div class="form-group">
  210:               <label class="form-label">Sumber Referensi (Opsional)</label>
  211:               <input type="text" id="form-source" class="form-control" value="${data.source || ''}">
  212:             </div>
  213:             <div class="form-group">
```
### File: Module_Edukasi.html, Line: 207
**Escaped:** No
```javascript
  197:                 <option value="Lingkungan Pesisir" ${data.category==='Lingkungan Pesisir'?'selected':''}>Lingkungan Pesisir</option>
  198:                 <option value="Air & Energi" ${data.category==='Air & Energi'?'selected':''}>Air & Energi</option>
  199:               </select>
  200:             </div>
  201:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  202:                 <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  203:                 <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
  204:               </div>
  205:             <div class="form-group">
  206:               <label class="form-label">Tags (Koma separated)</label>
> 207:               <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
  208:             </div>
  209:             <div class="form-group">
  210:               <label class="form-label">Sumber Referensi (Opsional)</label>
  211:               <input type="text" id="form-source" class="form-control" value="${data.source || ''}">
  212:             </div>
  213:             <div class="form-group">
  214:               <label class="form-label">URL Cover / Upload Baru</label>
  215:               <input type="text" id="form-image" class="form-control mb-2" value="${data.image || ''}" placeholder="https://...">
  216:               <input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
  217:               <input type="hidden" id="form-image_public_id" value="${data.imageMeta ? data.imageMeta.publicId : ''}">
```
### File: Module_Edukasi.html, Line: 211
**Escaped:** No
```javascript
  201:               <div id="image-preview" class="image-preview mb-4 ${data.image ? '' : 'hidden'}">
  202:                 <img src="${CMS_UI.getDriveImageUrl(data.image) || ''}" alt="Preview" style="max-width: 100%; border-radius: 4px;">
  203:                 <div class="mt-2 text-sm text-surface-500 break-all">${data.image || ''}</div>
  204:               </div>
  205:             <div class="form-group">
  206:               <label class="form-label">Tags (Koma separated)</label>
  207:               <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
  208:             </div>
  209:             <div class="form-group">
  210:               <label class="form-label">Sumber Referensi (Opsional)</label>
> 211:               <input type="text" id="form-source" class="form-control" value="${data.source || ''}">
  212:             </div>
  213:             <div class="form-group">
  214:               <label class="form-label">URL Cover / Upload Baru</label>
  215:               <input type="text" id="form-image" class="form-control mb-2" value="${data.image || ''}" placeholder="https://...">
  216:               <input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
  217:               <input type="hidden" id="form-image_public_id" value="${data.imageMeta ? data.imageMeta.publicId : ''}">
  218:               <input type="hidden" id="form-image_provider" value="${data.imageMeta ? data.imageMeta.provider : ''}">
  219:             </div>
  220:           </div>
  221:         </div>
```
### File: Module_Edukasi.html, Line: 215
**Escaped:** No
```javascript
  205:             <div class="form-group">
  206:               <label class="form-label">Tags (Koma separated)</label>
  207:               <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
  208:             </div>
  209:             <div class="form-group">
  210:               <label class="form-label">Sumber Referensi (Opsional)</label>
  211:               <input type="text" id="form-source" class="form-control" value="${data.source || ''}">
  212:             </div>
  213:             <div class="form-group">
  214:               <label class="form-label">URL Cover / Upload Baru</label>
> 215:               <input type="text" id="form-image" class="form-control mb-2" value="${data.image || ''}" placeholder="https://...">
  216:               <input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
  217:               <input type="hidden" id="form-image_public_id" value="${data.imageMeta ? data.imageMeta.publicId : ''}">
  218:               <input type="hidden" id="form-image_provider" value="${data.imageMeta ? data.imageMeta.provider : ''}">
  219:             </div>
  220:           </div>
  221:         </div>
  222:       </div>
  223:     `;
  224:     
  225:     const checkUnsaved = () => { window.CMS_FORM_DIRTY = true; };
```
### File: Module_Edukasi.html, Line: 217
**Escaped:** No
```javascript
  207:               <input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">
  208:             </div>
  209:             <div class="form-group">
  210:               <label class="form-label">Sumber Referensi (Opsional)</label>
  211:               <input type="text" id="form-source" class="form-control" value="${data.source || ''}">
  212:             </div>
  213:             <div class="form-group">
  214:               <label class="form-label">URL Cover / Upload Baru</label>
  215:               <input type="text" id="form-image" class="form-control mb-2" value="${data.image || ''}" placeholder="https://...">
  216:               <input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
> 217:               <input type="hidden" id="form-image_public_id" value="${data.imageMeta ? data.imageMeta.publicId : ''}">
  218:               <input type="hidden" id="form-image_provider" value="${data.imageMeta ? data.imageMeta.provider : ''}">
  219:             </div>
  220:           </div>
  221:         </div>
  222:       </div>
  223:     `;
  224:     
  225:     const checkUnsaved = () => { window.CMS_FORM_DIRTY = true; };
  226:     document.getElementById('form-title').addEventListener('input', checkUnsaved);
  227:     document.getElementById('form-content').addEventListener('input', checkUnsaved);
```
### File: Module_Edukasi.html, Line: 218
**Escaped:** No
```javascript
  208:             </div>
  209:             <div class="form-group">
  210:               <label class="form-label">Sumber Referensi (Opsional)</label>
  211:               <input type="text" id="form-source" class="form-control" value="${data.source || ''}">
  212:             </div>
  213:             <div class="form-group">
  214:               <label class="form-label">URL Cover / Upload Baru</label>
  215:               <input type="text" id="form-image" class="form-control mb-2" value="${data.image || ''}" placeholder="https://...">
  216:               <input type="file" id="form-upload" accept="image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
  217:               <input type="hidden" id="form-image_public_id" value="${data.imageMeta ? data.imageMeta.publicId : ''}">
> 218:               <input type="hidden" id="form-image_provider" value="${data.imageMeta ? data.imageMeta.provider : ''}">
  219:             </div>
  220:           </div>
  221:         </div>
  222:       </div>
  223:     `;
  224:     
  225:     const checkUnsaved = () => { window.CMS_FORM_DIRTY = true; };
  226:     document.getElementById('form-title').addEventListener('input', checkUnsaved);
  227:     document.getElementById('form-content').addEventListener('input', checkUnsaved);
  228:     document.getElementById('form-status').addEventListener('change', checkUnsaved);
```
### File: Module_Edukasi.html, Line: 288
**Escaped:** No
```javascript
  278:       const file = e.target.files[0];
  279:       if (!file) return;
  280:       CMS_UI.showLoader('Mengupload gambar...');
  281:       try {
  282:         const res = await CMS_API.uploadMedia(file, 'Edukasi');
  283:         document.getElementById('form-image').value = res.fileUrl;
  284:         document.getElementById('form-image_public_id').value = res.publicId;
  285:         document.getElementById('form-image_provider').value = res.provider;
  286:         
  287:         const previewEl = document.getElementById('image-preview');
> 288:         previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:100%; border-radius:4px;"><div class="mt-2 text-sm text-surface-500 break-all">${res.fileUrl}</div>`;
  289:         previewEl.classList.remove('hidden');
  290:         
  291:         CMS_UI.toast('Gambar berhasil diupload');
  292:         checkUnsaved();
  293:       } catch(err) {
  294:         CMS_UI.toast(err.message, 'error');
  295:       } finally {
  296:         CMS_UI.hideLoader();
  297:       }
  298:     };
```
### File: Module_Edukasi.html, Line: 319
**Escaped:** No
```javascript
  309:       loadData();
  310:     } catch(e) {
  311:       CMS_UI.toast(e.message, 'error');
  312:     } finally {
  313:       CMS_UI.hideLoader();
  314:     }
  315:   }
  316: 
  317:   function render(container) {
  318:     if (container) {
> 319:       container.innerHTML = `
  320:         <section>
  321:           <div class="page-heading">
  322:             <div>
  323:               <p class="eyebrow">CMS INTERNAL</p>
  324:               <h1>Kelola Edukasi</h1>
  325:               <p>Kelola artikel edukasi iklim dan lingkungan.</p>
  326:             </div>
  327:           </div>
  328:           <div id="edukasi-content"></div>
  329:         </section>
```
### File: Module_FAQ.html, Line: 63
**Escaped:** No
```javascript
  53:             </thead>
  54:             <tbody class="divide-y divide-surface-100">
  55:     `;
  56:     
  57:     if (state.items.length === 0) {
  58:       html += `<tr><td colspan="4" class="p-12 text-center text-surface-500">Belum ada tanya jawab (FAQ) yang ditambahkan.</td></tr>`;
  59:     } else {
  60:       html += state.items.map(item => `
  61:         <tr class="hover:bg-surface-50/50 group">
  62:           <td class="p-4">
> 63:             <p class="font-bold text-surface-900">${item.question}</p>
  64:           </td>
  65:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  66:           <td class="p-4">
  67:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  68:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  69:             </span>
  70:           </td>
  71:           <td class="p-4 text-right">
  72:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  73:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
```
### File: Module_FAQ.html, Line: 65
**Escaped:** No
```javascript
  55:     `;
  56:     
  57:     if (state.items.length === 0) {
  58:       html += `<tr><td colspan="4" class="p-12 text-center text-surface-500">Belum ada tanya jawab (FAQ) yang ditambahkan.</td></tr>`;
  59:     } else {
  60:       html += state.items.map(item => `
  61:         <tr class="hover:bg-surface-50/50 group">
  62:           <td class="p-4">
  63:             <p class="font-bold text-surface-900">${item.question}</p>
  64:           </td>
> 65:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  66:           <td class="p-4">
  67:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  68:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  69:             </span>
  70:           </td>
  71:           <td class="p-4 text-right">
  72:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  73:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  74:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.question)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  75:             </div>
```
### File: Module_FAQ.html, Line: 67
**Escaped:** No
```javascript
  57:     if (state.items.length === 0) {
  58:       html += `<tr><td colspan="4" class="p-12 text-center text-surface-500">Belum ada tanya jawab (FAQ) yang ditambahkan.</td></tr>`;
  59:     } else {
  60:       html += state.items.map(item => `
  61:         <tr class="hover:bg-surface-50/50 group">
  62:           <td class="p-4">
  63:             <p class="font-bold text-surface-900">${item.question}</p>
  64:           </td>
  65:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  66:           <td class="p-4">
> 67:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  68:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  69:             </span>
  70:           </td>
  71:           <td class="p-4 text-right">
  72:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  73:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  74:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.question)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  75:             </div>
  76:           </td>
  77:         </tr>
```
### File: Module_FAQ.html, Line: 68
**Escaped:** No
```javascript
  58:       html += `<tr><td colspan="4" class="p-12 text-center text-surface-500">Belum ada tanya jawab (FAQ) yang ditambahkan.</td></tr>`;
  59:     } else {
  60:       html += state.items.map(item => `
  61:         <tr class="hover:bg-surface-50/50 group">
  62:           <td class="p-4">
  63:             <p class="font-bold text-surface-900">${item.question}</p>
  64:           </td>
  65:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  66:           <td class="p-4">
  67:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
> 68:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  69:             </span>
  70:           </td>
  71:           <td class="p-4 text-right">
  72:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  73:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  74:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.question)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  75:             </div>
  76:           </td>
  77:         </tr>
  78:       `).join('');
```
### File: Module_FAQ.html, Line: 73
**Escaped:** No
```javascript
  63:             <p class="font-bold text-surface-900">${item.question}</p>
  64:           </td>
  65:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  66:           <td class="p-4">
  67:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  68:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  69:             </span>
  70:           </td>
  71:           <td class="p-4 text-right">
  72:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
> 73:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  74:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.question)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  75:             </div>
  76:           </td>
  77:         </tr>
  78:       `).join('');
  79:     }
  80:     
  81:     html += `
  82:             </tbody>
  83:           </table>
```
### File: Module_FAQ.html, Line: 74
**Escaped:** Yes
```javascript
  64:           </td>
  65:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  66:           <td class="p-4">
  67:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  68:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  69:             </span>
  70:           </td>
  71:           <td class="p-4 text-right">
  72:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  73:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
> 74:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.question)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  75:             </div>
  76:           </td>
  77:         </tr>
  78:       `).join('');
  79:     }
  80:     
  81:     html += `
  82:             </tbody>
  83:           </table>
  84:         </div>
```
### File: Module_FAQ.html, Line: 95
**Escaped:** No
```javascript
  85:         <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
  86:           <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
  87:           <div class="flex gap-2">
  88:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm" id="faq-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  89:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm" id="faq-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  90:           </div>
  91:         </div>
  92:       </div>
  93:     `;
  94:     
> 95:     container.innerHTML = html;
  96: 
  97:     document.getElementById('faq-btn-create').onclick = () => showForm();
  98:     document.getElementById('faq-btn-search').onclick = () => {
  99:       state.search = document.getElementById('faq-search').value;
  100:       state.page = 1;
  101:       loadData();
  102:     };
  103:     document.getElementById('faq-btn-prev').onclick = () => { state.page--; loadData(); };
  104:     document.getElementById('faq-btn-next').onclick = () => { state.page++; loadData(); };
  105:     container.querySelectorAll('.btn-edit').forEach(btn => btn.onclick = () => showForm(btn.dataset.id));
```
### File: Module_FAQ.html, Line: 130
**Escaped:** No
```javascript
  120:         window.CMS_FORM_DIRTY = false;
  121:         state.view = 'list';
  122:         render();
  123:         return;
  124:       } finally {
  125:         CMS_UI.hideLoader();
  126:       }
  127:     }
  128:     
  129:     const container = document.getElementById('faq-content');
> 130:     container.innerHTML = `
  131:       <div class="flex justify-between items-center mb-6">
  132:         <button class="btn" id="faq-btn-back">← Kembali</button>
  133:         <button class="btn btn-primary" id="faq-btn-save">Simpan FAQ</button>
  134:       </div>
  135:       
  136:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:24px;">
  137:         <div class="form-group">
  138:           <label class="form-label">Pertanyaan</label>
  139:           <input type="text" id="form-question" class="form-control" value="${data.question || ''}" placeholder="Tuliskan pertanyaan...">
  140:         </div>
```
### File: Module_FAQ.html, Line: 139
**Escaped:** No
```javascript
  129:     const container = document.getElementById('faq-content');
  130:     container.innerHTML = `
  131:       <div class="flex justify-between items-center mb-6">
  132:         <button class="btn" id="faq-btn-back">← Kembali</button>
  133:         <button class="btn btn-primary" id="faq-btn-save">Simpan FAQ</button>
  134:       </div>
  135:       
  136:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:24px;">
  137:         <div class="form-group">
  138:           <label class="form-label">Pertanyaan</label>
> 139:           <input type="text" id="form-question" class="form-control" value="${data.question || ''}" placeholder="Tuliskan pertanyaan...">
  140:         </div>
  141:         <div class="form-group">
  142:           <label class="form-label">Jawaban</label>
  143:           <textarea id="form-answer" class="form-control" rows="6" placeholder="Tuliskan jawaban dari pertanyaan di atas...">${data.answer || ''}</textarea>
  144:         </div>
  145:         <div class="grid grid-cols-2 gap-6">
  146:           <div class="form-group">
  147:             <label class="form-label">Kategori</label>
  148:             <input type="text" id="form-category" class="form-control" value="${data.category || 'Umum'}" placeholder="Cth: Layanan, Kependudukan, Umum">
  149:           </div>
```
### File: Module_FAQ.html, Line: 143
**Escaped:** No
```javascript
  133:         <button class="btn btn-primary" id="faq-btn-save">Simpan FAQ</button>
  134:       </div>
  135:       
  136:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:24px;">
  137:         <div class="form-group">
  138:           <label class="form-label">Pertanyaan</label>
  139:           <input type="text" id="form-question" class="form-control" value="${data.question || ''}" placeholder="Tuliskan pertanyaan...">
  140:         </div>
  141:         <div class="form-group">
  142:           <label class="form-label">Jawaban</label>
> 143:           <textarea id="form-answer" class="form-control" rows="6" placeholder="Tuliskan jawaban dari pertanyaan di atas...">${data.answer || ''}</textarea>
  144:         </div>
  145:         <div class="grid grid-cols-2 gap-6">
  146:           <div class="form-group">
  147:             <label class="form-label">Kategori</label>
  148:             <input type="text" id="form-category" class="form-control" value="${data.category || 'Umum'}" placeholder="Cth: Layanan, Kependudukan, Umum">
  149:           </div>
  150:           <div class="form-group">
  151:             <label class="form-label">Status</label>
  152:             <select id="form-status" class="form-control">
  153:               <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish</option>
```
### File: Module_FAQ.html, Line: 148
**Escaped:** No
```javascript
  138:           <label class="form-label">Pertanyaan</label>
  139:           <input type="text" id="form-question" class="form-control" value="${data.question || ''}" placeholder="Tuliskan pertanyaan...">
  140:         </div>
  141:         <div class="form-group">
  142:           <label class="form-label">Jawaban</label>
  143:           <textarea id="form-answer" class="form-control" rows="6" placeholder="Tuliskan jawaban dari pertanyaan di atas...">${data.answer || ''}</textarea>
  144:         </div>
  145:         <div class="grid grid-cols-2 gap-6">
  146:           <div class="form-group">
  147:             <label class="form-label">Kategori</label>
> 148:             <input type="text" id="form-category" class="form-control" value="${data.category || 'Umum'}" placeholder="Cth: Layanan, Kependudukan, Umum">
  149:           </div>
  150:           <div class="form-group">
  151:             <label class="form-label">Status</label>
  152:             <select id="form-status" class="form-control">
  153:               <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish</option>
  154:               <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft</option>
  155:             </select>
  156:           </div>
  157:         </div>
  158:       </div>
```
### File: Module_FAQ.html, Line: 153
**Escaped:** No
```javascript
  143:           <textarea id="form-answer" class="form-control" rows="6" placeholder="Tuliskan jawaban dari pertanyaan di atas...">${data.answer || ''}</textarea>
  144:         </div>
  145:         <div class="grid grid-cols-2 gap-6">
  146:           <div class="form-group">
  147:             <label class="form-label">Kategori</label>
  148:             <input type="text" id="form-category" class="form-control" value="${data.category || 'Umum'}" placeholder="Cth: Layanan, Kependudukan, Umum">
  149:           </div>
  150:           <div class="form-group">
  151:             <label class="form-label">Status</label>
  152:             <select id="form-status" class="form-control">
> 153:               <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish</option>
  154:               <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft</option>
  155:             </select>
  156:           </div>
  157:         </div>
  158:       </div>
  159:     `;
  160:     
  161:     document.getElementById('faq-btn-back').onclick = async () => {
  162:       if (window.CMS_FORM_DIRTY) {
  163:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
```
### File: Module_FAQ.html, Line: 154
**Escaped:** No
```javascript
  144:         </div>
  145:         <div class="grid grid-cols-2 gap-6">
  146:           <div class="form-group">
  147:             <label class="form-label">Kategori</label>
  148:             <input type="text" id="form-category" class="form-control" value="${data.category || 'Umum'}" placeholder="Cth: Layanan, Kependudukan, Umum">
  149:           </div>
  150:           <div class="form-group">
  151:             <label class="form-label">Status</label>
  152:             <select id="form-status" class="form-control">
  153:               <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish</option>
> 154:               <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft</option>
  155:             </select>
  156:           </div>
  157:         </div>
  158:       </div>
  159:     `;
  160:     
  161:     document.getElementById('faq-btn-back').onclick = async () => {
  162:       if (window.CMS_FORM_DIRTY) {
  163:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  164:         if (!confirmExit) return;
```
### File: Module_FAQ.html, Line: 219
**Escaped:** No
```javascript
  209:       loadData();
  210:     } catch(e) {
  211:       CMS_UI.toast(e.message, 'error');
  212:     } finally {
  213:       CMS_UI.hideLoader();
  214:     }
  215:   }
  216: 
  217:   function render(container) {
  218:     if (container) {
> 219:       container.innerHTML = `
  220:         <section>
  221:           <div class="page-heading">
  222:             <div>
  223:               <p class="eyebrow">CMS INTERNAL</p>
  224:               <h1>FAQ (Tanya Jawab)</h1>
  225:               <p>Kelola pertanyaan yang sering diajukan oleh masyarakat.</p>
  226:             </div>
  227:           </div>
  228:           <div id="faq-content"></div>
  229:         </section>
```
### File: Module_Kontak.html, Line: 77
**Escaped:** No
```javascript
  67:             <tbody class="divide-y divide-surface-100">
  68:     `;
  69:     
  70:     if (state.items.length === 0) {
  71:       html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada kontak yang ditambahkan.</td></tr>`;
  72:     } else {
  73:       html += state.items.map(item => `
  74:         <tr class="hover:bg-surface-50/50 group">
  75:           <td class="p-4">
  76:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
> 77:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">contact_phone</span>`}
  78:             </div>
  79:           </td>
  80:           <td class="p-4">
  81:             <p class="font-bold text-surface-900">${item.name}</p>
  82:             ${item.position ? `<p class="text-xs text-surface-500">${item.position}</p>` : ''}
  83:           </td>
  84:           <td class="p-4 text-sm text-surface-600 uppercase text-xs tracking-wider">${item.category}</td>
  85:           <td class="p-4">
  86:             <p class="text-sm font-medium text-surface-700">${item.phone || item.whatsapp || '-'}</p>
  87:           </td>
```
### File: Module_Kontak.html, Line: 81
**Escaped:** No
```javascript
  71:       html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada kontak yang ditambahkan.</td></tr>`;
  72:     } else {
  73:       html += state.items.map(item => `
  74:         <tr class="hover:bg-surface-50/50 group">
  75:           <td class="p-4">
  76:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
  77:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">contact_phone</span>`}
  78:             </div>
  79:           </td>
  80:           <td class="p-4">
> 81:             <p class="font-bold text-surface-900">${item.name}</p>
  82:             ${item.position ? `<p class="text-xs text-surface-500">${item.position}</p>` : ''}
  83:           </td>
  84:           <td class="p-4 text-sm text-surface-600 uppercase text-xs tracking-wider">${item.category}</td>
  85:           <td class="p-4">
  86:             <p class="text-sm font-medium text-surface-700">${item.phone || item.whatsapp || '-'}</p>
  87:           </td>
  88:           <td class="p-4 text-right">
  89:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  90:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  91:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
```
### File: Module_Kontak.html, Line: 82
**Escaped:** No
```javascript
  72:     } else {
  73:       html += state.items.map(item => `
  74:         <tr class="hover:bg-surface-50/50 group">
  75:           <td class="p-4">
  76:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
  77:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">contact_phone</span>`}
  78:             </div>
  79:           </td>
  80:           <td class="p-4">
  81:             <p class="font-bold text-surface-900">${item.name}</p>
> 82:             ${item.position ? `<p class="text-xs text-surface-500">${item.position}</p>` : ''}
  83:           </td>
  84:           <td class="p-4 text-sm text-surface-600 uppercase text-xs tracking-wider">${item.category}</td>
  85:           <td class="p-4">
  86:             <p class="text-sm font-medium text-surface-700">${item.phone || item.whatsapp || '-'}</p>
  87:           </td>
  88:           <td class="p-4 text-right">
  89:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  90:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  91:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  92:             </div>
```
### File: Module_Kontak.html, Line: 84
**Escaped:** No
```javascript
  74:         <tr class="hover:bg-surface-50/50 group">
  75:           <td class="p-4">
  76:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
  77:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">contact_phone</span>`}
  78:             </div>
  79:           </td>
  80:           <td class="p-4">
  81:             <p class="font-bold text-surface-900">${item.name}</p>
  82:             ${item.position ? `<p class="text-xs text-surface-500">${item.position}</p>` : ''}
  83:           </td>
> 84:           <td class="p-4 text-sm text-surface-600 uppercase text-xs tracking-wider">${item.category}</td>
  85:           <td class="p-4">
  86:             <p class="text-sm font-medium text-surface-700">${item.phone || item.whatsapp || '-'}</p>
  87:           </td>
  88:           <td class="p-4 text-right">
  89:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  90:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  91:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  92:             </div>
  93:           </td>
  94:         </tr>
```
### File: Module_Kontak.html, Line: 86
**Escaped:** No
```javascript
  76:             <div class="w-10 h-10 rounded-full bg-surface-200 overflow-hidden flex items-center justify-center">
  77:               ${item.photo ? `<img src="${CMS_UI.getDriveImageUrl(item.photo) || item.photo}" class="w-full h-full object-cover">` : `<span class="material-icons-outlined text-surface-400">contact_phone</span>`}
  78:             </div>
  79:           </td>
  80:           <td class="p-4">
  81:             <p class="font-bold text-surface-900">${item.name}</p>
  82:             ${item.position ? `<p class="text-xs text-surface-500">${item.position}</p>` : ''}
  83:           </td>
  84:           <td class="p-4 text-sm text-surface-600 uppercase text-xs tracking-wider">${item.category}</td>
  85:           <td class="p-4">
> 86:             <p class="text-sm font-medium text-surface-700">${item.phone || item.whatsapp || '-'}</p>
  87:           </td>
  88:           <td class="p-4 text-right">
  89:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  90:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  91:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  92:             </div>
  93:           </td>
  94:         </tr>
  95:       `).join('');
  96:     }
```
### File: Module_Kontak.html, Line: 90
**Escaped:** No
```javascript
  80:           <td class="p-4">
  81:             <p class="font-bold text-surface-900">${item.name}</p>
  82:             ${item.position ? `<p class="text-xs text-surface-500">${item.position}</p>` : ''}
  83:           </td>
  84:           <td class="p-4 text-sm text-surface-600 uppercase text-xs tracking-wider">${item.category}</td>
  85:           <td class="p-4">
  86:             <p class="text-sm font-medium text-surface-700">${item.phone || item.whatsapp || '-'}</p>
  87:           </td>
  88:           <td class="p-4 text-right">
  89:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
> 90:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  91:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  92:             </div>
  93:           </td>
  94:         </tr>
  95:       `).join('');
  96:     }
  97:     
  98:     html += `
  99:             </tbody>
  100:           </table>
```
### File: Module_Kontak.html, Line: 91
**Escaped:** Yes
```javascript
  81:             <p class="font-bold text-surface-900">${item.name}</p>
  82:             ${item.position ? `<p class="text-xs text-surface-500">${item.position}</p>` : ''}
  83:           </td>
  84:           <td class="p-4 text-sm text-surface-600 uppercase text-xs tracking-wider">${item.category}</td>
  85:           <td class="p-4">
  86:             <p class="text-sm font-medium text-surface-700">${item.phone || item.whatsapp || '-'}</p>
  87:           </td>
  88:           <td class="p-4 text-right">
  89:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  90:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
> 91:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.name)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  92:             </div>
  93:           </td>
  94:         </tr>
  95:       `).join('');
  96:     }
  97:     
  98:     html += `
  99:             </tbody>
  100:           </table>
  101:         </div>
```
### File: Module_Kontak.html, Line: 112
**Escaped:** No
```javascript
  102:         <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
  103:           <p class="text-sm text-surface-500 font-medium">Halaman ${state.page}</p>
  104:           <div class="flex gap-2">
  105:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm" id="kontak-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  106:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm" id="kontak-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  107:           </div>
  108:         </div>
  109:       </div>
  110:     `;
  111:     
> 112:     container.innerHTML = html;
  113:     
  114:     document.getElementById('kontak-btn-create').onclick = () => showForm();
  115:     document.getElementById('kontak-btn-search').onclick = () => {
  116:       state.search = document.getElementById('kontak-search').value;
  117:       state.category = document.getElementById('kontak-category').value;
  118:       state.page = 1;
  119:       loadData();
  120:     };
  121:     document.getElementById('kontak-btn-prev').onclick = () => { state.page--; loadData(); };
  122:     document.getElementById('kontak-btn-next').onclick = () => { state.page++; loadData(); };
```
### File: Module_Kontak.html, Line: 148
**Escaped:** No
```javascript
  138:         window.CMS_FORM_DIRTY = false;
  139:         state.view = 'list';
  140:         render();
  141:         return;
  142:       } finally {
  143:         CMS_UI.hideLoader();
  144:       }
  145:     }
  146:     
  147:     const container = document.getElementById('kontak-content');
> 148:     container.innerHTML = `
  149:       <div class="flex justify-between items-center mb-6">
  150:         <button class="btn" id="kontak-btn-back">← Kembali</button>
  151:         <button class="btn btn-primary" id="kontak-btn-save">Simpan Data</button>
  152:       </div>
  153:       
  154:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  155:         <div class="form-group" style="grid-column: 1 / -1;">
  156:           <label class="form-label">Kategori</label>
  157:           <select id="form-category" class="form-control">
  158:             <option value="office" ${data.category==='office'?'selected':''}>Kantor Kelurahan</option>
```
### File: Module_Kontak.html, Line: 158
**Escaped:** No
```javascript
  148:     container.innerHTML = `
  149:       <div class="flex justify-between items-center mb-6">
  150:         <button class="btn" id="kontak-btn-back">← Kembali</button>
  151:         <button class="btn btn-primary" id="kontak-btn-save">Simpan Data</button>
  152:       </div>
  153:       
  154:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  155:         <div class="form-group" style="grid-column: 1 / -1;">
  156:           <label class="form-label">Kategori</label>
  157:           <select id="form-category" class="form-control">
> 158:             <option value="office" ${data.category==='office'?'selected':''}>Kantor Kelurahan</option>
  159:             <option value="emergency" ${data.category==='emergency'?'selected':''}>Darurat</option>
  160:             <option value="rt" ${data.category==='rt'?'selected':''}>Ketua RT</option>
  161:             <option value="rw" ${data.category==='rw'?'selected':''}>Ketua RW</option>
  162:             <option value="government" ${data.category==='government'?'selected':''}>Instansi Pemerintah</option>
  163:             <option value="service" ${data.category==='service'?'selected':''}>Layanan Publik</option>
  164:           </select>
  165:         </div>
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
  168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
```
### File: Module_Kontak.html, Line: 159
**Escaped:** No
```javascript
  149:       <div class="flex justify-between items-center mb-6">
  150:         <button class="btn" id="kontak-btn-back">← Kembali</button>
  151:         <button class="btn btn-primary" id="kontak-btn-save">Simpan Data</button>
  152:       </div>
  153:       
  154:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  155:         <div class="form-group" style="grid-column: 1 / -1;">
  156:           <label class="form-label">Kategori</label>
  157:           <select id="form-category" class="form-control">
  158:             <option value="office" ${data.category==='office'?'selected':''}>Kantor Kelurahan</option>
> 159:             <option value="emergency" ${data.category==='emergency'?'selected':''}>Darurat</option>
  160:             <option value="rt" ${data.category==='rt'?'selected':''}>Ketua RT</option>
  161:             <option value="rw" ${data.category==='rw'?'selected':''}>Ketua RW</option>
  162:             <option value="government" ${data.category==='government'?'selected':''}>Instansi Pemerintah</option>
  163:             <option value="service" ${data.category==='service'?'selected':''}>Layanan Publik</option>
  164:           </select>
  165:         </div>
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
  168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  169:         </div>
```
### File: Module_Kontak.html, Line: 160
**Escaped:** No
```javascript
  150:         <button class="btn" id="kontak-btn-back">← Kembali</button>
  151:         <button class="btn btn-primary" id="kontak-btn-save">Simpan Data</button>
  152:       </div>
  153:       
  154:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  155:         <div class="form-group" style="grid-column: 1 / -1;">
  156:           <label class="form-label">Kategori</label>
  157:           <select id="form-category" class="form-control">
  158:             <option value="office" ${data.category==='office'?'selected':''}>Kantor Kelurahan</option>
  159:             <option value="emergency" ${data.category==='emergency'?'selected':''}>Darurat</option>
> 160:             <option value="rt" ${data.category==='rt'?'selected':''}>Ketua RT</option>
  161:             <option value="rw" ${data.category==='rw'?'selected':''}>Ketua RW</option>
  162:             <option value="government" ${data.category==='government'?'selected':''}>Instansi Pemerintah</option>
  163:             <option value="service" ${data.category==='service'?'selected':''}>Layanan Publik</option>
  164:           </select>
  165:         </div>
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
  168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  169:         </div>
  170:         <div class="form-group">
```
### File: Module_Kontak.html, Line: 161
**Escaped:** No
```javascript
  151:         <button class="btn btn-primary" id="kontak-btn-save">Simpan Data</button>
  152:       </div>
  153:       
  154:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  155:         <div class="form-group" style="grid-column: 1 / -1;">
  156:           <label class="form-label">Kategori</label>
  157:           <select id="form-category" class="form-control">
  158:             <option value="office" ${data.category==='office'?'selected':''}>Kantor Kelurahan</option>
  159:             <option value="emergency" ${data.category==='emergency'?'selected':''}>Darurat</option>
  160:             <option value="rt" ${data.category==='rt'?'selected':''}>Ketua RT</option>
> 161:             <option value="rw" ${data.category==='rw'?'selected':''}>Ketua RW</option>
  162:             <option value="government" ${data.category==='government'?'selected':''}>Instansi Pemerintah</option>
  163:             <option value="service" ${data.category==='service'?'selected':''}>Layanan Publik</option>
  164:           </select>
  165:         </div>
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
  168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Posisi / Jabatan</label>
```
### File: Module_Kontak.html, Line: 162
**Escaped:** No
```javascript
  152:       </div>
  153:       
  154:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  155:         <div class="form-group" style="grid-column: 1 / -1;">
  156:           <label class="form-label">Kategori</label>
  157:           <select id="form-category" class="form-control">
  158:             <option value="office" ${data.category==='office'?'selected':''}>Kantor Kelurahan</option>
  159:             <option value="emergency" ${data.category==='emergency'?'selected':''}>Darurat</option>
  160:             <option value="rt" ${data.category==='rt'?'selected':''}>Ketua RT</option>
  161:             <option value="rw" ${data.category==='rw'?'selected':''}>Ketua RW</option>
> 162:             <option value="government" ${data.category==='government'?'selected':''}>Instansi Pemerintah</option>
  163:             <option value="service" ${data.category==='service'?'selected':''}>Layanan Publik</option>
  164:           </select>
  165:         </div>
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
  168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Posisi / Jabatan</label>
  172:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
```
### File: Module_Kontak.html, Line: 163
**Escaped:** No
```javascript
  153:       
  154:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  155:         <div class="form-group" style="grid-column: 1 / -1;">
  156:           <label class="form-label">Kategori</label>
  157:           <select id="form-category" class="form-control">
  158:             <option value="office" ${data.category==='office'?'selected':''}>Kantor Kelurahan</option>
  159:             <option value="emergency" ${data.category==='emergency'?'selected':''}>Darurat</option>
  160:             <option value="rt" ${data.category==='rt'?'selected':''}>Ketua RT</option>
  161:             <option value="rw" ${data.category==='rw'?'selected':''}>Ketua RW</option>
  162:             <option value="government" ${data.category==='government'?'selected':''}>Instansi Pemerintah</option>
> 163:             <option value="service" ${data.category==='service'?'selected':''}>Layanan Publik</option>
  164:           </select>
  165:         </div>
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
  168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Posisi / Jabatan</label>
  172:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  173:         </div>
```
### File: Module_Kontak.html, Line: 168
**Escaped:** No
```javascript
  158:             <option value="office" ${data.category==='office'?'selected':''}>Kantor Kelurahan</option>
  159:             <option value="emergency" ${data.category==='emergency'?'selected':''}>Darurat</option>
  160:             <option value="rt" ${data.category==='rt'?'selected':''}>Ketua RT</option>
  161:             <option value="rw" ${data.category==='rw'?'selected':''}>Ketua RW</option>
  162:             <option value="government" ${data.category==='government'?'selected':''}>Instansi Pemerintah</option>
  163:             <option value="service" ${data.category==='service'?'selected':''}>Layanan Publik</option>
  164:           </select>
  165:         </div>
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
> 168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Posisi / Jabatan</label>
  172:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  173:         </div>
  174:         <div class="form-group">
  175:           <label class="form-label">No. Telepon</label>
  176:           <input type="text" id="form-phone" class="form-control" value="${data.phone || ''}">
  177:         </div>
  178:         <div class="form-group">
```
### File: Module_Kontak.html, Line: 172
**Escaped:** No
```javascript
  162:             <option value="government" ${data.category==='government'?'selected':''}>Instansi Pemerintah</option>
  163:             <option value="service" ${data.category==='service'?'selected':''}>Layanan Publik</option>
  164:           </select>
  165:         </div>
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
  168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Posisi / Jabatan</label>
> 172:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  173:         </div>
  174:         <div class="form-group">
  175:           <label class="form-label">No. Telepon</label>
  176:           <input type="text" id="form-phone" class="form-control" value="${data.phone || ''}">
  177:         </div>
  178:         <div class="form-group">
  179:           <label class="form-label">No. WhatsApp</label>
  180:           <input type="text" id="form-whatsapp" class="form-control" value="${data.whatsapp || ''}">
  181:         </div>
  182:         <div class="form-group">
```
### File: Module_Kontak.html, Line: 176
**Escaped:** No
```javascript
  166:         <div class="form-group">
  167:           <label class="form-label">Nama / Instansi</label>
  168:           <input type="text" id="form-name" class="form-control" value="${data.name || ''}">
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Posisi / Jabatan</label>
  172:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  173:         </div>
  174:         <div class="form-group">
  175:           <label class="form-label">No. Telepon</label>
> 176:           <input type="text" id="form-phone" class="form-control" value="${data.phone || ''}">
  177:         </div>
  178:         <div class="form-group">
  179:           <label class="form-label">No. WhatsApp</label>
  180:           <input type="text" id="form-whatsapp" class="form-control" value="${data.whatsapp || ''}">
  181:         </div>
  182:         <div class="form-group">
  183:           <label class="form-label">Email</label>
  184:           <input type="email" id="form-email" class="form-control" value="${data.email || ''}">
  185:         </div>
  186:         <div class="form-group">
```
### File: Module_Kontak.html, Line: 180
**Escaped:** No
```javascript
  170:         <div class="form-group">
  171:           <label class="form-label">Posisi / Jabatan</label>
  172:           <input type="text" id="form-position" class="form-control" value="${data.position || ''}">
  173:         </div>
  174:         <div class="form-group">
  175:           <label class="form-label">No. Telepon</label>
  176:           <input type="text" id="form-phone" class="form-control" value="${data.phone || ''}">
  177:         </div>
  178:         <div class="form-group">
  179:           <label class="form-label">No. WhatsApp</label>
> 180:           <input type="text" id="form-whatsapp" class="form-control" value="${data.whatsapp || ''}">
  181:         </div>
  182:         <div class="form-group">
  183:           <label class="form-label">Email</label>
  184:           <input type="email" id="form-email" class="form-control" value="${data.email || ''}">
  185:         </div>
  186:         <div class="form-group">
  187:           <label class="form-label">Urutan</label>
  188:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  189:         </div>
  190:         <div class="form-group" style="grid-column: 1 / -1;">
```
### File: Module_Kontak.html, Line: 184
**Escaped:** No
```javascript
  174:         <div class="form-group">
  175:           <label class="form-label">No. Telepon</label>
  176:           <input type="text" id="form-phone" class="form-control" value="${data.phone || ''}">
  177:         </div>
  178:         <div class="form-group">
  179:           <label class="form-label">No. WhatsApp</label>
  180:           <input type="text" id="form-whatsapp" class="form-control" value="${data.whatsapp || ''}">
  181:         </div>
  182:         <div class="form-group">
  183:           <label class="form-label">Email</label>
> 184:           <input type="email" id="form-email" class="form-control" value="${data.email || ''}">
  185:         </div>
  186:         <div class="form-group">
  187:           <label class="form-label">Urutan</label>
  188:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  189:         </div>
  190:         <div class="form-group" style="grid-column: 1 / -1;">
  191:           <label class="form-label">Alamat</label>
  192:           <textarea id="form-address" class="form-control" rows="2">${data.address || ''}</textarea>
  193:         </div>
  194:         <div class="form-group" style="grid-column: 1 / -1;">
```
### File: Module_Kontak.html, Line: 188
**Escaped:** No
```javascript
  178:         <div class="form-group">
  179:           <label class="form-label">No. WhatsApp</label>
  180:           <input type="text" id="form-whatsapp" class="form-control" value="${data.whatsapp || ''}">
  181:         </div>
  182:         <div class="form-group">
  183:           <label class="form-label">Email</label>
  184:           <input type="email" id="form-email" class="form-control" value="${data.email || ''}">
  185:         </div>
  186:         <div class="form-group">
  187:           <label class="form-label">Urutan</label>
> 188:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  189:         </div>
  190:         <div class="form-group" style="grid-column: 1 / -1;">
  191:           <label class="form-label">Alamat</label>
  192:           <textarea id="form-address" class="form-control" rows="2">${data.address || ''}</textarea>
  193:         </div>
  194:         <div class="form-group" style="grid-column: 1 / -1;">
  195:           <label class="form-label">Google Maps URL</label>
  196:           <input type="text" id="form-maps" class="form-control" value="${data.maps || ''}">
  197:         </div>
  198:         <div class="form-group" style="grid-column: 1 / -1;">
```
### File: Module_Kontak.html, Line: 192
**Escaped:** No
```javascript
  182:         <div class="form-group">
  183:           <label class="form-label">Email</label>
  184:           <input type="email" id="form-email" class="form-control" value="${data.email || ''}">
  185:         </div>
  186:         <div class="form-group">
  187:           <label class="form-label">Urutan</label>
  188:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  189:         </div>
  190:         <div class="form-group" style="grid-column: 1 / -1;">
  191:           <label class="form-label">Alamat</label>
> 192:           <textarea id="form-address" class="form-control" rows="2">${data.address || ''}</textarea>
  193:         </div>
  194:         <div class="form-group" style="grid-column: 1 / -1;">
  195:           <label class="form-label">Google Maps URL</label>
  196:           <input type="text" id="form-maps" class="form-control" value="${data.maps || ''}">
  197:         </div>
  198:         <div class="form-group" style="grid-column: 1 / -1;">
  199:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  200:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  201:           </div>
  202:           <label class="form-label">Foto / Ikon (Upload)</label>
```
### File: Module_Kontak.html, Line: 196
**Escaped:** No
```javascript
  186:         <div class="form-group">
  187:           <label class="form-label">Urutan</label>
  188:           <input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">
  189:         </div>
  190:         <div class="form-group" style="grid-column: 1 / -1;">
  191:           <label class="form-label">Alamat</label>
  192:           <textarea id="form-address" class="form-control" rows="2">${data.address || ''}</textarea>
  193:         </div>
  194:         <div class="form-group" style="grid-column: 1 / -1;">
  195:           <label class="form-label">Google Maps URL</label>
> 196:           <input type="text" id="form-maps" class="form-control" value="${data.maps || ''}">
  197:         </div>
  198:         <div class="form-group" style="grid-column: 1 / -1;">
  199:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  200:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  201:           </div>
  202:           <label class="form-label">Foto / Ikon (Upload)</label>
  203:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}" readonly placeholder="URL akan muncul setelah upload">
  204:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  205:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
  206:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
```
### File: Module_Kontak.html, Line: 199
**Escaped:** No
```javascript
  189:         </div>
  190:         <div class="form-group" style="grid-column: 1 / -1;">
  191:           <label class="form-label">Alamat</label>
  192:           <textarea id="form-address" class="form-control" rows="2">${data.address || ''}</textarea>
  193:         </div>
  194:         <div class="form-group" style="grid-column: 1 / -1;">
  195:           <label class="form-label">Google Maps URL</label>
  196:           <input type="text" id="form-maps" class="form-control" value="${data.maps || ''}">
  197:         </div>
  198:         <div class="form-group" style="grid-column: 1 / -1;">
> 199:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  200:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  201:           </div>
  202:           <label class="form-label">Foto / Ikon (Upload)</label>
  203:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}" readonly placeholder="URL akan muncul setelah upload">
  204:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  205:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
  206:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
  207:         </div>
  208:       </div>
  209:     `;
```
### File: Module_Kontak.html, Line: 203
**Escaped:** No
```javascript
  193:         </div>
  194:         <div class="form-group" style="grid-column: 1 / -1;">
  195:           <label class="form-label">Google Maps URL</label>
  196:           <input type="text" id="form-maps" class="form-control" value="${data.maps || ''}">
  197:         </div>
  198:         <div class="form-group" style="grid-column: 1 / -1;">
  199:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  200:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  201:           </div>
  202:           <label class="form-label">Foto / Ikon (Upload)</label>
> 203:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}" readonly placeholder="URL akan muncul setelah upload">
  204:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  205:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
  206:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
  207:         </div>
  208:       </div>
  209:     `;
  210:     
  211:     document.getElementById('kontak-btn-back').onclick = async () => {
  212:       if (window.CMS_FORM_DIRTY) {
  213:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
```
### File: Module_Kontak.html, Line: 205
**Escaped:** No
```javascript
  195:           <label class="form-label">Google Maps URL</label>
  196:           <input type="text" id="form-maps" class="form-control" value="${data.maps || ''}">
  197:         </div>
  198:         <div class="form-group" style="grid-column: 1 / -1;">
  199:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  200:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  201:           </div>
  202:           <label class="form-label">Foto / Ikon (Upload)</label>
  203:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}" readonly placeholder="URL akan muncul setelah upload">
  204:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
> 205:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
  206:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
  207:         </div>
  208:       </div>
  209:     `;
  210:     
  211:     document.getElementById('kontak-btn-back').onclick = async () => {
  212:       if (window.CMS_FORM_DIRTY) {
  213:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  214:         if (!confirmExit) return;
  215:       }
```
### File: Module_Kontak.html, Line: 206
**Escaped:** No
```javascript
  196:           <input type="text" id="form-maps" class="form-control" value="${data.maps || ''}">
  197:         </div>
  198:         <div class="form-group" style="grid-column: 1 / -1;">
  199:           <div id="image-preview" class="image-preview mb-4 ${data.photo ? '' : 'hidden'}">
  200:             <img src="${CMS_UI.getDriveImageUrl(data.photo) || data.photo || ''}" style="max-width:200px; border-radius:8px;">
  201:           </div>
  202:           <label class="form-label">Foto / Ikon (Upload)</label>
  203:           <input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}" readonly placeholder="URL akan muncul setelah upload">
  204:           <input type="file" id="form-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  205:           <input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">
> 206:           <input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">
  207:         </div>
  208:       </div>
  209:     `;
  210:     
  211:     document.getElementById('kontak-btn-back').onclick = async () => {
  212:       if (window.CMS_FORM_DIRTY) {
  213:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  214:         if (!confirmExit) return;
  215:       }
  216:       window.CMS_FORM_DIRTY = false;
```
### File: Module_Kontak.html, Line: 232
**Escaped:** No
```javascript
  222:       const file = e.target.files[0];
  223:       if (!file) return;
  224:       CMS_UI.showLoader('Mengupload foto...');
  225:       try {
  226:         const res = await CMS_API.uploadMedia(file, 'Kontak');
  227:         document.getElementById('form-photo').value = res.fileUrl;
  228:         document.getElementById('form-photo_public_id').value = res.publicId;
  229:         document.getElementById('form-photo_provider').value = res.provider;
  230:         
  231:         const previewEl = document.getElementById('image-preview');
> 232:         previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:200px; border-radius:8px;">`;
  233:         previewEl.classList.remove('hidden');
  234:         
  235:         CMS_UI.toast('Foto berhasil diupload');
  236:       } catch(err) {
  237:         CMS_UI.toast(err.message, 'error');
  238:       } finally {
  239:         CMS_UI.hideLoader();
  240:       }
  241:     };
  242:   }
```
### File: Module_Kontak.html, Line: 299
**Escaped:** No
```javascript
  289:       loadData();
  290:     } catch(e) {
  291:       CMS_UI.toast(e.message, 'error');
  292:     } finally {
  293:       CMS_UI.hideLoader();
  294:     }
  295:   }
  296: 
  297:   function render(container) {
  298:     if (container) {
> 299:       container.innerHTML = `
  300:         <section>
  301:           <div class="page-heading">
  302:             <div>
  303:               <p class="eyebrow">CMS INTERNAL</p>
  304:               <h1>Direktori Kontak</h1>
  305:               <p>Kelola daftar kontak penting, RT/RW, dan layanan darurat.</p>
  306:             </div>
  307:           </div>
  308:           <div id="kontak-content"></div>
  309:         </section>
```
### File: Module_Layanan.html, Line: 66
**Escaped:** No
```javascript
  56:             <tbody class="divide-y divide-surface-100">
  57:     `;
  58:     
  59:     if (state.items.length === 0) {
  60:       html += `<tr><td colspan="6" class="p-12 text-center text-surface-500">Belum ada layanan publik yang ditambahkan.</td></tr>`;
  61:     } else {
  62:       html += state.items.map(item => `
  63:         <tr class="hover:bg-surface-50/50 group">
  64:           <td class="p-4">
  65:             <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
> 66:               <i data-lucide="${item.icon || 'file-text'}"></i>
  67:             </div>
  68:           </td>
  69:           <td class="p-4">
  70:             <p class="font-bold text-surface-900">${item.title}</p>
  71:             <p class="text-xs text-surface-500">/${item.slug}</p>
  72:           </td>
  73:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.featured === 'TRUE' || item.featured === true ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-700'}">
  76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
```
### File: Module_Layanan.html, Line: 70
**Escaped:** No
```javascript
  60:       html += `<tr><td colspan="6" class="p-12 text-center text-surface-500">Belum ada layanan publik yang ditambahkan.</td></tr>`;
  61:     } else {
  62:       html += state.items.map(item => `
  63:         <tr class="hover:bg-surface-50/50 group">
  64:           <td class="p-4">
  65:             <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
  66:               <i data-lucide="${item.icon || 'file-text'}"></i>
  67:             </div>
  68:           </td>
  69:           <td class="p-4">
> 70:             <p class="font-bold text-surface-900">${item.title}</p>
  71:             <p class="text-xs text-surface-500">/${item.slug}</p>
  72:           </td>
  73:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.featured === 'TRUE' || item.featured === true ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-700'}">
  76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
  80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
```
### File: Module_Layanan.html, Line: 71
**Escaped:** No
```javascript
  61:     } else {
  62:       html += state.items.map(item => `
  63:         <tr class="hover:bg-surface-50/50 group">
  64:           <td class="p-4">
  65:             <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
  66:               <i data-lucide="${item.icon || 'file-text'}"></i>
  67:             </div>
  68:           </td>
  69:           <td class="p-4">
  70:             <p class="font-bold text-surface-900">${item.title}</p>
> 71:             <p class="text-xs text-surface-500">/${item.slug}</p>
  72:           </td>
  73:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.featured === 'TRUE' || item.featured === true ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-700'}">
  76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
  80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
```
### File: Module_Layanan.html, Line: 73
**Escaped:** No
```javascript
  63:         <tr class="hover:bg-surface-50/50 group">
  64:           <td class="p-4">
  65:             <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
  66:               <i data-lucide="${item.icon || 'file-text'}"></i>
  67:             </div>
  68:           </td>
  69:           <td class="p-4">
  70:             <p class="font-bold text-surface-900">${item.title}</p>
  71:             <p class="text-xs text-surface-500">/${item.slug}</p>
  72:           </td>
> 73:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.featured === 'TRUE' || item.featured === true ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-700'}">
  76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
  80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  82:             </span>
  83:           </td>
```
### File: Module_Layanan.html, Line: 75
**Escaped:** No
```javascript
  65:             <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
  66:               <i data-lucide="${item.icon || 'file-text'}"></i>
  67:             </div>
  68:           </td>
  69:           <td class="p-4">
  70:             <p class="font-bold text-surface-900">${item.title}</p>
  71:             <p class="text-xs text-surface-500">/${item.slug}</p>
  72:           </td>
  73:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  74:           <td class="p-4">
> 75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.featured === 'TRUE' || item.featured === true ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-700'}">
  76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
  80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  82:             </span>
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
```
### File: Module_Layanan.html, Line: 76
**Escaped:** No
```javascript
  66:               <i data-lucide="${item.icon || 'file-text'}"></i>
  67:             </div>
  68:           </td>
  69:           <td class="p-4">
  70:             <p class="font-bold text-surface-900">${item.title}</p>
  71:             <p class="text-xs text-surface-500">/${item.slug}</p>
  72:           </td>
  73:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.featured === 'TRUE' || item.featured === true ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-700'}">
> 76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
  80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  82:             </span>
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
```
### File: Module_Layanan.html, Line: 80
**Escaped:** No
```javascript
  70:             <p class="font-bold text-surface-900">${item.title}</p>
  71:             <p class="text-xs text-surface-500">/${item.slug}</p>
  72:           </td>
  73:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.featured === 'TRUE' || item.featured === true ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-700'}">
  76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
> 80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  82:             </span>
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  87:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.title)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  88:             </div>
  89:           </td>
  90:         </tr>
```
### File: Module_Layanan.html, Line: 81
**Escaped:** No
```javascript
  71:             <p class="text-xs text-surface-500">/${item.slug}</p>
  72:           </td>
  73:           <td class="p-4 text-sm text-surface-600">${item.category || '-'}</td>
  74:           <td class="p-4">
  75:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.featured === 'TRUE' || item.featured === true ? 'bg-amber-100 text-amber-700' : 'bg-surface-100 text-surface-700'}">
  76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
  80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
> 81:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  82:             </span>
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  87:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.title)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  88:             </div>
  89:           </td>
  90:         </tr>
  91:       `).join('');
```
### File: Module_Layanan.html, Line: 86
**Escaped:** No
```javascript
  76:               ${item.featured === 'TRUE' || item.featured === true ? 'Featured' : 'Regular'}
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
  80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  82:             </span>
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
> 86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
  87:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.title)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  88:             </div>
  89:           </td>
  90:         </tr>
  91:       `).join('');
  92:     }
  93:     
  94:     html += `
  95:             </tbody>
  96:           </table>
```
### File: Module_Layanan.html, Line: 87
**Escaped:** Yes
```javascript
  77:             </span>
  78:           </td>
  79:           <td class="p-4">
  80:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  81:               ${item.status === 'publish' ? 'Publish' : 'Draft'}
  82:             </span>
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}"><span class="material-icons-outlined text-[18px]">edit</span></button>
> 87:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${CMS_UI.escapeHtml(item.title)}"><span class="material-icons-outlined text-[18px]">delete</span></button>
  88:             </div>
  89:           </td>
  90:         </tr>
  91:       `).join('');
  92:     }
  93:     
  94:     html += `
  95:             </tbody>
  96:           </table>
  97:         </div>
```
### File: Module_Layanan.html, Line: 108
**Escaped:** No
```javascript
  98:         <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
  99:           <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
  100:           <div class="flex gap-2">
  101:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm" id="layanan-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  102:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm" id="layanan-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  103:           </div>
  104:         </div>
  105:       </div>
  106:     `;
  107:     
> 108:     container.innerHTML = html;
  109:     
  110:     if (window.lucide) {
  111:       window.lucide.createIcons();
  112:     }
  113: 
  114:     document.getElementById('layanan-btn-create').onclick = () => showForm();
  115:     document.getElementById('layanan-btn-search').onclick = () => {
  116:       state.search = document.getElementById('layanan-search').value;
  117:       state.page = 1;
  118:       loadData();
```
### File: Module_Layanan.html, Line: 150
**Escaped:** No
```javascript
  140:         window.CMS_FORM_DIRTY = false;
  141:         state.view = 'list';
  142:         render();
  143:         return;
  144:       } finally {
  145:         CMS_UI.hideLoader();
  146:       }
  147:     }
  148:     
  149:     const container = document.getElementById('layanan-content');
> 150:     container.innerHTML = `
  151:       <div class="flex justify-between items-center mb-6">
  152:         <button class="btn" id="layanan-btn-back">← Kembali</button>
  153:         <button class="btn btn-primary" id="layanan-btn-save">Simpan Layanan</button>
  154:       </div>
  155:       
  156:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  157:         <div class="form-group" style="grid-column: 1 / -1;">
  158:           <label class="form-label">Nama Layanan</label>
  159:           <input type="text" id="form-title" class="form-control" value="${data.title || ''}" placeholder="Cth: Pembuatan Surat Keterangan Domisili">
  160:         </div>
```
### File: Module_Layanan.html, Line: 159
**Escaped:** No
```javascript
  149:     const container = document.getElementById('layanan-content');
  150:     container.innerHTML = `
  151:       <div class="flex justify-between items-center mb-6">
  152:         <button class="btn" id="layanan-btn-back">← Kembali</button>
  153:         <button class="btn btn-primary" id="layanan-btn-save">Simpan Layanan</button>
  154:       </div>
  155:       
  156:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  157:         <div class="form-group" style="grid-column: 1 / -1;">
  158:           <label class="form-label">Nama Layanan</label>
> 159:           <input type="text" id="form-title" class="form-control" value="${data.title || ''}" placeholder="Cth: Pembuatan Surat Keterangan Domisili">
  160:         </div>
  161:         <div class="form-group">
  162:           <label class="form-label">Kategori</label>
  163:           <select id="form-category" class="form-control">
  164:             <option value="Administrasi Kependudukan" ${data.category==='Administrasi Kependudukan'?'selected':''}>Administrasi Kependudukan</option>
  165:             <option value="Perizinan" ${data.category==='Perizinan'?'selected':''}>Perizinan</option>
  166:             <option value="Surat Keterangan" ${data.category==='Surat Keterangan'?'selected':''}>Surat Keterangan</option>
  167:             <option value="Lainnya" ${data.category==='Lainnya'?'selected':''}>Lainnya</option>
  168:           </select>
  169:         </div>
```
### File: Module_Layanan.html, Line: 164
**Escaped:** No
```javascript
  154:       </div>
  155:       
  156:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  157:         <div class="form-group" style="grid-column: 1 / -1;">
  158:           <label class="form-label">Nama Layanan</label>
  159:           <input type="text" id="form-title" class="form-control" value="${data.title || ''}" placeholder="Cth: Pembuatan Surat Keterangan Domisili">
  160:         </div>
  161:         <div class="form-group">
  162:           <label class="form-label">Kategori</label>
  163:           <select id="form-category" class="form-control">
> 164:             <option value="Administrasi Kependudukan" ${data.category==='Administrasi Kependudukan'?'selected':''}>Administrasi Kependudukan</option>
  165:             <option value="Perizinan" ${data.category==='Perizinan'?'selected':''}>Perizinan</option>
  166:             <option value="Surat Keterangan" ${data.category==='Surat Keterangan'?'selected':''}>Surat Keterangan</option>
  167:             <option value="Lainnya" ${data.category==='Lainnya'?'selected':''}>Lainnya</option>
  168:           </select>
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Ikon (Lucide icon name)</label>
  172:           <input type="text" id="form-icon" class="form-control" value="${data.icon || 'file-text'}" placeholder="Cth: file-text, users, map-pin">
  173:         </div>
  174:         <div class="form-group" style="grid-column: 1 / -1;">
```
### File: Module_Layanan.html, Line: 165
**Escaped:** No
```javascript
  155:       
  156:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  157:         <div class="form-group" style="grid-column: 1 / -1;">
  158:           <label class="form-label">Nama Layanan</label>
  159:           <input type="text" id="form-title" class="form-control" value="${data.title || ''}" placeholder="Cth: Pembuatan Surat Keterangan Domisili">
  160:         </div>
  161:         <div class="form-group">
  162:           <label class="form-label">Kategori</label>
  163:           <select id="form-category" class="form-control">
  164:             <option value="Administrasi Kependudukan" ${data.category==='Administrasi Kependudukan'?'selected':''}>Administrasi Kependudukan</option>
> 165:             <option value="Perizinan" ${data.category==='Perizinan'?'selected':''}>Perizinan</option>
  166:             <option value="Surat Keterangan" ${data.category==='Surat Keterangan'?'selected':''}>Surat Keterangan</option>
  167:             <option value="Lainnya" ${data.category==='Lainnya'?'selected':''}>Lainnya</option>
  168:           </select>
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Ikon (Lucide icon name)</label>
  172:           <input type="text" id="form-icon" class="form-control" value="${data.icon || 'file-text'}" placeholder="Cth: file-text, users, map-pin">
  173:         </div>
  174:         <div class="form-group" style="grid-column: 1 / -1;">
  175:           <label class="form-label">Deskripsi Singkat</label>
```
### File: Module_Layanan.html, Line: 166
**Escaped:** No
```javascript
  156:       <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; max-width:800px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
  157:         <div class="form-group" style="grid-column: 1 / -1;">
  158:           <label class="form-label">Nama Layanan</label>
  159:           <input type="text" id="form-title" class="form-control" value="${data.title || ''}" placeholder="Cth: Pembuatan Surat Keterangan Domisili">
  160:         </div>
  161:         <div class="form-group">
  162:           <label class="form-label">Kategori</label>
  163:           <select id="form-category" class="form-control">
  164:             <option value="Administrasi Kependudukan" ${data.category==='Administrasi Kependudukan'?'selected':''}>Administrasi Kependudukan</option>
  165:             <option value="Perizinan" ${data.category==='Perizinan'?'selected':''}>Perizinan</option>
> 166:             <option value="Surat Keterangan" ${data.category==='Surat Keterangan'?'selected':''}>Surat Keterangan</option>
  167:             <option value="Lainnya" ${data.category==='Lainnya'?'selected':''}>Lainnya</option>
  168:           </select>
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Ikon (Lucide icon name)</label>
  172:           <input type="text" id="form-icon" class="form-control" value="${data.icon || 'file-text'}" placeholder="Cth: file-text, users, map-pin">
  173:         </div>
  174:         <div class="form-group" style="grid-column: 1 / -1;">
  175:           <label class="form-label">Deskripsi Singkat</label>
  176:           <textarea id="form-description" class="form-control" rows="3">${data.description || ''}</textarea>
```
### File: Module_Layanan.html, Line: 167
**Escaped:** No
```javascript
  157:         <div class="form-group" style="grid-column: 1 / -1;">
  158:           <label class="form-label">Nama Layanan</label>
  159:           <input type="text" id="form-title" class="form-control" value="${data.title || ''}" placeholder="Cth: Pembuatan Surat Keterangan Domisili">
  160:         </div>
  161:         <div class="form-group">
  162:           <label class="form-label">Kategori</label>
  163:           <select id="form-category" class="form-control">
  164:             <option value="Administrasi Kependudukan" ${data.category==='Administrasi Kependudukan'?'selected':''}>Administrasi Kependudukan</option>
  165:             <option value="Perizinan" ${data.category==='Perizinan'?'selected':''}>Perizinan</option>
  166:             <option value="Surat Keterangan" ${data.category==='Surat Keterangan'?'selected':''}>Surat Keterangan</option>
> 167:             <option value="Lainnya" ${data.category==='Lainnya'?'selected':''}>Lainnya</option>
  168:           </select>
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Ikon (Lucide icon name)</label>
  172:           <input type="text" id="form-icon" class="form-control" value="${data.icon || 'file-text'}" placeholder="Cth: file-text, users, map-pin">
  173:         </div>
  174:         <div class="form-group" style="grid-column: 1 / -1;">
  175:           <label class="form-label">Deskripsi Singkat</label>
  176:           <textarea id="form-description" class="form-control" rows="3">${data.description || ''}</textarea>
  177:         </div>
```
### File: Module_Layanan.html, Line: 172
**Escaped:** No
```javascript
  162:           <label class="form-label">Kategori</label>
  163:           <select id="form-category" class="form-control">
  164:             <option value="Administrasi Kependudukan" ${data.category==='Administrasi Kependudukan'?'selected':''}>Administrasi Kependudukan</option>
  165:             <option value="Perizinan" ${data.category==='Perizinan'?'selected':''}>Perizinan</option>
  166:             <option value="Surat Keterangan" ${data.category==='Surat Keterangan'?'selected':''}>Surat Keterangan</option>
  167:             <option value="Lainnya" ${data.category==='Lainnya'?'selected':''}>Lainnya</option>
  168:           </select>
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Ikon (Lucide icon name)</label>
> 172:           <input type="text" id="form-icon" class="form-control" value="${data.icon || 'file-text'}" placeholder="Cth: file-text, users, map-pin">
  173:         </div>
  174:         <div class="form-group" style="grid-column: 1 / -1;">
  175:           <label class="form-label">Deskripsi Singkat</label>
  176:           <textarea id="form-description" class="form-control" rows="3">${data.description || ''}</textarea>
  177:         </div>
  178:         <div class="form-group" style="grid-column: 1 / -1;">
  179:           <label class="form-label">Persyaratan (Satu per baris)</label>
  180:           <textarea id="form-requirements" class="form-control" rows="6" placeholder="Cth:\nFotokopi KTP\nFotokopi KK\nSurat Pengantar RT/RW">${(data.requirements || '').replace(/\\n/g, '\n')}</textarea>
  181:         </div>
  182:         <div class="form-group">
```
### File: Module_Layanan.html, Line: 176
**Escaped:** No
```javascript
  166:             <option value="Surat Keterangan" ${data.category==='Surat Keterangan'?'selected':''}>Surat Keterangan</option>
  167:             <option value="Lainnya" ${data.category==='Lainnya'?'selected':''}>Lainnya</option>
  168:           </select>
  169:         </div>
  170:         <div class="form-group">
  171:           <label class="form-label">Ikon (Lucide icon name)</label>
  172:           <input type="text" id="form-icon" class="form-control" value="${data.icon || 'file-text'}" placeholder="Cth: file-text, users, map-pin">
  173:         </div>
  174:         <div class="form-group" style="grid-column: 1 / -1;">
  175:           <label class="form-label">Deskripsi Singkat</label>
> 176:           <textarea id="form-description" class="form-control" rows="3">${data.description || ''}</textarea>
  177:         </div>
  178:         <div class="form-group" style="grid-column: 1 / -1;">
  179:           <label class="form-label">Persyaratan (Satu per baris)</label>
  180:           <textarea id="form-requirements" class="form-control" rows="6" placeholder="Cth:\nFotokopi KTP\nFotokopi KK\nSurat Pengantar RT/RW">${(data.requirements || '').replace(/\\n/g, '\n')}</textarea>
  181:         </div>
  182:         <div class="form-group">
  183:           <label class="form-label">Featured (Tampil di Beranda)</label>
  184:           <select id="form-featured" class="form-control">
  185:             <option value="TRUE" ${(data.featured === 'TRUE' || data.featured === true) ? 'selected' : ''}>Ya</option>
  186:             <option value="FALSE" ${(data.featured === 'FALSE' || data.featured === false) ? 'selected' : ''}>Tidak</option>
```
### File: Module_Layanan.html, Line: 192
**Escaped:** No
```javascript
  182:         <div class="form-group">
  183:           <label class="form-label">Featured (Tampil di Beranda)</label>
  184:           <select id="form-featured" class="form-control">
  185:             <option value="TRUE" ${(data.featured === 'TRUE' || data.featured === true) ? 'selected' : ''}>Ya</option>
  186:             <option value="FALSE" ${(data.featured === 'FALSE' || data.featured === false) ? 'selected' : ''}>Tidak</option>
  187:           </select>
  188:         </div>
  189:         <div class="form-group">
  190:           <label class="form-label">Status</label>
  191:           <select id="form-status" class="form-control">
> 192:             <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish</option>
  193:             <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft</option>
  194:           </select>
  195:         </div>
  196:       </div>
  197:     `;
  198:     
  199:     document.getElementById('layanan-btn-back').onclick = async () => {
  200:       if (window.CMS_FORM_DIRTY) {
  201:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  202:         if (!confirmExit) return;
```
### File: Module_Layanan.html, Line: 193
**Escaped:** No
```javascript
  183:           <label class="form-label">Featured (Tampil di Beranda)</label>
  184:           <select id="form-featured" class="form-control">
  185:             <option value="TRUE" ${(data.featured === 'TRUE' || data.featured === true) ? 'selected' : ''}>Ya</option>
  186:             <option value="FALSE" ${(data.featured === 'FALSE' || data.featured === false) ? 'selected' : ''}>Tidak</option>
  187:           </select>
  188:         </div>
  189:         <div class="form-group">
  190:           <label class="form-label">Status</label>
  191:           <select id="form-status" class="form-control">
  192:             <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish</option>
> 193:             <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft</option>
  194:           </select>
  195:         </div>
  196:       </div>
  197:     `;
  198:     
  199:     document.getElementById('layanan-btn-back').onclick = async () => {
  200:       if (window.CMS_FORM_DIRTY) {
  201:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  202:         if (!confirmExit) return;
  203:       }
```
### File: Module_Layanan.html, Line: 263
**Escaped:** No
```javascript
  253:       loadData();
  254:     } catch(e) {
  255:       CMS_UI.toast(e.message, 'error');
  256:     } finally {
  257:       CMS_UI.hideLoader();
  258:     }
  259:   }
  260: 
  261:   function render(container) {
  262:     if (container) {
> 263:       container.innerHTML = `
  264:         <section>
  265:           <div class="page-heading">
  266:             <div>
  267:               <p class="eyebrow">CMS INTERNAL</p>
  268:               <h1>Layanan Publik</h1>
  269:               <p>Kelola informasi pelayanan administrasi kelurahan.</p>
  270:             </div>
  271:           </div>
  272:           <div id="layanan-content"></div>
  273:         </section>
```
### File: Module_Login.html, Line: 81
**Escaped:** No
```javascript
  71: </template>
  72: 
  73: <script>
  74: window.ModuleLogin = {
  75:   render: function() {
  76:     const template = document.getElementById('module-login');
  77:     document.body.style.backgroundColor = "#f9fafb"; // Tailwind gray-50
  78:     
  79:     const mainContent = document.getElementById('main-content');
  80:     if (mainContent) {
> 81:       mainContent.innerHTML = '';
  82:       mainContent.appendChild(template.content.cloneNode(true));
  83:     }
  84:     
  85:     // Bind form submit safely
  86:     const form = document.getElementById('form-login');
  87:     if (form) {
  88:       form.addEventListener('submit', function(e) {
  89:         e.preventDefault();
  90:         window.handleLogin();
  91:       });
```
### File: Module_Login.html, Line: 123
**Escaped:** No
```javascript
  113:   const errorAlert = document.getElementById('login-error-alert');
  114:   const errorMsg = document.getElementById('login-error-message');
  115: 
  116:   const username = usernameInput.value.trim();
  117:   const password = passwordInput.value;
  118:   const rememberMe = rememberMeInput.checked;
  119: 
  120:   if (!username || !password) return;
  121: 
  122:   btn.disabled = true;
> 123:   btn.innerHTML = '<span class="material-icons-outlined animate-spin text-[18px] mr-2">sync</span> Memproses...';
  124:   errorAlert.classList.add('hidden');
  125: 
  126:   CMS_API.login(username, password, rememberMe)
  127:     .then(data => {
  128:       btn.disabled = false;
  129:       btn.innerHTML = '<span class="material-icons-outlined text-[18px] mr-2">login</span> Masuk Sistem';
  130:       
  131:       CMS_API.setToken(data.token, rememberMe);
  132:       
  133:       if (window.CMS_UI && window.CMS_UI.toast) {
```
### File: Module_Login.html, Line: 129
**Escaped:** No
```javascript
  119: 
  120:   if (!username || !password) return;
  121: 
  122:   btn.disabled = true;
  123:   btn.innerHTML = '<span class="material-icons-outlined animate-spin text-[18px] mr-2">sync</span> Memproses...';
  124:   errorAlert.classList.add('hidden');
  125: 
  126:   CMS_API.login(username, password, rememberMe)
  127:     .then(data => {
  128:       btn.disabled = false;
> 129:       btn.innerHTML = '<span class="material-icons-outlined text-[18px] mr-2">login</span> Masuk Sistem';
  130:       
  131:       CMS_API.setToken(data.token, rememberMe);
  132:       
  133:       if (window.CMS_UI && window.CMS_UI.toast) {
  134:         CMS_UI.toast(data.message || 'Login berhasil.', 'success');
  135:       }
  136:       
  137:       // Remove overlay and initialize shell properly
  138:       document.body.style.backgroundColor = ""; // Reset body background
  139:       const mainContent = document.getElementById('main-content');
```
### File: Module_Login.html, Line: 140
**Escaped:** No
```javascript
  130:       
  131:       CMS_API.setToken(data.token, rememberMe);
  132:       
  133:       if (window.CMS_UI && window.CMS_UI.toast) {
  134:         CMS_UI.toast(data.message || 'Login berhasil.', 'success');
  135:       }
  136:       
  137:       // Remove overlay and initialize shell properly
  138:       document.body.style.backgroundColor = ""; // Reset body background
  139:       const mainContent = document.getElementById('main-content');
> 140:       if (mainContent) mainContent.innerHTML = '';
  141:       
  142:       window.location.hash = '#dashboard';
  143:       if (window.initializeCMS) {
  144:         window.initializeCMS();
  145:       }
  146:     })
  147:     .catch(err => {
  148:       btn.disabled = false;
  149:       btn.innerHTML = '<span class="material-icons-outlined text-[18px] mr-2">login</span> Masuk Sistem';
  150:       errorMsg.textContent = err.message || 'Login gagal';
```
### File: Module_Login.html, Line: 149
**Escaped:** No
```javascript
  139:       const mainContent = document.getElementById('main-content');
  140:       if (mainContent) mainContent.innerHTML = '';
  141:       
  142:       window.location.hash = '#dashboard';
  143:       if (window.initializeCMS) {
  144:         window.initializeCMS();
  145:       }
  146:     })
  147:     .catch(err => {
  148:       btn.disabled = false;
> 149:       btn.innerHTML = '<span class="material-icons-outlined text-[18px] mr-2">login</span> Masuk Sistem';
  150:       errorMsg.textContent = err.message || 'Login gagal';
  151:       errorAlert.classList.remove('hidden');
  152:     });
  153: };
  154: </script>
  155: 
```
### File: Module_Pengumuman.html, Line: 25
**Escaped:** No
```javascript
  15:     try {
  16:       CMS_UI.showLoader('Memuat pengumuman...');
  17:       const res = await CMS_API.getRecords('Pengumuman', { page: state.page, limit: state.limit, search: state.search, status: state.status, sortBy: 'published_at', sortOrder: 'desc' });
  18:       state.items = res.items || [];
  19:       state.total = res.total || 0;
  20:       renderList();
  21:     } catch(e) {
  22:       console.error(e);
  23:       CMS_UI.toast('Error loadData: ' + e.message, 'error');
  24:       const el = document.getElementById('pengumuman-content');
> 25:       if (el) el.innerHTML = '<div style="color:red; padding:20px;">Error loadData: ' + e.message + '</div>';
  26:     } finally {
  27:       CMS_UI.hideLoader();
  28:     }
  29:   }
  30: 
  31:   function renderList() {
  32:     const container = document.getElementById('pengumuman-content');
  33:     if (!container) {
  34:       CMS_UI.toast('Error: container #pengumuman-content tidak ditemukan!', 'error');
  35:       return;
```
### File: Module_Pengumuman.html, Line: 74
**Escaped:** No
```javascript
  64:             </thead>
  65:             <tbody class="divide-y divide-surface-100">
  66:     `;
  67:     
  68:     if (state.items.length === 0) {
  69:       html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada pengumuman yang dipublikasikan.</td></tr>`;
  70:     } else {
  71:       html += state.items.map(item => `
  72:         <tr class="hover:bg-surface-50/50 transition-colors group">
  73:           <td class="p-4">
> 74:             <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  75:           </td>
  76:           <td class="p-4 hidden md:table-cell">
  77:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  78:               ${item.status}
  79:             </span>
  80:           </td>
  81:           <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  82:             ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : '-'}
  83:           </td>
  84:           <td class="p-4 text-right">
```
### File: Module_Pengumuman.html, Line: 77
**Escaped:** No
```javascript
  67:     
  68:     if (state.items.length === 0) {
  69:       html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada pengumuman yang dipublikasikan.</td></tr>`;
  70:     } else {
  71:       html += state.items.map(item => `
  72:         <tr class="hover:bg-surface-50/50 transition-colors group">
  73:           <td class="p-4">
  74:             <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  75:           </td>
  76:           <td class="p-4 hidden md:table-cell">
> 77:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  78:               ${item.status}
  79:             </span>
  80:           </td>
  81:           <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  82:             ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : '-'}
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  87:                 <span class="material-icons-outlined text-[18px]">edit</span>
```
### File: Module_Pengumuman.html, Line: 78
**Escaped:** No
```javascript
  68:     if (state.items.length === 0) {
  69:       html += `<tr><td colspan="5" class="p-12 text-center text-surface-500">Belum ada pengumuman yang dipublikasikan.</td></tr>`;
  70:     } else {
  71:       html += state.items.map(item => `
  72:         <tr class="hover:bg-surface-50/50 transition-colors group">
  73:           <td class="p-4">
  74:             <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  75:           </td>
  76:           <td class="p-4 hidden md:table-cell">
  77:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
> 78:               ${item.status}
  79:             </span>
  80:           </td>
  81:           <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  82:             ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : '-'}
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  87:                 <span class="material-icons-outlined text-[18px]">edit</span>
  88:               </button>
```
### File: Module_Pengumuman.html, Line: 82
**Escaped:** No
```javascript
  72:         <tr class="hover:bg-surface-50/50 transition-colors group">
  73:           <td class="p-4">
  74:             <p class="font-bold text-surface-900 text-sm md:text-base">${item.title}</p>
  75:           </td>
  76:           <td class="p-4 hidden md:table-cell">
  77:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  78:               ${item.status}
  79:             </span>
  80:           </td>
  81:           <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
> 82:             ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : '-'}
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  87:                 <span class="material-icons-outlined text-[18px]">edit</span>
  88:               </button>
  89:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" title="Hapus">
  90:                 <span class="material-icons-outlined text-[18px]">delete</span>
  91:               </button>
  92:             </div>
```
### File: Module_Pengumuman.html, Line: 86
**Escaped:** No
```javascript
  76:           <td class="p-4 hidden md:table-cell">
  77:             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.status === 'publish' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
  78:               ${item.status}
  79:             </span>
  80:           </td>
  81:           <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  82:             ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : '-'}
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
> 86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  87:                 <span class="material-icons-outlined text-[18px]">edit</span>
  88:               </button>
  89:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" title="Hapus">
  90:                 <span class="material-icons-outlined text-[18px]">delete</span>
  91:               </button>
  92:             </div>
  93:           </td>
  94:         </tr>
  95:       `).join('');
  96:     }
```
### File: Module_Pengumuman.html, Line: 89
**Escaped:** No
```javascript
  79:             </span>
  80:           </td>
  81:           <td class="p-4 hidden sm:table-cell text-sm text-surface-500">
  82:             ${item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : '-'}
  83:           </td>
  84:           <td class="p-4 text-right">
  85:             <div class="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
  86:               <button class="btn-edit p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" data-id="${item.id}" title="Edit">
  87:                 <span class="material-icons-outlined text-[18px]">edit</span>
  88:               </button>
> 89:               <button class="btn-delete p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" data-id="${item.id}" data-title="${item.title.replace(/"/g, '&quot;')}" title="Hapus">
  90:                 <span class="material-icons-outlined text-[18px]">delete</span>
  91:               </button>
  92:             </div>
  93:           </td>
  94:         </tr>
  95:       `).join('');
  96:     }
  97:     
  98:     html += `
  99:             </tbody>
```
### File: Module_Pengumuman.html, Line: 113
**Escaped:** No
```javascript
  103:         <div class="p-4 border-t border-surface-100 bg-surface-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
  104:           <p class="text-sm text-surface-500 font-medium">Halaman ${state.page} dari Total ${state.total} data</p>
  105:           <div class="flex gap-2">
  106:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="pengumuman-btn-prev" ${state.page <= 1 ? 'disabled' : ''}>Prev</button>
  107:             <button class="px-4 py-2 bg-white border border-surface-200 rounded-lg text-sm font-semibold hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed" id="pengumuman-btn-next" ${state.items.length < state.limit ? 'disabled' : ''}>Next</button>
  108:           </div>
  109:         </div>
  110:       </div>
  111:     `;
  112:     
> 113:     container.innerHTML = html;
  114:     
  115:     document.getElementById('pengumuman-btn-create').onclick = () => showForm();
  116:     document.getElementById('pengumuman-btn-search').onclick = () => {
  117:       state.search = document.getElementById('pengumuman-search').value;
  118:       state.status = document.getElementById('pengumuman-filter').value;
  119:       state.page = 1;
  120:       loadData();
  121:     };
  122:     document.getElementById('pengumuman-btn-prev').onclick = () => { state.page--; loadData(); };
  123:     document.getElementById('pengumuman-btn-next').onclick = () => { state.page++; loadData(); };
```
### File: Module_Pengumuman.html, Line: 154
**Escaped:** No
```javascript
  144:         window.CMS_FORM_DIRTY = false;
  145:         state.view = 'list';
  146:         render();
  147:         return;
  148:       } finally {
  149:         CMS_UI.hideLoader();
  150:       }
  151:     }
  152:     
  153:     const container = document.getElementById('pengumuman-content');
> 154:     container.innerHTML = `
  155:       <div class="flex justify-between items-center mb-6">
  156:         <button class="btn" id="pengumuman-btn-back">← Kembali</button>
  157:         <button class="btn btn-primary" id="pengumuman-btn-save">Simpan Data</button>
  158:       </div>
  159:       
  160:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  161:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  162:           <div class="form-group">
  163:             <label class="form-label">Judul Pengumuman</label>
  164:             <input type="text" id="form-title" class="form-control" value="${data.title}">
```
### File: Module_Pengumuman.html, Line: 164
**Escaped:** No
```javascript
  154:     container.innerHTML = `
  155:       <div class="flex justify-between items-center mb-6">
  156:         <button class="btn" id="pengumuman-btn-back">← Kembali</button>
  157:         <button class="btn btn-primary" id="pengumuman-btn-save">Simpan Data</button>
  158:       </div>
  159:       
  160:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  161:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  162:           <div class="form-group">
  163:             <label class="form-label">Judul Pengumuman</label>
> 164:             <input type="text" id="form-title" class="form-control" value="${data.title}">
  165:           </div>
  166:           <div class="form-group">
  167:             <label class="form-label">Isi Pengumuman</label>
  168:             <textarea id="form-content" class="form-control" style="min-height:200px">${data.content}</textarea>
  169:           </div>
  170:         </div>
  171:         
  172:         <div style="display:flex; flex-direction:column; gap:24px;">
  173:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  174:             <div class="form-group">
```
### File: Module_Pengumuman.html, Line: 168
**Escaped:** No
```javascript
  158:       </div>
  159:       
  160:       <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
  161:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  162:           <div class="form-group">
  163:             <label class="form-label">Judul Pengumuman</label>
  164:             <input type="text" id="form-title" class="form-control" value="${data.title}">
  165:           </div>
  166:           <div class="form-group">
  167:             <label class="form-label">Isi Pengumuman</label>
> 168:             <textarea id="form-content" class="form-control" style="min-height:200px">${data.content}</textarea>
  169:           </div>
  170:         </div>
  171:         
  172:         <div style="display:flex; flex-direction:column; gap:24px;">
  173:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  174:             <div class="form-group">
  175:               <label class="form-label">Status</label>
  176:               <select id="form-status" class="form-control">
  177:                 <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
  178:                 <option value="publish" ${data.status==='publish'?'selected':''}>Publish (Aktif)</option>
```
### File: Module_Pengumuman.html, Line: 177
**Escaped:** No
```javascript
  167:             <label class="form-label">Isi Pengumuman</label>
  168:             <textarea id="form-content" class="form-control" style="min-height:200px">${data.content}</textarea>
  169:           </div>
  170:         </div>
  171:         
  172:         <div style="display:flex; flex-direction:column; gap:24px;">
  173:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  174:             <div class="form-group">
  175:               <label class="form-label">Status</label>
  176:               <select id="form-status" class="form-control">
> 177:                 <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
  178:                 <option value="publish" ${data.status==='publish'?'selected':''}>Publish (Aktif)</option>
  179:               </select>
  180:             </div>
  181:             <div class="form-group">
  182:               <label class="form-label">Tanggal Publikasi</label>
  183:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  184:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  185:             </div>
  186:             <div class="form-group">
  187:               <label class="form-label">Lampiran (URL, PDF, DOC, atau Gambar)</label>
```
### File: Module_Pengumuman.html, Line: 178
**Escaped:** No
```javascript
  168:             <textarea id="form-content" class="form-control" style="min-height:200px">${data.content}</textarea>
  169:           </div>
  170:         </div>
  171:         
  172:         <div style="display:flex; flex-direction:column; gap:24px;">
  173:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  174:             <div class="form-group">
  175:               <label class="form-label">Status</label>
  176:               <select id="form-status" class="form-control">
  177:                 <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
> 178:                 <option value="publish" ${data.status==='publish'?'selected':''}>Publish (Aktif)</option>
  179:               </select>
  180:             </div>
  181:             <div class="form-group">
  182:               <label class="form-label">Tanggal Publikasi</label>
  183:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  184:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  185:             </div>
  186:             <div class="form-group">
  187:               <label class="form-label">Lampiran (URL, PDF, DOC, atau Gambar)</label>
  188:               <input type="text" id="form-attachment" class="form-control mb-2" value="${data.attachment || ''}" placeholder="https://...">
```
### File: Module_Pengumuman.html, Line: 183
**Escaped:** No
```javascript
  173:           <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  174:             <div class="form-group">
  175:               <label class="form-label">Status</label>
  176:               <select id="form-status" class="form-control">
  177:                 <option value="draft" ${data.status==='draft'?'selected':''}>Draft</option>
  178:                 <option value="publish" ${data.status==='publish'?'selected':''}>Publish (Aktif)</option>
  179:               </select>
  180:             </div>
  181:             <div class="form-group">
  182:               <label class="form-label">Tanggal Publikasi</label>
> 183:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  184:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  185:             </div>
  186:             <div class="form-group">
  187:               <label class="form-label">Lampiran (URL, PDF, DOC, atau Gambar)</label>
  188:               <input type="text" id="form-attachment" class="form-control mb-2" value="${data.attachment || ''}" placeholder="https://...">
  189:               <input type="file" id="form-upload" accept="application/pdf, .doc, .docx, image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
  190:               <input type="hidden" id="form-attachment_public_id" value="${data.attachmentMeta ? data.attachmentMeta.publicId : ''}">
  191:               <input type="hidden" id="form-attachment_provider" value="${data.attachmentMeta ? data.attachmentMeta.provider : ''}">
  192:             </div>
  193:           </div>
```
### File: Module_Pengumuman.html, Line: 188
**Escaped:** No
```javascript
  178:                 <option value="publish" ${data.status==='publish'?'selected':''}>Publish (Aktif)</option>
  179:               </select>
  180:             </div>
  181:             <div class="form-group">
  182:               <label class="form-label">Tanggal Publikasi</label>
  183:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  184:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  185:             </div>
  186:             <div class="form-group">
  187:               <label class="form-label">Lampiran (URL, PDF, DOC, atau Gambar)</label>
> 188:               <input type="text" id="form-attachment" class="form-control mb-2" value="${data.attachment || ''}" placeholder="https://...">
  189:               <input type="file" id="form-upload" accept="application/pdf, .doc, .docx, image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
  190:               <input type="hidden" id="form-attachment_public_id" value="${data.attachmentMeta ? data.attachmentMeta.publicId : ''}">
  191:               <input type="hidden" id="form-attachment_provider" value="${data.attachmentMeta ? data.attachmentMeta.provider : ''}">
  192:             </div>
  193:           </div>
  194:         </div>
  195:       </div>
  196:     `;
  197:     
  198:     const checkUnsaved = () => { window.CMS_FORM_DIRTY = true; };
```
### File: Module_Pengumuman.html, Line: 190
**Escaped:** No
```javascript
  180:             </div>
  181:             <div class="form-group">
  182:               <label class="form-label">Tanggal Publikasi</label>
  183:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  184:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  185:             </div>
  186:             <div class="form-group">
  187:               <label class="form-label">Lampiran (URL, PDF, DOC, atau Gambar)</label>
  188:               <input type="text" id="form-attachment" class="form-control mb-2" value="${data.attachment || ''}" placeholder="https://...">
  189:               <input type="file" id="form-upload" accept="application/pdf, .doc, .docx, image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
> 190:               <input type="hidden" id="form-attachment_public_id" value="${data.attachmentMeta ? data.attachmentMeta.publicId : ''}">
  191:               <input type="hidden" id="form-attachment_provider" value="${data.attachmentMeta ? data.attachmentMeta.provider : ''}">
  192:             </div>
  193:           </div>
  194:         </div>
  195:       </div>
  196:     `;
  197:     
  198:     const checkUnsaved = () => { window.CMS_FORM_DIRTY = true; };
  199:     document.getElementById('form-title').addEventListener('input', checkUnsaved);
  200:     document.getElementById('form-content').addEventListener('input', checkUnsaved);
```
### File: Module_Pengumuman.html, Line: 191
**Escaped:** No
```javascript
  181:             <div class="form-group">
  182:               <label class="form-label">Tanggal Publikasi</label>
  183:               <input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">
  184:               <p style="font-size:12px; color:#64748b; margin-top:4px;">Biarkan kosong untuk menggunakan waktu saat ini ketika status diubah ke Publish.</p>
  185:             </div>
  186:             <div class="form-group">
  187:               <label class="form-label">Lampiran (URL, PDF, DOC, atau Gambar)</label>
  188:               <input type="text" id="form-attachment" class="form-control mb-2" value="${data.attachment || ''}" placeholder="https://...">
  189:               <input type="file" id="form-upload" accept="application/pdf, .doc, .docx, image/jpeg, image/png, image/webp" class="form-control" style="font-size:12px;">
  190:               <input type="hidden" id="form-attachment_public_id" value="${data.attachmentMeta ? data.attachmentMeta.publicId : ''}">
> 191:               <input type="hidden" id="form-attachment_provider" value="${data.attachmentMeta ? data.attachmentMeta.provider : ''}">
  192:             </div>
  193:           </div>
  194:         </div>
  195:       </div>
  196:     `;
  197:     
  198:     const checkUnsaved = () => { window.CMS_FORM_DIRTY = true; };
  199:     document.getElementById('form-title').addEventListener('input', checkUnsaved);
  200:     document.getElementById('form-content').addEventListener('input', checkUnsaved);
  201:     document.getElementById('form-status').addEventListener('change', checkUnsaved);
```
### File: Module_Pengumuman.html, Line: 286
**Escaped:** No
```javascript
  276:       loadData();
  277:     } catch(e) {
  278:       CMS_UI.toast(e.message, 'error');
  279:     } finally {
  280:       CMS_UI.hideLoader();
  281:     }
  282:   }
  283: 
  284:   function render(container, action) {
  285:     if (container) {
> 286:       container.innerHTML = `
  287:         <section>
  288:           <div class="page-heading">
  289:             <div>
  290:               <p class="eyebrow">CMS INTERNAL</p>
  291:               <h1>Kelola Pengumuman</h1>
  292:               <p>Tambah, ubah, atau hapus pengumuman resmi kelurahan.</p>
  293:             </div>
  294:           </div>
  295:           <div id="pengumuman-content"></div>
  296:         </section>
```
### File: Module_Peta.html, Line: 5
**Escaped:** No
```javascript
  1: <script>
  2: window.Module_Peta = {
  3:   render: function(container) {
  4:     if (container) {
> 5:       container.innerHTML = `
  6:         <section>
  7:           <div class="page-heading">
  8:             <div>
  9:               <p class="eyebrow">CMS INTERNAL</p>
  10:               <h1>Direktori Peta & Lokasi</h1>
  11:               <p>Kelola data lokasi fasilitas dan kategori pemetaan wilayah.</p>
  12:             </div>
  13:           </div>
  14:           
  15:           <div class="flex border-b border-surface-200 mb-6 gap-6">
```
### File: Module_Peta.html, Line: 48
**Escaped:** No
```javascript
  38:       if (window.PetaState.view === 'list') {
  39:         if (window.PetaState.categories.length === 0) {
  40:            window.PetaList.loadData();
  41:         } else {
  42:            window.PetaList.renderList();
  43:         }
  44:       } else {
  45:         if (window.PetaForm && window.PetaForm.showForm) {
  46:           window.PetaForm.showForm(window.PetaState.currentId);
  47:         } else {
> 48:           document.getElementById('peta-content').innerHTML = "<h2>Form Placeholder (Not Loaded)</h2><button class='btn' id='peta-btn-back'>Back</button>";
  49:           document.getElementById('peta-btn-back').onclick = () => { window.PetaState.view = 'list'; this.render(); };
  50:         }
  51:       }
  52:     } else {
  53:       if (window.PetaState.catView === 'list') {
  54:         window.PetaCategories.loadCategories();
  55:       } else {
  56:         if (window.PetaCategories && window.PetaCategories.showCategoryForm) {
  57:           window.PetaCategories.showCategoryForm(window.PetaState.catCurrentId);
  58:         } else {
```
### File: Module_Peta.html, Line: 59
**Escaped:** No
```javascript
  49:           document.getElementById('peta-btn-back').onclick = () => { window.PetaState.view = 'list'; this.render(); };
  50:         }
  51:       }
  52:     } else {
  53:       if (window.PetaState.catView === 'list') {
  54:         window.PetaCategories.loadCategories();
  55:       } else {
  56:         if (window.PetaCategories && window.PetaCategories.showCategoryForm) {
  57:           window.PetaCategories.showCategoryForm(window.PetaState.catCurrentId);
  58:         } else {
> 59:           document.getElementById('peta-content').innerHTML = "<h2>Category Form Placeholder (Not Loaded)</h2><button class='btn' id='cat-btn-back'>Back</button>";
  60:           document.getElementById('cat-btn-back').onclick = () => { window.PetaState.catView = 'list'; this.render(); };
  61:         }
  62:       }
  63:     }
  64:   }
  65: };
  66: </script>
  67: 
```
### File: Module_Peta_Categories.html, Line: 48
**Escaped:** No
```javascript
  38:           <tbody class="divide-y divide-surface-100">
  39:     `;
  40: 
  41:     if (window.PetaState.categories.length === 0) {
  42:       html += `<tr><td colspan="4" class="p-8 text-center text-surface-500">Belum ada kategori.</td></tr>`;
  43:     } else {
  44:       window.PetaState.categories.forEach(item => {
  45:         let iconHtml = item.icon ? item.icon : '-';
  46:         html += `
  47:           <tr class="hover:bg-surface-50 transition-colors group">
> 48:             <td class="p-4 text-surface-500 font-mono text-xs">${item.id}</td>
  49:             <td class="p-4 text-surface-500 font-mono text-xs">${iconHtml}</td>
  50:             <td class="p-4">
  51:               <span class="px-2 py-1 bg-${item.color}-100 text-${item.color}-800 rounded-md text-sm font-semibold">
  52:                 ${item.name}
  53:               </span>
  54:             </td>
  55:             <td class="p-4 text-right">
  56:               <button class="icon-button text-blue-600 hover:bg-blue-50" onclick="if(window.PetaCategories.showCategoryForm) window.PetaCategories.showCategoryForm('${item.id}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Edit">
  57:                 <span class="material-icons-outlined text-[18px]">edit</span>
  58:               </button>
```
### File: Module_Peta_Categories.html, Line: 51
**Escaped:** No
```javascript
  41:     if (window.PetaState.categories.length === 0) {
  42:       html += `<tr><td colspan="4" class="p-8 text-center text-surface-500">Belum ada kategori.</td></tr>`;
  43:     } else {
  44:       window.PetaState.categories.forEach(item => {
  45:         let iconHtml = item.icon ? item.icon : '-';
  46:         html += `
  47:           <tr class="hover:bg-surface-50 transition-colors group">
  48:             <td class="p-4 text-surface-500 font-mono text-xs">${item.id}</td>
  49:             <td class="p-4 text-surface-500 font-mono text-xs">${iconHtml}</td>
  50:             <td class="p-4">
> 51:               <span class="px-2 py-1 bg-${item.color}-100 text-${item.color}-800 rounded-md text-sm font-semibold">
  52:                 ${item.name}
  53:               </span>
  54:             </td>
  55:             <td class="p-4 text-right">
  56:               <button class="icon-button text-blue-600 hover:bg-blue-50" onclick="if(window.PetaCategories.showCategoryForm) window.PetaCategories.showCategoryForm('${item.id}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Edit">
  57:                 <span class="material-icons-outlined text-[18px]">edit</span>
  58:               </button>
  59:               <button class="icon-button text-rose-600 hover:bg-rose-50 ml-1" onclick="if(window.PetaCategories.deleteCategoryItem) window.PetaCategories.deleteCategoryItem('${item.id}', '${item.name.replace(/'/g, "\\'")}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Hapus">
  60:                 <span class="material-icons-outlined text-[18px]">delete</span>
  61:               </button>
```
### File: Module_Peta_Categories.html, Line: 52
**Escaped:** No
```javascript
  42:       html += `<tr><td colspan="4" class="p-8 text-center text-surface-500">Belum ada kategori.</td></tr>`;
  43:     } else {
  44:       window.PetaState.categories.forEach(item => {
  45:         let iconHtml = item.icon ? item.icon : '-';
  46:         html += `
  47:           <tr class="hover:bg-surface-50 transition-colors group">
  48:             <td class="p-4 text-surface-500 font-mono text-xs">${item.id}</td>
  49:             <td class="p-4 text-surface-500 font-mono text-xs">${iconHtml}</td>
  50:             <td class="p-4">
  51:               <span class="px-2 py-1 bg-${item.color}-100 text-${item.color}-800 rounded-md text-sm font-semibold">
> 52:                 ${item.name}
  53:               </span>
  54:             </td>
  55:             <td class="p-4 text-right">
  56:               <button class="icon-button text-blue-600 hover:bg-blue-50" onclick="if(window.PetaCategories.showCategoryForm) window.PetaCategories.showCategoryForm('${item.id}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Edit">
  57:                 <span class="material-icons-outlined text-[18px]">edit</span>
  58:               </button>
  59:               <button class="icon-button text-rose-600 hover:bg-rose-50 ml-1" onclick="if(window.PetaCategories.deleteCategoryItem) window.PetaCategories.deleteCategoryItem('${item.id}', '${item.name.replace(/'/g, "\\'")}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Hapus">
  60:                 <span class="material-icons-outlined text-[18px]">delete</span>
  61:               </button>
  62:             </td>
```
### File: Module_Peta_Categories.html, Line: 56
**Escaped:** No
```javascript
  46:         html += `
  47:           <tr class="hover:bg-surface-50 transition-colors group">
  48:             <td class="p-4 text-surface-500 font-mono text-xs">${item.id}</td>
  49:             <td class="p-4 text-surface-500 font-mono text-xs">${iconHtml}</td>
  50:             <td class="p-4">
  51:               <span class="px-2 py-1 bg-${item.color}-100 text-${item.color}-800 rounded-md text-sm font-semibold">
  52:                 ${item.name}
  53:               </span>
  54:             </td>
  55:             <td class="p-4 text-right">
> 56:               <button class="icon-button text-blue-600 hover:bg-blue-50" onclick="if(window.PetaCategories.showCategoryForm) window.PetaCategories.showCategoryForm('${item.id}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Edit">
  57:                 <span class="material-icons-outlined text-[18px]">edit</span>
  58:               </button>
  59:               <button class="icon-button text-rose-600 hover:bg-rose-50 ml-1" onclick="if(window.PetaCategories.deleteCategoryItem) window.PetaCategories.deleteCategoryItem('${item.id}', '${item.name.replace(/'/g, "\\'")}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Hapus">
  60:                 <span class="material-icons-outlined text-[18px]">delete</span>
  61:               </button>
  62:             </td>
  63:           </tr>
  64:         `;
  65:       });
  66:     }
```
### File: Module_Peta_Categories.html, Line: 59
**Escaped:** No
```javascript
  49:             <td class="p-4 text-surface-500 font-mono text-xs">${iconHtml}</td>
  50:             <td class="p-4">
  51:               <span class="px-2 py-1 bg-${item.color}-100 text-${item.color}-800 rounded-md text-sm font-semibold">
  52:                 ${item.name}
  53:               </span>
  54:             </td>
  55:             <td class="p-4 text-right">
  56:               <button class="icon-button text-blue-600 hover:bg-blue-50" onclick="if(window.PetaCategories.showCategoryForm) window.PetaCategories.showCategoryForm('${item.id}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Edit">
  57:                 <span class="material-icons-outlined text-[18px]">edit</span>
  58:               </button>
> 59:               <button class="icon-button text-rose-600 hover:bg-rose-50 ml-1" onclick="if(window.PetaCategories.deleteCategoryItem) window.PetaCategories.deleteCategoryItem('${item.id}', '${item.name.replace(/'/g, "\\'")}'); else CMS_UI.toast('Module belum dimuat', 'error');" title="Hapus">
  60:                 <span class="material-icons-outlined text-[18px]">delete</span>
  61:               </button>
  62:             </td>
  63:           </tr>
  64:         `;
  65:       });
  66:     }
  67: 
  68:     html += `
  69:           </tbody>
```
### File: Module_Peta_Categories.html, Line: 74
**Escaped:** No
```javascript
  64:         `;
  65:       });
  66:     }
  67: 
  68:     html += `
  69:           </tbody>
  70:         </table>
  71:       </div>
  72:     `;
  73: 
> 74:     container.innerHTML = html;
  75: 
  76:     document.getElementById('cat-btn-add').onclick = () => {
  77:       if (window.PetaCategories.showCategoryForm) {
  78:         window.PetaCategories.showCategoryForm(null);
  79:       } else {
  80:         CMS_UI.toast('Module Form belum dimuat!', 'error');
  81:       }
  82:     };
  83:   }
  84: };
```
### File: Module_Peta_Categories_Form.html, Line: 37
**Escaped:** No
```javascript
  27:     { value: 'rose', label: 'Merah (Rose)' },
  28:     { value: 'amber', label: 'Kuning (Amber)' },
  29:     { value: 'purple', label: 'Ungu (Purple)' },
  30:     { value: 'indigo', label: 'Nila (Indigo)' },
  31:     { value: 'cyan', label: 'Sian (Cyan)' },
  32:     { value: 'surface', label: 'Abu-abu (Surface)' }
  33:   ];
  34: 
  35:   let colorOptions = '';
  36:   colors.forEach(c => {
> 37:     colorOptions += `<option value="${c.value}" ${data.color === c.value ? 'selected' : ''}>${c.label}</option>`;
  38:   });
  39: 
  40:   container.innerHTML = `
  41:     <div class="flex justify-between items-center mb-6">
  42:       <button class="btn" id="cat-btn-back"><span class="material-icons-outlined text-[18px]">arrow_back</span> Kembali</button>
  43:       <button class="btn btn-primary" id="cat-btn-save">Simpan Kategori</button>
  44:     </div>
  45:     
  46:     <div class="card p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
  47:       <div class="form-group md:col-span-2">
```
### File: Module_Peta_Categories_Form.html, Line: 40
**Escaped:** No
```javascript
  30:     { value: 'indigo', label: 'Nila (Indigo)' },
  31:     { value: 'cyan', label: 'Sian (Cyan)' },
  32:     { value: 'surface', label: 'Abu-abu (Surface)' }
  33:   ];
  34: 
  35:   let colorOptions = '';
  36:   colors.forEach(c => {
  37:     colorOptions += `<option value="${c.value}" ${data.color === c.value ? 'selected' : ''}>${c.label}</option>`;
  38:   });
  39: 
> 40:   container.innerHTML = `
  41:     <div class="flex justify-between items-center mb-6">
  42:       <button class="btn" id="cat-btn-back"><span class="material-icons-outlined text-[18px]">arrow_back</span> Kembali</button>
  43:       <button class="btn btn-primary" id="cat-btn-save">Simpan Kategori</button>
  44:     </div>
  45:     
  46:     <div class="card p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
  47:       <div class="form-group md:col-span-2">
  48:         <label class="form-label">Nama Kategori</label>
  49:         <input type="text" id="cat-form-name" class="form-control" value="${data.name || ''}" placeholder="Cth: Fasilitas Kesehatan">
  50:       </div>
```
### File: Module_Peta_Categories_Form.html, Line: 49
**Escaped:** No
```javascript
  39: 
  40:   container.innerHTML = `
  41:     <div class="flex justify-between items-center mb-6">
  42:       <button class="btn" id="cat-btn-back"><span class="material-icons-outlined text-[18px]">arrow_back</span> Kembali</button>
  43:       <button class="btn btn-primary" id="cat-btn-save">Simpan Kategori</button>
  44:     </div>
  45:     
  46:     <div class="card p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
  47:       <div class="form-group md:col-span-2">
  48:         <label class="form-label">Nama Kategori</label>
> 49:         <input type="text" id="cat-form-name" class="form-control" value="${data.name || ''}" placeholder="Cth: Fasilitas Kesehatan">
  50:       </div>
  51:       <div class="form-group">
  52:         <label class="form-label">Ikon (Material Icons)</label>
  53:         <input type="text" id="cat-form-icon" class="form-control" value="${data.icon || ''}" placeholder="Cth: local_hospital">
  54:         <p class="text-xs text-surface-500 mt-1">Gunakan nama ikon dari <a href="https://fonts.google.com/icons?selected=Material+Icons+Outlined" target="_blank" class="text-blue-600 hover:underline">Google Fonts</a>.</p>
  55:       </div>
  56:       <div class="form-group">
  57:         <label class="form-label">Warna Label</label>
  58:         <select id="cat-form-color" class="form-control">
  59:           ${colorOptions}
```
### File: Module_Peta_Categories_Form.html, Line: 53
**Escaped:** No
```javascript
  43:       <button class="btn btn-primary" id="cat-btn-save">Simpan Kategori</button>
  44:     </div>
  45:     
  46:     <div class="card p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
  47:       <div class="form-group md:col-span-2">
  48:         <label class="form-label">Nama Kategori</label>
  49:         <input type="text" id="cat-form-name" class="form-control" value="${data.name || ''}" placeholder="Cth: Fasilitas Kesehatan">
  50:       </div>
  51:       <div class="form-group">
  52:         <label class="form-label">Ikon (Material Icons)</label>
> 53:         <input type="text" id="cat-form-icon" class="form-control" value="${data.icon || ''}" placeholder="Cth: local_hospital">
  54:         <p class="text-xs text-surface-500 mt-1">Gunakan nama ikon dari <a href="https://fonts.google.com/icons?selected=Material+Icons+Outlined" target="_blank" class="text-blue-600 hover:underline">Google Fonts</a>.</p>
  55:       </div>
  56:       <div class="form-group">
  57:         <label class="form-label">Warna Label</label>
  58:         <select id="cat-form-color" class="form-control">
  59:           ${colorOptions}
  60:         </select>
  61:       </div>
  62:       <div class="form-group">
  63:         <label class="form-label">Urutan Tampil (Display Order)</label>
```
### File: Module_Peta_Categories_Form.html, Line: 64
**Escaped:** No
```javascript
  54:         <p class="text-xs text-surface-500 mt-1">Gunakan nama ikon dari <a href="https://fonts.google.com/icons?selected=Material+Icons+Outlined" target="_blank" class="text-blue-600 hover:underline">Google Fonts</a>.</p>
  55:       </div>
  56:       <div class="form-group">
  57:         <label class="form-label">Warna Label</label>
  58:         <select id="cat-form-color" class="form-control">
  59:           ${colorOptions}
  60:         </select>
  61:       </div>
  62:       <div class="form-group">
  63:         <label class="form-label">Urutan Tampil (Display Order)</label>
> 64:         <input type="number" id="cat-form-order" class="form-control" value="${data.display_order || '1'}" min="1">
  65:       </div>
  66:       <div class="form-group md:col-span-2">
  67:         <label class="form-label">Deskripsi Kategori</label>
  68:         <textarea id="cat-form-desc" class="form-control" rows="2" placeholder="Penjelasan singkat kategori">${data.description || ''}</textarea>
  69:       </div>
  70:     </div>
  71:   `;
  72:   
  73:   document.getElementById('cat-btn-back').onclick = async () => { 
  74:     if (window.CMS_FORM_DIRTY) {
```
### File: Module_Peta_Categories_Form.html, Line: 68
**Escaped:** No
```javascript
  58:         <select id="cat-form-color" class="form-control">
  59:           ${colorOptions}
  60:         </select>
  61:       </div>
  62:       <div class="form-group">
  63:         <label class="form-label">Urutan Tampil (Display Order)</label>
  64:         <input type="number" id="cat-form-order" class="form-control" value="${data.display_order || '1'}" min="1">
  65:       </div>
  66:       <div class="form-group md:col-span-2">
  67:         <label class="form-label">Deskripsi Kategori</label>
> 68:         <textarea id="cat-form-desc" class="form-control" rows="2" placeholder="Penjelasan singkat kategori">${data.description || ''}</textarea>
  69:       </div>
  70:     </div>
  71:   `;
  72:   
  73:   document.getElementById('cat-btn-back').onclick = async () => { 
  74:     if (window.CMS_FORM_DIRTY) {
  75:       const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  76:       if (!confirmExit) return;
  77:     }
  78:     window.CMS_FORM_DIRTY = false;
```
### File: Module_Peta_Form.html, Line: 52
**Escaped:** No
```javascript
  42:         </button>
  43:         <h2 class="text-xl font-bold">${id ? 'Edit Lokasi' : 'Tambah Lokasi Baru'}</h2>
  44:       </div>
  45: 
  46:       <form id="peta-form" class="space-y-6">
  47:         <div class="card p-6">
  48:           <h3 class="text-lg font-semibold mb-4 text-surface-800">Informasi Dasar</h3>
  49:           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  50:             <div>
  51:               <label class="block text-sm font-semibold text-surface-700 mb-1">Nama Lokasi <span class="text-rose-500">*</span></label>
> 52:               <input type="text" id="form-name" class="input w-full" value="${data.name || ''}" required placeholder="Contoh: Kantor Kelurahan Watang Soreang">
  53:             </div>
  54:             
  55:             <div>
  56:               <label class="block text-sm font-semibold text-surface-700 mb-1">Kategori <span class="text-rose-500">*</span></label>
  57:               <select id="form-category" class="input w-full" required>
  58:                 ${catOptions}
  59:               </select>
  60:             </div>
  61: 
  62:             <div class="col-span-full">
```
### File: Module_Peta_Form.html, Line: 64
**Escaped:** No
```javascript
  54:             
  55:             <div>
  56:               <label class="block text-sm font-semibold text-surface-700 mb-1">Kategori <span class="text-rose-500">*</span></label>
  57:               <select id="form-category" class="input w-full" required>
  58:                 ${catOptions}
  59:               </select>
  60:             </div>
  61: 
  62:             <div class="col-span-full">
  63:               <label class="block text-sm font-semibold text-surface-700 mb-1">Alamat Lengkap <span class="text-rose-500">*</span></label>
> 64:               <textarea id="form-address" class="input w-full" rows="2" required placeholder="Masukkan alamat lengkap lokasi">${data.address || ''}</textarea>
  65:             </div>
  66: 
  67:             <div class="col-span-full">
  68:               <label class="block text-sm font-semibold text-surface-700 mb-1">Deskripsi Singkat</label>
  69:               <textarea id="form-description" class="input w-full" rows="3" placeholder="Deskripsi singkat mengenai lokasi ini...">${data.description || ''}</textarea>
  70:             </div>
  71:           </div>
  72:         </div>
  73: 
  74:         <div class="card overflow-hidden">
```
### File: Module_Peta_Form.html, Line: 69
**Escaped:** No
```javascript
  59:               </select>
  60:             </div>
  61: 
  62:             <div class="col-span-full">
  63:               <label class="block text-sm font-semibold text-surface-700 mb-1">Alamat Lengkap <span class="text-rose-500">*</span></label>
  64:               <textarea id="form-address" class="input w-full" rows="2" required placeholder="Masukkan alamat lengkap lokasi">${data.address || ''}</textarea>
  65:             </div>
  66: 
  67:             <div class="col-span-full">
  68:               <label class="block text-sm font-semibold text-surface-700 mb-1">Deskripsi Singkat</label>
> 69:               <textarea id="form-description" class="input w-full" rows="3" placeholder="Deskripsi singkat mengenai lokasi ini...">${data.description || ''}</textarea>
  70:             </div>
  71:           </div>
  72:         </div>
  73: 
  74:         <div class="card overflow-hidden">
  75:           <div class="p-6 border-b border-surface-200 bg-surface-50">
  76:             <h3 class="text-lg font-semibold text-surface-800">Peta & Titik Lokasi</h3>
  77:             <p class="text-sm text-surface-500 mt-1">Cari lokasi atau geser pin pada peta untuk menetapkan koordinat.</p>
  78:           </div>
  79:           
```
### File: Module_Peta_Form.html, Line: 115
**Escaped:** No
```javascript
  105:                 <div class="flex items-center gap-2">
  106:                   <span class="material-icons-outlined text-surface-500 text-[18px]">place</span>
  107:                   <span class="text-sm font-semibold text-surface-700">Koordinat (Terisi Otomatis)</span>
  108:                 </div>
  109:                 <span class="text-xs text-primary-600 font-medium hover:underline">Tampilkan penyesuaian manual</span>
  110:               </div>
  111:               
  112:               <div id="coord-fields" class="hidden grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-surface-200">
  113:                 <div>
  114:                   <label class="block text-xs font-semibold text-surface-600 mb-1">Latitude <span class="text-rose-500">*</span></label>
> 115:                   <input type="text" id="form-latitude" class="input w-full font-mono text-sm" value="${data.latitude || ''}" required placeholder="-3.9955118">
  116:                 </div>
  117:                 <div>
  118:                   <label class="block text-xs font-semibold text-surface-600 mb-1">Longitude <span class="text-rose-500">*</span></label>
  119:                   <input type="text" id="form-longitude" class="input w-full font-mono text-sm" value="${data.longitude || ''}" required placeholder="119.6268884">
  120:                 </div>
  121:               </div>
  122:             </div>
  123:           </div>
  124:         </div>
  125: 
```
### File: Module_Peta_Form.html, Line: 119
**Escaped:** No
```javascript
  109:                 <span class="text-xs text-primary-600 font-medium hover:underline">Tampilkan penyesuaian manual</span>
  110:               </div>
  111:               
  112:               <div id="coord-fields" class="hidden grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-surface-200">
  113:                 <div>
  114:                   <label class="block text-xs font-semibold text-surface-600 mb-1">Latitude <span class="text-rose-500">*</span></label>
  115:                   <input type="text" id="form-latitude" class="input w-full font-mono text-sm" value="${data.latitude || ''}" required placeholder="-3.9955118">
  116:                 </div>
  117:                 <div>
  118:                   <label class="block text-xs font-semibold text-surface-600 mb-1">Longitude <span class="text-rose-500">*</span></label>
> 119:                   <input type="text" id="form-longitude" class="input w-full font-mono text-sm" value="${data.longitude || ''}" required placeholder="119.6268884">
  120:                 </div>
  121:               </div>
  122:             </div>
  123:           </div>
  124:         </div>
  125: 
  126:         <div class="card p-6">
  127:           <h3 class="text-lg font-semibold mb-4 text-surface-800">Galeri Foto</h3>
  128:           <p class="text-sm text-surface-500 mb-4">Tambahkan foto-foto lokasi ini. Foto pertama akan menjadi foto utama.</p>
  129:           
```
### File: Module_Peta_Form.html, Line: 130
**Escaped:** No
```javascript
  120:                 </div>
  121:               </div>
  122:             </div>
  123:           </div>
  124:         </div>
  125: 
  126:         <div class="card p-6">
  127:           <h3 class="text-lg font-semibold mb-4 text-surface-800">Galeri Foto</h3>
  128:           <p class="text-sm text-surface-500 mb-4">Tambahkan foto-foto lokasi ini. Foto pertama akan menjadi foto utama.</p>
  129:           
> 130:           <input type="hidden" id="form-images" value='${data.images || "[]"}'>
  131:           
  132:           <div class="mb-4">
  133:             <label class="btn btn-outline cursor-pointer inline-flex items-center gap-2">
  134:               <span class="material-icons-outlined text-[20px]">add_photo_alternate</span>
  135:               Unggah Foto
  136:               <input type="file" id="peta-upload-input" class="hidden" accept="image/jpeg, image/png, image/webp">
  137:             </label>
  138:           </div>
  139:           
  140:           <div id="peta-gallery-preview" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
```
### File: Module_Peta_Form.html, Line: 149
**Escaped:** No
```javascript
  139:           
  140:           <div id="peta-gallery-preview" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
  141:           </div>
  142:         </div>
  143: 
  144:         <div class="card p-6">
  145:           <h3 class="text-lg font-semibold mb-4 text-surface-800">Pengaturan Tampilan</h3>
  146:           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  147:             <div>
  148:               <label class="block text-sm font-semibold text-surface-700 mb-1">Urutan Tampil (Opsional)</label>
> 149:               <input type="number" id="form-display-order" class="input w-full" value="${data.display_order || ''}" placeholder="Angka, misal: 1">
  150:             </div>
  151:             <div>
  152:               <label class="block text-sm font-semibold text-surface-700 mb-1">Status</label>
  153:               <select id="form-status" class="input w-full">
  154:                 <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish (Ditampilkan)</option>
  155:                 <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft (Sembunyikan)</option>
  156:               </select>
  157:             </div>
  158:           </div>
  159:         </div>
```
### File: Module_Peta_Form.html, Line: 154
**Escaped:** No
```javascript
  144:         <div class="card p-6">
  145:           <h3 class="text-lg font-semibold mb-4 text-surface-800">Pengaturan Tampilan</h3>
  146:           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  147:             <div>
  148:               <label class="block text-sm font-semibold text-surface-700 mb-1">Urutan Tampil (Opsional)</label>
  149:               <input type="number" id="form-display-order" class="input w-full" value="${data.display_order || ''}" placeholder="Angka, misal: 1">
  150:             </div>
  151:             <div>
  152:               <label class="block text-sm font-semibold text-surface-700 mb-1">Status</label>
  153:               <select id="form-status" class="input w-full">
> 154:                 <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish (Ditampilkan)</option>
  155:                 <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft (Sembunyikan)</option>
  156:               </select>
  157:             </div>
  158:           </div>
  159:         </div>
  160: 
  161:         <div class="flex gap-4 pt-4 border-t border-surface-200">
  162:           <button type="submit" class="btn btn-primary">Simpan Lokasi</button>
  163:           <button type="button" class="btn btn-outline" id="peta-btn-cancel">Batal</button>
  164:         </div>
```
### File: Module_Peta_Form.html, Line: 155
**Escaped:** No
```javascript
  145:           <h3 class="text-lg font-semibold mb-4 text-surface-800">Pengaturan Tampilan</h3>
  146:           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  147:             <div>
  148:               <label class="block text-sm font-semibold text-surface-700 mb-1">Urutan Tampil (Opsional)</label>
  149:               <input type="number" id="form-display-order" class="input w-full" value="${data.display_order || ''}" placeholder="Angka, misal: 1">
  150:             </div>
  151:             <div>
  152:               <label class="block text-sm font-semibold text-surface-700 mb-1">Status</label>
  153:               <select id="form-status" class="input w-full">
  154:                 <option value="publish" ${data.status === 'publish' ? 'selected' : ''}>Publish (Ditampilkan)</option>
> 155:                 <option value="draft" ${data.status === 'draft' ? 'selected' : ''}>Draft (Sembunyikan)</option>
  156:               </select>
  157:             </div>
  158:           </div>
  159:         </div>
  160: 
  161:         <div class="flex gap-4 pt-4 border-t border-surface-200">
  162:           <button type="submit" class="btn btn-primary">Simpan Lokasi</button>
  163:           <button type="button" class="btn btn-outline" id="peta-btn-cancel">Batal</button>
  164:         </div>
  165:       </form>
```
### File: Module_Peta_Form.html, Line: 168
**Escaped:** No
```javascript
  158:           </div>
  159:         </div>
  160: 
  161:         <div class="flex gap-4 pt-4 border-t border-surface-200">
  162:           <button type="submit" class="btn btn-primary">Simpan Lokasi</button>
  163:           <button type="button" class="btn btn-outline" id="peta-btn-cancel">Batal</button>
  164:         </div>
  165:       </form>
  166:     `;
  167: 
> 168:     container.innerHTML = html;
  169: 
  170:     // Events
  171:     document.getElementById('peta-btn-back').onclick = async () => {
  172:       if (window.CMS_FORM_DIRTY) {
  173:         const confirmExit = await CMS_UI.confirm('Batal Edit', 'Perubahan belum disimpan. Yakin ingin kembali?', 'Ya, Kembali', 'btn-danger');
  174:         if (!confirmExit) return;
  175:       }
  176:       window.CMS_FORM_DIRTY = false;
  177:       window.PetaState.view = 'list';
  178:       if (window.Module_Peta) window.Module_Peta.render(document.querySelector('#app-content'));
```
### File: Module_Peta_Form.html, Line: 265
**Escaped:** No
```javascript
  255:     if (!window.L) {
  256:       const link = document.createElement('link');
  257:       link.rel = 'stylesheet';
  258:       link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  259:       document.head.appendChild(link);
  260:       
  261:       const script = document.createElement('script');
  262:       script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  263:       script.crossOrigin = 'anonymous'; 
  264:       script.onload = () => {
> 265:         setTimeout(() => buildMap(data.latitude, data.longitude, data.name), 100);
  266:       };
  267:       document.head.appendChild(script);
  268:     } else {
  269:       setTimeout(() => buildMap(data.latitude, data.longitude, data.name), 100);
  270:     }
  271: 
  272:     const updateMapFromInputs = () => {
  273:       const latVal = document.getElementById('form-latitude').value;
  274:       const lngVal = document.getElementById('form-longitude').value;
  275:       if (!latVal || !lngVal) return;
```
### File: Module_Peta_Form.html, Line: 269
**Escaped:** No
```javascript
  259:       document.head.appendChild(link);
  260:       
  261:       const script = document.createElement('script');
  262:       script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  263:       script.crossOrigin = 'anonymous'; 
  264:       script.onload = () => {
  265:         setTimeout(() => buildMap(data.latitude, data.longitude, data.name), 100);
  266:       };
  267:       document.head.appendChild(script);
  268:     } else {
> 269:       setTimeout(() => buildMap(data.latitude, data.longitude, data.name), 100);
  270:     }
  271: 
  272:     const updateMapFromInputs = () => {
  273:       const latVal = document.getElementById('form-latitude').value;
  274:       const lngVal = document.getElementById('form-longitude').value;
  275:       if (!latVal || !lngVal) return;
  276:       
  277:       const lat = parseFloat(latVal.toString().replace(',', '.'));
  278:       const lng = parseFloat(lngVal.toString().replace(',', '.'));
  279:       
```
### File: Module_Peta_Form.html, Line: 389
**Escaped:** No
```javascript
  379:     try {
  380:       const raw = document.getElementById('form-images').value;
  381:       currentGallery = JSON.parse(raw || '[]');
  382:     } catch(e) {}
  383: 
  384:     const renderPreview = () => {
  385:       const container = document.getElementById('peta-gallery-preview');
  386:       if (!container) return;
  387:       
  388:       if (currentGallery.length === 0) {
> 389:         container.innerHTML = '<div class="col-span-full p-4 border-2 border-dashed border-surface-200 rounded-lg text-center text-surface-500 text-sm">Belum ada foto yang ditambahkan</div>';
  390:         return;
  391:       }
  392:       
  393:       let html = '';
  394:       currentGallery.forEach((url, idx) => {
  395:         html += `
  396:           <div class="relative group aspect-square rounded-lg border border-surface-200 overflow-hidden bg-surface-50">
  397:             <img src="${url}" class="w-full h-full object-cover" alt="Gallery">
  398:             <button type="button" class="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500" onclick="window.PetaForm.removeImage(${idx})" title="Hapus foto">
  399:               <span class="material-icons-outlined text-[18px]">delete</span>
```
### File: Module_Peta_Form.html, Line: 405
**Escaped:** No
```javascript
  395:         html += `
  396:           <div class="relative group aspect-square rounded-lg border border-surface-200 overflow-hidden bg-surface-50">
  397:             <img src="${url}" class="w-full h-full object-cover" alt="Gallery">
  398:             <button type="button" class="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500" onclick="window.PetaForm.removeImage(${idx})" title="Hapus foto">
  399:               <span class="material-icons-outlined text-[18px]">delete</span>
  400:             </button>
  401:             ${idx === 0 ? '<div class="absolute bottom-0 left-0 right-0 bg-primary-500/90 text-white text-[10px] py-1 text-center font-semibold">FOTO UTAMA</div>' : ''}
  402:           </div>
  403:         `;
  404:       });
> 405:       container.innerHTML = html;
  406:       document.getElementById('form-images').value = JSON.stringify(currentGallery);
  407:     };
  408: 
  409:     window.PetaForm.removeImage = (index) => {
  410:       currentGallery.splice(index, 1);
  411:       renderPreview();
  412:     };
  413: 
  414:     const fileInput = document.getElementById('peta-upload-input');
  415:     if (fileInput) {
```
### File: Module_Peta_List.html, Line: 78
**Escaped:** No
```javascript
  68:         const catColor = window.PetaHelpers.getCategoryColor(item.category_id);
  69:         
  70:         let featHtml = '';
  71:         if (item.featured === 'TRUE') {
  72:           featHtml = '<span class="material-icons-outlined text-yellow-500 text-[16px]" title="Featured">star</span>';
  73:         }
  74:         
  75:         let addrHtml = item.address ? item.address : '-';
  76:         html += `
  77:           <tr class="hover:bg-surface-50 transition-colors group">
> 78:             <td class="p-4 text-surface-500 font-mono text-xs">${item.display_order || '-'}</td>
  79:             <td class="p-4 font-semibold">${item.name || '-'}
  80:               ${featHtml}
  81:             </td>
  82:             <td class="p-4"><span class="px-2 py-1 bg-${catColor}-100 text-${catColor}-800 rounded-md text-xs font-semibold">${catName}</span></td>
  83:             <td class="p-4 text-surface-600 text-sm">${addrHtml}</td>
  84:             <td class="p-4 text-right">
  85:               <button class="icon-button text-blue-600 hover:bg-blue-50" onclick="if(window.PetaForm) window.PetaForm.showForm('${item.id}'); else CMS_UI.toast('Module Form belum dimuat', 'error');" title="Edit">
  86:                 <span class="material-icons-outlined text-[18px]">edit</span>
  87:               </button>
  88:             </td>
```
### File: Module_Peta_List.html, Line: 79
**Escaped:** No
```javascript
  69:         
  70:         let featHtml = '';
  71:         if (item.featured === 'TRUE') {
  72:           featHtml = '<span class="material-icons-outlined text-yellow-500 text-[16px]" title="Featured">star</span>';
  73:         }
  74:         
  75:         let addrHtml = item.address ? item.address : '-';
  76:         html += `
  77:           <tr class="hover:bg-surface-50 transition-colors group">
  78:             <td class="p-4 text-surface-500 font-mono text-xs">${item.display_order || '-'}</td>
> 79:             <td class="p-4 font-semibold">${item.name || '-'}
  80:               ${featHtml}
  81:             </td>
  82:             <td class="p-4"><span class="px-2 py-1 bg-${catColor}-100 text-${catColor}-800 rounded-md text-xs font-semibold">${catName}</span></td>
  83:             <td class="p-4 text-surface-600 text-sm">${addrHtml}</td>
  84:             <td class="p-4 text-right">
  85:               <button class="icon-button text-blue-600 hover:bg-blue-50" onclick="if(window.PetaForm) window.PetaForm.showForm('${item.id}'); else CMS_UI.toast('Module Form belum dimuat', 'error');" title="Edit">
  86:                 <span class="material-icons-outlined text-[18px]">edit</span>
  87:               </button>
  88:             </td>
  89:           </tr>
```
### File: Module_Peta_List.html, Line: 85
**Escaped:** No
```javascript
  75:         let addrHtml = item.address ? item.address : '-';
  76:         html += `
  77:           <tr class="hover:bg-surface-50 transition-colors group">
  78:             <td class="p-4 text-surface-500 font-mono text-xs">${item.display_order || '-'}</td>
  79:             <td class="p-4 font-semibold">${item.name || '-'}
  80:               ${featHtml}
  81:             </td>
  82:             <td class="p-4"><span class="px-2 py-1 bg-${catColor}-100 text-${catColor}-800 rounded-md text-xs font-semibold">${catName}</span></td>
  83:             <td class="p-4 text-surface-600 text-sm">${addrHtml}</td>
  84:             <td class="p-4 text-right">
> 85:               <button class="icon-button text-blue-600 hover:bg-blue-50" onclick="if(window.PetaForm) window.PetaForm.showForm('${item.id}'); else CMS_UI.toast('Module Form belum dimuat', 'error');" title="Edit">
  86:                 <span class="material-icons-outlined text-[18px]">edit</span>
  87:               </button>
  88:             </td>
  89:           </tr>
  90:         `;
  91:       });
  92:     }
  93:     let disabledPrev = window.PetaState.page <= 1 ? 'disabled' : '';
  94:     let disabledNext = window.PetaState.items.length < window.PetaState.limit ? 'disabled' : '';
  95: 
```
### File: Module_Peta_List.html, Line: 109
**Escaped:** No
```javascript
  99:       </div>
  100:       <div class="flex justify-between items-center mt-6">
  101:         <p class="text-sm text-surface-500">Menampilkan halaman ${window.PetaState.page}</p>
  102:         <div class="flex gap-2">
  103:           <button class="btn btn-outline" id="peta-btn-prev" ${disabledPrev}>Sebelumnya</button>
  104:           <button class="btn btn-outline" id="peta-btn-next" ${disabledNext}>Selanjutnya</button>
  105:         </div>
  106:       </div>
  107:     `;
  108: 
> 109:     container.innerHTML = html;
  110: 
  111:     // Binds
  112:     document.getElementById('peta-btn-search').onclick = () => {
  113:       window.PetaState.search = document.getElementById('peta-search').value;
  114:       window.PetaState.categoryFilter = document.getElementById('peta-category-filter').value;
  115:       window.PetaState.page = 1;
  116:       this.loadData();
  117:     };
  118: 
  119:     document.getElementById('peta-btn-add').onclick = () => {
```
### File: Module_Profil.html, Line: 31
**Escaped:** No
```javascript
  21:       </div>
  22:       
  23:       <div style="display:grid; grid-template-columns:1fr; gap:24px;" id="profil-form">
  24:         
  25:         <!-- SECTION 1: LEADER -->
  26:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  27:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Kepala Kelurahan</h3>
  28:           <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
  29:             <div class="form-group">
  30:               <label class="form-label">Nama Lengkap</label>
> 31:               <input type="text" class="form-control profil-input" data-key="leader_name" value="${data.leader_name || ''}">
  32:             </div>
  33:             <div class="form-group">
  34:               <label class="form-label">Jabatan</label>
  35:               <input type="text" class="form-control profil-input" data-key="leader_position" value="${data.leader_position || ''}">
  36:             </div>
  37:             <div class="form-group" style="grid-column: 1 / -1;">
  38:               <label class="form-label">Kata Sambutan</label>
  39:               <textarea class="form-control profil-input" data-key="leader_sambutan" style="min-height:100px">${data.leader_sambutan || ''}</textarea>
  40:             </div>
  41:             <div class="form-group" style="grid-column: 1 / -1;">
```
### File: Module_Profil.html, Line: 35
**Escaped:** No
```javascript
  25:         <!-- SECTION 1: LEADER -->
  26:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  27:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Kepala Kelurahan</h3>
  28:           <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
  29:             <div class="form-group">
  30:               <label class="form-label">Nama Lengkap</label>
  31:               <input type="text" class="form-control profil-input" data-key="leader_name" value="${data.leader_name || ''}">
  32:             </div>
  33:             <div class="form-group">
  34:               <label class="form-label">Jabatan</label>
> 35:               <input type="text" class="form-control profil-input" data-key="leader_position" value="${data.leader_position || ''}">
  36:             </div>
  37:             <div class="form-group" style="grid-column: 1 / -1;">
  38:               <label class="form-label">Kata Sambutan</label>
  39:               <textarea class="form-control profil-input" data-key="leader_sambutan" style="min-height:100px">${data.leader_sambutan || ''}</textarea>
  40:             </div>
  41:             <div class="form-group" style="grid-column: 1 / -1;">
  42:               <div id="leader-photo-preview" class="image-preview mb-4 ${data.leader_photo ? '' : 'hidden'}">
  43:                 <img src="${CMS_UI.getDriveImageUrl(data.leader_photo) || data.leader_photo || ''}" style="max-width:200px; border-radius:8px;">
  44:               </div>
  45:               <label class="form-label">Foto Pimpinan</label>
```
### File: Module_Profil.html, Line: 39
**Escaped:** No
```javascript
  29:             <div class="form-group">
  30:               <label class="form-label">Nama Lengkap</label>
  31:               <input type="text" class="form-control profil-input" data-key="leader_name" value="${data.leader_name || ''}">
  32:             </div>
  33:             <div class="form-group">
  34:               <label class="form-label">Jabatan</label>
  35:               <input type="text" class="form-control profil-input" data-key="leader_position" value="${data.leader_position || ''}">
  36:             </div>
  37:             <div class="form-group" style="grid-column: 1 / -1;">
  38:               <label class="form-label">Kata Sambutan</label>
> 39:               <textarea class="form-control profil-input" data-key="leader_sambutan" style="min-height:100px">${data.leader_sambutan || ''}</textarea>
  40:             </div>
  41:             <div class="form-group" style="grid-column: 1 / -1;">
  42:               <div id="leader-photo-preview" class="image-preview mb-4 ${data.leader_photo ? '' : 'hidden'}">
  43:                 <img src="${CMS_UI.getDriveImageUrl(data.leader_photo) || data.leader_photo || ''}" style="max-width:200px; border-radius:8px;">
  44:               </div>
  45:               <label class="form-label">Foto Pimpinan</label>
  46:               <input type="text" id="leader-photo-url" class="form-control mb-2 profil-input" data-key="leader_photo" value="${data.leader_photo || ''}" readonly placeholder="URL foto akan terisi setelah upload">
  47:               <input type="file" id="leader-photo-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  48:               <input type="hidden" id="leader-photo-public-id" class="profil-input" data-key="leader_photo_public_id" value="${data.leader_photoMeta ? data.leader_photoMeta.publicId : ''}">
  49:               <input type="hidden" id="leader-photo-provider" class="profil-input" data-key="leader_photo_provider" value="${data.leader_photoMeta ? data.leader_photoMeta.provider : ''}">
```
### File: Module_Profil.html, Line: 42
**Escaped:** No
```javascript
  32:             </div>
  33:             <div class="form-group">
  34:               <label class="form-label">Jabatan</label>
  35:               <input type="text" class="form-control profil-input" data-key="leader_position" value="${data.leader_position || ''}">
  36:             </div>
  37:             <div class="form-group" style="grid-column: 1 / -1;">
  38:               <label class="form-label">Kata Sambutan</label>
  39:               <textarea class="form-control profil-input" data-key="leader_sambutan" style="min-height:100px">${data.leader_sambutan || ''}</textarea>
  40:             </div>
  41:             <div class="form-group" style="grid-column: 1 / -1;">
> 42:               <div id="leader-photo-preview" class="image-preview mb-4 ${data.leader_photo ? '' : 'hidden'}">
  43:                 <img src="${CMS_UI.getDriveImageUrl(data.leader_photo) || data.leader_photo || ''}" style="max-width:200px; border-radius:8px;">
  44:               </div>
  45:               <label class="form-label">Foto Pimpinan</label>
  46:               <input type="text" id="leader-photo-url" class="form-control mb-2 profil-input" data-key="leader_photo" value="${data.leader_photo || ''}" readonly placeholder="URL foto akan terisi setelah upload">
  47:               <input type="file" id="leader-photo-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  48:               <input type="hidden" id="leader-photo-public-id" class="profil-input" data-key="leader_photo_public_id" value="${data.leader_photoMeta ? data.leader_photoMeta.publicId : ''}">
  49:               <input type="hidden" id="leader-photo-provider" class="profil-input" data-key="leader_photo_provider" value="${data.leader_photoMeta ? data.leader_photoMeta.provider : ''}">
  50:             </div>
  51:           </div>
  52:         </div>
```
### File: Module_Profil.html, Line: 46
**Escaped:** No
```javascript
  36:             </div>
  37:             <div class="form-group" style="grid-column: 1 / -1;">
  38:               <label class="form-label">Kata Sambutan</label>
  39:               <textarea class="form-control profil-input" data-key="leader_sambutan" style="min-height:100px">${data.leader_sambutan || ''}</textarea>
  40:             </div>
  41:             <div class="form-group" style="grid-column: 1 / -1;">
  42:               <div id="leader-photo-preview" class="image-preview mb-4 ${data.leader_photo ? '' : 'hidden'}">
  43:                 <img src="${CMS_UI.getDriveImageUrl(data.leader_photo) || data.leader_photo || ''}" style="max-width:200px; border-radius:8px;">
  44:               </div>
  45:               <label class="form-label">Foto Pimpinan</label>
> 46:               <input type="text" id="leader-photo-url" class="form-control mb-2 profil-input" data-key="leader_photo" value="${data.leader_photo || ''}" readonly placeholder="URL foto akan terisi setelah upload">
  47:               <input type="file" id="leader-photo-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  48:               <input type="hidden" id="leader-photo-public-id" class="profil-input" data-key="leader_photo_public_id" value="${data.leader_photoMeta ? data.leader_photoMeta.publicId : ''}">
  49:               <input type="hidden" id="leader-photo-provider" class="profil-input" data-key="leader_photo_provider" value="${data.leader_photoMeta ? data.leader_photoMeta.provider : ''}">
  50:             </div>
  51:           </div>
  52:         </div>
  53:         
  54:         <!-- SECTION 2: VILLAGE PROFILE -->
  55:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  56:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Identitas Kelurahan</h3>
```
### File: Module_Profil.html, Line: 48
**Escaped:** No
```javascript
  38:               <label class="form-label">Kata Sambutan</label>
  39:               <textarea class="form-control profil-input" data-key="leader_sambutan" style="min-height:100px">${data.leader_sambutan || ''}</textarea>
  40:             </div>
  41:             <div class="form-group" style="grid-column: 1 / -1;">
  42:               <div id="leader-photo-preview" class="image-preview mb-4 ${data.leader_photo ? '' : 'hidden'}">
  43:                 <img src="${CMS_UI.getDriveImageUrl(data.leader_photo) || data.leader_photo || ''}" style="max-width:200px; border-radius:8px;">
  44:               </div>
  45:               <label class="form-label">Foto Pimpinan</label>
  46:               <input type="text" id="leader-photo-url" class="form-control mb-2 profil-input" data-key="leader_photo" value="${data.leader_photo || ''}" readonly placeholder="URL foto akan terisi setelah upload">
  47:               <input type="file" id="leader-photo-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
> 48:               <input type="hidden" id="leader-photo-public-id" class="profil-input" data-key="leader_photo_public_id" value="${data.leader_photoMeta ? data.leader_photoMeta.publicId : ''}">
  49:               <input type="hidden" id="leader-photo-provider" class="profil-input" data-key="leader_photo_provider" value="${data.leader_photoMeta ? data.leader_photoMeta.provider : ''}">
  50:             </div>
  51:           </div>
  52:         </div>
  53:         
  54:         <!-- SECTION 2: VILLAGE PROFILE -->
  55:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  56:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Identitas Kelurahan</h3>
  57:           <div style="display:flex; flex-direction:column; gap:16px;">
  58:             <div class="form-group">
```
### File: Module_Profil.html, Line: 49
**Escaped:** No
```javascript
  39:               <textarea class="form-control profil-input" data-key="leader_sambutan" style="min-height:100px">${data.leader_sambutan || ''}</textarea>
  40:             </div>
  41:             <div class="form-group" style="grid-column: 1 / -1;">
  42:               <div id="leader-photo-preview" class="image-preview mb-4 ${data.leader_photo ? '' : 'hidden'}">
  43:                 <img src="${CMS_UI.getDriveImageUrl(data.leader_photo) || data.leader_photo || ''}" style="max-width:200px; border-radius:8px;">
  44:               </div>
  45:               <label class="form-label">Foto Pimpinan</label>
  46:               <input type="text" id="leader-photo-url" class="form-control mb-2 profil-input" data-key="leader_photo" value="${data.leader_photo || ''}" readonly placeholder="URL foto akan terisi setelah upload">
  47:               <input type="file" id="leader-photo-upload" accept="image/png, image/jpeg, image/webp" class="form-control" style="font-size:12px;">
  48:               <input type="hidden" id="leader-photo-public-id" class="profil-input" data-key="leader_photo_public_id" value="${data.leader_photoMeta ? data.leader_photoMeta.publicId : ''}">
> 49:               <input type="hidden" id="leader-photo-provider" class="profil-input" data-key="leader_photo_provider" value="${data.leader_photoMeta ? data.leader_photoMeta.provider : ''}">
  50:             </div>
  51:           </div>
  52:         </div>
  53:         
  54:         <!-- SECTION 2: VILLAGE PROFILE -->
  55:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  56:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Identitas Kelurahan</h3>
  57:           <div style="display:flex; flex-direction:column; gap:16px;">
  58:             <div class="form-group">
  59:               <label class="form-label">Visi</label>
```
### File: Module_Profil.html, Line: 60
**Escaped:** No
```javascript
  50:             </div>
  51:           </div>
  52:         </div>
  53:         
  54:         <!-- SECTION 2: VILLAGE PROFILE -->
  55:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  56:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Identitas Kelurahan</h3>
  57:           <div style="display:flex; flex-direction:column; gap:16px;">
  58:             <div class="form-group">
  59:               <label class="form-label">Visi</label>
> 60:               <textarea class="form-control profil-input" data-key="profile_vision" style="min-height:80px">${data.profile_vision || ''}</textarea>
  61:             </div>
  62:             <div class="form-group">
  63:               <label class="form-label">Misi</label>
  64:               <textarea class="form-control profil-input" data-key="profile_mission" style="min-height:100px">${data.profile_mission || ''}</textarea>
  65:             </div>
  66:             <div class="form-group">
  67:               <label class="form-label">Sejarah</label>
  68:               <textarea class="form-control profil-input" data-key="profile_history" style="min-height:150px">${data.profile_history || ''}</textarea>
  69:             </div>
  70:           </div>
```
### File: Module_Profil.html, Line: 64
**Escaped:** No
```javascript
  54:         <!-- SECTION 2: VILLAGE PROFILE -->
  55:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  56:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Identitas Kelurahan</h3>
  57:           <div style="display:flex; flex-direction:column; gap:16px;">
  58:             <div class="form-group">
  59:               <label class="form-label">Visi</label>
  60:               <textarea class="form-control profil-input" data-key="profile_vision" style="min-height:80px">${data.profile_vision || ''}</textarea>
  61:             </div>
  62:             <div class="form-group">
  63:               <label class="form-label">Misi</label>
> 64:               <textarea class="form-control profil-input" data-key="profile_mission" style="min-height:100px">${data.profile_mission || ''}</textarea>
  65:             </div>
  66:             <div class="form-group">
  67:               <label class="form-label">Sejarah</label>
  68:               <textarea class="form-control profil-input" data-key="profile_history" style="min-height:150px">${data.profile_history || ''}</textarea>
  69:             </div>
  70:           </div>
  71:         </div>
  72: 
  73:         <!-- SECTION 3: STATISTICS -->
  74:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
```
### File: Module_Profil.html, Line: 68
**Escaped:** No
```javascript
  58:             <div class="form-group">
  59:               <label class="form-label">Visi</label>
  60:               <textarea class="form-control profil-input" data-key="profile_vision" style="min-height:80px">${data.profile_vision || ''}</textarea>
  61:             </div>
  62:             <div class="form-group">
  63:               <label class="form-label">Misi</label>
  64:               <textarea class="form-control profil-input" data-key="profile_mission" style="min-height:100px">${data.profile_mission || ''}</textarea>
  65:             </div>
  66:             <div class="form-group">
  67:               <label class="form-label">Sejarah</label>
> 68:               <textarea class="form-control profil-input" data-key="profile_history" style="min-height:150px">${data.profile_history || ''}</textarea>
  69:             </div>
  70:           </div>
  71:         </div>
  72: 
  73:         <!-- SECTION 3: STATISTICS -->
  74:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  75:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Statistik Demografi</h3>
  76:           <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
  77:             <div class="form-group">
  78:               <label class="form-label">Jumlah Penduduk</label>
```
### File: Module_Profil.html, Line: 79
**Escaped:** No
```javascript
  69:             </div>
  70:           </div>
  71:         </div>
  72: 
  73:         <!-- SECTION 3: STATISTICS -->
  74:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  75:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Statistik Demografi</h3>
  76:           <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
  77:             <div class="form-group">
  78:               <label class="form-label">Jumlah Penduduk</label>
> 79:               <input type="number" class="form-control profil-input" data-key="stat_population" value="${data.stat_population || '0'}">
  80:             </div>
  81:             <div class="form-group">
  82:               <label class="form-label">Jumlah Kepala Keluarga (KK)</label>
  83:               <input type="number" class="form-control profil-input" data-key="stat_households" value="${data.stat_households || '0'}">
  84:             </div>
  85:             <div class="form-group">
  86:               <label class="form-label">Laki-laki</label>
  87:               <input type="number" class="form-control profil-input" data-key="stat_male" value="${data.stat_male || '0'}">
  88:             </div>
  89:             <div class="form-group">
```
### File: Module_Profil.html, Line: 83
**Escaped:** No
```javascript
  73:         <!-- SECTION 3: STATISTICS -->
  74:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  75:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Statistik Demografi</h3>
  76:           <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
  77:             <div class="form-group">
  78:               <label class="form-label">Jumlah Penduduk</label>
  79:               <input type="number" class="form-control profil-input" data-key="stat_population" value="${data.stat_population || '0'}">
  80:             </div>
  81:             <div class="form-group">
  82:               <label class="form-label">Jumlah Kepala Keluarga (KK)</label>
> 83:               <input type="number" class="form-control profil-input" data-key="stat_households" value="${data.stat_households || '0'}">
  84:             </div>
  85:             <div class="form-group">
  86:               <label class="form-label">Laki-laki</label>
  87:               <input type="number" class="form-control profil-input" data-key="stat_male" value="${data.stat_male || '0'}">
  88:             </div>
  89:             <div class="form-group">
  90:               <label class="form-label">Perempuan</label>
  91:               <input type="number" class="form-control profil-input" data-key="stat_female" value="${data.stat_female || '0'}">
  92:             </div>
  93:             <div class="form-group">
```
### File: Module_Profil.html, Line: 87
**Escaped:** No
```javascript
  77:             <div class="form-group">
  78:               <label class="form-label">Jumlah Penduduk</label>
  79:               <input type="number" class="form-control profil-input" data-key="stat_population" value="${data.stat_population || '0'}">
  80:             </div>
  81:             <div class="form-group">
  82:               <label class="form-label">Jumlah Kepala Keluarga (KK)</label>
  83:               <input type="number" class="form-control profil-input" data-key="stat_households" value="${data.stat_households || '0'}">
  84:             </div>
  85:             <div class="form-group">
  86:               <label class="form-label">Laki-laki</label>
> 87:               <input type="number" class="form-control profil-input" data-key="stat_male" value="${data.stat_male || '0'}">
  88:             </div>
  89:             <div class="form-group">
  90:               <label class="form-label">Perempuan</label>
  91:               <input type="number" class="form-control profil-input" data-key="stat_female" value="${data.stat_female || '0'}">
  92:             </div>
  93:             <div class="form-group">
  94:               <label class="form-label">Jumlah RT</label>
  95:               <input type="number" class="form-control profil-input" data-key="stat_rt" value="${data.stat_rt || '0'}">
  96:             </div>
  97:             <div class="form-group">
```
### File: Module_Profil.html, Line: 91
**Escaped:** No
```javascript
  81:             <div class="form-group">
  82:               <label class="form-label">Jumlah Kepala Keluarga (KK)</label>
  83:               <input type="number" class="form-control profil-input" data-key="stat_households" value="${data.stat_households || '0'}">
  84:             </div>
  85:             <div class="form-group">
  86:               <label class="form-label">Laki-laki</label>
  87:               <input type="number" class="form-control profil-input" data-key="stat_male" value="${data.stat_male || '0'}">
  88:             </div>
  89:             <div class="form-group">
  90:               <label class="form-label">Perempuan</label>
> 91:               <input type="number" class="form-control profil-input" data-key="stat_female" value="${data.stat_female || '0'}">
  92:             </div>
  93:             <div class="form-group">
  94:               <label class="form-label">Jumlah RT</label>
  95:               <input type="number" class="form-control profil-input" data-key="stat_rt" value="${data.stat_rt || '0'}">
  96:             </div>
  97:             <div class="form-group">
  98:               <label class="form-label">Jumlah RW</label>
  99:               <input type="number" class="form-control profil-input" data-key="stat_rw" value="${data.stat_rw || '0'}">
  100:             </div>
  101:             <div class="form-group">
```
### File: Module_Profil.html, Line: 95
**Escaped:** No
```javascript
  85:             <div class="form-group">
  86:               <label class="form-label">Laki-laki</label>
  87:               <input type="number" class="form-control profil-input" data-key="stat_male" value="${data.stat_male || '0'}">
  88:             </div>
  89:             <div class="form-group">
  90:               <label class="form-label">Perempuan</label>
  91:               <input type="number" class="form-control profil-input" data-key="stat_female" value="${data.stat_female || '0'}">
  92:             </div>
  93:             <div class="form-group">
  94:               <label class="form-label">Jumlah RT</label>
> 95:               <input type="number" class="form-control profil-input" data-key="stat_rt" value="${data.stat_rt || '0'}">
  96:             </div>
  97:             <div class="form-group">
  98:               <label class="form-label">Jumlah RW</label>
  99:               <input type="number" class="form-control profil-input" data-key="stat_rw" value="${data.stat_rw || '0'}">
  100:             </div>
  101:             <div class="form-group">
  102:               <label class="form-label">Luas Wilayah (Ha)</label>
  103:               <input type="text" class="form-control profil-input" data-key="stat_area" value="${data.stat_area || '0'}">
  104:             </div>
  105:           </div>
```
### File: Module_Profil.html, Line: 99
**Escaped:** No
```javascript
  89:             <div class="form-group">
  90:               <label class="form-label">Perempuan</label>
  91:               <input type="number" class="form-control profil-input" data-key="stat_female" value="${data.stat_female || '0'}">
  92:             </div>
  93:             <div class="form-group">
  94:               <label class="form-label">Jumlah RT</label>
  95:               <input type="number" class="form-control profil-input" data-key="stat_rt" value="${data.stat_rt || '0'}">
  96:             </div>
  97:             <div class="form-group">
  98:               <label class="form-label">Jumlah RW</label>
> 99:               <input type="number" class="form-control profil-input" data-key="stat_rw" value="${data.stat_rw || '0'}">
  100:             </div>
  101:             <div class="form-group">
  102:               <label class="form-label">Luas Wilayah (Ha)</label>
  103:               <input type="text" class="form-control profil-input" data-key="stat_area" value="${data.stat_area || '0'}">
  104:             </div>
  105:           </div>
  106:         </div>
  107: 
  108:         <!-- SECTION 4: OPERATIONAL -->
  109:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
```
### File: Module_Profil.html, Line: 103
**Escaped:** No
```javascript
  93:             <div class="form-group">
  94:               <label class="form-label">Jumlah RT</label>
  95:               <input type="number" class="form-control profil-input" data-key="stat_rt" value="${data.stat_rt || '0'}">
  96:             </div>
  97:             <div class="form-group">
  98:               <label class="form-label">Jumlah RW</label>
  99:               <input type="number" class="form-control profil-input" data-key="stat_rw" value="${data.stat_rw || '0'}">
  100:             </div>
  101:             <div class="form-group">
  102:               <label class="form-label">Luas Wilayah (Ha)</label>
> 103:               <input type="text" class="form-control profil-input" data-key="stat_area" value="${data.stat_area || '0'}">
  104:             </div>
  105:           </div>
  106:         </div>
  107: 
  108:         <!-- SECTION 4: OPERATIONAL -->
  109:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  110:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Informasi Operasional</h3>
  111:           <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
  112:             <div class="form-group">
  113:               <label class="form-label">Hari Pelayanan</label>
```
### File: Module_Profil.html, Line: 114
**Escaped:** No
```javascript
  104:             </div>
  105:           </div>
  106:         </div>
  107: 
  108:         <!-- SECTION 4: OPERATIONAL -->
  109:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  110:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Informasi Operasional</h3>
  111:           <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
  112:             <div class="form-group">
  113:               <label class="form-label">Hari Pelayanan</label>
> 114:               <input type="text" class="form-control profil-input" data-key="op_days" value="${data.op_days || 'Senin - Jumat'}">
  115:             </div>
  116:             <div class="form-group">
  117:               <label class="form-label">Jam Operasional</label>
  118:               <input type="text" class="form-control profil-input" data-key="op_hours" value="${data.op_hours || '08:00 - 16:00'}">
  119:             </div>
  120:             <div class="form-group">
  121:               <label class="form-label">Email Kantor</label>
  122:               <input type="email" class="form-control profil-input" data-key="op_email" value="${data.op_email || ''}">
  123:             </div>
  124:             <div class="form-group">
```
### File: Module_Profil.html, Line: 118
**Escaped:** No
```javascript
  108:         <!-- SECTION 4: OPERATIONAL -->
  109:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  110:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Informasi Operasional</h3>
  111:           <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
  112:             <div class="form-group">
  113:               <label class="form-label">Hari Pelayanan</label>
  114:               <input type="text" class="form-control profil-input" data-key="op_days" value="${data.op_days || 'Senin - Jumat'}">
  115:             </div>
  116:             <div class="form-group">
  117:               <label class="form-label">Jam Operasional</label>
> 118:               <input type="text" class="form-control profil-input" data-key="op_hours" value="${data.op_hours || '08:00 - 16:00'}">
  119:             </div>
  120:             <div class="form-group">
  121:               <label class="form-label">Email Kantor</label>
  122:               <input type="email" class="form-control profil-input" data-key="op_email" value="${data.op_email || ''}">
  123:             </div>
  124:             <div class="form-group">
  125:               <label class="form-label">Telepon Utama</label>
  126:               <input type="text" class="form-control profil-input" data-key="op_phone" value="${data.op_phone || ''}">
  127:             </div>
  128:             <div class="form-group">
```
### File: Module_Profil.html, Line: 122
**Escaped:** No
```javascript
  112:             <div class="form-group">
  113:               <label class="form-label">Hari Pelayanan</label>
  114:               <input type="text" class="form-control profil-input" data-key="op_days" value="${data.op_days || 'Senin - Jumat'}">
  115:             </div>
  116:             <div class="form-group">
  117:               <label class="form-label">Jam Operasional</label>
  118:               <input type="text" class="form-control profil-input" data-key="op_hours" value="${data.op_hours || '08:00 - 16:00'}">
  119:             </div>
  120:             <div class="form-group">
  121:               <label class="form-label">Email Kantor</label>
> 122:               <input type="email" class="form-control profil-input" data-key="op_email" value="${data.op_email || ''}">
  123:             </div>
  124:             <div class="form-group">
  125:               <label class="form-label">Telepon Utama</label>
  126:               <input type="text" class="form-control profil-input" data-key="op_phone" value="${data.op_phone || ''}">
  127:             </div>
  128:             <div class="form-group">
  129:               <label class="form-label">WhatsApp</label>
  130:               <input type="text" class="form-control profil-input" data-key="op_whatsapp" value="${data.op_whatsapp || ''}" placeholder="Gunakan kode negara (misal: 6281234567890)">
  131:             </div>
  132:             <div class="form-group" style="grid-column: 1 / -1;">
```
### File: Module_Profil.html, Line: 126
**Escaped:** No
```javascript
  116:             <div class="form-group">
  117:               <label class="form-label">Jam Operasional</label>
  118:               <input type="text" class="form-control profil-input" data-key="op_hours" value="${data.op_hours || '08:00 - 16:00'}">
  119:             </div>
  120:             <div class="form-group">
  121:               <label class="form-label">Email Kantor</label>
  122:               <input type="email" class="form-control profil-input" data-key="op_email" value="${data.op_email || ''}">
  123:             </div>
  124:             <div class="form-group">
  125:               <label class="form-label">Telepon Utama</label>
> 126:               <input type="text" class="form-control profil-input" data-key="op_phone" value="${data.op_phone || ''}">
  127:             </div>
  128:             <div class="form-group">
  129:               <label class="form-label">WhatsApp</label>
  130:               <input type="text" class="form-control profil-input" data-key="op_whatsapp" value="${data.op_whatsapp || ''}" placeholder="Gunakan kode negara (misal: 6281234567890)">
  131:             </div>
  132:             <div class="form-group" style="grid-column: 1 / -1;">
  133:               <label class="form-label">Alamat Lengkap</label>
  134:               <textarea class="form-control profil-input" data-key="op_address" rows="2">${data.op_address || ''}</textarea>
  135:             </div>
  136:             <div class="form-group" style="grid-column: 1 / -1;">
```
### File: Module_Profil.html, Line: 130
**Escaped:** No
```javascript
  120:             <div class="form-group">
  121:               <label class="form-label">Email Kantor</label>
  122:               <input type="email" class="form-control profil-input" data-key="op_email" value="${data.op_email || ''}">
  123:             </div>
  124:             <div class="form-group">
  125:               <label class="form-label">Telepon Utama</label>
  126:               <input type="text" class="form-control profil-input" data-key="op_phone" value="${data.op_phone || ''}">
  127:             </div>
  128:             <div class="form-group">
  129:               <label class="form-label">WhatsApp</label>
> 130:               <input type="text" class="form-control profil-input" data-key="op_whatsapp" value="${data.op_whatsapp || ''}" placeholder="Gunakan kode negara (misal: 6281234567890)">
  131:             </div>
  132:             <div class="form-group" style="grid-column: 1 / -1;">
  133:               <label class="form-label">Alamat Lengkap</label>
  134:               <textarea class="form-control profil-input" data-key="op_address" rows="2">${data.op_address || ''}</textarea>
  135:             </div>
  136:             <div class="form-group" style="grid-column: 1 / -1;">
  137:               <label class="form-label">Link Google Maps (Bukan Embed)</label>
  138:               <input type="text" class="form-control profil-input" data-key="op_maps" value="${data.op_maps || ''}">
  139:             </div>
  140:           </div>
```
### File: Module_Profil.html, Line: 134
**Escaped:** No
```javascript
  124:             <div class="form-group">
  125:               <label class="form-label">Telepon Utama</label>
  126:               <input type="text" class="form-control profil-input" data-key="op_phone" value="${data.op_phone || ''}">
  127:             </div>
  128:             <div class="form-group">
  129:               <label class="form-label">WhatsApp</label>
  130:               <input type="text" class="form-control profil-input" data-key="op_whatsapp" value="${data.op_whatsapp || ''}" placeholder="Gunakan kode negara (misal: 6281234567890)">
  131:             </div>
  132:             <div class="form-group" style="grid-column: 1 / -1;">
  133:               <label class="form-label">Alamat Lengkap</label>
> 134:               <textarea class="form-control profil-input" data-key="op_address" rows="2">${data.op_address || ''}</textarea>
  135:             </div>
  136:             <div class="form-group" style="grid-column: 1 / -1;">
  137:               <label class="form-label">Link Google Maps (Bukan Embed)</label>
  138:               <input type="text" class="form-control profil-input" data-key="op_maps" value="${data.op_maps || ''}">
  139:             </div>
  140:           </div>
  141:         </div>
  142:         
  143:         <!-- SECTION 5: SOCIAL MEDIA -->
  144:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
```
### File: Module_Profil.html, Line: 138
**Escaped:** No
```javascript
  128:             <div class="form-group">
  129:               <label class="form-label">WhatsApp</label>
  130:               <input type="text" class="form-control profil-input" data-key="op_whatsapp" value="${data.op_whatsapp || ''}" placeholder="Gunakan kode negara (misal: 6281234567890)">
  131:             </div>
  132:             <div class="form-group" style="grid-column: 1 / -1;">
  133:               <label class="form-label">Alamat Lengkap</label>
  134:               <textarea class="form-control profil-input" data-key="op_address" rows="2">${data.op_address || ''}</textarea>
  135:             </div>
  136:             <div class="form-group" style="grid-column: 1 / -1;">
  137:               <label class="form-label">Link Google Maps (Bukan Embed)</label>
> 138:               <input type="text" class="form-control profil-input" data-key="op_maps" value="${data.op_maps || ''}">
  139:             </div>
  140:           </div>
  141:         </div>
  142:         
  143:         <!-- SECTION 5: SOCIAL MEDIA -->
  144:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  145:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Sosial Media</h3>
  146:           <div style="display:grid; grid-template-columns:1fr; gap:16px;">
  147:             <div class="form-group">
  148:               <label class="form-label">Link Facebook</label>
```
### File: Module_Profil.html, Line: 149
**Escaped:** No
```javascript
  139:             </div>
  140:           </div>
  141:         </div>
  142:         
  143:         <!-- SECTION 5: SOCIAL MEDIA -->
  144:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  145:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Sosial Media</h3>
  146:           <div style="display:grid; grid-template-columns:1fr; gap:16px;">
  147:             <div class="form-group">
  148:               <label class="form-label">Link Facebook</label>
> 149:               <input type="text" class="form-control profil-input" data-key="soc_facebook" value="${data.soc_facebook || ''}">
  150:             </div>
  151:             <div class="form-group">
  152:               <label class="form-label">Link Instagram</label>
  153:               <input type="text" class="form-control profil-input" data-key="soc_instagram" value="${data.soc_instagram || ''}">
  154:             </div>
  155:             <div class="form-group">
  156:               <label class="form-label">Link YouTube</label>
  157:               <input type="text" class="form-control profil-input" data-key="soc_youtube" value="${data.soc_youtube || ''}">
  158:             </div>
  159:           </div>
```
### File: Module_Profil.html, Line: 153
**Escaped:** No
```javascript
  143:         <!-- SECTION 5: SOCIAL MEDIA -->
  144:         <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0;">
  145:           <h3 style="margin:0 0 16px; font-size:16px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Sosial Media</h3>
  146:           <div style="display:grid; grid-template-columns:1fr; gap:16px;">
  147:             <div class="form-group">
  148:               <label class="form-label">Link Facebook</label>
  149:               <input type="text" class="form-control profil-input" data-key="soc_facebook" value="${data.soc_facebook || ''}">
  150:             </div>
  151:             <div class="form-group">
  152:               <label class="form-label">Link Instagram</label>
> 153:               <input type="text" class="form-control profil-input" data-key="soc_instagram" value="${data.soc_instagram || ''}">
  154:             </div>
  155:             <div class="form-group">
  156:               <label class="form-label">Link YouTube</label>
  157:               <input type="text" class="form-control profil-input" data-key="soc_youtube" value="${data.soc_youtube || ''}">
  158:             </div>
  159:           </div>
  160:         </div>
  161: 
  162:       </div>
  163:     `;
```
### File: Module_Profil.html, Line: 157
**Escaped:** No
```javascript
  147:             <div class="form-group">
  148:               <label class="form-label">Link Facebook</label>
  149:               <input type="text" class="form-control profil-input" data-key="soc_facebook" value="${data.soc_facebook || ''}">
  150:             </div>
  151:             <div class="form-group">
  152:               <label class="form-label">Link Instagram</label>
  153:               <input type="text" class="form-control profil-input" data-key="soc_instagram" value="${data.soc_instagram || ''}">
  154:             </div>
  155:             <div class="form-group">
  156:               <label class="form-label">Link YouTube</label>
> 157:               <input type="text" class="form-control profil-input" data-key="soc_youtube" value="${data.soc_youtube || ''}">
  158:             </div>
  159:           </div>
  160:         </div>
  161: 
  162:       </div>
  163:     `;
  164:     
  165:     container.innerHTML = html;
  166:     
  167:     document.getElementById('leader-photo-upload').onchange = async (e) => {
```
### File: Module_Profil.html, Line: 165
**Escaped:** No
```javascript
  155:             <div class="form-group">
  156:               <label class="form-label">Link YouTube</label>
  157:               <input type="text" class="form-control profil-input" data-key="soc_youtube" value="${data.soc_youtube || ''}">
  158:             </div>
  159:           </div>
  160:         </div>
  161: 
  162:       </div>
  163:     `;
  164:     
> 165:     container.innerHTML = html;
  166:     
  167:     document.getElementById('leader-photo-upload').onchange = async (e) => {
  168:       const file = e.target.files[0];
  169:       if (!file) return;
  170:       CMS_UI.showLoader('Mengupload foto pimpinan...');
  171:       try {
  172:         const res = await CMS_API.uploadMedia(file, 'Profil');
  173:         document.getElementById('leader-photo-url').value = res.fileUrl;
  174:         document.getElementById('leader-photo-public-id').value = res.publicId;
  175:         document.getElementById('leader-photo-provider').value = res.provider;
```
### File: Module_Profil.html, Line: 177
**Escaped:** No
```javascript
  167:     document.getElementById('leader-photo-upload').onchange = async (e) => {
  168:       const file = e.target.files[0];
  169:       if (!file) return;
  170:       CMS_UI.showLoader('Mengupload foto pimpinan...');
  171:       try {
  172:         const res = await CMS_API.uploadMedia(file, 'Profil');
  173:         document.getElementById('leader-photo-url').value = res.fileUrl;
  174:         document.getElementById('leader-photo-public-id').value = res.publicId;
  175:         document.getElementById('leader-photo-provider').value = res.provider;
  176:         document.getElementById('leader-photo-preview').classList.remove('hidden');
> 177:         document.getElementById('leader-photo-preview').innerHTML = `<img src="${res.fileUrl}" style="max-width:200px; border-radius:8px;">`;
  178:         CMS_UI.toast('Foto berhasil diupload');
  179:       } catch(err) {
  180:         CMS_UI.toast(err.message, 'error');
  181:       } finally {
  182:         CMS_UI.hideLoader();
  183:       }
  184:     };
  185: 
  186:     document.getElementById('profil-btn-save').onclick = async () => {
  187:       const inputs = document.querySelectorAll('.profil-input');
```
### File: Module_Profil.html, Line: 206
**Escaped:** No
```javascript
  196:         CMS_UI.toast('Profil berhasil disimpan');
  197:       } catch(e) {
  198:         CMS_UI.toast(e.message, 'error');
  199:       } finally {
  200:         CMS_UI.hideLoader();
  201:       }
  202:     };
  203:   }
  204: 
  205:   function render(container) {
> 206:     container.innerHTML = `
  207:       <section>
  208:         <div class="page-heading">
  209:           <div>
  210:             <p class="eyebrow">CMS INTERNAL</p>
  211:             <h1>Profil Kelurahan</h1>
  212:             <p>Kelola data profil, sambutan, visi misi, statistik, dan operasional.</p>
  213:           </div>
  214:         </div>
  215:         <div id="profil-content"></div>
  216:       </section>
```
### File: Module_Sampah.html, Line: 36
**Escaped:** No
```javascript
  26:             </tr>
  27:           </thead>
  28:           <tbody>
  29:     `;
  30:     
  31:     if (items.length === 0) {
  32:       html += `<tr><td colspan="4" style="text-align:center; padding:30px;">Belum ada data yang terhapus di tempat sampah.</td></tr>`;
  33:     } else {
  34:       html += items.map(item => `
  35:         <tr>
> 36:           <td><span class="badge badge-warning">${item.sheet}</span></td>
  37:           <td><strong>${item.title}</strong></td>
  38:           <td>${new Date(item.deleted_at).toLocaleString('id-ID')}</td>
  39:           <td>
  40:             <button class="btn btn-primary btn-restore" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Restore</button>
  41:             <button class="btn btn-danger btn-hard-delete" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Hapus Permanen</button>
  42:           </td>
  43:         </tr>
  44:       `).join('');
  45:     }
  46:     
```
### File: Module_Sampah.html, Line: 37
**Escaped:** No
```javascript
  27:           </thead>
  28:           <tbody>
  29:     `;
  30:     
  31:     if (items.length === 0) {
  32:       html += `<tr><td colspan="4" style="text-align:center; padding:30px;">Belum ada data yang terhapus di tempat sampah.</td></tr>`;
  33:     } else {
  34:       html += items.map(item => `
  35:         <tr>
  36:           <td><span class="badge badge-warning">${item.sheet}</span></td>
> 37:           <td><strong>${item.title}</strong></td>
  38:           <td>${new Date(item.deleted_at).toLocaleString('id-ID')}</td>
  39:           <td>
  40:             <button class="btn btn-primary btn-restore" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Restore</button>
  41:             <button class="btn btn-danger btn-hard-delete" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Hapus Permanen</button>
  42:           </td>
  43:         </tr>
  44:       `).join('');
  45:     }
  46:     
  47:     html += `</tbody></table></div>`;
```
### File: Module_Sampah.html, Line: 40
**Escaped:** No
```javascript
  30:     
  31:     if (items.length === 0) {
  32:       html += `<tr><td colspan="4" style="text-align:center; padding:30px;">Belum ada data yang terhapus di tempat sampah.</td></tr>`;
  33:     } else {
  34:       html += items.map(item => `
  35:         <tr>
  36:           <td><span class="badge badge-warning">${item.sheet}</span></td>
  37:           <td><strong>${item.title}</strong></td>
  38:           <td>${new Date(item.deleted_at).toLocaleString('id-ID')}</td>
  39:           <td>
> 40:             <button class="btn btn-primary btn-restore" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Restore</button>
  41:             <button class="btn btn-danger btn-hard-delete" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Hapus Permanen</button>
  42:           </td>
  43:         </tr>
  44:       `).join('');
  45:     }
  46:     
  47:     html += `</tbody></table></div>`;
  48:     
  49:     const contentDiv = document.getElementById('sampah-content');
  50:     contentDiv.innerHTML = html;
```
### File: Module_Sampah.html, Line: 41
**Escaped:** No
```javascript
  31:     if (items.length === 0) {
  32:       html += `<tr><td colspan="4" style="text-align:center; padding:30px;">Belum ada data yang terhapus di tempat sampah.</td></tr>`;
  33:     } else {
  34:       html += items.map(item => `
  35:         <tr>
  36:           <td><span class="badge badge-warning">${item.sheet}</span></td>
  37:           <td><strong>${item.title}</strong></td>
  38:           <td>${new Date(item.deleted_at).toLocaleString('id-ID')}</td>
  39:           <td>
  40:             <button class="btn btn-primary btn-restore" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Restore</button>
> 41:             <button class="btn btn-danger btn-hard-delete" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Hapus Permanen</button>
  42:           </td>
  43:         </tr>
  44:       `).join('');
  45:     }
  46:     
  47:     html += `</tbody></table></div>`;
  48:     
  49:     const contentDiv = document.getElementById('sampah-content');
  50:     contentDiv.innerHTML = html;
  51:     
```
### File: Module_Sampah.html, Line: 50
**Escaped:** No
```javascript
  40:             <button class="btn btn-primary btn-restore" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Restore</button>
  41:             <button class="btn btn-danger btn-hard-delete" data-id="${item.id}" data-sheet="${item.sheet}" style="padding:4px 8px; font-size:12px;">Hapus Permanen</button>
  42:           </td>
  43:         </tr>
  44:       `).join('');
  45:     }
  46:     
  47:     html += `</tbody></table></div>`;
  48:     
  49:     const contentDiv = document.getElementById('sampah-content');
> 50:     contentDiv.innerHTML = html;
  51:     
  52:     contentDiv.querySelectorAll('.btn-restore').forEach(btn => {
  53:       btn.onclick = async () => {
  54:         const id = btn.dataset.id;
  55:         const sheet = btn.dataset.sheet;
  56:         CMS_UI.showLoader('Mengembalikan data...');
  57:         try {
  58:           await window.CMS_API.restoreRecord(sheet, id);
  59:           CMS_UI.toast('Data berhasil direstore');
  60:           loadData(container);
```
### File: Module_Sampah.html, Line: 91
**Escaped:** No
```javascript
  81:         } catch (e) {
  82:           CMS_UI.toast(e.message, 'error');
  83:         } finally {
  84:           CMS_UI.hideLoader();
  85:         }
  86:       };
  87:     });
  88:   }
  89: 
  90:   function render(container) {
> 91:     container.innerHTML = `
  92:       <section>
  93:         <div class="page-heading">
  94:           <div>
  95:             <p class="eyebrow">CMS INTERNAL</p>
  96:             <h1>Data Terhapus</h1>
  97:             <p>Data yang dihapus (soft delete) dapat direstore dari sini atau dihapus secara permanen.</p>
  98:           </div>
  99:         </div>
  100:         <div id="sampah-content"></div>
  101:       </section>
```