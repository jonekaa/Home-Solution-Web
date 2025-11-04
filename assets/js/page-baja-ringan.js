// File: assets/js/page-baja-ringan.js
// Logika khusus untuk halaman baja-ringan.html

document.addEventListener("DOMContentLoaded", function () {
    // Gunakan nomor WA yang sama dengan file JS Anda yang lain
    const nomorWA = "6287775080483";

    // === FITUR 1: Tombol Katalog "Tanya Harga & Stok" ===
    const semuaTombolStok = document.querySelectorAll(".btn-tanya-stok");

    semuaTombolStok.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Mencegah link '#' bekerja

            // Ambil nama produk dari card title terdekat
            const card = this.closest(".product-card");
            const namaProduk = card.querySelector(".card-title").textContent.trim();

            // Buat pesan dinamis
            const pesan = `Halo, saya mau tanya harga & stok untuk: *${namaProduk}*`;

            // Encode dan buka WA
            const encodedPesan = encodeURIComponent(pesan);
            const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
            window.open(urlWA, "_blank", "noopener,noreferrer");
        });
    });

    // === FITUR 2: Tombol Kontraktor "Kirim Kebutuhan Proyek" ===
    const tombolKirimProyek = document.getElementById("btn-kirim-rab");

    if (tombolKirimProyek) {
        tombolKirimProyek.addEventListener("click", function (event) {
            event.preventDefault(); // Mencegah link '#' bekerja

            // Buat pesan statis sesuai permintaan Anda
            const pesan = "Halo, saya ingin menggunakan baja ringan untuk pembangunan proyek saya";

            // Encode dan buka WA
            const encodedPesan = encodeURIComponent(pesan);
            const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
            window.open(urlWA, "_blank", "noopener,noreferrer");
        });
    }
});
