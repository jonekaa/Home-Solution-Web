// File: assets/js/page-kaca.js
// [UPGRADED VERSION]
// Logika khusus untuk halaman kaca-aluminium.html

document.addEventListener("DOMContentLoaded", function () {
    // --- PENGATURAN UMUM ---
    const nomorWA = "6287775080483"; // Menggunakan nomor dari file Anda

    // === FITUR 1: WIZARD ESTIMATOR (Logika Anda yang sudah ada) ===
    const wizardForm = document.getElementById("wizard-form");
    if (wizardForm) {
        const inputPanjang = document.getElementById("wizard-panjang");
        const inputTinggi = document.getElementById("wizard-tinggi");
        const hasilLuasEl = document.getElementById("wizard-hasil-luas");

        // Kalkulator Luas Real-time
        const hitungLuas = function () {
            const panjangCm = parseFloat(inputPanjang.value) || 0;
            const tinggiCm = parseFloat(inputTinggi.value) || 0;

            if (panjangCm > 0 && tinggiCm > 0) {
                const luasM2 = (panjangCm * tinggiCm) / 10000;
                hasilLuasEl.textContent = `Estimasi Luas: ${luasM2.toFixed(2)} m²`;
            } else {
                hasilLuasEl.textContent = "";
            }
        };

        inputPanjang.addEventListener("input", hitungLuas);
        inputTinggi.addEventListener("input", hitungLuas);

        // Logika Submit Form (Pesan WA)
        wizardForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // [PERBAIKAN] Ambil teks dari opsi yang dipilih, bukan value-nya
            const proyekSelect = document.getElementById("wizard-tipe-proyek");
            const tipeProyek = proyekSelect.options[proyekSelect.selectedIndex].text;

            const kacaSelect = document.getElementById("wizard-tipe-kaca");
            const tipeKaca = kacaSelect.options[kacaSelect.selectedIndex].text;

            const panjang = inputPanjang.value;
            const tinggi = inputTinggi.value;
            const hasilLuas = hasilLuasEl.textContent;

            let pesan = "Halo, saya mau tanya estimasi kaca dari website Anda.";
            let detailPesanan = "\\n\\n*Detail Proyek Saya:*";
            let adaDetail = false;

            // Pastikan tidak mengirim "Pilih Tipe Proyek..."
            if (proyekSelect.value) {
                detailPesanan += `\\n- Tipe Proyek: ${tipeProyek}`;
                adaDetail = true;
            }
            if (kacaSelect.value) {
                detailPesanan += `\\n- Tipe Kaca: ${tipeKaca}`;
                adaDetail = true;
            }
            if (panjang && tinggi) {
                detailPesanan += `\\n- Estimasi Ukuran: ${panjang} cm x ${tinggi} cm`;
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


    // === [UPGRADE] FITUR 2: GALERI & FILTER INSPIRASI ===
    const filterContainer = document.getElementById("inspirasi-filter-buttons");
    const galleryItems = document.querySelectorAll("#inspirasi-grid .gallery-item");

    if (filterContainer && galleryItems.length > 0) {
        filterContainer.addEventListener("click", function (e) {
            // Hanya proses jika yang diklik adalah tombol filter
            const targetButton = e.target.closest(".btn-filter");
            if (!targetButton) return;

            // Hentikan jika sudah aktif
            if (targetButton.classList.contains("active")) return;

            // 1. Update Tombol Aktif
            filterContainer.querySelector(".btn-filter.active").classList.remove("active");
            targetButton.classList.add("active");

            // 2. Filter Item
            const filterValue = targetButton.dataset.filter;

            galleryItems.forEach((item) => {
                const itemKategori = item.dataset.kategori;
                if (filterValue === "semua" || filterValue === itemKategori) {
                    item.style.display = "block"; // Tampilkan
                } else {
                    item.style.display = "none"; // Sembunyikan
                }
            });
        });
    }


    // === [UPGRADE] FITUR 3: SMART WIZARD SCROLL ===
    const wizardDropdown = document.getElementById("wizard-tipe-proyek");
    const inspirasiSection = document.getElementById("inspirasi-gallery-section");

    if (wizardDropdown && inspirasiSection) {
        wizardDropdown.addEventListener("change", function () {
            const selectedFilter = this.value; // misal: "partisi"

            if (selectedFilter) {
                // 1. Temukan tombol filter yang sesuai
                const targetFilterButton = filterContainer.querySelector(`.btn-filter[data-filter="${selectedFilter}"]`);

                if (targetFilterButton) {
                    // 2. Klik tombol itu secara programatis
                    targetFilterButton.click();
                }

                // 3. Scroll ke galeri
                inspirasiSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // === [UPGRADE] FITUR 4: MATERIAL CAROUSEL (SWIPER.JS) - Netflix Style ===
    new Swiper(".material-swiper", {
        // Show multiple slides like Netflix
        slidesPerView: 1.2,
        centeredSlides: true,
        loop: true, // Infinite loop
        loopedSlides: 5, // Number of slides to duplicate for smooth looping

        // Spacing between cards
        spaceBetween: 15,

        // Smooth transitions
        speed: 600,
        effect: 'slide',

        // Auto grab cursor
        grabCursor: true,

        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        // Pagination dots
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        // Responsive breakpoints for different screen sizes
        breakpoints: {
            // Mobile
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                centeredSlides: true,
            },
            // Tablet
            640: {
                slidesPerView: 2,
                spaceBetween: 15,
                centeredSlides: false,
            },
            // Desktop small
            768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
                centeredSlides: false,
            },
            // Desktop medium
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: false,
            },
            // Desktop large
            1280: {
                slidesPerView: 3.5,
                spaceBetween: 25,
                centeredSlides: false,
            }
        },

        // Slide change effect - scale down non-active slides
        on: {
            init: function () {
                updateSlideScale(this);
            },
            slideChange: function () {
                updateSlideScale(this);
            },
            resize: function () {
                updateSlideScale(this);
            }
        }
    });

    // Helper function to add scale effect to slides (Netflix-like)
    function updateSlideScale(swiper) {
        const slides = swiper.slides;
        slides.forEach((slide, index) => {
            slide.style.transition = 'transform 0.3s ease';
            if (swiper.params.centeredSlides && window.innerWidth < 640) {
                // Only apply scale on mobile when centered
                if (slide.classList.contains('swiper-slide-active')) {
                    slide.style.transform = 'scale(1)';
                } else {
                    slide.style.transform = 'scale(0.85)';
                }
            } else {
                slide.style.transform = 'scale(1)';
            }
        });
    }

});