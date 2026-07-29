# Panduan Deployment — Kelurahan Watang Soreang

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React 18 + Vite 7 |
| Styling | Tailwind CSS v3 + shadcn/ui (New York) |
| Animasi | Framer Motion |
| Routing | React Router v7 |
| Data Statis | `src/data/*.js` |
| Data Dinamis | Google Sheets → Google Apps Script → fetch() |
| Weather API | Open-Meteo (no API key) |
| Hosting | GitHub Pages |

---

## Prasyarat

- Node.js 18+ (`node --version`)
- npm 9+

---

## Setup Lokal

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# 2. Install dependensi
npm install

# 3. Buat file environment
cp .env.example .env

# 4. Jalankan dev server
npm run dev
```

Buka http://localhost:5173

---

## Konfigurasi Environment

Edit file `.env`:

```env
# URL Google Apps Script Web App (kosongkan untuk gunakan data mock)
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Jika `VITE_GOOGLE_SCRIPT_URL` kosong, aplikasi otomatis menggunakan data mock lokal (mock data) yang sudah disediakan.

---

## Setup Google Apps Script (Opsional)

### 1. Buat Google Sheet

Buat sheet dengan tab berikut:

**Tab: Berita**
| id | slug | title | category | date | author | excerpt | content | image | status | readTime |

**Tab: Pengumuman**
| id | title | content | date | priority | category | status |

**Tab: Edukasi**
| id | slug | title | category | date | author | excerpt | content | image | tags | status | readTime |

**Tab: Aspirasi** (menerima laporan)
| code | category | location | description | date | status | notes | anonymous |

### 2. Deploy Google Apps Script

1. Buka Google Sheet → **Extensions → Apps Script**
2. Paste kode dari `docs/google-apps-script.js` (jika ada)
3. **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Salin URL deployment
5. Paste ke `.env` sebagai `VITE_GOOGLE_SCRIPT_URL`

### Format Response API

Apps Script harus mengembalikan:

```json
// Sukses (list)
{ "status": "ok", "data": [...] }

// Sukses (single item)
{ "status": "ok", "data": {...} }

// Error
{ "status": "error", "message": "..." }
```

### Endpoint yang Didukung

```
?action=getNews
?action=getNewsBySlug&slug=SLUG
?action=getAnnouncements
?action=getAnnouncementById&id=ID
?action=getClimateArticles
?action=getClimateArticleBySlug&slug=SLUG
?action=submitReport    (POST dengan JSON body)
?action=getReportStatus&code=LP-0001
```

---

## Build Production

```bash
# Build
npm run build

# Preview hasil build secara lokal
npm run preview
```

Output ada di folder `dist/`.

---

## Deploy ke GitHub Pages

### Opsi A: Manual

```bash
# Build
npm run build

# Deploy dist/ ke branch gh-pages
# Install gh-pages jika belum:
npm install -D gh-pages

# Tambah script di package.json:
# "deploy": "gh-pages -d dist"

npm run deploy
```

### Opsi B: GitHub Actions (Otomatis)

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_GOOGLE_SCRIPT_URL: ${{ secrets.VITE_GOOGLE_SCRIPT_URL }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Konfigurasi Base URL

Jika repository di `https://user.github.io/repo-name/` (bukan root domain):

Edit `vite.config.js`:

```js
base: '/repo-name/',
```

Jika di custom domain `watangsoreang.parepare.go.id` atau user GitHub Pages root (`user.github.io`):

```js
base: '/',
```

### Setting GitHub Pages

1. Repo GitHub → **Settings → Pages**
2. Source: **GitHub Actions** (jika pakai Actions) atau **Deploy from branch** → `gh-pages`
3. Jika pakai custom domain, tambahkan domain di kolom **Custom domain**
4. Centang **Enforce HTTPS**

### CNAME (Custom Domain)

Buat file `public/CNAME` berisi nama domain:

```
watangsoreang.parepare.go.id
```

---

## Struktur Folder Penting

```
src/
├── data/            ← Data statis (profil, layanan, FAQ, kontak, dll.)
│   ├── profile.js
│   ├── apparatus.js
│   ├── services.js
│   ├── faq.js
│   ├── contacts.js
│   ├── locations.js
│   └── quickMenuItems.js
│
├── services/        ← API layer (dynamic content)
│   ├── googleSheetApi.js   ← Berita, pengumuman, edukasi
│   ├── aspirasi.js         ← Submit & tracking laporan
│   ├── weatherApi.js       ← Open-Meteo weather
│   └── mockData.js         ← Data fallback saat API belum dikonfigurasi
│
├── hooks/           ← React data hooks
│   ├── useNews.js
│   ├── useAnnouncements.js
│   ├── useClimateArticles.js
│   └── useWeather.js
│
├── pages/           ← Halaman (lazy-loaded per route)
├── components/      ← Komponen UI
├── layouts/         ← Layout wrapper
└── utils/           ← Helper functions
```

---

## Memperbarui Konten Statis

Data yang tidak perlu server — edit langsung di `src/data/`:

| File | Konten |
|------|--------|
| `profile.js` | Profil kelurahan, statistik, sejarah, visi misi |
| `apparatus.js` | Data aparatur/pegawai |
| `services.js` | Daftar layanan + syarat + prosedur |
| `faq.js` | Pertanyaan umum + jawaban |
| `contacts.js` | Direktori kontak |
| `locations.js` | Direktori lokasi |

Setelah edit, jalankan `npm run build` lalu deploy ulang.

---

## Memperbarui Konten Dinamis

Untuk berita, pengumuman, dan edukasi — update langsung di Google Sheets. Perubahan otomatis tampil di website dalam 30 menit (waktu cache).

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Halaman 404 setelah refresh di GitHub Pages | Pastikan `public/404.html` ada di repo |
| Cuaca tidak tampil | Open-Meteo bisa down sementara. Website akan tetap berfungsi. |
| Berita/pengumuman tidak muncul | Cek `VITE_GOOGLE_SCRIPT_URL` di `.env`. Tanpa URL, data mock yang tampil. |
| Build error | Jalankan `npm install` lalu `npm run build` ulang |
| Navigasi dalam website tidak bekerja | Pastikan `base` di `vite.config.js` sesuai dengan path repository |

---

## Kontak Teknis

Untuk pertanyaan teknis mengenai pengelolaan website, hubungi tim pengembang.

Website dikembangkan sebagai bagian dari program digitalisasi layanan Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare, Sulawesi Selatan.
