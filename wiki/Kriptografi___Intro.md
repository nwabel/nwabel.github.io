---
title: Kriptografi—Enkripsi (Label Sidebar)
---

Senin, 25 Agustus 2025 2:31

- # Apa itu kriptografi
  Sebuah metode yang menggunakan matematika dan algoritma tertentu untuk mengirim atau menyimpan suatu informasi secara aman.
	- ## Buat apasih?
		- Menjaga **kerahasiaan** informasi, informasi hanya dapat dibaca oleh pihak-pihak tertentu
		- Menjaga **integritas** dari suatu informasi, biar ga diubah-ubah ato manip tanpa ijin
		- **Autentikasi**, mastiin keaslian sumber ato keaslian informasi
		- ***Non-repudiation***, ngejamin bahwa pengirim tidak dapat menyangkal bahwa ia telah mengirim informasi tersebut.
- # Prinsip dasarnya
	- ## Kerckhoffs (Kerckhoffs's *Principle*)
	  Bergantung pada *key*, bukan algoritmanya. Jadi, semisal algoritmanya banyak yang tau, selagi mereka ga tau *key*-nya ya aman-aman aja (selama *key*-nya ga bocor, ya).
	  #+BEGIN_NOTE
	  Misalnya, algoritma enkripsi AES diketahui secara publik dan terdokumentasi dengan baik. Namun, keamanan tetap terjamin karena hanya kunci rahasia (misalnya 128-bit key) yang menentukan akses ke data.
	  #+END_NOTE
	- ## Teori Ketidakpastian Shannon (Shannon's *Uncertainty Theory*)
	  *Chipertext* (cypher valorant, canda) atau teks yang dienkripsi, sejatinya ga boleh punya pola yang bermakna dan harus keliatan acak-acakan, biar ga bisa ditebak.
	  #+BEGIN_NOTE
	  Contohnya, ketika sebuah teks dienkripsi dengan AES atau RSA, hasil ciphertext terlihat seperti rangkaian karakter acak tanpa pola statistik. Hal ini membuat penyerang sulit menebak isi pesan asli.
	  #+END_NOTE
- # *Code Breaking*
  Teknik memecahkan sistem kriptografi tanpa mengetahui kunci rahasia. Tujuan utamanya adalah menemukan pesan asli (*plaintext*) dari pesan terenkripsi (*ciphertext*) atau bahkan mengungkap kunci enkripsi yang digunakan. Code breaking memanfaatkan kelemahan dalam algoritma, kesalahan implementasi, atau kebiasaan manusia (misalnya penggunaan *password* lemah). 
  #+BEGIN_TIP
  Dalam sejarah, istilah code breaking banyak digunakan, seperti ketika Alan Turing dan timnya di Bletchley Park berhasil memecahkan mesin sandi Enigma Jerman pada Perang Dunia II.
  #+END_TIP
	- ## Macam-macamnya
	  Saat ini, kriptanalisis modern mencakup berbagai teknik, antara lain:
		- **Brute Force Attack (Serangan Brute Force)**
		  *Contoh:* Penyerang mencoba semua kombinasi password untuk masuk ke akun email. Jika password hanya 4 digit angka, ada 10.000 kemungkinan (0000–9999), yang relatif mudah ditembus.
		- **Dictionary Attack (Serangan Kamus)**
		  *Contoh:* Banyak orang memakai password sederhana seperti "123456", "qwerty", atau "password". Penyerang menggunakan daftar (dictionary) password umum untuk mencoba masuk.
		- **Side-Channel Attack (Serangan Sampingan)**
		  *Contoh:* Pada smart card atau kartu kredit dengan chip, penyerang bisa menganalisis **waktu eksekusi enkripsi** atau **konsumsi listrik** untuk menebak kunci.
		- **Statistical Attack (Serangan Statistik)**
		  *Contoh:* Pada algoritma enkripsi lama seperti Caesar Cipher atau Vigenère Cipher, distribusi huruf dalam ciphertext masih menyerupai distribusi huruf dalam bahasa aslinya. Misalnya, huruf "E" paling sering muncul dalam bahasa Inggris. Penyerang bisa menebak pola ini untuk memecahkan kode.
-
- tags:: #Kriptografi #CodeBreaking