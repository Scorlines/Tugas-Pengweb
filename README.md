<img width="1912" height="976" alt="image" src="https://github.com/user-attachments/assets/8c201b9b-3d05-4af7-aab3-c5f093e9a836" />
<img width="1047" height="516" alt="image" src="https://github.com/user-attachments/assets/9684eb30-0a30-4ed6-b02c-47141b9e03f5" />
<img width="1060" height="524" alt="image" src="https://github.com/user-attachments/assets/16261746-9ac1-46e6-9c0b-ea6249ce5d71" />


Mahasiswa Task Manager 🎓
Penjelasan Singkat Aplikasi dan Fitur
Mahasiswa Task Manager adalah aplikasi web sederhana yang dirancang untuk membantu mahasiswa mengelola dan melacak tugas-tugas akademik mereka. Aplikasi ini interaktif, berjalan sepenuhnya di sisi klien (client-side), dan menggunakan Local Storage browser untuk menyimpan data secara persisten, memastikan data tugas tidak hilang saat browser ditutup.

Fitur
✅ Menambahkan tugas baru dengan informasi:
- Nama tugas
- Mata kuliah
- Deadline
  
📝 Mengedit tugas yang sudah ada
✔️ Menandai tugas sebagai selesai/belum selesai
🗑️ Menghapus tugas

🔍 Filter tugas berdasarkan:
- Status (Semua/Selesai/Belum Selesai)
- Pencarian berdasarkan mata kuliah
📊 Menampilkan statistik jumlah tugas yang belum selesai

Teknologi yang Digunakan
- HTML
- CSS
- JavaScript
- localStorage API

  student-task-manager/
├── index.html
├── style.css
├── script.js
└── README.md

Validasi Form
Nama Tugas: Tidak boleh kosong
Mata Kuliah: Tidak boleh kosong
Deadline: Harus berupa tanggal valid

Penyimpanan Data
Data tugas disimpan dalam localStorage browser dengan format:
{
  id: string,
  name: string,
  course: string,
  deadline: date,
  completed: boolean,
  createdAt: date
}

Pengembang
- Nama: Muhammad Fadhel
- NIM: 123140106
- Mata Kuliah: Praktikum Pemrograman Web
- Tahun: 2023
  
Lisensi
Copyright © 2023 Muhammad Fadhel. All rights reserved.

