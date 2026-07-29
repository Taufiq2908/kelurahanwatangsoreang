# CMS UX Specification — Kelurahan Watang Soreang

## Purpose and users

The CMS is a small internal web application for the Lurah, Secretary, and Kelurahan staff. It is not a spreadsheet editor. Its purpose is to make routine publishing and report follow-up clear, safe, and quick for users with mixed technical experience.

The primary experience is task-oriented: staff should be able to understand what needs attention, complete one action, and confidently know the result.

## Design principles

- Use everyday Indonesian labels: `Terbitkan`, `Simpan Draf`, `Tindak Lanjuti`; avoid technical terms such as “record,” “endpoint,” or “schema.”
- Keep one main action per screen and make it visually dominant.
- Use large touch targets, readable text, short forms, and obvious status labels.
- Confirm destructive actions and show success feedback after every saved change.
- Use progressive disclosure: show essential fields first and place optional details under “Informasi tambahan.”
- Match the public website: white surfaces, soft borders, emerald primary actions, blue links, restrained alerts, rounded cards, and Plus Jakarta Sans.
- Do not use charts or dense administrative dashboards unless they directly answer a staff question.

---

# 1. Information architecture

## Primary modules

| Module | Staff goal | Primary actions |
|---|---|---|
| Dashboard | Know what needs attention today | Open pending work, resume drafts |
| Berita | Publish community news | Create, edit, preview, publish |
| Pengumuman | Publish time-sensitive notices | Create, set priority/date range, publish |
| Edukasi | Maintain climate education content | Create, edit, preview, publish |
| Laporan | Receive and resolve citizen reports | Review, update status, add notes, close |
| Pengaturan | Maintain official office and site information | Update contact, social, and system details |

## Supporting destinations

- `Profil Saya`: optional future account/profile destination, reached from the user menu rather than the primary menu.
- `Bantuan`: concise how-to guidance and contact for technical support.
- `Log Aktivitas`: initially visible only from Pengaturan/System; it should not distract daily staff users.

## Content vocabulary

Use one shared status model wherever possible:

- `Draf`: saved internally, not visible publicly.
- `Terbit`: visible on the public website.
- `Penting`: announcement priority only; visually distinct but never alarming by default.
- `Masuk`, `Diproses`, `Selesai`: report lifecycle only.

---

# 2. Navigation

## Desktop navigation

A fixed left sidebar contains the six primary modules. The Kelurahan logo/name is at the top; the signed-in user and “Keluar” are at the bottom.

The main content area has:

1. A page title and plain-language subtitle.
2. A breadcrumb only on deep pages, such as “Berita / Edit Berita”.
3. One primary action on the right, for example `+ Buat Berita`.

`Laporan` displays a compact count badge only when reports are in `Masuk` status. Avoid badges for every module; the one badge should mean “requires attention.”

## Mobile navigation

Use a bottom navigation bar for the most frequent tasks:

- Dashboard
- Berita
- Laporan
- Pengaturan
- Menu

`Menu` opens a full-height, simple list containing Pengumuman, Edukasi, Bantuan, and Keluar. The selected page remains visibly active. The create action remains in the top-right header or as a labelled floating action button on list pages only.

Never hide the active page title. On phones, filters open in a bottom sheet rather than consuming permanent vertical space.

---

# 3. Wireframe descriptions

## Shared app shell

**Header:** back button only on nested pages, title, optional contextual action. Avoid icon-only critical actions.

**Page body:** maximum readable content width on desktop; single-column cards on mobile. Forms use one column by default and two columns only for clearly paired short fields such as start/end date.

**Feedback:** a temporary success toast appears after save/publish/update, followed by an in-page confirmation state when the result matters. Errors remain beside the affected field and are summarized at the top of a failed form.

## Dashboard

### Layout

1. **Welcome block**
   - “Selamat pagi, [name]”
   - Short prompt: “Berikut yang perlu diperhatikan hari ini.”

2. **Action-needed cards**
   - `Laporan baru` — count of reports with status `Masuk`; clicking opens the filtered report inbox.
   - `Laporan diproses` — count of active follow-ups; clicking opens `Diproses`.
   - `Draf konten` — combined count of unpublished Berita, Pengumuman, and Edukasi; clicking opens a simple selection screen or the most recent draft.

3. **Quick actions**
   - Buat Berita
   - Buat Pengumuman
   - Lihat Laporan
   - Ubah Informasi Kantor

4. **Aktivitas terbaru**
   - Five human-readable entries, for example “Sekretaris menerbitkan Pengumuman: Jadwal Posyandu.”
   - A `Lihat semua` link goes to the full log from Pengaturan.

5. **Draf terakhir**
   - At most three recently edited drafts with type, title, date, and `Lanjutkan` button.

### Decision

The dashboard is intentionally not a data dashboard. Counts answer “what requires my attention?” and the next action is always one tap away. No charts are needed for the daily publishing and follow-up work.

## Berita list

### Layout

- Header: “Berita” and `+ Buat Berita`.
- Search field: “Cari judul atau penulis”.
- Filter button: status, category, author, and newest/oldest sorting. On desktop, filters may remain inline; on mobile, use a bottom sheet with `Terapkan` and `Reset`.
- Content cards show title, category, author, last updated date, and status badge.
- Each card has an overflow menu: `Edit`, `Pratinjau`, `Hapus`. Do not put Delete beside the primary edit action.
- Empty state: “Belum ada berita” with one `Buat Berita Pertama` button.

### Detail and preview

Selecting a card opens the article detail page. It shows content metadata and a primary `Edit Berita` button. `Pratinjau` opens a public-site-like reading view in a new internal screen, clearly marked `Pratinjau — belum terbit` when draft.

## Berita form and workflow

### Required fields

- Judul
- Ringkasan
- Isi berita
- Kategori
- Penulis

### Optional fields

- Gambar utama
- Tanggal terbit (default: now when publishing)
- Tandai sebagai berita unggulan

### Interaction

- The slug is generated from the title and is not shown in the standard form. It remains system-managed.
- Show a live character guide for the ringkasan; do not block publication for a recommended length.
- Image upload shows the file name, thumbnail, and a `Ganti gambar` action.
- Sticky bottom actions: `Simpan Draf`, `Pratinjau`, `Terbitkan`.
- `Terbitkan` opens a short confirmation: title, category, publication date, and “Berita ini akan terlihat di website.”

### Validation and messages

- Empty required field: “Judul berita belum diisi.”
- Invalid image: “Gunakan gambar JPG, PNG, atau WEBP.”
- Unsaved exit: “Perubahan belum disimpan. Simpan sebagai draf sebelum keluar?”
- Draft saved: “Draf berita disimpan.”
- Published: “Berita berhasil diterbitkan dan tampil di website.”
- Deleted: require title-aware confirmation and then show “Berita dipindahkan dari daftar.” Prefer archive/soft-delete behavior in future implementation.

## Pengumuman list and form

### List

Use the same editorial pattern as Berita. Cards emphasize `Penting` with an amber/rose left edge and show the active date range when set. Expired announcements are visually muted and filterable through `Berakhir`.

### Required fields

- Judul pengumuman
- Isi pengumuman
- Prioritas (`Normal` default, `Penting` optional)

### Optional fields

- Tanggal mulai tampil
- Tanggal berakhir tampil
- Lampiran

### Interaction and validation

- If no start date is provided, publication starts immediately when `Terbitkan` is selected.
- If an end date is provided, it must not precede the start date. Error: “Tanggal berakhir harus setelah tanggal mulai.”
- Publishing a priority announcement confirms: “Pengumuman penting akan ditampilkan lebih menonjol di website.”
- Expired announcements should no longer be shown publicly but remain visible to staff with an `Berakhir` badge.

## Edukasi list and form

### List

Use the Berita layout with a climate-education category filter and optional source label. The default sorting is newest published content first.

### Required fields

- Judul
- Ringkasan
- Isi artikel
- Kategori
- Penulis

### Optional fields

- Gambar utama
- Sumber/referensi
- Tag
- Tanggal terbit

### Interaction

- Tags use a simple input: type a word and tap `Tambah`; each tag appears as a removable chip.
- Source is an optional text/URL field. If entered as a URL, validate a complete `https://` URL; otherwise allow a plain organization/source name.
- The same Draf → Pratinjau → Terbitkan workflow as Berita applies.

---

# 4. Reports management

Reports are the highest-priority module. Staff must be able to understand a report in seconds and advance it without losing context.

## Report inbox

### Default view

The default filter is `Masuk`, ordered oldest first. This makes unattended citizen reports visible before newer items.

Each report card shows:

- Status badge
- Category icon and category
- Location
- Date/time received
- One-line description preview
- Photo indicator when an image exists
- Tracking code

For non-anonymous reports, show reporter name only in the detail page—not in the broad list—to reduce unnecessary exposure of personal data.

### Search and filters

- Search accepts tracking code, location, category, and reporter name (for authorized staff).
- Filter by status, category, date range, anonymous/non-anonymous, and “has photo.”
- On desktop, show active filters as removable chips above the list.
- On mobile, show the number of active filters in the filter button and apply filters in a bottom sheet.

### Empty states

- `Masuk`: “Tidak ada laporan baru. Semua laporan baru sudah ditinjau.”
- Search/filter: “Tidak ada laporan yang sesuai dengan pencarian ini.” Include `Reset filter`.

## Report detail

### Header

- Back to inbox
- Tracking code as the title
- Current status badge
- Clear primary action based on status:
  - Masuk → `Mulai Proses`
  - Diproses → `Tandai Selesai`
  - Selesai → `Buka Kembali` (restricted to authorized roles in a future release)

### Content sections

1. **Ringkasan laporan**: category, received time, location, description.
2. **Pelapor**:
   - Anonymous: “Laporan anonim” and no empty identity fields.
   - Identified: name and phone with a clear privacy note. Phone action is `Hubungi via WhatsApp`, never exposed in an outward-facing screen.
3. **Foto laporan**: thumbnail gallery; tapping opens a full-screen image viewer with close, next/previous, and image count.
4. **Tindak lanjut internal**: chronological notes, author, and time.
5. **Riwayat status**: Masuk → Diproses → Selesai; use a simple vertical timeline, not a chart.

## Status update interaction

1. Staff taps the recommended status action.
2. A bottom sheet asks for an internal note.
3. Internal note is optional when beginning work, but required when closing: “Jelaskan tindak lanjut atau hasil penyelesaian.”
4. Staff confirms with `Simpan Perubahan`.
5. The detail page updates immediately with a success message.

Messages:

- Started: “Status laporan diubah menjadi Diproses.”
- Closed: “Laporan ditandai selesai.”
- Missing close note: “Tambahkan keterangan penyelesaian sebelum menutup laporan.”
- Reopened: “Laporan dibuka kembali untuk ditindaklanjuti.”

## Admin notes

The notes composer uses one multi-line field and `Tambah Catatan`. It explicitly says “Catatan ini hanya terlihat oleh petugas.” Staff can add notes without changing status. Notes are append-only in the normal UI to preserve accountability; correction is a new note, not silent editing.

## Closing reports

Closing always requires a completion note. Before final confirmation, show a concise summary: tracking code, location, status, and the response that will be retained. There is no automatic external notification control in this sprint; if notification is introduced later, it must be an explicit opt-in/confirmed action.

---

# 5. Settings

Settings are a simple form divided into tabs or sections. Do not show raw keys, sheet IDs, folder IDs, or system metadata in the normal interface.

## Office

- Office name
- Address
- Office hours
- Maps URL

## Contact

- Office phone
- Office email
- WhatsApp number

## Social media

- Facebook URL
- Instagram URL

## Website

- Default public contact information
- Optional future site identity/image fields

## System

- Read-only: CMS schema version, timezone, last setup, spreadsheet connection status, Drive connection status
- `Jalankan Pemeriksaan` may be introduced later; avoid exposing “setup” as a routine staff action.
- Activity Log link for authorized users

Each section has its own `Simpan Perubahan` button. This lowers the risk of accidentally changing unrelated information and gives clear local success feedback: “Informasi kontak berhasil diperbarui.”

---

# 6. Cross-module user flows

## Publish news

1. Dashboard → `Buat Berita`.
2. Fill required fields; optional image/details remain collapsible.
3. Choose `Simpan Draf` or `Pratinjau`.
4. Choose `Terbitkan`.
5. Review confirmation and publish.
6. Return to detail page with a visible `Terbit` badge and `Lihat di Website` link.

## Publish an announcement

1. Pengumuman → `Buat Pengumuman`.
2. Fill title/content; choose Normal or Penting.
3. Optionally add display dates and attachment.
4. Preview and publish.
5. If dates are configured, show an active/expired state in staff list.

## Resolve a report

1. Dashboard → `Laporan baru`, or open Laporan inbox.
2. Open the oldest report in `Masuk`.
3. Review details/photos and add a first internal note.
4. Tap `Mulai Proses`.
5. Add subsequent notes while work continues.
6. Tap `Tandai Selesai`, provide the required completion note, and confirm.
7. The report remains searchable under `Selesai` with its full history.

## Update office information

1. Pengaturan → Office, Contact, or Social media.
2. Edit one section.
3. Save the section.
4. Receive confirmation and keep the user on the same section.

---

# 7. Responsive behavior

## Mobile

- Single-column layout; no horizontal table scrolling for primary tasks.
- Content lists use cards, not tables.
- Bottom navigation is always reachable with one hand.
- Forms use a sticky bottom action bar with full-width labelled buttons.
- Filter, status-change, delete-confirmation, and image-view actions use bottom sheets/full-screen views.
- On screen rotation or narrow widths, date fields stack rather than shrink.

## Desktop

- Sidebar navigation plus a focused main content column.
- Lists can use compact table-like rows only when all information remains readable; report and content cards retain clear hierarchy.
- Search, filters, and primary create action occupy one toolbar row.
- Detail pages may use a two-column layout: main content on the left, metadata/action panel on the right. Reports retain a single primary reading column to protect clarity.

---

# 8. Accessibility and trust requirements

- Minimum touch target: 44 × 44 px.
- Never rely on color alone for status; pair color with text and optionally an icon.
- Use high-contrast text and plain-language labels.
- Every icon-only control needs an accessible label; critical actions use text plus icon.
- Dialogs/bottom sheets must trap focus, close with Escape, return focus to the trigger, and clearly state their purpose.
- Form errors must identify the field, explain how to correct it, and be announced to assistive technology.
- Respect reduced-motion preferences.
- Treat reporter identity, phone numbers, photos, and locations as sensitive internal information; minimize their exposure in list views and never surface them in public preview pages.

---

# 9. Future scalability considerations

- **Roles and permissions:** prepare for Lurah, Secretary, Staff, and technical administrator roles. Publish/delete/system actions should become role-based without changing the basic interface.
- **Auditability:** preserve activity log and append-only report notes; future APIs should record actor, module, action, and timestamp.
- **Content volume:** list designs must support pagination, saved filters, and archive states once records grow.
- **Notifications:** introduce WhatsApp/email notifications only with explicit status, retry visibility, consent, and delivery history.
- **Attachments:** use the existing Drive folder model while keeping image/document upload interactions consistent across modules.
- **Approval workflow:** if needed later, add a “Menunggu Persetujuan” status between Draf and Terbit; do not introduce it until the organization needs it.
- **Public-site consistency:** preview screens should use the public-site content hierarchy, but remain clearly identified as internal previews.
