import Calculator from '../../js/core/calculator/Calculator.js';
import InputValidator from '../../js/core/validator/InputValidator.js';
import ResultFormatter from '../../js/core/formatter/ResultFormatter.js';
import HistoryManager from '../../js/core/storage/HistoryManager.js';
import LocalStorageAdapter from '../../js/core/storage/LocalStorageAdapter.js';

describe('Calculator Core Integration', () => {
    let calculator;
    let validator;
    let formatter;
    let historyManager;
    let storageAdapter;

    beforeAll(() => {
        // Mock localStorage
        const mockStore = {};
        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: (key) => mockStore[key] || null,
                setItem: (key, value) => { mockStore[key] = value.toString(); },
                removeItem: (key) => { delete mockStore[key]; },
                clear: () => { for (const prop of Object.getOwnPropertyNames(mockStore)) delete mockStore[prop]; }
            },
            writable: true
        });
    });

    beforeEach(() => {
        calculator = new Calculator();
        validator = new InputValidator();
        formatter = new ResultFormatter();
        storageAdapter = new LocalStorageAdapter();
        historyManager = new HistoryManager(storageAdapter);
        historyManager.clearHistory();
    });

    test('Full flow: valid calculation (2 + 3 * 4)', () => {
        const input = '2 + 3 * 4';

        // 1. Validate
        const validation = validator.validate(input);
        expect(validation.isValid).toBe(true);

        // 2. Evaluate
        const result = calculator.evaluate(input);
        expect(result).toBe(14);

        // 3. Format
        const formattedResult = formatter.format(result);
        expect(formattedResult).toBe('14');

        // 4. Save to History
        historyManager.addHistory({ expression: input, result: formattedResult });
        const history = historyManager.getHistory();
        expect(history.length).toBe(1);
        expect(history[0].expression).toBe(input);
        expect(history[0].result).toBe('14');
    });

    test('Full flow: scientific calculation (sin(30) in DEG)', () => {
        const input = 'sin(30)';

        // 1. Validate
        expect(validator.validate(input).isValid).toBe(true);

        // 2. Evaluate
        calculator.setAngleMode('DEG');
        const result = calculator.evaluate(input);
        expect(result).toBeCloseTo(0.5);

        // 3. Format
        const formattedResult = formatter.format(result);
        expect(formattedResult).toBe('0.5');

        // 4. Save
        historyManager.addHistory({ expression: input, result: formattedResult });
        expect(historyManager.getHistory()[0].result).toBe('0.5');
    });

    test('Full flow: error handling (division by zero)', () => {
        const input = '5 / 0';

        // 1. Validate (Input itself is syntactically valid)
        expect(validator.validate(input).isValid).toBe(true);

        // 2. Evaluate -> Should Throw
        expect(() => {
            calculator.evaluate(input);
        }).toThrow('Division by zero');
    });

    test('Full flow: very large number', () => {
        const input = '10^12';

        // 1. Validate 
        expect(validator.validate(input).isValid).toBe(true);

        // 2. Evaluate
        const result = calculator.evaluate(input);

        // 3. Format
        const formattedResult = formatter.format(result);
        expect(formattedResult).toBe('1e+12');
    });
});
