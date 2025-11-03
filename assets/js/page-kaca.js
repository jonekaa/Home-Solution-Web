// File: assets/js/page-kaca.js
// Logika khusus untuk halaman kaca-aluminium.html

document.addEventListener("DOMContentLoaded", function () {
    // 1. Temukan formulir di halaman
    const wizardForm = document.getElementById("wizard-form");

    // 2. Jika formulir tidak ada di halaman ini, hentikan script
    if (!wizardForm) {
        return;
    }

    // 3. Tambahkan "pendengar" saat formulir di-submit
    wizardForm.addEventListener("submit", function (event) {
        // 4. Hentikan aksi default (reload halaman)
        event.preventDefault();

        // 5. Ambil semua data dari formulir
        const tipeProyek = document.getElementById("wizard-tipe-proyek").value;
        const tipeKaca = document.getElementById("wizard-tipe-kaca").value;
        const panjang = document.getElementById("wizard-panjang").value;
        const tinggi = document.getElementById("wizard-tinggi").value;

        // 6. Siapkan nomor WA Anda
        // Ganti ... dengan nomor Admin Kaca (diawali 62)
        const nomorWA = "6287775080483";

        // 7. Buat pesan dinamis
        let pesan = "Halo, saya mau tanya estimasi kaca dari website Anda.";
        let detailPesanan = "\n\n*Detail Proyek Saya:*";
        let adaDetail = false;

        if (tipeProyek) {
            detailPesanan += `\n- Tipe Proyek: ${tipeProyek}`;
            adaDetail = true;
        }
        if (tipeKaca) {
            detailPesanan += `\n- Tipe Kaca: ${tipeKaca}`;
            adaDetail = true;
        }
        if (panjang && tinggi) {
            detailPesanan += `\n- Estimasi Ukuran: ${panjang} cm x ${tinggi} cm`;
            adaDetail = true;
        } else if (panjang) {
            detailPesanan += `\n- Estimasi Panjang: ${panjang} cm`;
            adaDetail = true;
        } else if (tinggi) {
            detailPesanan += `\n- Estimasi Tinggi: ${tinggi} cm`;
            adaDetail = true;
        }

        // 8. Gabungkan pesan jika ada detail
        if (adaDetail) {
            pesan += detailPesanan;
        }

        // 9. Encode pesan untuk URL dan buat link WA
        const encodedPesan = encodeURIComponent(pesan);
        const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;

        // 10. Buka WhatsApp di tab baru
        window.open(urlWA, "_blank", "noopener,noreferrer");
    });
});
