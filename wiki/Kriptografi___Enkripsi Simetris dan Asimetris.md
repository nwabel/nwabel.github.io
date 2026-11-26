title: Demo page
sidebar_title: asd
summary: Example page for mkdocs-shadcn users
new: true

# Kriptografi—Enkripsi Simetris dan Asimetris

 Enkripsi Simetris (*Symmetric Encryption*)
	- ## Apasih Enkripsi Semetris?
		- [Enkripsi simetris](https://www.ibm.com/id-id/think/topics/symmetric-encryption) adalah metode enkripsi yang menggunakan satu kunci untuk mengenkripsi dan mendekripsi data. Misal, lu sama temen lu (si A) punya *shared box* buat ngegibahin si B, lu berdua bisa ngirim dan baca surat di dalem *shared box* karena punya kunci yang sama, setiap mau ngirim ato ngambil surat make kunci yang sama. Ntu namanya simetris.
		  ![](https://storage.hackviser.com/file/hackviser-prod/trainings/sections/images/44f9fa37-a404-4249-a329-7ca1d76344b6/image-a76705e52.webp)
		  Intinya, ya, cuma ada dikunci. Kalo si B ngeduplikat ato *out of nowhere* punya kuncinya, terus ngebaca cit cat (*baca; isi ghibahan*) lu sama si A, yauda abis dah lu bedua WKWK.
	- ## Macamnya
		- Enkripsi simetris dapat dikategorikan menjadi dua jenis utama: ***block cipher*** dan ***stream cipher***.
			- ***Block Cipher***
			  collapsed:: true
			  Memproses data dalam ukuran blok tertentu (misalnya 64-bit atau 128-bit) sekaligus, setiap blok dienkripsi atau didekripsi menggunakan algoritma dan kunci tertentu.
				- DES (Data Encryption Standard)
				  logseq.order-list-type:: number
				  Dikembangkan oleh IBM pada tahun 1970-an, distandardisasi oleh pemerintah AS pada 1977, panjang 56-bit, sudah jarang karena tingkat keamanannya.
				- 3DES (Triple DES)
				  logseq.order-list-type:: number
				  Diciptakan untuk memperbaiki kelemahan DES, enkripsi dengan algoritma DES sebanyak tiga kali (encrypt-decrypt-encrypt), panjang 168-bit.
				- AES (Advanced Encryption Standard)
				  logseq.order-list-type:: number
				  Distandardisasi oleh NIST (*National Institute of Standards and Technology*) pada tahun 2001, paling banyak digunakan karena keamanannya dan kecepatannya. Panjang 128, 192, dan 256-bit.
			- ***Stream Cipher***
			  Memproses data sebagai aliran bit atau byte secara terus-menerus, melakukan operasi enkripsi dan dekripsi pada aliran data tersebut. Data diproses satu per satu, sehingga cocok digunakan untuk komunikasi data yang sifatnya real-time (misalnya streaming).
				- RC4 (Rivest Cipher 4)
				  logseq.order-list-type:: number
				  Dikembangkan oleh Ron Rivest pada tahun 1987, panjang bervariasi, cepat dan sederhana, tapi terdapat kelemahan.
				- Salsa20 dan ChaCha20
				  logseq.order-list-type:: number
				  Algoritma stream cipher modern yang lebih aman dan cepat, banyak digunakan pada perangkat dengan keterbatasan daya (seperti smartphone dan IoT) karena efisien dalam konsumsi energi.
		- #+BEGIN_NOTE
		  Singkatnya, ***block cipher*** cocok untuk data dalam ukuran besar dan tetap, sedangkan ***stream cipher*** lebih efisien untuk data yang mengalir secara terus-menerus.
		  #+END_NOTE
- # Enkripsi Asimetris (*Asymmetric Encryption*)
	- ## Apa itu Enkripsi Asimetris
		- Metode enkripsi yang menggunakan dua kunci berbeda—kunci publik dan kunci pribadi—untuk mengenkripsi dan mendekripsi data [ibm](https://www.ibm.com/id-id/think/topics/asymmetric-encryption) atau proses penggunaan kunci publik dari pasangan kunci publik/pribadi untuk mengenkripsi teks biasa, lalu menggunakan kunci pribadi yang sesuai untuk mendekripsi ciphertext [cloud.google](https://cloud.google.com/kms/docs/asymmetric-encryption?hl=id). Solusi ini umumnya dianggap lebih aman, meskipun kurang efisien, daripada enkripsi simetris.
		  #+BEGIN_CENTER
		  https://storage.hackviser.com/file/hackviser-prod/trainings/sections/images/461ed9b5-fe53-43a0-a900-e38eda265be4/image-1-833b0f46d.webp
		  #+END_CENTER
	- ## Public Key Infrastructure (PKI)
		- Skema enkripsi asimetris biasanya diimplementasikan melalui PKI. PKI adalah kerangka kerja untuk membuat, mendistribusikan, dan memvalidasi pasangan kunci publik dan privat. Keamanan kriptografi kunci publik bergantung pada penjagaan kerahasiaan kunci privat sembari membagikan kunci publik secara bebas. Kunci publik hanya dapat mengenkripsi data, sehingga tidak terlalu berharga bagi pelaku ancaman. Selain itu, karena pengguna tidak perlu membagikan kunci pribadi mereka, hal ini sangat mengurangi risiko peretas mencegat kunci yang jauh lebih berharga tersebut.
	- ## Algoritma
		- Algoritma enkripsi asimetris merupakan tulang punggung dari ekosistem kriptografi modern, menyediakan dasar untuk komunikasi yang aman dan melindungi data sensitif dari akses yang tidak sah. Berikut adalah beberapa algoritma enkripsi asimetris yang umum digunakan:
			- Rivest-Shamir-Adleman (RSA)
			  logseq.order-list-type:: number
			  Dinamai menggunakan nama penemunya. Solusi ini mengandalkan kompleksitas matematika bilangan prima untuk menghasilkan pasangan kunci, meskipun dikembangkan pada tahun 1970-an, RSA tetap banyak digunakan.
			- ECC (Elliptic Curve Cryptography)
			  logseq.order-list-type:: number
			  Berdasarkan sifat matematika kurva elips di atas bidang terbatas, tingkat keamanan setara dengan RSA tetapi dengan panjang kunci yang jauh lebih pendek (contoh: kunci ECC 256-bit ≈ RSA 2048-bit).
			- DSA (Digital Signature Algorithm)
			  logseq.order-list-type:: number
			  Memungkinkan organisasi dan individu untuk membuat tanda tangan digital yang memastikan keaslian dan integritas pesan atau dokumen. Distandardisasi oleh NIST, DSA mengandalkan masalah matematika dari logaritma diskrit dan muncul dalam berbagai protokol keamanan.
		- #+BEGIN_NOTE
		  Sering digunakan pada HTTPS, SSH, TLS, VPN, email, dan tanda tangan digital.
		  #+END_NOTE
- # Kelebihan dan Kekurangan
	- Berikut adalah tabel perbandingan yang merangkum kelebihan dan kekurangan dari enkripsi simetris dan asimetris.
	  
	  |**Fitur**|**Enkripsi Simetris**|**Enkripsi Asimetris**|
	  |--|--|--|
	  ||**Kelebihan 👍**|
	  |🚀 Kecepatan|Sangat Cepat. Efisien untuk mengenkripsi data dalam jumlah besar.|Lambat. Proses komputasinya jauh lebih berat.|
	  |💻 Sumber Daya|Ringan. Membutuhkan lebih sedikit daya komputasi.|Berat. Membutuhkan sumber daya komputasi yang signifikan.|
	  |✨ Kesederhanaan|Algoritma dan implementasinya cenderung lebih sederhana.|Algoritma lebih kompleks.|
	  ||**Kekurangan 👎**|
	  |🚚 Distribusi|Sulit dan Berisiko. Membagikan kunci rahasia secara aman adalah tantangan terbesar.|**Mudah dan Aman**. Kunci publik dapat didistribusikan secara bebas tanpa membahayakan kunci privat.|
	  |🔑 Manajemen|Kompleks, terutama dalam jaringan besar karena setiap pasangan pengguna memerlukan kunci yang berbeda.|Lebih Sederhana. Setiap pengguna hanya perlu mengelola satu pasang kuncinya sendiri.|
	  |🛡️ Keamanan & Fitur|Jika kunci bocor, semua data yang dienkripsi dengan kunci itu terekspos.|Sangat Aman. Menyediakan fitur otentikasi dan integritas melalui tanda tangan digital.|
-
- tags:: #Kriptografi #EnkripsiAsimetris #EnkripsiSimetris #Enkripsi