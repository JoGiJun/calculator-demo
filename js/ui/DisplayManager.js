export default class DisplayManager {
    constructor() {
        this.expressionEl = document.getElementById('display-expression');
        this.resultEl = document.getElementById('display-result');
        this.historyEl = document.getElementById('display-history');
    }

    updateExpression(expression) {
        if (!this.expressionEl) return;
        this.expressionEl.innerHTML = this._formatExpression(expression);
    }

    updateResult(result, isError = false) {
        if (!this.resultEl) return;
        this.resultEl.textContent = result; // Result is usually just number, textContent is safer/fine

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
        // History preview might also benefit from formatting
        const formatted = this._formatExpression(lastExpression);
        this.historyEl.innerHTML = lastExpression ? `${formatted} =` : '';
    }

    clearAll() {
        this.updateExpression('');
        this.updateResult('0');
        this.updateHistoryPreview('');
    }

    // Helper to make expression more readable (e.g. replacing * with ×)
    _formatExpression(expression) {
        // 1. Basic token replacements (Order matters: do this BEFORE injecting HTML)
        let formatted = expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/pi/g, 'π')
            .replace(/\^/g, '^');

        // 2. Handle Square Root visual style: sqrt(content) -> √<span class="sqrt-span">content</span>
        // We use pseudo-element in CSS to draw the line
        // matches 'sqrt(' followed by anything not ')' until ')'
        // Note: formatted string now has '÷' instead of '/', so this regex still works on the content.
        formatted = formatted.replace(/sqrt\(([^\)]*)\)/g, '√<span class="sqrt-span">$1</span>');

        // 3. Cleanup loose 'sqrt' if any (e.g. incomplete typing)
        formatted = formatted.replace(/sqrt/g, '√');

        return formatted;
    }
}
