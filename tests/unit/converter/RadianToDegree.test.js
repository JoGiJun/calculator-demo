import RadianToDegree from '../../../js/core/converter/RadianToDegree.js';

describe('RadianToDegree Converter', () => {
    const converter = new RadianToDegree();

    test('should convert 0 radians to 0 degrees', () => {
        expect(converter.convert(0)).toBe(0);
    });

    test('should convert PI radians to 180 degrees', () => {
        expect(converter.convert(Math.PI)).toBeCloseTo(180);
    });

    test('should convert PI/2 radians to 90 degrees', () => {
        expect(converter.convert(Math.PI / 2)).toBeCloseTo(90);
    });

    test('should convert negative radians', () => {
        expect(converter.convert(-Math.PI)).toBeCloseTo(-180);
    });
});
