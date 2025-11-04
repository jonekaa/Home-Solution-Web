// File: assets/js/page-kaca.js
// Logika khusus untuk halaman kaca-aluminium.html
// PERBAIKAN: Menggunakan function expression untuk W082

document.addEventListener("DOMContentLoaded", function () {
    // --- PENGATURAN UMUM ---
    const nomorWA = "6287775080483"; // Menggunakan nomor dari file Anda

    // === FITUR 1: WIZARD ESTIMATOR (YANG SUDAH ADA) ===
    const wizardForm = document.getElementById("wizard-form");

    if (wizardForm) {
        // --- FITUR 2: KALKULATOR LUAS REAL-TIME ---
        const inputPanjang = document.getElementById("wizard-panjang");
        const inputTinggi = document.getElementById("wizard-tinggi");
        const hasilLuasEl = document.getElementById("wizard-hasil-luas");

        //
        // PERBAIKAN DI SINI:
        // 'function hitungLuas()' diubah menjadi 'const hitungLuas = function()'
        // Ini adalah function expression dan tidak akan memicu warning W082.
        //
        const hitungLuas = function () {
            const panjangCm = parseFloat(inputPanjang.value) || 0;
            const tinggiCm = parseFloat(inputTinggi.value) || 0;

            if (panjangCm > 0 && tinggiCm > 0) {
                // (panjang cm * tinggi cm) / 10000 = meter persegi
                const luasM2 = (panjangCm * tinggiCm) / 10000;
                hasilLuasEl.textContent = `Estimasi Luas: ${luasM2.toFixed(2)} m²`; // toFixed(2) = 2 angka desimal
            } else {
                hasilLuasEl.textContent = ""; // Kosongkan jika input tidak valid
            }
        }; // <-- Perhatikan titik koma di sini

        // Tambahkan 'listener' ke kedua input
        inputPanjang.addEventListener("input", hitungLuas);
        inputTinggi.addEventListener("input", hitungLuas);

        // --- Logika Submit Form (yang sudah ada) ---
        wizardForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const tipeProyek = document.getElementById("wizard-tipe-proyek").value;
            const tipeKaca = document.getElementById("wizard-tipe-kaca").value;
            const panjang = inputPanjang.value;
            const tinggi = inputTinggi.value;
            const hasilLuas = hasilLuasEl.textContent;

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
                if (hasilLuas) {
                    detailPesanan += ` (${hasilLuas})`;
                }
                adaDetail = true;
            }

            if (adaDetail) {
                pesan += detailPesanan;
            }
            const encodedPesan = encodeURIComponent(pesan);
            const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
            window.open(urlWA, "_blank", "noopener,noreferrer");
        });
    } // Akhir dari 'if (wizardForm)'

    // === FITUR 3: KATALOG INTERAKTIF ===
    // (Kode ini sudah saya hapus di respons sebelumnya,
    // namun jika Anda masih menggunakannya, biarkan saja)
    const semuaTombolMaterial = document.querySelectorAll(".btn-tanya-material");

    if (semuaTombolMaterial.length > 0) {
        semuaTombolMaterial.forEach((button) => {
            button.addEventListener("click", function () {
                const namaMaterial = this.querySelector(".fw-semibold").textContent.trim();
                const pesan = `Halo, saya mau tanya tentang material ini: *${namaMaterial}*. Apakah ready?`;
                const encodedPesan = encodeURIComponent(pesan);
                const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
                window.open(urlWA, "_blank", "noopener,noreferrer");
            });
        });
    }
});
