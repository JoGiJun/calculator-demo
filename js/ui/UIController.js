import DisplayManager from './DisplayManager.js';
import EventHandler from './EventHandler.js';
import HistoryController from './HistoryController.js';
import SettingsController from './SettingsController.js';
import Calculator from '../core/calculator/Calculator.js';
import InputValidator from '../core/validator/InputValidator.js';
import ResultFormatter from '../core/formatter/ResultFormatter.js';
import HistoryManager from '../core/storage/HistoryManager.js';
import LocalStorageAdapter from '../core/storage/LocalStorageAdapter.js';

export default class UIController {
    constructor() {
        // Core Components
        this.calculator = new Calculator();
        this.validator = new InputValidator();
        this.formatter = new ResultFormatter();
        this.storageAdapter = new LocalStorageAdapter();
        this.historyManager = new HistoryManager(this.storageAdapter);

        // UI Components
        this.displayManager = new DisplayManager();
        this.eventHandler = new EventHandler(this.handleAction.bind(this));

        this.historyController = new HistoryController(
            this.historyManager,
            this.loadHistoryItem.bind(this)
        );

        this.settingsController = new SettingsController(
            this.updateSettings.bind(this)
        );

        // State
        this.currentExpression = '';
        this.isResultShown = false;
    }

    handleAction(action) {
        switch (action.type) {
            case 'number':
            case 'operation':
                this.appendInput(action.value);
                break;
            case 'action':
                this.executeAction(action.value);
                break;
        }
    }

    appendInput(value) {
        if (this.isResultShown) {
            // If result is shown, check if new input is an operator or number
            if (['+', '-', '*', '/', '^'].includes(value)) {
                // Continue calculation with result
                this.isResultShown = false;
            } else {
                // New calculation
                this.currentExpression = '';
                this.isResultShown = false;
            }
        }

        this.currentExpression += value;
        this.displayManager.updateExpression(this.currentExpression);
    }

    executeAction(action) {
        switch (action) {
            case 'calculate':
                this.calculate();
                break;
            case 'all-clear':
                this.clear();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'toggle-sign':
                this.toggleSign();
                break;
        }
    }

    toggleSign() {
        // Regex to match a number at the end of the string
        // Matches: ...(-12.3) OR ...12.3 OR ...-12.3 (at start)
        const expr = this.currentExpression;

        if (this.isResultShown) {
            // If result is shown (e.g. "50"), treat it as current expression
            this.isResultShown = false;
        }

        // 1. Check if it ends with (-number) -> Unwrap
        // Match group 1: the number inside
        const wrappedRegex = /\((-?[\d.]+)\)$/;
        const wrappedMatch = expr.match(wrappedRegex);

        if (wrappedMatch) {
            // Remove the wrapping parenthesis and the negative sign if present
            // Wait, if it is (-5), toggle makes it 5.
            // If it is (5), toggle makes it (-5).
            // Usually toggle-sign wraps positive in (-...) and unwraps (-...) to start.
            // Implementation: replace the match with the toggled version.

            const content = wrappedMatch[1]; // e.g. "-5" or "5"
            let newContent;
            if (content.startsWith('-')) {
                newContent = content.substring(1); // -5 -> 5
            } else {
                newContent = `-${content}`; // 5 -> -5 (inside parens? No, usually toggle sign on (5) -> (-5))
            }

            // If result is positive (5), we might want to return just "5" without parens if context allows?
            // Safer to just toggle the sign inside or remove parens if becoming positive?
            // If I turn (-5) to 5. It should just be 5.

            if (!newContent.startsWith('-')) {
                // Became positive, remove parens
                this.currentExpression = expr.replace(wrappedRegex, newContent);
            } else {
                // Still negative or became negative, keep parens
                this.currentExpression = expr.replace(wrappedRegex, `(${newContent})`);
            }

        } else {
            // 2. Check if ends with number
            const numberRegex = /(-?[\d.]+)$/;
            const match = expr.match(numberRegex);

            if (match) {
                const number = match[1];
                // Check if it's a negative number at the start of expression?
                // "2-5" -> match is "-5"? No. Regex is greedy.
                // If "2-5", numberRegex might match "-5" if treated as string end.
                // But "2-5" is operator - and number 5 usually.
                // Let's be careful.
                // Simplest smart toggle:
                // Find last token.
                // If number:
                // wrap in (-num).

                // Let's rely on simply wrapping the last numeric sequence found.
                // But handle "2-5" -> "2(-5)".

                // If number is positive: wrap in (-num)
                // If number is negative (starts with -): remove -?

                // If expression is simply "-5" (start), change to "5".
                if (expr === number && number.startsWith('-')) {
                    this.currentExpression = number.substring(1);
                } else {
                    // Wrap it
                    // 5 -> (-5)
                    // 123 -> (-123)
                    // If precedence is high (like after *) it's fine.
                    // 2*5 -> 2*(-5)
                    this.currentExpression = expr.substring(0, expr.length - number.length) + `(-${number})`;
                }
            } else {
                // No number at end, just append -
                this.appendInput('-');
                return; // appendInput handles update
            }
        }

        this.displayManager.updateExpression(this.currentExpression);
    }

    calculate() {
        if (!this.currentExpression) return;

        // 1. Validate
        const validation = this.validator.validate(this.currentExpression);
        if (!validation.isValid) {
            this.displayManager.updateResult(validation.error, true);
            return;
        }

        try {
            // 2. Evaluate
            const result = this.calculator.evaluate(this.currentExpression);

            // 3. Format
            const formattedResult = this.formatter.format(result);

            // 4. Update UI
            this.displayManager.updateResult(formattedResult);
            this.displayManager.updateHistoryPreview(this.currentExpression);

            // 5. Save History
            this.historyManager.addHistory({
                expression: this.currentExpression,
                result: formattedResult,
                timestamp: Date.now()
            });

            // Update state
            this.currentExpression = formattedResult; // Use result for next calc
            this.isResultShown = true;

        } catch (error) {
            this.displayManager.updateResult(error.message, true);
        }
    }

    clear() {
        this.currentExpression = '';
        this.isResultShown = false;
        this.displayManager.clearAll();
    }

    backspace() {
        if (this.isResultShown) {
            this.clear();
            return;
        }
        this.currentExpression = this.currentExpression.slice(0, -1);
        this.displayManager.updateExpression(this.currentExpression);
    }

    loadHistoryItem(expression) {
        this.currentExpression = expression;
        this.isResultShown = false;
        this.displayManager.updateExpression(this.currentExpression);
        this.displayManager.updateResult('');
    }

    updateSettings(settings) {
        if (settings.angleMode) {
            this.calculator.setAngleMode(settings.angleMode);
        }
        if (settings.precision !== undefined) {
            this.formatter.precision = settings.precision;
        }
    }
}
