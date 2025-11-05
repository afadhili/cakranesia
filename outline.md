# 🥘 Cakranesia — To-Do List

## 📦 Setup Project

- [x] Inisialisasi proyek Next.js (App Router)
- [x] Konfigurasi TypeScript + ESLint + Prettier
- [x] Setup `better-auth` untuk login/register
- [x] Integrasi `Drizzle ORM` dan hubungkan ke PostgreSQL
- [x] Buat file `.env` untuk credential (DB_URL, AUTH_SECRET, dsb)

---

## 🧱 Database & Model

- [ ] Buat schema dengan Drizzle ORM:
  - [ ] users
  - [ ] foods
  - [ ] provinces
  - [ ] recipes
  - [ ] blogs
  - [ ] likes
  - [ ] saves
  - [ ] comments
- [ ] Jalankan migrasi database
- [ ] Isi data awal provinsi Indonesia

---

## 🏠 Frontend Pages

### 1. Homepage

- [ ] Layout dasar (Header, Footer, Navbar)
- [ ] Hero section (“Melestarikan Cita Rasa Indonesia”)
- [ ] Komponen “Rekomendasi Makanan”
- [ ] Tombol “Gabung Komunitas”

### 2. Pencarian

- [ ] Form pencarian (provinsi + nama makanan)
- [ ] Tampilkan hasil pencarian (card list)
- [ ] Detail page untuk makanan (nama, deskripsi, foto, resep)
- [ ] Integrasi full-text search PostgreSQL / Meilisearch

### 3. Rekomendasi AI

- [ ] Halaman / panel chatbot
- [ ] API route `/api/chat` untuk komunikasi ke model AI
- [ ] Integrasi konteks data makanan Indonesia ke AI
- [ ] UI chat interaktif (bubble style)

### 4. Komunitas / Blog

- [ ] Halaman login & register
- [ ] Dashboard pengguna (resep & blog saya)
- [ ] Upload resep / blog baru (form input + upload gambar)
- [ ] Halaman list blog/resep komunitas
- [ ] Like, simpan, komentar
- [ ] Halaman detail posting
- [ ] Pagination / infinite scroll

---

## 🎨 UI & UX

- [ ] Desain pakai warna hangat (merah, oranye, krem)
- [ ] Implementasi komponen dengan TailwindCSS + shadcn/ui
- [ ] Gunakan NextImage untuk optimasi gambar
- [ ] Responsive design (mobile-first)
- [ ] Tambahkan ikon (lucide-react)

---

## 🔍 Search Engine (Opsional)

- [ ] Coba integrasi Meilisearch (self-host)
- [ ] Alternatif: PostgreSQL full-text search
- [ ] Uji kecepatan & relevansi hasil

---

## 🤖 Chatbot AI

- [ ] Buat endpoint `/api/chat`
- [ ] Integrasi API OpenAI / model lokal
- [ ] Konteks AI berisi kumpulan data makanan Indonesia
- [ ] Tambahkan fallback “Saya belum tahu makanan itu”

---

## 🛡️ Keamanan & Validasi

- [ ] Hash password (Better-Auth built-in)
- [ ] Validasi form input (Zod)
- [ ] Sanitasi konten user (komentar/blog)
- [ ] Rate limiting untuk API
- [ ] Middleware proteksi route login-required

---

## 🚀 SEO & Performance

- [ ] Konfigurasi next-seo
- [ ] Optimasi gambar (lazy loading)
- [ ] Implement caching (ISR / SSG)
- [ ] Setup sitemap dan meta tags
- [ ] Tambah structured data schema (JSON-LD)

---

## 📈 Analytics & Komunitas

- [ ] Tambahkan Google Analytics / Umami
- [ ] Sistem “resep trending” berdasarkan likes
- [ ] Fitur badge / rank untuk user aktif
- [ ] Notifikasi sederhana (misal komentar baru)

---

## 🧩 Dokumentasi

- [ ] README.md lengkap (setup, run, deploy)
- [ ] Penjelasan struktur folder
- [ ] Panduan kontribusi untuk komunitas
- [ ] Catat endpoint API (auth, recipes, blog, comments, chat)

---

## 🧪 Testing

- [ ] Unit test untuk utilitas
- [ ] Integration test untuk API routes
- [ ] E2E test (Playwright / Cypress)
- [ ] Test UI dan form validation

---

## 📅 Tahapan Rilis

- [ ] MVP: Homepage + Pencarian + Upload Resep
- [ ] V2: Chatbot AI + Like/Comment/Simpan
- [ ] V3: Search Engine dedicated + Gamification
- [ ] V4: Mobile optimization & offline mode

---

## 🧰 Maintenance

- [ ] Setup monitoring error (Sentry)
- [ ] Update dependency rutin
- [ ] Backup database otomatis
- [ ] Moderasi konten komunitas

---

✨ _Goal utama:_ Membuat Cakranesia jadi pusat komunitas pecinta kuliner Indonesia yang aktif, interaktif, dan autentik.
