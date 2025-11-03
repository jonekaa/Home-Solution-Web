// File: assets/js/page-kaca.js
// Logika khusus untuk halaman kaca-aluminium.html
// Versi BARU dengan Kalkulator Real-time dan Katalog Interaktif

document.addEventListener("DOMContentLoaded", function () {
    // --- PENGATURAN UMUM ---
    // Ganti ... dengan nomor Admin Kaca (diawali 62)
    const nomorWA = "6287775080483"; // Menggunakan nomor dari file Anda

    // === FITUR 1: WIZARD ESTIMATOR (YANG SUDAH ADA) ===
    const wizardForm = document.getElementById("wizard-form");

    if (wizardForm) {
        // --- FITUR 2 (BARU): KALKULATOR LUAS REAL-TIME ---
        const inputPanjang = document.getElementById("wizard-panjang");
        const inputTinggi = document.getElementById("wizard-tinggi");
        const hasilLuasEl = document.getElementById("wizard-hasil-luas");

        function hitungLuas() {
            const panjangCm = parseFloat(inputPanjang.value) || 0;
            const tinggiCm = parseFloat(inputTinggi.value) || 0;

            if (panjangCm > 0 && tinggiCm > 0) {
                // (panjang cm * tinggi cm) / 10000 = meter persegi
                const luasM2 = (panjangCm * tinggiCm) / 10000;
                hasilLuasEl.textContent = `Estimasi Luas: ${luasM2.toFixed(2)} m²`; // toFixed(2) = 2 angka desimal
            } else {
                hasilLuasEl.textContent = ""; // Kosongkan jika input tidak valid
            }
        }
        // Tambahkan 'listener' ke kedua input
        inputPanjang.addEventListener("input", hitungLuas);
        inputTinggi.addEventListener("input", hitungLuas);

        // --- Logika Submit Form (yang sudah ada) ---
        wizardForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const tipeProyek = document.getElementById("wizard-tipe-proyek").value;
            const tipeKaca = document.getElementById("wizard-tipe-kaca").value;
            const panjang = inputPanjang.value; // Ambil dari variabel yang sudah ada
            const tinggi = inputTinggi.value; // Ambil dari variabel yang sudah ada
            const hasilLuas = hasilLuasEl.textContent; // Ambil hasil kalkulasi

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
                // Tambahkan hasil m² ke pesan WA
                if (hasilLuas) {
                    detailPesanan += ` (${hasilLuas})`;
                }
                adaDetail = true;
            }
            // ... (sisa logika submit Anda sudah benar) ...
            if (adaDetail) {
                pesan += detailPesanan;
            }
            const encodedPesan = encodeURIComponent(pesan);
            const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
            window.open(urlWA, "_blank", "noopener,noreferrer");
        });
    } // Akhir dari 'if (wizardForm)'

    // === FITUR 3 (BARU): KATALOG INTERAKTIF ===
    const semuaTombolMaterial = document.querySelectorAll(".btn-tanya-material");

    if (semuaTombolMaterial.length > 0) {
        semuaTombolMaterial.forEach((button) => {
            button.addEventListener("click", function () {
                // 1. Ambil nama material dari 'h5' di dalam tombol yang diklik
                const namaMaterial = this.querySelector(".fw-semibold").textContent.trim();

                // 2. Buat pesan WA
                const pesan = `Halo, saya mau tanya tentang material ini: *${namaMaterial}*. Apakah ready?`;

                // 3. Encode pesan dan buka WA
                const encodedPesan = encodeURIComponent(pesan);
                const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
                window.open(urlWA, "_blank", "noopener,noreferrer");
            });
        });
    } // Akhir dari 'if (semuaTombolMaterial)'
});