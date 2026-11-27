---
title: Showcase Fitur Bawaan mkdocs-shadcn
sidebar_title: Showcase Tema
summary: Contoh lengkap komponen & extension bawaan mkdocs-shadcn yang aktif di situs ini (frontmatter, hover card, iconify, admonition, tab, progress bar, KaTeX, code block, termynal).
new: true
author: nwabel
description: Halaman contoh semua fitur bawaan tema mkdocs-shadcn dan extension Markdown yang aktif.
keywords: mkdocs, shadcn, showcase, markdown
external_links:
  Docs Tema: https://asiffer.github.io/mkdocs-shadcn/
  GitHub Repo: https://github.com/nwabel/nwabel.github.io
---

## 1. Frontmatter Metadata

Halaman ini langsung mendemonstrasikan frontmatter bawaan `mkdocs-shadcn`:

- `title` & `sidebar_title` (judul artikel vs label di sidebar)
- `summary` (ringkasan tepat di bawah judul)
- `new: true` (titik biru di sidebar)
- `external_links` (tombol link eksternal di header)
- `author`, `description`, `keywords` (masuk ke SEO / Open Graph `<head>`)

---

## 2. Hover Card (`shadcn.extensions.hover_card`)

Arahkan kursor ke kata berikut untuk melihat **Inline Hover Card**:  
Dalam keamanan jaringan, [Zero Trust]^[Model keamanan yang tidak pernah mempercayai perangkat atau user secara default, baik di dalam maupun di luar jaringan.] dan [Non-repudiation]^[Jaminan bahwa pengirim tidak dapat menyangkal pesan yang telah dikirim.] adalah konsep penting.

Contoh **Block Hover Card** (mendukung Markdown penuh & posisi kustom):  
Baca detail [Kerckhoffs's Principle]^[#kerckhoffs-demo] sebelum merancang sistem kriptografi.

/// hover-card | kerckhoffs-demo
    position: bottom
**Prinsip Kerckhoffs (1883)**

Keamanan sistem kriptografi harus bergantung pada kerahasiaan *key*, bukan kerahasiaan algoritmanya.
///

---

## 3. Iconify (`shadcn.extensions.iconify`)

Gunakan sintaks `+koleksi:nama-ikon+` langsung di dalam teks:

- Security: +tabler:shield-lock+ Shield Lock, +tabler:bug+ Bug, +lucide:terminal+ Terminal
- Tools: +simple-icons:kalilinux+ Kali Linux, +simple-icons:python+ Python, +simple-icons:docker+ Docker

---

## 4. Admonitions (Callout Box)

!!! note "Note"
    Catatan informasi standar untuk penjelasan tambahan.

!!! tip "Tip"
    Gunakan `fetch-depth: 0` di GitHub Actions agar tanggal `Created` & `Updated` tetap akurat.

!!! warning "Warning"
    Hati-hati saat menjalankan exploit — pastikan hanya di environment lab sendiri.

!!! danger "Danger"
    Jangan pernah commit API key atau credential asli ke repository publik.

---

## 5. Collapsible Details (`pymdownx.blocks.details`)

/// details | Klik untuk melihat catatan tersembunyi
    type: info
Isi detail ini tersembunyi secara default dan bisa dibuka-tutup oleh pembaca. Cocok untuk **spoiler flag CTF** atau output log yang panjang.
///

---

## 6. Content Tabs (`pymdownx.tabbed`)

=== "Python"

    ```python
    import hashlib

    msg = b"nwabel"
    print(hashlib.sha256(msg).hexdigest())
    ```

=== "Bash"

    ```bash
    printf "nwabel" | sha256sum
    ```

=== "PowerShell"

    ```powershell
    Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes("nwabel"))) -Algorithm SHA256
    ```

---

## 7. Progress Bar (`pymdownx.progressbar`)

[=25% "25% — Recon"]

[=65% "65% — Exploitation"]

[=100% "100% — Rooted"]

---

## 8. Math / KaTeX (`pymdownx.arithmatex`)

Inline math: rumus enkripsi RSA sederhana adalah $c \equiv m^e \pmod{n}$ untuk $m \in \RR$.

Display math:

$$
\int_{a}^{b} f(x)\,\dx = F(b) - F(a)
$$

---

## 9. Tabel & Blockquote

| Fitur | Sumber | Status |
| :--- | :--- | :--- |
| `hover_card` | `shadcn.extensions.hover_card` | Aktif |
| `iconify` | `shadcn.extensions.iconify` | Aktif |
| `created_at` / `updated_at` | `mixins/git` + `datetime.html` | Aktif |
| `external_links` | Bawaan `mkdocs-shadcn` | Aktif |

> "Break things in labs, document clearly, and ship clean notes."

---

## 10. Termynal (`termynal` plugin)

```console
$ nmap -sC -sV 10.10.10.10
Starting Nmap 7.94 ( https://nmap.org )
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1
80/tcp open  http    nginx 1.18.0
```
