# AI PROJECT CONTEXT
## Sistem Informasi Digital Kelurahan Watang Soreang

---

# Project Status

Current Phase:
Google Apps Script CMS Development

Overall Progress:
Approximately 75% Complete

Public Website:
≈95% Complete

CMS:
Foundation Complete
CRUD Not Yet Implemented

---

# Project Overview

This project aims to build a modern digital information system for:

Kelurahan Watang Soreang
Kecamatan Soreang
Kota Parepare
Sulawesi Selatan
Indonesia

The system consists of two applications.

1. Public Website
2. Internal CMS

The objective is to create a modern, maintainable, responsive, mobile-first government information system that can continue to be maintained by future KKN students and village staff.

The entire system must remain simple, lightweight, and free to operate.

---

# Architecture

The architecture intentionally separates static data from dynamic data.

Static Information

Stored inside React source code.

Examples:

- Village profile
- History
- Vision & Mission
- Organizational Structure
- Officials
- Services
- FAQ
- Contact
- Location

These data rarely change.

Therefore they DO NOT use API.

This is an intentional architectural decision.

Dynamic Information

Managed by CMS.

Examples:

- News
- Announcements
- Climate Education Articles
- Public Reports (Aspirasi)
- Website Settings

These are served through Google Apps Script.

Weather uses Open-Meteo API.

---

# Technology Stack

## Public Website

React

Vite

Tailwind CSS

React Router

Framer Motion

Lucide Icons

Open-Meteo API

Google Apps Script API (planned)

GitHub Pages

---

## CMS

Google Apps Script

Spreadsheet

Drive

HtmlService

Vanilla JavaScript

Google Account Authentication

Google Drive Image Storage

Spreadsheet Database

---

# Public Website Status

Completed

✓ Homepage

✓ Responsive Design

✓ Mobile-first

✓ Profile

✓ Services

✓ FAQ

✓ Contacts

✓ Map

✓ News

✓ Announcements

✓ Climate Education

✓ Weather

✓ Aspirasi

✓ SEO

✓ Lazy Loading

✓ Route Splitting

✓ Dynamic Meta Tags

Current data source:

Mock Data

Future:

Google Apps Script API

---

# Google Apps Script Status

Completed

✓ setup()

✓ Spreadsheet Creation

✓ Drive Folder Creation

✓ Sheet Initialization

✓ Validation

✓ Logger

✓ Settings

✓ System Sheet

✓ Authentication

✓ Authorization

✓ HtmlService Shell

✓ Web Deployment

✓ Real Environment Testing

The setup() function has already been tested successfully inside Google Apps Script.

Deployment also works successfully.

Authentication has also been tested successfully.

Current CMS only contains placeholders.

No CRUD has been implemented yet.

---

# Current Apps Script Structure

apps-script/

Code.gs

Setup.gs

Config.gs

Database.gs

Drive.gs

Validation.gs

Utilities.gs

Logger.gs

Auth.gs

WebApp.gs

Index.html

App.html

Styles.html

AccessDenied.html

appsscript.json

---

# Google Spreadsheet Structure

Sheets

Berita

Pengumuman

Edukasi

Laporan

Settings

System

Log

Already generated automatically.

---

# Google Drive Structure

Website Kelurahan Watang Soreang

├── Berita

├── Pengumuman

├── Edukasi

├── Aparatur

└── Profil

Already generated automatically.

---

# Authentication

Google Account Authentication

Authorization based on Settings sheet.

Current implementation works.

Future improvement:

Users sheet

Role-based Access

Admin

Editor

Viewer

Do NOT implement role system yet unless requested.

---

# Design Philosophy

Modern

Minimal

Clean

Professional

Government

Accessible

Fast

Mobile Friendly

Avoid colorful dashboards.

Avoid excessive gradients.

Avoid heavy animations.

Use whitespace properly.

The design should feel similar to:

Firebase Console

Google Admin

Notion

Vercel Dashboard

GitHub

Linear

---

# Development Principles

Keep architecture clean.

Avoid duplication.

Avoid unnecessary abstractions.

Prefer reusable components.

Prefer maintainability over clever code.

Never hardcode repeated values.

Keep Google Apps Script modular.

Each file must have a single responsibility.

---

# Coding Rules

Never rewrite the architecture unless explicitly requested.

Do not rename existing files.

Do not remove existing modules.

Do not break setup().

Do not break deployment.

Do not change authentication flow.

Always preserve backward compatibility.

Always make incremental changes.

Never modify unrelated files.

---

# Current Priority

Priority 1

Modern CMS UI

Priority 2

Dashboard

Priority 3

News CRUD

Priority 4

Announcement CRUD

Priority 5

Climate Education CRUD

Priority 6

Report Management

Priority 7

Settings

Priority 8

REST API

Priority 9

Image Upload

---

# Current Technical Debt

Need reusable dashboard layout.

Need reusable modal system.

Need reusable table component.

Need reusable form validation.

Need reusable toast notification.

Need reusable loading component.

Need reusable pagination.

Need reusable image uploader.

Need reusable confirmation dialog.

---

# Expected CMS Features

Dashboard

Modern sidebar

Modern topbar

Statistics cards

Recent activity

Quick actions

News

List

Search

Filter

Create

Edit

Delete

Draft

Publish

Thumbnail Upload

Slug

Rich Content

Announcements

List

Priority

Schedule

Publish

Archive

Education

Same structure as News

Reports

Inbox

Status

Photo

Response

Tracking

Settings

Office information

Contacts

Social Media

Website Configuration

Allowed Email

---

# Future Integration

React Website

↓

Google Apps Script REST API

↓

Spreadsheet

↓

Drive

React never accesses Spreadsheet directly.

All requests must go through Google Apps Script.

---

# Important Notes

This project is not a prototype.

It is intended to become a real production-ready system for Kelurahan Watang Soreang.

Maintain code quality.

Prioritize maintainability.

Avoid unnecessary complexity.

Always preserve existing architecture unless explicitly instructed otherwise.

Wait for approval before performing any major refactoring.