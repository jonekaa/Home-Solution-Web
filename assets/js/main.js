// File: assets/js/main.js
// VERSI BARU DENGAN PATH REWRITER

// Fungsi untuk mengaktifkan theme switcher
function setupThemeSwitcher() {
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById("theme-switcher");
    if (!switchElement) return;

    const lightIcon = document.getElementById("theme-icon-light");
    const darkIcon = document.getElementById("theme-icon-dark");

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

    function setTheme(theme) {
        htmlElement.setAttribute("data-bs-theme", theme);
        switchElement.checked = theme === "dark";
        setActiveIcon(theme);
        localStorage.setItem("theme", theme);
    }

    let storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
        storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    setTheme(storedTheme);

    switchElement.addEventListener("change", function () {
        setTheme(this.checked ? "dark" : "light");
    });

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
 * @param {string} pathPrefix - Prefix yang harus ditambahkan ke link (misal: "../")
 */
async function loadComponent(id, url, pathPrefix) {
    try {
        const response = await fetch(pathPrefix + url); // 1. Muat template
        if (!response.ok) {
            throw new Error(`Gagal memuat ${pathPrefix + url}: ${response.statusText}`);
        }
        let data = await response.text(); // 2. Ambil HTML sebagai teks

        // 3. PERBAIKAN DINAMIS:
        // Ganti semua link 'href' dan 'src' yang *tidak* diawali http
        // untuk menambahkan pathPrefix.
        // Ini adalah "Sihir"-nya:
        if (pathPrefix) {
            // Regex untuk menemukan href="..." atau src="..."
            // yang TIDAK dimulai dengan 'http' atau '#'
            data = data.replace(
                /(href|src)="(?!#|http|mailto|tel)([^"]*)"/g,
                `$1="${pathPrefix}$2"`
            );
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