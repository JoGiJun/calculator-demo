import InputValidator from '../../../js/core/validator/InputValidator.js';

describe('InputValidator', () => {
    const validator = new InputValidator();

    test('should return valid for correct expressions', () => {
        expect(validator.validate('2 + 3').isValid).toBe(true);
        expect(validator.validate('sin(30)').isValid).toBe(true);
        expect(validator.validate('(2 + 3) * 4').isValid).toBe(true);
    });

    test('should detect empty input', () => {
        const result = validator.validate('');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Input is empty');
    });

    test('should detect invalid characters', () => {
        const result = validator.validate('2 + 3 @');
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Invalid character');
    });

    test('should detect mismatched parentheses', () => {
        const result1 = validator.validate('(2 + 3');
        expect(result1.isValid).toBe(false);
        expect(result1.error).toBe('Mismatched parentheses');

        const result2 = validator.validate('2 + 3)');
        expect(result2.isValid).toBe(false);
        expect(result2.error).toBe('Mismatched parentheses');
    });

    test('should check execution safety (no consecutive operators)', () => {
        const result = validator.validate('2 ++ 3');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Invalid operator placement');
    });

    test('should not end with an operator', () => {
        const result = validator.validate('2 +');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Expression cannot end with an operator');
    });
});
