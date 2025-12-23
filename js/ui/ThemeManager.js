export default class ThemeManager {
    constructor() {
        this.toggleBtn = document.getElementById('btn-theme-toggle');
        this.icon = document.getElementById('theme-icon');
        this.html = document.documentElement;
        this.theme = localStorage.getItem('theme') || 'light';

        this.init();
    }

    init() {
        // Apply initial theme
        if (this.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        // Bind event
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            this.html.classList.add('dark');
            if (this.icon) this.icon.textContent = 'light_mode';
        } else {
            this.html.classList.remove('dark');
            if (this.icon) this.icon.textContent = 'dark_mode';
        }
    }

    toggleTheme() {
        this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    }
}
