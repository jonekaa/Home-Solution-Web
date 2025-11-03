// File: assets/js/page-keramik.js
// Logika khusus untuk halaman keramik (Fitur Koleksi & Tanya Look)

// Menjalankan script setelah semua HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
    // --- PENGATURAN UMUM ---
    // Ganti ... dengan nomor Admin Keramik (diawali 62)
    const nomorWA = "6287775080483";

    // Variabel untuk menyimpan 'look' yang disukai
    let koleksiItems = [];

    // --- ELEMEN HTML YANG KITA PERLUKAN ---
    const koleksiBar = document.getElementById("koleksi-saya-bar");
    const koleksiCounter = document.getElementById("koleksi-counter");
    const btnKirimKoleksi = document.getElementById("btn-kirim-koleksi");

    // Ambil SEMUA tombol "Tanya" dan "Simpan"
    // (Perhatikan kita menargetkan class yang Anda tambahkan/miliki)
    const semuaTombolTanya = document.querySelectorAll(".btn-tanya-look");
    const semuaTombolSimpan = document.querySelectorAll(".btn-save-look");

    // Jika tidak ada elemen-elemen ini di halaman, hentikan script
    if (!koleksiBar || !semuaTombolTanya.length || !semuaTombolSimpan.length) {
        return;
    }

    // =========================================================
    // BAGIAN 1: FITUR "TANYA TENTANG LOOK INI" (Permintaan Anda)
    // =========================================================

    semuaTombolTanya.forEach((button) => {
        button.addEventListener("click", function () {
            // 1. Ambil nama 'look' dari card yang sama
            const card = this.closest(".card-look");
            const namaLook = card.querySelector(".card-title").textContent.trim(); // .trim() = hapus spasi

            // 2. Buat pesan WA
            const pesan = `Halo, saya mau tanya tentang inspirasi ini: *${namaLook}*. Apakah ready?`;

            // 3. Encode pesan dan buka WA
            const encodedPesan = encodeURIComponent(pesan);
            const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
            window.open(urlWA, "_blank", "noopener,noreferrer");
        });
    });

    // =========================================================
    // BAGIAN 2: FITUR "KOLEKSI SAYA" (❤️)
    // =========================================================

    // --- Fungsi untuk update floating bar ---
    function updateKoleksiBar() {
        const jumlahItem = koleksiItems.length;

        // Update teks counter
        koleksiCounter.textContent = `Koleksi Saya (${jumlahItem})`;

        if (jumlahItem > 0) {
            // Tampilkan bar jika ada item
            koleksiBar.style.display = "flex"; // Gunakan 'flex' agar sejajar
            btnKirimKoleksi.classList.remove("disabled"); // Aktifkan tombol
        } else {
            // Sembunyikan bar jika koleksi kosong
            koleksiBar.style.display = "none";
            btnKirimKoleksi.classList.add("disabled"); // Non-aktifkan tombol
        }
    }

    // --- Fungsionalitas Tombol Simpan (❤️) ---
    semuaTombolSimpan.forEach((button) => {
        button.addEventListener("click", function () {
            const card = this.closest(".card-look");
            const namaLook = card.querySelector(".card-title").textContent.trim();
            const icon = this.querySelector("i");

            // Cek apakah item sudah ada di koleksi
            if (koleksiItems.includes(namaLook)) {
                // SUDAH ADA: Hapus dari koleksi (Un-save)
                koleksiItems = koleksiItems.filter((item) => item !== namaLook);

                // Ubah tampilan tombol
                this.classList.remove("active");
                icon.classList.remove("bi-heart-fill");
                icon.classList.add("bi-heart");
            } else {
                // BELUM ADA: Tambahkan ke koleksi (Save)
                koleksiItems.push(namaLook);

                // Ubah tampilan tombol
                this.classList.add("active");
                icon.classList.remove("bi-heart");
                icon.classList.add("bi-heart-fill"); // Icon hati penuh
            }

            // Panggil fungsi untuk update bar
            updateKoleksiBar();
        });
    });

    // --- Fungsionalitas Tombol "Kirim Koleksi ke Admin WA" ---
    btnKirimKoleksi.addEventListener("click", function (event) {
        event.preventDefault(); // Hentikan aksi link

        if (koleksiItems.length === 0) {
            alert("Koleksi Anda masih kosong. Silakan simpan (❤️) beberapa inspirasi terlebih dahulu.");
            return;
        }

        // Buat daftar koleksi
        let daftarKoleksi = "";
        koleksiItems.forEach((item, index) => {
            daftarKoleksi += `\n${index + 1}. ${item}`;
        });

        // Buat pesan WA
        const pesan = `Halo, saya sudah menyimpan beberapa inspirasi dari website Anda. Mohon info detailnya:\n${daftarKoleksi}`;

        // Encode dan buka WA
        const encodedPesan = encodeURIComponent(pesan);
        const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
        window.open(urlWA, "_blank", "noopener,noreferrer");
    });

    // --- Inisialisasi ---
    // Panggil fungsi ini saat halaman dimuat, untuk memastikan
    // bar dalam keadaan 'disabled' dan 'hidden'
    updateKoleksiBar();
});
