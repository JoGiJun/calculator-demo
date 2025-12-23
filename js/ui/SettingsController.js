export default class SettingsController {
    constructor(onOptionsChange) {
        this.onOptionsChange = onOptionsChange;

        this.modal = document.getElementById('settings-modal');
        this.content = document.getElementById('settings-content');
        this.openBtn = document.getElementById('btn-settings');
        this.closeBtn = document.getElementById('btn-settings-close');
        this.saveBtn = document.getElementById('btn-settings-save');

        this.radBtn = document.getElementById('setting-rad');
        this.degBtn = document.getElementById('setting-deg');
        this.precisionInput = document.getElementById('setting-precision');
        this.precisionValue = document.getElementById('precision-value');
        this.angleIndicator = document.getElementById('angle-mode-indicator');

        // Defaults
        this.settings = {
            angleMode: localStorage.getItem('angleMode') || 'RAD',
            precision: parseInt(localStorage.getItem('precision') || '8')
        };

        this.init();
    }

    init() {
        if (this.openBtn) this.openBtn.addEventListener('click', () => this.open());
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());

        if (this.radBtn && this.degBtn) {
            this.radBtn.addEventListener('click', () => this.setMode('RAD'));
            this.degBtn.addEventListener('click', () => this.setMode('DEG'));
        }

        if (this.precisionInput) {
            this.precisionInput.addEventListener('input', (e) => {
                this.settings.precision = parseInt(e.target.value);
                this.updateUI();
            });
        }

        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.save());
        }

        // Click outside to close
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
        }

        // Apply initial settings
        this.applySettings();
    }

    setMode(mode) {
        this.settings.angleMode = mode;
        this.updateUI();
    }

    updateUI() {
        if (this.settings.angleMode === 'RAD') {
            this.radBtn.className = 'flex-1 py-2 rounded-md text-sm font-medium transition-colors bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white';
            this.degBtn.className = 'flex-1 py-2 rounded-md text-sm font-medium transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600';
        } else {
            this.radBtn.className = 'flex-1 py-2 rounded-md text-sm font-medium transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600';
            this.degBtn.className = 'flex-1 py-2 rounded-md text-sm font-medium transition-colors bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white';
        }

        if (this.precisionValue) {
            this.precisionValue.textContent = this.settings.precision;
        }
        if (this.precisionInput) {
            this.precisionInput.value = this.settings.precision;
        }
    }

    open() {
        if (!this.modal) return;

        // Refresh UI with current settings in case they changed elsewhere (unlikely) or just reset UI
        this.updateUI();

        this.modal.classList.remove('hidden');
        // Small delay for transition
        setTimeout(() => {
            this.modal.classList.remove('opacity-0');
            this.content.classList.remove('scale-95');
            this.content.classList.add('scale-100');
        }, 10);
    }

    close() {
        if (!this.modal) return;

        this.modal.classList.add('opacity-0');
        this.content.classList.remove('scale-100');
        this.content.classList.add('scale-95');

        setTimeout(() => {
            this.modal.classList.add('hidden');
        }, 200);
    }

    save() {
        localStorage.setItem('angleMode', this.settings.angleMode);
        localStorage.setItem('precision', this.settings.precision);

        this.applySettings();
        this.close();
    }

    applySettings() {
        // Update Angle Indicator in Header
        if (this.angleIndicator) {
            this.angleIndicator.textContent = this.settings.angleMode;
        }

        // Callback to update logic
        if (this.onOptionsChange) {
            this.onOptionsChange(this.settings);
        }
    }
}
