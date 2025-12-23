import DegreeToRadian from '../../../js/core/converter/DegreeToRadian.js';

describe('DegreeToRadian Converter', () => {
    const converter = new DegreeToRadian();

    test('should convert 0 degrees to 0 radians', () => {
        expect(converter.convert(0)).toBe(0);
    });

    test('should convert 180 degrees to PI radians', () => {
        expect(converter.convert(180)).toBeCloseTo(Math.PI);
    });

    test('should convert 90 degrees to PI/2 radians', () => {
        expect(converter.convert(90)).toBeCloseTo(Math.PI / 2);
    });

    test('should convert negative angles', () => {
        expect(converter.convert(-180)).toBeCloseTo(-Math.PI);
    });
});
