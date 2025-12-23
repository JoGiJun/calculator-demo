export default class EventHandler {
    constructor(actionCallback) {
        this.actionCallback = actionCallback;
        this.bindEvents();
    }

    bindEvents() {
        // Mouse/Touch Events via Delegation
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const dataset = btn.dataset;
            this.handleInput(dataset);
        });

        // Keyboard Events
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    handleInput(dataset) {
        if (dataset.num) {
            this.actionCallback({ type: 'number', value: dataset.num });
        } else if (dataset.op) {
            this.actionCallback({ type: 'operation', value: dataset.op });
        } else if (dataset.action) {
            this.actionCallback({ type: 'action', value: dataset.action });
        }
    }

    handleKeyboard(e) {
        const key = e.key;

        // Numbers
        if (/[0-9]/.test(key)) {
            this.actionCallback({ type: 'number', value: key });
            return;
        }

        // Operators
        const opMap = {
            '+': '+', '-': '-', '*': '*', '/': '/',
            '(': '(', ')': ')', '^': '^', '.': '.'
        };
        if (opMap[key]) {
            this.actionCallback({ type: 'operation', value: opMap[key] });
            return;
        }

        // Actions
        if (key === 'Enter' || key === '=') {
            e.preventDefault();
            this.actionCallback({ type: 'action', value: 'calculate' });
        } else if (key === 'Backspace') {
            this.actionCallback({ type: 'action', value: 'backspace' });
        } else if (key === 'Escape') {
            this.actionCallback({ type: 'action', value: 'all-clear' });
        }
    }
}
