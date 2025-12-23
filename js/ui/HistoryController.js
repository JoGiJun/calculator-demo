export default class HistoryController {
    constructor(historyManager, onLoadExpression) {
        this.historyManager = historyManager;
        this.onLoadExpression = onLoadExpression;

        this.panel = document.getElementById('history-panel');
        this.toggleBtn = document.getElementById('btn-history-toggle');
        this.closeBtn = document.getElementById('btn-history-close');
        this.clearBtn = document.getElementById('btn-history-clear');
        this.listEl = document.getElementById('history-list');

        this.init();
    }

    init() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.open());
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', () => this.clearHistory());
        }
    }

    open() {
        this.render();
        this.panel.classList.remove('translate-x-full');
    }

    close() {
        this.panel.classList.add('translate-x-full');
    }

    render() {
        if (!this.listEl) return;

        const history = this.historyManager.getHistory(); // ordered newest first
        this.listEl.innerHTML = '';

        if (history.length === 0) {
            this.listEl.innerHTML = '<div class="text-center text-gray-400 py-8">No history</div>';
            return;
        }

        history.forEach(item => {
            const el = document.createElement('div');
            el.className = 'history-item';
            el.innerHTML = `
                <div class="text-xs text-gray-500 dark:text-gray-400 text-right mb-1">${item.expression} =</div>
                <div class="text-lg font-medium text-primary-600 dark:text-primary-400 text-right">${item.result}</div>
            `;
            el.addEventListener('click', () => {
                this.onLoadExpression(item.expression);
                this.close();
            });
            this.listEl.appendChild(el);
        });
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear history?')) {
            this.historyManager.clearHistory();
            this.render();
        }
    }
}
