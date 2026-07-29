/**
 * Mock data — mirrors the exact schema returned by the Google Apps Script API.
 * Used as fallback when VITE_GOOGLE_SCRIPT_URL is not configured.
 *
 * Schema contract:
 * The real Google Sheets must use the same field names (column headers).
 */

// ─── NEWS / BERITA ────────────────────────────────────────────────────────────
export const mockNews = [
  {
    id: '1',
    slug: 'panen-raya-padi-watang-soreang-2025',
    title: 'Panen Raya Padi Serentak di Watang Soreang Capai Hasil Optimal',
    category: 'Kegiatan Kelurahan',
    date: '2025-07-09',
    author: 'Tim Redaksi Kelurahan',
    excerpt:
      'Para petani di Kelurahan Watang Soreang berhasil melakukan panen raya padi serentak dengan hasil yang memuaskan. Produktivitas lahan meningkat signifikan berkat program bantuan benih unggul dari Dinas Pertanian Kota Parepare.',
    content: `Para petani di Kelurahan Watang Soreang, Kecamatan Soreang, Kota Parepare kembali menggelar panen raya padi serentak yang disambut antusias oleh seluruh warga. Kegiatan yang berlangsung meriah ini dihadiri langsung oleh Lurah Watang Soreang, perwakilan Dinas Pertanian Kota Parepare, dan ratusan warga dari berbagai RW.

Hasil panen tahun ini dilaporkan meningkat signifikan dibandingkan musim tanam sebelumnya. Berdasarkan estimasi lapangan, produktivitas rata-rata lahan petani kelurahan mencapai 6,2 ton per hektar, meningkat sekitar 18% dibanding musim lalu yang hanya 5,2 ton per hektar.

Peningkatan ini tidak lepas dari keberhasilan program bantuan benih padi unggul varietas Ciherang dan Inpari yang didistribusikan melalui kelompok tani setempat. Selain benih, para petani juga mendapatkan pelatihan teknik tanam jajar legowo dan pengelolaan pupuk organik yang ramah lingkungan.

"Kami sangat bersyukur dengan hasil panen tahun ini. Program dari pemerintah kota sangat membantu kami dalam meningkatkan kualitas dan kuantitas hasil pertanian," ungkap Ketua Kelompok Tani Makmur Jaya, Pak Hasan.

Ke depannya, pemerintah kelurahan berencana untuk memperluas cakupan program pertanian berkelanjutan ini, termasuk memperkenalkan teknologi pertanian presisi yang dapat membantu para petani memantau kondisi lahan secara digital.`,
    image: null,
    status: 'publish',
    readTime: 3,
  },
  {
    id: '2',
    slug: 'program-umkm-go-digital-parepare',
    title: 'Program UMKM Go Digital Resmi Diluncurkan, 60 Pelaku Usaha Ikut Pelatihan',
    category: 'UMKM',
    date: '2025-07-07',
    author: 'Humas Kelurahan',
    excerpt:
      'Pemerintah Kelurahan Watang Soreang bersama Dinas Koperasi dan UMKM Kota Parepare resmi meluncurkan program digitalisasi usaha mikro. Sebanyak 60 pelaku UMKM lokal terdaftar mengikuti pelatihan pemasaran digital dan e-commerce.',
    content: `Program UMKM Go Digital yang diinisiasi oleh Dinas Koperasi dan UMKM Kota Parepare bekerja sama dengan Pemerintah Kelurahan Watang Soreang resmi dimulai. Program ini menyasar para pelaku usaha mikro, kecil, dan menengah yang ada di wilayah kelurahan untuk meningkatkan kapasitas pemasaran mereka melalui platform digital.

Sebanyak 60 pelaku UMKM dari berbagai bidang usaha—mulai dari kuliner, kerajinan tangan, hasil laut, hingga fashion—telah mendaftarkan diri sebagai peserta program ini. Mereka akan mendapatkan serangkaian pelatihan intensif selama dua bulan ke depan.

Materi pelatihan mencakup pembuatan konten media sosial, manajemen toko online di marketplace seperti Shopee dan Tokopedia, pembuatan foto produk profesional menggunakan smartphone, serta pengelolaan keuangan digital menggunakan aplikasi sederhana.

Lurah Watang Soreang, H. Muh. Arifin, S.STP, menyampaikan bahwa program ini merupakan bagian dari upaya pemerintah kelurahan untuk mendorong pemulihan dan penguatan ekonomi warga pascapandemi. "Kami ingin UMKM kita tidak hanya bertahan, tapi bisa tumbuh dan bersaing di era digital," ujarnya.

Para peserta juga akan mendapatkan pendampingan langsung dari mentor berpengalaman di bidang e-commerce, serta akses ke jaringan komunitas UMKM digital Kota Parepare yang lebih luas.`,
    image: null,
    status: 'publish',
    readTime: 4,
  },
  {
    id: '3',
    slug: 'pembangunan-drainase-rw-02',
    title: 'Proyek Drainase RW 02 Dimulai, Atasi Genangan Air Tahunan',
    category: 'Kegiatan Kelurahan',
    date: '2025-07-04',
    author: 'Tim Redaksi Kelurahan',
    excerpt:
      'Proyek pembangunan drainase di wilayah RW 02 Kelurahan Watang Soreang resmi dimulai. Infrastruktur ini diharapkan dapat mengatasi masalah genangan air yang telah dikeluhkan warga sejak bertahun-tahun, terutama saat musim hujan.',
    content: `Warga RW 02 Kelurahan Watang Soreang akhirnya bisa bernapas lega. Proyek pembangunan drainase yang sudah lama dinantikan kini telah resmi dimulai. Peletakan batu pertama dilakukan oleh Lurah Watang Soreang didampingi Ketua RW 02 dan perwakilan Dinas Pekerjaan Umum Kota Parepare.

Proyek ini merupakan realisasi dari usulan warga yang disampaikan pada Musrenbang Kelurahan tahun lalu. Setelah melalui proses perencanaan dan penganggaran yang panjang, akhirnya proyek senilai Rp 285 juta ini siap dikerjakan oleh kontraktor lokal.

Sistem drainase yang akan dibangun memiliki panjang total 420 meter dengan dimensi saluran 60x60 cm. Desainnya mempertimbangkan kapasitas tampung air hujan dengan intensitas tinggi sesuai karakteristik iklim Kota Parepare yang berada di kawasan pesisir.

"Kami sangat senang. Setiap kali hujan lebat, jalan di depan rumah selalu tergenang air. Semoga dengan drainase ini masalah itu bisa teratasi," ujar Ibu Nurhayati, warga RT 04 RW 02 yang rumahnya sering terdampak genangan.

Pengerjaan proyek ditargetkan selesai dalam waktu 60 hari kalender. Selama masa konstruksi, warga diimbau untuk berhati-hati dan bekerja sama menjaga keamanan area proyek.`,
    image: null,
    status: 'publish',
    readTime: 3,
  },
  {
    id: '4',
    slug: 'sosialisasi-mitigasi-bencana-pesisir',
    title: 'BPBD Gelar Sosialisasi Mitigasi Bencana untuk Warga Pesisir Watang Soreang',
    category: 'Masyarakat',
    date: '2025-07-02',
    author: 'BPBD Kota Parepare',
    excerpt:
      'Badan Penanggulangan Bencana Daerah Kota Parepare menggelar sosialisasi mitigasi bencana khusus untuk warga Watang Soreang yang bermukim di kawasan pesisir Teluk Parepare. Kegiatan ini menyasar warga RW 01, 02, dan 03.',
    content: `Dalam rangka meningkatkan kesiapsiagaan masyarakat menghadapi potensi bencana alam, Badan Penanggulangan Bencana Daerah (BPBD) Kota Parepare menggelar sosialisasi mitigasi bencana di Aula Kantor Kelurahan Watang Soreang.

Kegiatan ini secara khusus menyasar warga yang bermukim di kawasan pesisir Teluk Parepare, terutama di RW 01, 02, dan 03 yang paling rentan terhadap ancaman gelombang tinggi, abrasi pantai, dan banjir rob.

Materi sosialisasi mencakup pengenalan jenis-jenis bencana yang berpotensi terjadi di kawasan pesisir Parepare, prosedur evakuasi mandiri, cara menggunakan alat keselamatan dasar, serta pentingnya memiliki tas siaga bencana di rumah masing-masing.

Tim BPBD juga memperkenalkan aplikasi BPBD Parepare yang dapat digunakan warga untuk melaporkan kejadian bencana dan mendapatkan informasi peringatan dini secara real-time melalui smartphone.

Kepala BPBD Kota Parepare mengingatkan bahwa kesadaran dan kesiapan masyarakat merupakan faktor paling krusial dalam pengurangan risiko bencana. "Bencana tidak bisa diprediksi kapan datangnya, tapi kita bisa mempersiapkan diri agar dampaknya seminimal mungkin," pesannya.`,
    image: null,
    status: 'publish',
    readTime: 4,
  },
  {
    id: '5',
    slug: 'festival-budaya-hut-kelurahan-35',
    title: 'Festival Budaya Bugis Meriahkan HUT Kelurahan Watang Soreang ke-35',
    category: 'Masyarakat',
    date: '2025-06-28',
    author: 'Humas Kelurahan',
    excerpt:
      'Perayaan HUT Kelurahan Watang Soreang ke-35 berlangsung meriah dengan festival budaya Bugis yang menampilkan pertunjukan seni tradisional, pameran kuliner lokal, dan berbagai lomba kemasyarakatan.',
    content: `Kelurahan Watang Soreang merayakan hari ulang tahunnya yang ke-35 dengan penuh semangat dan kebersamaan. Perayaan yang berlangsung selama dua hari ini diisi dengan berbagai kegiatan budaya, seni, dan kemasyarakatan yang melibatkan seluruh elemen warga dari berbagai generasi.

Rangkaian acara dibuka dengan pertunjukan seni budaya Bugis yang menampilkan tari padduppa sebagai tari penyambutan tamu, disusul dengan pertunjukan musik gendang dan kolintang tradisional. Para penampil merupakan kelompok seni yang berasal dari warga kelurahan sendiri.

Pameran kuliner lokal menjadi daya tarik tersendiri, dengan berbagai makanan khas Parepare dan Sulawesi Selatan yang disajikan oleh para ibu rumah tangga dan pelaku UMKM setempat. Hidangan seperti coto makassar, jalangkote, pisang epe, dan berbagai olahan hasil laut pesisir menjadi favorit pengunjung.

Berbagai lomba kemasyarakatan juga digelar, mulai dari lomba masak antara RW, lomba kebersihan lingkungan, hingga lomba adzan untuk anak-anak. Antusiasme warga dari berbagai usia terlihat jelas sepanjang hari.

Lurah H. Muh. Arifin, S.STP dalam sambutannya menyampaikan rasa syukur atas capaian kelurahan selama 35 tahun dan berharap semangat kebersamaan ini terus terjaga untuk kemajuan Kelurahan Watang Soreang di masa mendatang.`,
    image: null,
    status: 'publish',
    readTime: 4,
  },
  {
    id: '6',
    slug: 'bantuan-alat-tangkap-nelayan-2025',
    title: 'Pemerintah Kota Serahkan Bantuan Alat Tangkap kepada Nelayan Watang Soreang',
    category: 'UMKM',
    date: '2025-06-20',
    author: 'Tim Redaksi Kelurahan',
    excerpt:
      'Dinas Kelautan dan Perikanan Kota Parepare menyerahkan bantuan alat tangkap berupa jaring, pelampung, dan GPS nelayan kepada 25 nelayan aktif di Kelurahan Watang Soreang.',
    content: `Sebanyak 25 nelayan aktif di Kelurahan Watang Soreang mendapatkan bantuan peralatan tangkap ikan dari Pemerintah Kota Parepare melalui Dinas Kelautan dan Perikanan. Penyerahan bantuan dilaksanakan di halaman Kantor Kelurahan dan disambut gembira oleh para nelayan penerima manfaat.

Bantuan yang diserahkan meliputi jaring ikan berbagai ukuran, pelampung tanda, lampu LED untuk malam hari, serta perangkat GPS sederhana untuk membantu navigasi di laut. Total nilai bantuan untuk 25 nelayan ini mencapai Rp 187,5 juta.

Para penerima bantuan merupakan nelayan yang telah terverifikasi sebagai nelayan aktif dengan penghasilan di bawah rata-rata dan terdaftar dalam kelompok nelayan yang dibina oleh kelurahan. Proses seleksi dilakukan secara transparan dengan melibatkan ketua RW dan kelompok nelayan setempat.

"Dengan alat yang lebih baik, kami berharap hasil tangkapan bisa meningkat. GPS ini sangat membantu kami menentukan lokasi ikan tanpa harus mengandalkan perkiraan saja," ujar Pak Amir, salah satu nelayan penerima bantuan.

Dinas Kelautan berharap bantuan ini dapat meningkatkan produktivitas dan pendapatan nelayan, sekaligus mendorong kemandirian ekonomi masyarakat pesisir di Kota Parepare.`,
    image: null,
    status: 'publish',
    readTime: 3,
  },
]

// ─── ANNOUNCEMENTS / PENGUMUMAN ───────────────────────────────────────────────
export const mockAnnouncements = [
  {
    id: '1',
    title: 'Jadwal Posyandu Balita Bulan Juli 2025',
    content: `Posyandu Balita Kelurahan Watang Soreang akan dilaksanakan pada:

Hari/Tanggal: Selasa, 15 Juli 2025
Waktu: 08.00 – 11.00 WITA
Tempat: Balai Pertemuan RW 03, Jl. Pesisir Soreang

Seluruh orang tua/wali balita usia 0–5 tahun diharapkan hadir membawa:
• Buku KIA (Kesehatan Ibu dan Anak)
• KMS (Kartu Menuju Sehat)
• Imunisasi yang sudah dijadwalkan

Layanan yang tersedia: penimbangan berat badan, pengukuran tinggi badan, imunisasi, vitamin A, dan konsultasi gizi gratis.

Informasi lebih lanjut hubungi kader posyandu RW masing-masing.`,
    date: '2025-07-08',
    priority: 'important',
    category: 'Kesehatan',
    status: 'publish',
  },
  {
    id: '2',
    title: 'Penyaluran Bantuan Sosial PKH Tahap III – Juli 2025',
    content: `Kepada seluruh Keluarga Penerima Manfaat (KPM) Program Keluarga Harapan (PKH) di Kelurahan Watang Soreang, diberitahukan bahwa:

Penyaluran PKH Tahap III Tahun 2025 akan dilaksanakan mulai:
Tanggal: 10 – 20 Juli 2025

KPM harap mempersiapkan:
• KTP Elektronik yang masih berlaku
• Kartu PKH / KKS
• Buku Tabungan (jika ada)

Penyaluran dilakukan melalui bank penyalur. Pastikan data rekening Anda aktif.

KPM yang belum menerima hingga 25 Juli 2025 agar segera melapor ke Pendamping PKH atau Kantor Kelurahan.`,
    date: '2025-07-06',
    priority: 'important',
    category: 'Sosial',
    status: 'publish',
  },
  {
    id: '3',
    title: 'Kerja Bakti Bersih Lingkungan – Minggu, 13 Juli 2025',
    content: `Dalam rangka menjaga kebersihan dan keindahan lingkungan Kelurahan Watang Soreang, seluruh warga diimbau untuk mengikuti kegiatan:

Kerja Bakti Bersama
Hari/Tanggal: Minggu, 13 Juli 2025
Waktu: 07.00 – 09.30 WITA
Titik kumpul: Kantor Kelurahan Watang Soreang

Fokus kegiatan:
• Pembersihan drainase/got lingkungan
• Pengecatan pembatas jalan
• Penanaman tanaman hias di taman kelurahan
• Pengangkutan sampah ke TPS

Harap membawa peralatan kerja bakti (sapu, cangkul, dll.) dari rumah masing-masing. Konsumsi disediakan oleh panitia.

Mari bersama jaga kebersihan lingkungan kita!`,
    date: '2025-07-05',
    priority: 'normal',
    category: 'Lingkungan',
    status: 'publish',
  },
  {
    id: '4',
    title: 'Pemutakhiran Data Kependudukan 2025',
    content: `Dinas Kependudukan dan Catatan Sipil (Disdukcapil) Kota Parepare akan melaksanakan kegiatan pemutakhiran data kependudukan di wilayah Kelurahan Watang Soreang.

Pelaksanaan: 14 – 18 Juli 2025
Jam: 09.00 – 14.00 WITA
Lokasi: Kantor Kelurahan Watang Soreang

Warga yang perlu melakukan pemutakhiran data:
• Warga yang belum memiliki KTP-el
• Warga yang data KTP-el-nya tidak sesuai
• Anak usia 17 tahun yang belum memiliki KTP

Persyaratan: Bawa KK asli dan akta kelahiran.

Layanan ini GRATIS. Manfaatkan kesempatan ini untuk melengkapi dokumen kependudukan Anda.`,
    date: '2025-07-03',
    priority: 'normal',
    category: 'Administrasi',
    status: 'publish',
  },
  {
    id: '5',
    title: 'Musrenbang Kelurahan 2026 – Undangan untuk Tokoh Masyarakat',
    content: `Pemerintah Kelurahan Watang Soreang mengundang seluruh tokoh masyarakat, perwakilan RT/RW, dan elemen warga untuk menghadiri:

Musyawarah Perencanaan Pembangunan (Musrenbang)
Tingkat Kelurahan Watang Soreang
Tahun Anggaran 2026

Hari/Tanggal: Minggu, 20 Juli 2025
Waktu: 09.00 – 12.00 WITA
Tempat: Aula Kantor Kelurahan Watang Soreang

Agenda:
1. Paparan rencana pembangunan tahun 2025
2. Usulan prioritas pembangunan 2026
3. Diskusi kelompok per wilayah RW
4. Penandatanganan berita acara

Harap konfirmasi kehadiran kepada Sekretaris Kelurahan paling lambat 17 Juli 2025.`,
    date: '2025-07-01',
    priority: 'normal',
    category: 'Pembangunan',
    status: 'publish',
  },
]

// ─── CLIMATE EDUCATION / EDUKASI ─────────────────────────────────────────────
export const mockClimateArticles = [
  {
    id: '1',
    slug: 'dampak-perubahan-iklim-nelayan-pesisir-parepare',
    title: 'Dampak Perubahan Iklim terhadap Kehidupan Nelayan Pesisir Parepare',
    category: 'Lingkungan Pesisir',
    date: '2025-07-05',
    author: 'Tim Edukasi Lingkungan KKN',
    excerpt:
      'Perubahan pola curah hujan dan kenaikan suhu air laut akibat perubahan iklim global berdampak langsung pada hasil tangkapan dan keselamatan nelayan di kawasan pesisir Teluk Parepare. Pelajari apa yang bisa kita lakukan.',
    content: `Perubahan iklim bukan lagi sekadar isu global yang jauh dari keseharian kita. Di kawasan pesisir Teluk Parepare—termasuk wilayah Kelurahan Watang Soreang—dampaknya sudah dirasakan langsung oleh para nelayan yang menggantungkan hidup pada laut.

Berdasarkan data Badan Meteorologi, Klimatologi, dan Geofisika (BMKG), suhu permukaan laut di wilayah perairan Sulawesi Selatan mengalami peningkatan rata-rata 0,3°C per dekade sejak tahun 1980. Kenaikan suhu ini mempengaruhi distribusi ikan dan ekosistem laut secara keseluruhan.

Para nelayan di Watang Soreang melaporkan perubahan yang mereka rasakan: ikan semakin jauh dari pantai, musim tangkap tidak lagi bisa diprediksi dengan pola lama, dan gelombang laut semakin tidak menentu. Kondisi ini memaksa mereka berlayar lebih jauh dengan risiko yang lebih besar.

Selain perubahan pola ikan, abrasi pantai juga menjadi ancaman nyata. Gelombang yang semakin tinggi secara perlahan mengikis garis pantai, mengancam permukiman warga yang berada di tepi teluk.

Namun ada kabar baik: komunitas nelayan di Parepare mulai mengadaptasi praktik-praktik baru. Beberapa di antaranya bergabung dalam program pembuatan rumah ikan (fish aggregating device) untuk membantu ikan berkumpul lebih dekat, serta program penanaman mangrove untuk melindungi garis pantai.

Sebagai warga, kita pun bisa berkontribusi: kurangi penggunaan plastik sekali pakai yang berakhir di laut, dukung produk ikan lokal, dan ikut serta dalam kegiatan bersih pantai yang rutin digelar di Parepare.`,
    tags: ['Iklim', 'Nelayan', 'Pesisir', 'Parepare'],
    image: null,
    status: 'publish',
    readTime: 5,
  },
  {
    id: '2',
    slug: 'cara-mudah-kelola-sampah-rumah-tangga',
    title: 'Cara Mudah Mengelola Sampah Rumah Tangga agar Tidak Mencemari Laut',
    category: 'Sampah',
    date: '2025-07-01',
    author: 'Dinas Lingkungan Hidup Kota Parepare',
    excerpt:
      'Setiap hari, ribuan ton sampah plastik dari rumah tangga Indonesia berakhir di laut. Sebagai kota pelabuhan, Parepare memiliki tanggung jawab besar untuk mengelola sampah dengan benar. Berikut langkah-langkah praktis yang bisa dimulai dari rumah.',
    content: `Indonesia adalah salah satu penyumbang sampah plastik terbesar ke lautan dunia. Sebagai kota yang berbatasan langsung dengan Teluk Parepare dan Selat Makassar, Kota Parepare memiliki tanggung jawab moral untuk memastikan sampah dari daratan tidak berakhir di ekosistem laut yang berharga.

Kabar baiknya: setiap rumah tangga bisa berkontribusi nyata. Dimulai dari langkah sederhana yang konsisten, kita bisa mengurangi beban sampah secara signifikan.

Langkah 1: Pisahkan Sampah dari Sumbernya

Sediakan minimal dua tempat sampah di rumah: satu untuk sampah organik (sisa makanan, kulit buah, daun) dan satu untuk sampah anorganik (plastik, kertas, logam). Pemisahan ini adalah fondasi pengelolaan sampah yang baik.

Langkah 2: Buat Kompos dari Sampah Organik

Sisa sayuran, kulit buah, dan sampah dapur lainnya bisa diubah menjadi kompos yang bermanfaat untuk tanaman. Anda bisa menggunakan ember berlubang sederhana sebagai komposter rumahan. Kompos yang dihasilkan bisa digunakan untuk menyuburkan tanaman di halaman atau pot.

Langkah 3: Kurangi Plastik Sekali Pakai

Bawa tas belanja sendiri, gunakan botol minum isi ulang, dan hindari sedotan plastik. Perubahan kebiasaan kecil ini, jika dilakukan oleh banyak orang, akan berdampak besar pada pengurangan sampah plastik.

Langkah 4: Manfaatkan Program Bank Sampah

Kelurahan Watang Soreang memiliki program bank sampah yang menerima berbagai jenis sampah anorganik bernilai ekonomis. Sampah Anda bisa menjadi sumber penghasilan tambahan melalui program ini.

Langkah 5: Ajarkan kepada Anak-anak

Kebiasaan baik harus dimulai sejak dini. Libatkan anak-anak dalam kegiatan memilah sampah dan jelaskan mengapa hal ini penting bagi lingkungan dan laut kita.`,
    tags: ['Sampah', 'Plastik', 'Kompos', 'Lingkungan'],
    image: null,
    status: 'publish',
    readTime: 5,
  },
  {
    id: '3',
    slug: 'penanaman-mangrove-watang-soreang',
    title: 'Mangrove: Benteng Alami Pesisir yang Perlu Kita Jaga Bersama',
    category: 'Lingkungan Pesisir',
    date: '2025-06-25',
    author: 'Komunitas Hijau Soreang',
    excerpt:
      'Hutan mangrove adalah ekosistem paling produktif di kawasan pesisir. Selain melindungi pantai dari abrasi, mangrove menjadi tempat pemijahan ikan dan menyerap karbon 5 kali lebih efisien dari hutan tropis daratan.',
    content: `Di sepanjang pesisir Teluk Parepare, pohon-pohon mangrove berdiri kokoh menjadi penjaga garis pantai yang tak ternilai harganya. Namun sayangnya, luas tutupan mangrove di kawasan ini terus menyusut akibat konversi lahan, pencemaran, dan kurangnya kesadaran akan pentingnya ekosistem ini.

Apa Itu Mangrove dan Mengapa Penting?

Mangrove adalah hutan yang tumbuh di kawasan pasang surut pantai tropis dan subtropis. Ekosistem ini memiliki peran luar biasa: akarnya yang kompleks melindungi pantai dari erosi dan gelombang, sekaligus menjadi tempat berlindung dan berkembang biak bagi ratusan spesies ikan, udang, kepiting, dan burung.

Dari sisi perubahan iklim, mangrove adalah pahlawan tersembunyi. Hutan mangrove mampu menyerap dan menyimpan karbon 5 hingga 10 kali lebih banyak per hektare dibandingkan hutan hujan tropis daratan. Ini menjadikannya senjata alami yang sangat efektif dalam memitigasi dampak pemanasan global.

Ancaman terhadap Mangrove Parepare

Konversi lahan untuk pemukiman dan tambak, pembuangan sampah di kawasan mangrove, serta pengambilan kayu ilegal menjadi ancaman utama. Dalam 20 tahun terakhir, diperkirakan lebih dari 30% tutupan mangrove di kawasan pesisir Parepare telah berkurang.

Apa yang Bisa Kita Lakukan?

Komunitas Hijau Soreang bersama warga Kelurahan Watang Soreang secara rutin mengadakan kegiatan penanaman mangrove di kawasan pesisir. Kegiatan ini terbuka untuk seluruh warga dan tidak memerlukan keahlian khusus.

Dengan menanam satu pohon mangrove, kita berkontribusi pada: perlindungan pantai dari abrasi, penyerapan karbon, pelestarian habitat ikan, dan warisan lingkungan yang berharga untuk generasi mendatang.

Bergabunglah dengan komunitas kami dan jadilah bagian dari solusi untuk kelestarian pesisir Parepare!`,
    tags: ['Mangrove', 'Pesisir', 'Abrasi', 'Karbon'],
    image: null,
    status: 'publish',
    readTime: 6,
  },
  {
    id: '4',
    slug: 'hemat-air-di-rumah-tips-praktis',
    title: 'Hemat Air di Rumah: Tips Praktis untuk Jaga Ketersediaan Air Bersih',
    category: 'Air & Energi',
    date: '2025-06-20',
    author: 'Tim Edukasi Lingkungan KKN',
    excerpt:
      'Air bersih semakin langka akibat perubahan iklim dan pertumbuhan penduduk. Berikut 10 cara mudah menghemat air di rumah yang bisa dilakukan oleh seluruh keluarga mulai hari ini.',
    content: `Air bersih adalah sumber daya yang tidak ternilai, namun sering kali kita menggunakannya secara berlebihan tanpa sadar. Di tengah ancaman perubahan iklim yang semakin nyata, menjaga ketersediaan air bersih menjadi tanggung jawab kita bersama.

Fakta mengejutkan: rata-rata satu orang menggunakan 150-200 liter air per hari. Dengan langkah-langkah sederhana, konsumsi ini bisa dikurangi signifikan tanpa mengorbankan kenyamanan hidup.

10 Tips Hemat Air di Rumah

1. Matikan keran saat menyikat gigi. Kebiasaan membiarkan air mengalir saat sikat gigi membuang 6-8 liter air per menit.

2. Perbaiki kebocoran segera. Satu tetesan per detik dari keran bocor membuang lebih dari 10.000 liter air per tahun.

3. Gunakan shower daripada bathtub. Mandi shower 5 menit menggunakan sekitar 35 liter air, jauh lebih hemat dari bathtub yang membutuhkan 150-200 liter.

4. Tampung air hujan. Gunakan untuk menyiram tanaman atau membersihkan kendaraan.

5. Siram tanaman di pagi atau sore hari. Hindari menyiram di siang hari untuk mengurangi penguapan.

6. Cuci kendaraan dengan ember, bukan selang. Menggunakan selang menghabiskan 300-400 liter, sementara ember hanya 30-40 liter.

7. Gunakan mesin cuci saat muatan penuh. Jangan mencuci setengah beban, tunggu hingga mesin terisi penuh.

8. Daur ulang air bekas cucian. Air bekas mencuci sayuran atau buah bisa digunakan untuk menyiram tanaman.

9. Pasang aerator pada keran. Alat kecil ini mengurangi aliran air hingga 50% tanpa terasa mengurangi tekanan.

10. Edukasi seluruh anggota keluarga. Kebiasaan hemat air harus menjadi budaya keluarga, bukan hanya tanggung jawab satu orang.

Dengan menerapkan kebiasaan-kebiasaan ini, satu keluarga bisa menghemat hingga 50-100 liter air per hari. Bayangkan dampaknya jika seluruh keluarga di Kelurahan Watang Soreang melakukan hal yang sama!`,
    tags: ['Air', 'Hemat', 'Lingkungan', 'Keluarga'],
    image: null,
    status: 'publish',
    readTime: 5,
  },
  {
    id: '5',
    slug: 'energi-surya-potensi-parepare',
    title: 'Potensi Energi Surya di Parepare: Dari Rumah Tangga hingga Komunitas',
    category: 'Air & Energi',
    date: '2025-06-15',
    author: 'Tim Energi Terbarukan',
    excerpt:
      'Kota Parepare mendapat paparan sinar matahari rata-rata 6-8 jam per hari sepanjang tahun. Ini menjadikannya salah satu wilayah dengan potensi energi surya tertinggi di Sulawesi Selatan. Bagaimana kita bisa memanfaatkannya?',
    content: `Kota Parepare, dengan posisi geografisnya di kawasan tropis dekat khatulistiwa, menerima sinar matahari rata-rata 6-8 jam per hari sepanjang tahun. Potensi energi surya ini sangat besar dan masih sangat kurang dimanfaatkan.

Energi surya adalah energi yang diperoleh dari cahaya matahari dan diubah menjadi listrik menggunakan panel fotovoltaik (panel surya). Teknologi ini ramah lingkungan, tidak menghasilkan emisi gas rumah kaca, dan biayanya terus menurun setiap tahunnya.

Manfaat Panel Surya untuk Rumah Tangga

Memasang panel surya di atap rumah memberikan berbagai keuntungan: tagihan listrik berkurang drastis atau bahkan nol, kelebihan listrik dapat dijual ke PLN melalui skema ekspor-impor, investasi yang memberikan penghematan jangka panjang selama 20-25 tahun, dan berkontribusi pada pengurangan emisi karbon.

Program Subsidi Panel Surya

Pemerintah melalui Kementerian ESDM dan Pemda Sulawesi Selatan menyediakan program bantuan dan subsidi untuk pemasangan panel surya, terutama bagi rumah tangga berpenghasilan rendah. Program ini bisa diakses melalui kelurahan setempat.

Panel Surya Komunal

Selain untuk rumah tangga individu, panel surya juga bisa dipasang secara komunal untuk memenuhi kebutuhan listrik fasilitas umum seperti masjid, posyandu, dan balai RW. Model ini lebih efisien secara biaya karena keuntungannya bisa dinikmati bersama.

Langkah Awal

Jika Anda tertarik memasang panel surya, mulailah dengan menghitung konsumsi listrik rumah tangga Anda, konsultasikan dengan instalatir listrik berlisensi, cari tahu program subsidi yang tersedia, dan pastikan kondisi atap rumah mendukung untuk pemasangan panel.

Masa depan energi ada di tangan kita. Dengan memanfaatkan energi surya yang melimpah di Parepare, kita tidak hanya menghemat pengeluaran tetapi juga berkontribusi nyata pada pengurangan dampak perubahan iklim.`,
    tags: ['Energi Surya', 'Listrik', 'Terbarukan', 'Parepare'],
    image: null,
    status: 'publish',
    readTime: 6,
  },
]
