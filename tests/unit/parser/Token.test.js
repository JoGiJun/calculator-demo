import Token from '../../../js/core/parser/Token.js';

describe('Token Class', () => {
    test('should create token with type and value', () => {
        const token = new Token(Token.NUMBER, '123');
        expect(token.type).toBe(Token.NUMBER);
        expect(token.value).toBe('123');
    });

    test('should have static constants for types', () => {
        expect(Token.NUMBER).toBeDefined();
        expect(Token.OPERATOR).toBeDefined();
        expect(Token.FUNCTION).toBeDefined();
        expect(Token.LPAREN).toBeDefined();
        expect(Token.RPAREN).toBeDefined();
    });
});
