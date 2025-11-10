/* Mockup Website/assets/js/main.js */
/* VERSI PERBAIKAN (Syntax Error & Path Rewriter diperbaiki) */

/**
 * Fungsi untuk mengaktifkan theme switcher (Light/Dark Mode)
 * - Dibungkus dalam fungsi agar bisa dipanggil SETELAH header dimuat.
 */
function setupThemeSwitcher() {
    const htmlElement = document.documentElement; // Target: <html>
    const switchElement = document.getElementById("theme-switcher");
    if (!switchElement) return; // Hentikan jika tombol switcher tidak ada

    const lightIcon = document.getElementById("theme-icon-light");
    const darkIcon = document.getElementById("theme-icon-dark");

    // Fungsi untuk mengubah ikon mana yang "aktif"
    function setActiveIcon(theme) {
        if (!lightIcon || !darkIcon) return;
        if (theme === "dark") {
            lightIcon.classList.remove("text-primary");
            darkIcon.classList.add("text-primary");
        } else {
            lightIcon.classList.add("text-primary");
            darkIcon.classList.remove("text-primary");
        }
    }

    // Fungsi utama untuk MENGATUR tema
    function setTheme(theme) {
        htmlElement.setAttribute("data-bs-theme", theme);
        switchElement.checked = theme === "dark";
        setActiveIcon(theme);
        localStorage.setItem("theme", theme);
    }

    // 1. Cek preferensi tersimpan
    let storedTheme = localStorage.getItem("theme");

    // 2. Jika tidak, cek preferensi OS
    if (!storedTheme) {
        storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // 3. Terapkan tema
    setTheme(storedTheme);

    // 4. Tambahkan event listener ke tombol switch
    switchElement.addEventListener("change", function () {
        setTheme(this.checked ? "dark" : "light");
    });

    // 5. Dengar perubahan OS
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
        }
    });
}

/**
 * Memuat komponen (header/footer) dan memperbaiki path-nya.
 * @param {string} id - ID elemen placeholder (misal: "header-placeholder")
 * @param {string} url - Path ke file template (misal: "_header.html")
 * @param {string} pathPrefix - Prefix (misal: "../")
 */
async function loadComponent(id, url, pathPrefix) {
    try {
        // 1. Muat template
        const response = await fetch(pathPrefix + url);
        if (!response.ok) {
            throw new Error(`Gagal memuat ${pathPrefix + url}: ${response.statusText}`);
        }
        let data = await response.text(); // 2. Ambil HTML sebagai teks

        // 3. PERBAIKAN DINAMIS (PATH REWRITER YANG SUDAH DIPERBAIKI):
        if (pathPrefix) {
            // pathPrefix adalah "../"
            // Aturan 1: Perbaiki link ke root (misal: index.html)
            // Mengubah href="index.html" -> href="../index.html"
            data = data.replace(/(href|src)="(index\.html)"/g, `$1="${pathPrefix}$2"`);

            // Aturan 2: Perbaiki link antar halaman di folder /pages
            // Mengubah href="pages/kaca.html" -> href="kaca.html"
            data = data.replace(/(href|src)="pages\/([^"]*)"/g, `$1="$2"`);
        }

        // 4. Suntikkan HTML yang sudah diperbaiki
        document.getElementById(id).innerHTML = data;
    } catch (error) {
        console.error(error);
        document.getElementById(id).innerHTML = `<p class="text-danger text-center">Gagal memuat ${id}.</p>`;
    }
}

// Event Listener utama
document.addEventListener("DOMContentLoaded", async function () {
    // Tentukan prefix berdasarkan lokasi file HTML
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    // Muat header dan footer secara bersamaan
    await Promise.all([
        loadComponent("header-placeholder", "_header.html", pathPrefix),
        loadComponent("footer-placeholder", "_footer.html", pathPrefix)
    ]);

    // Jalankan theme switcher SETELAH header dimuat
    setupThemeSwitcher();
});

/* TIDAK ADA LAGI '}' EKSTRA DI SINI */
