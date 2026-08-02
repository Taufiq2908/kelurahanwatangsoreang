# Final XSS Audit Report
This report contains all findings where untrusted data reaches the DOM or where XSS vulnerabilities were identified.

## Finding 1
- **Filename:** Module_Aparatur.html
- **Line Number:** 103
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 2
- **Filename:** Module_Aparatur.html
- **Line Number:** 147
- **Code Snippet:** `<input type="text" id="form-name" class="form-control" value="${data.name || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 3
- **Filename:** Module_Aparatur.html
- **Line Number:** 151
- **Code Snippet:** `<input type="text" id="form-nip" class="form-control" value="${data.nip || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 4
- **Filename:** Module_Aparatur.html
- **Line Number:** 155
- **Code Snippet:** `<input type="text" id="form-position" class="form-control" value="${data.position || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 5
- **Filename:** Module_Aparatur.html
- **Line Number:** 159
- **Code Snippet:** `<input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 6
- **Filename:** Module_Aparatur.html
- **Line Number:** 173
- **Code Snippet:** `<input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 7
- **Filename:** Module_Aparatur.html
- **Line Number:** 175
- **Code Snippet:** `<input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 8
- **Filename:** Module_Aparatur.html
- **Line Number:** 176
- **Code Snippet:** `<input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 9
- **Filename:** Module_Aparatur.html
- **Line Number:** 202
- **Code Snippet:** `previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:200px; border-radius:8px;">`;`
- **Attack Vector:** API response -> innerHTML -> partial escaping (Image Preview)
- **Severity:** HIGH
- **Recommended Fix:** Use DOM API (document.createElement) to set src attribute and textContent, avoiding innerHTML.

## Finding 10
- **Filename:** Module_Aspirasi.html
- **Line Number:** 125
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 11
- **Filename:** Module_Berita.html
- **Line Number:** 222
- **Code Snippet:** `<input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 12
- **Filename:** Module_Berita.html
- **Line Number:** 312
- **Code Snippet:** `previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:100%; border-radius:4px;"><div class="mt-2 text-sm text-surface-500 break-all">${res.fileUrl}</div>`;`
- **Attack Vector:** API response -> innerHTML -> partial escaping (Image Preview)
- **Severity:** HIGH
- **Recommended Fix:** Use DOM API (document.createElement) to set src attribute and textContent, avoiding innerHTML.

## Finding 13
- **Filename:** Module_Edukasi.html
- **Line Number:** 116
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 14
- **Filename:** Module_Edukasi.html
- **Line Number:** 170
- **Code Snippet:** `<input type="text" id="form-title" class="form-control" value="${data.title}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 15
- **Filename:** Module_Edukasi.html
- **Line Number:** 189
- **Code Snippet:** `<input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 16
- **Filename:** Module_Edukasi.html
- **Line Number:** 207
- **Code Snippet:** `<input type="text" id="form-tags" class="form-control" value="${data.tags || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 17
- **Filename:** Module_Edukasi.html
- **Line Number:** 211
- **Code Snippet:** `<input type="text" id="form-source" class="form-control" value="${data.source || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 18
- **Filename:** Module_Edukasi.html
- **Line Number:** 215
- **Code Snippet:** `<input type="text" id="form-image" class="form-control mb-2" value="${data.image || ''}" placeholder="https://...">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 19
- **Filename:** Module_Edukasi.html
- **Line Number:** 217
- **Code Snippet:** `<input type="hidden" id="form-image_public_id" value="${data.imageMeta ? data.imageMeta.publicId : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 20
- **Filename:** Module_Edukasi.html
- **Line Number:** 218
- **Code Snippet:** `<input type="hidden" id="form-image_provider" value="${data.imageMeta ? data.imageMeta.provider : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 21
- **Filename:** Module_Edukasi.html
- **Line Number:** 288
- **Code Snippet:** `previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:100%; border-radius:4px;"><div class="mt-2 text-sm text-surface-500 break-all">${res.fileUrl}</div>`;`
- **Attack Vector:** API response -> innerHTML -> partial escaping (Image Preview)
- **Severity:** HIGH
- **Recommended Fix:** Use DOM API (document.createElement) to set src attribute and textContent, avoiding innerHTML.

## Finding 22
- **Filename:** Module_FAQ.html
- **Line Number:** 95
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 23
- **Filename:** Module_FAQ.html
- **Line Number:** 139
- **Code Snippet:** `<input type="text" id="form-question" class="form-control" value="${data.question || ''}" placeholder="Tuliskan pertanyaan...">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 24
- **Filename:** Module_FAQ.html
- **Line Number:** 148
- **Code Snippet:** `<input type="text" id="form-category" class="form-control" value="${data.category || 'Umum'}" placeholder="Cth: Layanan, Kependudukan, Umum">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 25
- **Filename:** Module_Kontak.html
- **Line Number:** 112
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 26
- **Filename:** Module_Kontak.html
- **Line Number:** 168
- **Code Snippet:** `<input type="text" id="form-name" class="form-control" value="${data.name || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 27
- **Filename:** Module_Kontak.html
- **Line Number:** 172
- **Code Snippet:** `<input type="text" id="form-position" class="form-control" value="${data.position || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 28
- **Filename:** Module_Kontak.html
- **Line Number:** 176
- **Code Snippet:** `<input type="text" id="form-phone" class="form-control" value="${data.phone || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 29
- **Filename:** Module_Kontak.html
- **Line Number:** 180
- **Code Snippet:** `<input type="text" id="form-whatsapp" class="form-control" value="${data.whatsapp || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 30
- **Filename:** Module_Kontak.html
- **Line Number:** 184
- **Code Snippet:** `<input type="email" id="form-email" class="form-control" value="${data.email || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 31
- **Filename:** Module_Kontak.html
- **Line Number:** 188
- **Code Snippet:** `<input type="number" id="form-sort" class="form-control" value="${data.sort_order || '1'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 32
- **Filename:** Module_Kontak.html
- **Line Number:** 196
- **Code Snippet:** `<input type="text" id="form-maps" class="form-control" value="${data.maps || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 33
- **Filename:** Module_Kontak.html
- **Line Number:** 203
- **Code Snippet:** `<input type="text" id="form-photo" class="form-control mb-2" value="${data.photo || ''}" readonly placeholder="URL akan muncul setelah upload">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 34
- **Filename:** Module_Kontak.html
- **Line Number:** 205
- **Code Snippet:** `<input type="hidden" id="form-photo_public_id" value="${data.photoMeta ? data.photoMeta.publicId : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 35
- **Filename:** Module_Kontak.html
- **Line Number:** 206
- **Code Snippet:** `<input type="hidden" id="form-photo_provider" value="${data.photoMeta ? data.photoMeta.provider : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 36
- **Filename:** Module_Kontak.html
- **Line Number:** 232
- **Code Snippet:** `previewEl.innerHTML = `<img src="${res.fileUrl}" style="max-width:200px; border-radius:8px;">`;`
- **Attack Vector:** API response -> innerHTML -> partial escaping (Image Preview)
- **Severity:** HIGH
- **Recommended Fix:** Use DOM API (document.createElement) to set src attribute and textContent, avoiding innerHTML.

## Finding 37
- **Filename:** Module_Layanan.html
- **Line Number:** 108
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 38
- **Filename:** Module_Layanan.html
- **Line Number:** 159
- **Code Snippet:** `<input type="text" id="form-title" class="form-control" value="${data.title || ''}" placeholder="Cth: Pembuatan Surat Keterangan Domisili">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 39
- **Filename:** Module_Layanan.html
- **Line Number:** 172
- **Code Snippet:** `<input type="text" id="form-icon" class="form-control" value="${data.icon || 'file-text'}" placeholder="Cth: file-text, users, map-pin">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 40
- **Filename:** Module_Pengumuman.html
- **Line Number:** 113
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 41
- **Filename:** Module_Pengumuman.html
- **Line Number:** 164
- **Code Snippet:** `<input type="text" id="form-title" class="form-control" value="${data.title}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 42
- **Filename:** Module_Pengumuman.html
- **Line Number:** 183
- **Code Snippet:** `<input type="datetime-local" id="form-published-at" class="form-control" value="${data.published_at ? data.published_at.substring(0, 16) : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 43
- **Filename:** Module_Pengumuman.html
- **Line Number:** 188
- **Code Snippet:** `<input type="text" id="form-attachment" class="form-control mb-2" value="${data.attachment || ''}" placeholder="https://...">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 44
- **Filename:** Module_Pengumuman.html
- **Line Number:** 190
- **Code Snippet:** `<input type="hidden" id="form-attachment_public_id" value="${data.attachmentMeta ? data.attachmentMeta.publicId : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 45
- **Filename:** Module_Pengumuman.html
- **Line Number:** 191
- **Code Snippet:** `<input type="hidden" id="form-attachment_provider" value="${data.attachmentMeta ? data.attachmentMeta.provider : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 46
- **Filename:** Module_Peta_Categories.html
- **Line Number:** 74
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 47
- **Filename:** Module_Peta_Categories_Form.html
- **Line Number:** 49
- **Code Snippet:** `<input type="text" id="cat-form-name" class="form-control" value="${data.name || ''}" placeholder="Cth: Fasilitas Kesehatan">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 48
- **Filename:** Module_Peta_Categories_Form.html
- **Line Number:** 53
- **Code Snippet:** `<input type="text" id="cat-form-icon" class="form-control" value="${data.icon || ''}" placeholder="Cth: local_hospital">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 49
- **Filename:** Module_Peta_Categories_Form.html
- **Line Number:** 64
- **Code Snippet:** `<input type="number" id="cat-form-order" class="form-control" value="${data.display_order || '1'}" min="1">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 50
- **Filename:** Module_Peta_Form.html
- **Line Number:** 52
- **Code Snippet:** `<input type="text" id="form-name" class="input w-full" value="${data.name || ''}" required placeholder="Contoh: Kantor Kelurahan Watang Soreang">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 51
- **Filename:** Module_Peta_Form.html
- **Line Number:** 115
- **Code Snippet:** `<input type="text" id="form-latitude" class="input w-full font-mono text-sm" value="${data.latitude || ''}" required placeholder="-3.9955118">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 52
- **Filename:** Module_Peta_Form.html
- **Line Number:** 119
- **Code Snippet:** `<input type="text" id="form-longitude" class="input w-full font-mono text-sm" value="${data.longitude || ''}" required placeholder="119.6268884">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 53
- **Filename:** Module_Peta_Form.html
- **Line Number:** 149
- **Code Snippet:** `<input type="number" id="form-display-order" class="input w-full" value="${data.display_order || ''}" placeholder="Angka, misal: 1">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 54
- **Filename:** Module_Peta_List.html
- **Line Number:** 109
- **Code Snippet:** `container.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Finding 55
- **Filename:** Module_Profil.html
- **Line Number:** 31
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="leader_name" value="${data.leader_name || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 56
- **Filename:** Module_Profil.html
- **Line Number:** 35
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="leader_position" value="${data.leader_position || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 57
- **Filename:** Module_Profil.html
- **Line Number:** 46
- **Code Snippet:** `<input type="text" id="leader-photo-url" class="form-control mb-2 profil-input" data-key="leader_photo" value="${data.leader_photo || ''}" readonly placeholder="URL foto akan terisi setelah upload">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 58
- **Filename:** Module_Profil.html
- **Line Number:** 48
- **Code Snippet:** `<input type="hidden" id="leader-photo-public-id" class="profil-input" data-key="leader_photo_public_id" value="${data.leader_photoMeta ? data.leader_photoMeta.publicId : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 59
- **Filename:** Module_Profil.html
- **Line Number:** 49
- **Code Snippet:** `<input type="hidden" id="leader-photo-provider" class="profil-input" data-key="leader_photo_provider" value="${data.leader_photoMeta ? data.leader_photoMeta.provider : ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 60
- **Filename:** Module_Profil.html
- **Line Number:** 79
- **Code Snippet:** `<input type="number" class="form-control profil-input" data-key="stat_population" value="${data.stat_population || '0'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 61
- **Filename:** Module_Profil.html
- **Line Number:** 83
- **Code Snippet:** `<input type="number" class="form-control profil-input" data-key="stat_households" value="${data.stat_households || '0'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 62
- **Filename:** Module_Profil.html
- **Line Number:** 87
- **Code Snippet:** `<input type="number" class="form-control profil-input" data-key="stat_male" value="${data.stat_male || '0'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 63
- **Filename:** Module_Profil.html
- **Line Number:** 91
- **Code Snippet:** `<input type="number" class="form-control profil-input" data-key="stat_female" value="${data.stat_female || '0'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 64
- **Filename:** Module_Profil.html
- **Line Number:** 95
- **Code Snippet:** `<input type="number" class="form-control profil-input" data-key="stat_rt" value="${data.stat_rt || '0'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 65
- **Filename:** Module_Profil.html
- **Line Number:** 99
- **Code Snippet:** `<input type="number" class="form-control profil-input" data-key="stat_rw" value="${data.stat_rw || '0'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 66
- **Filename:** Module_Profil.html
- **Line Number:** 103
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="stat_area" value="${data.stat_area || '0'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 67
- **Filename:** Module_Profil.html
- **Line Number:** 114
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="op_days" value="${data.op_days || 'Senin - Jumat'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 68
- **Filename:** Module_Profil.html
- **Line Number:** 118
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="op_hours" value="${data.op_hours || '08:00 - 16:00'}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 69
- **Filename:** Module_Profil.html
- **Line Number:** 122
- **Code Snippet:** `<input type="email" class="form-control profil-input" data-key="op_email" value="${data.op_email || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 70
- **Filename:** Module_Profil.html
- **Line Number:** 126
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="op_phone" value="${data.op_phone || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 71
- **Filename:** Module_Profil.html
- **Line Number:** 130
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="op_whatsapp" value="${data.op_whatsapp || ''}" placeholder="Gunakan kode negara (misal: 6281234567890)">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 72
- **Filename:** Module_Profil.html
- **Line Number:** 138
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="op_maps" value="${data.op_maps || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 73
- **Filename:** Module_Profil.html
- **Line Number:** 149
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="soc_facebook" value="${data.soc_facebook || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 74
- **Filename:** Module_Profil.html
- **Line Number:** 153
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="soc_instagram" value="${data.soc_instagram || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 75
- **Filename:** Module_Profil.html
- **Line Number:** 157
- **Code Snippet:** `<input type="text" class="form-control profil-input" data-key="soc_youtube" value="${data.soc_youtube || ''}">`
- **Attack Vector:** User input -> attribute assignment
- **Severity:** MEDIUM
- **Recommended Fix:** Wrap the data field with CMS_UI.escapeHtml().

## Finding 76
- **Filename:** Module_Sampah.html
- **Line Number:** 50
- **Code Snippet:** `contentDiv.innerHTML = html;`
- **Attack Vector:** User input -> innerHTML -> no escaping (List Rendering)
- **Severity:** CRITICAL
- **Recommended Fix:** Wrap all ${item.field} expressions with CMS_UI.escapeHtml() inside the template literal.

## Task 7: Review sanitizeImageUrl()
### Current Implementation
The current implementation only rejects strings containing `<`, `>`, `"`, or `'`. This is an incomplete blocklist that fails to address URI scheme-based XSS vectors like `javascript:` or `data:`.
### Attack Vector
User input -> URL attribute (href/src) -> scheme execution (e.g. `javascript:alert(1)`)
### Severity
HIGH
### Recommended Fix
Use an allowlist approach to strictly permit only `http:` and `https:` schemes.
```javascript
function sanitizeImageUrl(value) {
    let original = String(value || "").trim();
    let sanitized = original;
    if (sanitized.includes("<") || sanitized.includes(">") || sanitized.includes('"') || sanitized.includes("'")) {
        sanitized = "";
    }
    
    // Allow only http: and https: schemes
    if (sanitized) {
        try {
            const url = new URL(sanitized);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                sanitized = "";
            }
        } catch (e) {
            // If it's not a valid URL (e.g. relative path), you can choose to allow or reject.
            // For strict external image URLs, reject it.
            sanitized = "";
        }
    }

    if (sanitized === "" && original !== "") {
        if (window.CMS_UI) CMS_UI.toast("URL gambar tidak valid.", "error");
    }
    return sanitized;
}
```