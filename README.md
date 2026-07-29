# Kelurahan Watang Soreang Website

Website resmi Kelurahan Watang Soreang, Kota Parepare, Sulawesi Selatan. Dirancang untuk menjadi pusat informasi, layanan masyarakat, transparansi pemerintahan, dan portal edukasi hiperlokal.

## Overview

Aplikasi ini menggunakan arsitektur modern Jamstack yang digabungkan dengan **Google Apps Script** dan **Google Sheets** sebagai Headless CMS (Content Management System) yang gratis, mudah dikelola, dan familiar bagi aparatur desa.

## Features

- 📰 **Portal Berita & Pengumuman**: Update informasi hiperlokal dan pengumuman resmi.
- 🗺️ **Direktori Lokasi**: Peta interaktif fasilitas umum, sekolah, dan UMKM lokal.
- 📞 **Direktori Kontak**: Daftar kontak darurat, aparatur, dan RT/RW.
- 📝 **Layanan Publik & Aspirasi**: Panduan pengurusan surat-surat dan sistem pelaporan warga.
- 🌦️ **Info Cuaca Real-time**: Data cuaca hiperlokal untuk Parepare.
- 🌱 **Edukasi Iklim**: Artikel khusus mitigasi iklim, ketahanan bencana, dan lingkungan.

## Technology Stack

- **Framework:** React 18 (Vite)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + Vanilla CSS (Design System V2)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Mapping:** Leaflet & React Leaflet
- **Headless CMS:** Google Sheets & Google Apps Script
- **Deployment:** GitHub Pages / Vercel

## Project Structure

```
├── .env.example         # Environment variables template
├── index.html           # Main HTML entry
├── public/              # Static assets (Favicon, icons, manifests)
├── docs/                # Architecture and UX documentation
├── apps-script/         # Backend: Google Apps Script source code
├── src/
│   ├── assets/          # Project-specific static assets
│   ├── components/      # Reusable React components (Feature-based grouping)
│   ├── contexts/        # React context providers (e.g., SettingsContext)
│   ├── design/          # Design System tokens and principles
│   ├── hooks/           # Custom React hooks (Data fetching logic)
│   ├── layouts/         # Page layouts (MainLayout, Navbar, Footer)
│   ├── pages/           # Route-level components
│   ├── services/        # API integrations (Google Sheets, Open-Meteo)
│   └── utils/           # Utility functions (formatting, validation)
```

## Installation & Development

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/kelurahan-watang-soreang.git
cd kelurahan-watang-soreang
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the `.env.example` file to `.env` and configure your API URLs.
```bash
cp .env.example .env
```
Fill in the `VITE_GOOGLE_SHEET_API_URL` with your Google Apps Script deployment URL.

### 4. Run Development Server
```bash
npm run dev
```

## Build & Deployment

### Production Build
```bash
npm run build
```
This generates optimized static files in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

## System Architecture

The project is split into two primary environments:

### 1. Frontend (React / Vite)
Located in `src/`. This is a classic Jamstack application. It fetches data dynamically via standard REST APIs from the backend. The UI strictly follows a unified Design System (V2) to maintain a modern, editorial aesthetic.

### 2. Backend (Google Apps Script)
Located in `apps-script/`. This acts as a Headless CMS. 
- **Database:** Google Sheets is used to store structured data (Berita, Layanan, Peta).
- **Storage:** Google Drive handles image uploads.
- **API Engine:** Apps Script exposes `doGet` and `doPost` endpoints (`WebApp.js`) to serve JSON to the React frontend.
- **Admin Panel:** Apps Script also serves HTML pages (`CMS_UI.html`) directly as the internal Admin Dashboard for Kelurahan staff.

Untuk detail terkait User Experience CMS dan aturan desain, silakan baca `docs/CMS_UX_SPEC.md`.

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
