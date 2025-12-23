import { Sin, Cos, Tan, Log, Ln, Power, Sqrt } from '../../../js/core/calculator/operations/ScientificOperation.js';

describe('Scientific Operations', () => {
    describe('Trigonometric Functions', () => {
        const sin = new Sin();
        const cos = new Cos();
        const tan = new Tan();

        test('Sin should handle Radians (default)', () => {
            expect(sin.execute(Math.PI / 2)).toBeCloseTo(1);
            expect(sin.execute(0)).toBe(0);
        });

        test('Sin should handle Degrees', () => {
            expect(sin.execute(90, 'DEG')).toBeCloseTo(1);
            expect(sin.execute(30, 'DEG')).toBeCloseTo(0.5);
        });

        test('Cos should handle Radians', () => {
            expect(cos.execute(Math.PI)).toBeCloseTo(-1);
        });

        test('Cos should handle Degrees', () => {
            expect(cos.execute(180, 'DEG')).toBeCloseTo(-1);
            expect(cos.execute(60, 'DEG')).toBeCloseTo(0.5);
        });

        test('Tan should handle Radians', () => {
            expect(tan.execute(Math.PI / 4)).toBeCloseTo(1);
        });

        test('Tan should handle Degrees', () => {
            expect(tan.execute(45, 'DEG')).toBeCloseTo(1);
        });
    });

    describe('Logarithmic Functions', () => {
        const log = new Log();
        const ln = new Ln();

        test('Log (base 10)', () => {
            expect(log.execute(100)).toBe(2);
            expect(log.execute(1000)).toBe(3);
        });

        test('Ln (natural log)', () => {
            expect(ln.execute(Math.E)).toBeCloseTo(1);
            expect(ln.execute(Math.exp(2))).toBeCloseTo(2);
        });

        test('Log/Ln should throw for non-positive numbers', () => {
            expect(() => log.execute(0)).toThrow();
            expect(() => ln.execute(-1)).toThrow();
        });
    });

    describe('Power and Root', () => {
        const power = new Power();
        const sqrt = new Sqrt();

        test('Power', () => {
            expect(power.execute(2, 3)).toBe(8);
            expect(power.execute(5, 2)).toBe(25);
            expect(power.execute(2, -1)).toBe(0.5);
        });

        test('Sqrt', () => {
            expect(sqrt.execute(16)).toBe(4);
            expect(sqrt.execute(2)).toBeCloseTo(Math.SQRT2);
        });

        test('Sqrt should throw for negative numbers', () => {
            expect(() => sqrt.execute(-1)).toThrow();
        });
    });
});
