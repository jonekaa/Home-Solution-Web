/* Mockup Website/assets/js/main.js */
/* VERSI PERBAIKAN - Complete working version */

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
 * Fungsi untuk memuat komponen HTML (header/footer)
 * Menggunakan fetch API
 */
async function loadComponent(placeholderId, componentPath, pathPrefix = "") {
    const fullPath = pathPrefix + componentPath;
    const placeholder = document.getElementById(placeholderId);

    if (!placeholder) {
        console.error(`Placeholder ${placeholderId} tidak ditemukan`);
        return;
    }

    try {
        const response = await fetch(fullPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        placeholder.innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${fullPath}:`, error);
        // Show error message if loading fails
        placeholder.innerHTML = `<div class="alert alert-warning m-3">Unable to load ${componentPath}. Please run this site on a local web server (e.g., python -m http.server or npx http-server).</div>`;
    }
}

/**
 * Fungsi untuk memperbaiki path navigasi setelah header dimuat
 */
function fixNavigationPaths(pathPrefix) {
    // Fix logo link to home
    const logoLink = document.querySelector('.navbar-brand');
    if (logoLink) {
        logoLink.href = pathPrefix ? `${pathPrefix}index.html` : 'index.html';
        if (!pathPrefix) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Fix all navigation links that start with "pages/"
    const allLinks = document.querySelectorAll('.navbar a[href^="pages/"]');
    allLinks.forEach(link => {
        const originalHref = link.getAttribute('href');
        if (pathPrefix) {
            // We're in a pages/ subdirectory, so remove the "pages/" prefix
            link.href = originalHref.replace('pages/', '');
        }
        // If no pathPrefix, we're on the root, so links stay as "pages/..."
    });
}

/**
 * Inisialisasi aplikasi saat DOM sudah siap
 */
document.addEventListener("DOMContentLoaded", async function () {
    // Deteksi apakah kita di halaman utama atau di folder pages
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    try {
        // Muat header dan footer secara bersamaan
        await Promise.all([
            loadComponent("header-placeholder", "_header.html", pathPrefix),
            loadComponent("footer-placeholder", "_footer.html", pathPrefix)
        ]);

        // Fix navigation paths
        fixNavigationPaths(pathPrefix);

        // Jalankan theme switcher SETELAH header dimuat
        setupThemeSwitcher();
    } catch (error) {
        console.error("Error loading components:", error);
    }
});
