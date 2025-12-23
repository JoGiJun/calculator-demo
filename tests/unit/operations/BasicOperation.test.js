import { Addition, Subtraction, Multiplication, Division } from '../../../js/core/calculator/operations/BasicOperation.js';

describe('Basic Operations', () => {
    describe('Addition', () => {
        const add = new Addition();

        test('should add two positive numbers', () => {
            expect(add.execute(2, 3)).toBe(5);
        });

        test('should add negative numbers', () => {
            expect(add.execute(-2, -3)).toBe(-5);
        });

        test('should add mixed sign numbers', () => {
            expect(add.execute(-2, 3)).toBe(1);
        });

        test('should handle decimals', () => {
            expect(add.execute(0.1, 0.2)).toBeCloseTo(0.3);
        });

        test('should handle zero', () => {
            expect(add.execute(5, 0)).toBe(5);
            expect(add.execute(0, 5)).toBe(5);
        });
    });

    describe('Subtraction', () => {
        const subtract = new Subtraction();

        test('should subtract two positive numbers', () => {
            expect(subtract.execute(5, 3)).toBe(2);
        });

        test('should subtract negative numbers', () => {
            expect(subtract.execute(-5, -3)).toBe(-2);
        });

        test('should handle decimals', () => {
            expect(subtract.execute(0.3, 0.1)).toBeCloseTo(0.2);
        });
    });

    describe('Multiplication', () => {
        const multiply = new Multiplication();

        test('should multiply two numbers', () => {
            expect(multiply.execute(2, 3)).toBe(6);
        });

        test('should handle negative numbers', () => {
            expect(multiply.execute(2, -3)).toBe(-6);
            expect(multiply.execute(-2, -3)).toBe(6);
        });

        test('should handle zero', () => {
            expect(multiply.execute(5, 0)).toBe(0);
        });

        test('should handle decimals', () => {
            expect(multiply.execute(0.2, 0.3)).toBeCloseTo(0.06);
        });
    });

    describe('Division', () => {
        const divide = new Division();

        test('should divide two numbers', () => {
            expect(divide.execute(6, 2)).toBe(3);
        });

        test('should handle decimals', () => {
            expect(divide.execute(5, 2)).toBe(2.5);
        });

        test('should throw error on division by zero', () => {
            expect(() => divide.execute(5, 0)).toThrow('Division by zero');
        });

        test('should handle negative numbers', () => {
            expect(divide.execute(6, -2)).toBe(-3);
        });
    });
});
