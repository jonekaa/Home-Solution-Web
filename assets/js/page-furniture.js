// File: assets/js/page-furniture.js

document.addEventListener("DOMContentLoaded", function () {
    const nomorWA = "6287775080483";
    const PRODUK_PER_HALAMAN = 8;
    const JSON_FILE_PATH = "../assets/data/products.json"; // Path dari furniture.html ke JSON

    const productContainer = document.getElementById("product-grid");
    const sortSelect = document.getElementById("sort-select");
    const kategoriFilter = document.getElementById("kategori-filter");
    const paginationContainer = document.getElementById("pagination-container");

    if (!productContainer || !sortSelect || !kategoriFilter || !paginationContainer) {
        console.error("Elemen UI penting (grid, filter, paginasi) tidak ditemukan.");
        return;
    }

    // --- SUMBER DATA (STATE) ---
    let masterProductList = []; // Daftar semua produk
    let currentState = {
        kategori: "semua",
        sort: "terbaru",
        halaman: 1
    };

    // =========================================================
    // FUNGSI UTAMA (INIT)
    // =========================================================

    async function initializeFurniturePage() {
        // 1. Ambil data dari "database" JSON
        try {
            const response = await fetch(JSON_FILE_PATH);
            if (!response.ok) {
                throw new Error(`Gagal memuat ${JSON_FILE_PATH}`);
            }
            const productsData = await response.json();

            // 2. Ubah data JSON menjadi elemen HTML + data
            masterProductList = productsData.map((product) => {
                return {
                    element: createProductCardElement(product),
                    kategori: product.kategori.toLowerCase(),
                    price: product.harga,
                    id: product.id
                };
            });

            // 3. Render halaman untuk pertama kali
            renderProducts();

            // 4. Pasang semua 'listeners'
            setupListeners();
        } catch (error) {
            console.error("Gagal menginisialisasi halaman:", error);
            productContainer.innerHTML = `<p class="col-12 text-center text-danger">Gagal memuat produk. Silakan coba lagi nanti.</p>`;
        }
    }

    // =========================================================
    // FUNGSI PEMBANTU (HELPERS)
    // =========================================================

    /**
     * Membuat satu kartu HTML dari satu objek produk
     */
    function createProductCardElement(product) {
        // Format harga (1250000 -> "1.250.000")
        const formattedPrice = new Intl.NumberFormat("id-ID").format(product.harga);

        // Buat badge (jika ada)
        const badgeHTML = product.badge
            ? `<span class="badge ${product.badgeColor} position-absolute top-0 start-0 m-2">${product.badge}</span>`
            : "";

        // Buat ikon marketplace
        const marketplaceHTML = product.marketplace
            .map(
                (link) => `
            <a href="${link.url}" class="btn-icon-marketplace ${link.color} fs-2" target="_blank" rel="noopener noreferrer" title="Beli di ${link.nama}">
                <i class="bi ${link.icon}"></i>
            </a>
        `
            )
            .join("");

        // Buat elemen <div> kolom
        const colDiv = document.createElement("div");
        colDiv.className = `col-lg-3 col-md-4 col-6`;
        colDiv.setAttribute("data-category", product.kategori.toLowerCase());

        // Isi HTML kartu
        colDiv.innerHTML = `
            <div class="card h-100 shadow-sm border-0 card-hover product-card">
                ${badgeHTML}
                <img src="${product.gambar}" class="card-img-top card-img-fixed" alt="${product.nama}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fs-6 fw-semibold text-primary-dark">${product.nama}</h5>
                    <p class="card-text fw-bold text-primary fs-5 mb-3">Rp ${formattedPrice}</p>

                    <div class="mt-auto">
                        <small class="text-muted d-block mb-2">Beli di:</small>
                        <div class="d-flex justify-content-start gap-3">
                            <a href="javascript:void(0);" class="btn-icon-marketplace btn-tanya-furniture text-whatsapp fs-3" title="Tanya via WhatsApp">
                                <i class="bi bi-whatsapp"></i>
                            </a>
                            ${marketplaceHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Tambahkan event listener WA ke tombol yang baru dibuat
        colDiv.querySelector(".btn-tanya-furniture").addEventListener("click", (e) => {
            e.preventDefault();
            const pesan = `Halo, saya ingin bertanya tentang ${product.nama}`;
            const encodedPesan = encodeURIComponent(pesan);
            const urlWA = `https://wa.me/${nomorWA}?text=${encodedPesan}`;
            window.open(urlWA, "_blank", "noopener,noreferrer");
        });

        return colDiv;
    }

    /**
     * Memasang semua event listener untuk filter, sortir, dan paginasi
     */
    function setupListeners() {
        // Listener Filter Kategori
        kategoriFilter.addEventListener("click", function (event) {
            const target = event.target.closest(".btn-kategori");
            if (!target) return;
            event.preventDefault();
            kategoriFilter.querySelector(".active").classList.remove("active");
            target.classList.add("active");
            currentState.kategori = target.dataset.filter;
            currentState.halaman = 1;
            renderProducts();
        });

        // Listener Sortir Harga
        sortSelect.addEventListener("change", function () {
            currentState.sort = this.value;
            currentState.halaman = 1;
            renderProducts();
        });

        // Listener Paginasi
        paginationContainer.addEventListener("click", function (event) {
            const target = event.target.closest(".btn-paginasi");
            if (!target || target.parentElement.classList.contains("disabled")) return;
            event.preventDefault();
            currentState.halaman = parseInt(target.dataset.page, 10);
            renderProducts();
            productContainer.scrollIntoView({ behavior: "smooth" });
        });
    }

    /**
     * Fungsi render utama (Filter, Sortir, Paginasi)
     */
    function renderProducts() {
        // 1. FILTER
        let processedProducts = masterProductList;
        if (currentState.kategori !== "semua") {
            processedProducts = masterProductList.filter((product) => product.kategori === currentState.kategori);
        }

        // 2. SORTIR
        // Buat salinan sebelum menyortir agar tidak mengubah urutan masterList
        let sortedProducts = [...processedProducts];
        if (currentState.sort === "2") {
            // Harga Terendah
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (currentState.sort === "3") {
            // Harga Tertinggi
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        // 3. PAGINASI
        const totalHalaman = Math.ceil(sortedProducts.length / PRODUK_PER_HALAMAN);
        if (currentState.halaman > totalHalaman) {
            currentState.halaman = 1;
        }
        const startIndex = (currentState.halaman - 1) * PRODUK_PER_HALAMAN;
        const endIndex = startIndex + PRODUK_PER_HALAMAN;
        const productsToShow = sortedProducts.slice(startIndex, endIndex);

        // 4. RENDER PRODUK
        productContainer.innerHTML = "";
        if (productsToShow.length === 0) {
            productContainer.innerHTML =
                '<p class="col-12 text-center text-muted py-5">Tidak ada produk yang sesuai dengan filter Anda.</p>';
        } else {
            productsToShow.forEach((product) => {
                productContainer.appendChild(product.element);
            });
        }

        // 5. RENDER PAGINASI
        renderPagination(totalHalaman, currentState.halaman);
    }

    /**
     * Membuat tombol-tombol paginasi
     */
    function renderPagination(totalHalaman, halamanAktif) {
        paginationContainer.innerHTML = "";
        if (totalHalaman <= 1) return;

        paginationContainer.innerHTML += `
            <li class="page-item ${halamanAktif === 1 ? "disabled" : ""}">
                <a class="page-link btn-paginasi" href="javascript:void(0);" data-page="${halamanAktif - 1}">Sebelumnya</a>
            </li>
        `;
        for (let i = 1; i <= totalHalaman; i++) {
            paginationContainer.innerHTML += `
                <li class="page-item ${i === halamanAktif ? "active" : ""}">
                    <a class="page-link btn-paginasi" href="javascript:void(0);" data-page="${i}">${i}</a>
                </li>
            `;
        }
        paginationContainer.innerHTML += `
            <li class="page-item ${halamanAktif === totalHalaman ? "disabled" : ""}">
                <a class="page-link btn-paginasi" href="javascript:void(0);" data-page="${halamanAktif + 1}">Berikutnya</a>
            </li>
        `;
    }

    // --- Jalankan Inisialisasi ---
    initializeFurniturePage();
});
