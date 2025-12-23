export default class DisplayManager {
    constructor() {
        this.expressionEl = document.getElementById('display-expression');
        this.resultEl = document.getElementById('display-result');
        this.historyEl = document.getElementById('display-history');
    }

    updateExpression(expression) {
        if (!this.expressionEl) return;
        this.expressionEl.textContent = this._formatExpression(expression);
    }

    updateResult(result, isError = false) {
        if (!this.resultEl) return;
        this.resultEl.textContent = result;

        if (isError) {
            this.resultEl.classList.add('text-red-500');
            this.resultEl.classList.remove('text-primary-600', 'dark:text-primary-400');
        } else {
            this.resultEl.classList.remove('text-red-500');
            this.resultEl.classList.add('text-primary-600', 'dark:text-primary-400');
        }
    }

    updateHistoryPreview(lastExpression) {
        if (!this.historyEl) return;
        this.historyEl.textContent = lastExpression ? `${lastExpression} =` : '';
    }

    clearAll() {
        this.updateExpression('');
        this.updateResult('0');
        this.updateHistoryPreview('');
    }

    // Helper to make expression more readable (e.g. replacing * with ×)
    _formatExpression(expression) {
        return expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/sqrt/g, '√')
            .replace(/pi/g, 'π')
            .replace(/\^/g, '^');
    }
}
