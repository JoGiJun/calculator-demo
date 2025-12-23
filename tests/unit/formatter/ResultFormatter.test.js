import ResultFormatter from '../../../js/core/formatter/ResultFormatter.js';

describe('ResultFormatter', () => {
    const formatter = new ResultFormatter();

    test('should format integers correctly', () => {
        expect(formatter.format(123)).toBe('123');
        expect(formatter.format(-123)).toBe('-123');
    });

    test('should format floating point numbers to max decimal places', () => {
        // limit to 8 decimal places by default
        expect(formatter.format(1.234567891)).toBe('1.23456789');
        expect(formatter.format(0.1 + 0.2)).toBe('0.3'); // Float fix
    });

    test('should use scientific notation for very large numbers', () => {
        expect(formatter.format(1e12)).toBe('1e+12');
    });

    test('should use scientific notation for very small numbers', () => {
        expect(formatter.format(1e-12)).toBe('1e-12');
    });

    test('should handle NaN and Infinity', () => {
        expect(formatter.format(NaN)).toBe('Error');
        expect(formatter.format(Infinity)).toBe('Infinity');
    });
});
