function updateColorMode() {
    let theme = localStorage.getItem("theme");
    if (theme === null) {
        localStorage.setItem("theme", "dark");
    }
    theme = localStorage.getItem("theme");
    const element = document.getElementsByTagName("html")[0];
	element.setAttribute("data-bs-theme", theme);
}

updateColorMode();
