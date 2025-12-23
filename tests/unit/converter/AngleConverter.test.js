import AngleConverter from '../../../js/core/converter/AngleConverter.js';

describe('AngleConverter Interface', () => {
    test('should have convert method', () => {
        const converter = new AngleConverter();
        expect(() => converter.convert(180)).toThrow('Method "convert" must be implemented');
    });
});
