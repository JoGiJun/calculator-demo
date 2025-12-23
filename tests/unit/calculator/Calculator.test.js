import Calculator from '../../../js/core/calculator/Calculator.js';

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    test('should initialize with default operations', () => {
        // We verify indirectly by checking if calculation works
        expect(calculator.evaluate('2 + 3')).toBe(5);
    });

    test('should handle operator precedence', () => {
        expect(calculator.evaluate('2 + 3 * 4')).toBe(14);
        expect(calculator.evaluate('(2 + 3) * 4')).toBe(20);
    });

    test('should handle scientific functions', () => {
        expect(calculator.evaluate('sin(0)')).toBe(0);
        // Assuming default checks
    });

    test('should handle angle modes', () => {
        calculator.setAngleMode('DEG');
        expect(calculator.evaluate('sin(30)')).toBeCloseTo(0.5);

        calculator.setAngleMode('RAD');
        expect(calculator.evaluate('sin(PI / 6)')).toBeCloseTo(0.5);
    });

    test('should throw error for unknown operation', () => {
        // We need a way to mock parser to return unknown op?
        // Or if parser allows unknowns.
        // Current parser regex allows [a-zA-Z]+ as function.
        expect(() => calculator.evaluate('unknown(10)')).toThrow();
    });

    test('should throw error for invalid expression', () => {
        expect(() => calculator.evaluate('2 +')).toThrow(); // RPN evaluator will run out of operands
    });

    test('should handling division by zero', () => {
        expect(() => calculator.evaluate('5 / 0')).toThrow('Division by zero');
    });
});
