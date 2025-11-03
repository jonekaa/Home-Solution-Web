// File: assets/js/main.js

// Fungsi untuk mengaktifkan theme switcher
function setupThemeSwitcher() {
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById("theme-switcher");

    // Jika tidak ada switcher di halaman ini, hentikan
    if (!switchElement) {
        return;
    }

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

// Fungsi untuk memuat komponen (header/footer)
// Menggunakan async/await agar lebih rapi
async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Gagal memuat ${url}: ${response.statusText}`);
        }
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
    } catch (error) {
        console.error(error);
        document.getElementById(id).innerHTML = `<p class="text-danger text-center">Gagal memuat ${id}.</p>`;
    }
}

// Event Listener utama
// Ini akan berjalan setelah HTML dasar selesai dimuat
document.addEventListener("DOMContentLoaded", async function () {
    // Muat header dan footer secara bersamaan
    // Promise.all menunggu keduanya selesai sebelum lanjut
    await Promise.all([
        loadComponent("header-placeholder", "/_header.html"),
        loadComponent("footer-placeholder", "/_footer.html")
    ]);

    // PENTING:
    // Setelah header DIJAMIN selesai dimuat,
    // BARU kita jalankan script untuk theme switcher-nya.
    setupThemeSwitcher();
});
