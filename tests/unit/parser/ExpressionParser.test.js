import ExpressionParser from '../../../js/core/parser/ExpressionParser.js';
import Token from '../../../js/core/parser/Token.js';

describe('ExpressionParser', () => {
    const parser = new ExpressionParser();

    describe('Tokenization', () => {
        test('should tokenize simple addition', () => {
            const tokens = parser.tokenize('2 + 3');
            expect(tokens).toEqual([
                new Token(Token.NUMBER, '2'),
                new Token(Token.OPERATOR, '+'),
                new Token(Token.NUMBER, '3')
            ]);
        });

        test('should tokenize decimals', () => {
            const tokens = parser.tokenize('2.5 * 3');
            expect(tokens[0].value).toBe('2.5');
        });

        test('should tokenize functions and parentheses', () => {
            const tokens = parser.tokenize('sin(30)');
            expect(tokens).toEqual([
                new Token(Token.FUNCTION, 'sin'),
                new Token(Token.LPAREN, '('),
                new Token(Token.NUMBER, '30'),
                new Token(Token.RPAREN, ')')
            ]);
        });

        test('should ignore whitespace', () => {
            const tokens = parser.tokenize('  2   +   3  ');
            expect(tokens.length).toBe(3);
        });
    });

    describe('Shunting Yard (to RPN)', () => {
        test('should convert simple addition', () => {
            const rpn = parser.parse('2 + 3');
            // Expecting RPN queue: 2, 3, +
            // We need to define what parse() returns. Usually a list of Tokens in RPN order.
            expect(rpn.map(t => t.value)).toEqual(['2', '3', '+']);
        });

        test('should respect precedence', () => {
            const rpn = parser.parse('2 + 3 * 4');
            // 2, 3, 4, *, +
            expect(rpn.map(t => t.value)).toEqual(['2', '3', '4', '*', '+']);
        });

        test('should respect parentheses', () => {
            const rpn = parser.parse('(2 + 3) * 4');
            // 2, 3, +, 4, *
            expect(rpn.map(t => t.value)).toEqual(['2', '3', '+', '4', '*']);
        });


        test('should handle functions', () => {
            const rpn = parser.parse('sin(30)');
            // 30, sin
            expect(rpn.map(t => t.value)).toEqual(['30', 'sin']);
        });

        test('should handle implicit multiplication', () => {
            const rpn = parser.parse('2sin(30)');
            // 2, 30, sin, *
            expect(rpn.map(t => t.value)).toEqual(['2', '30', 'sin', '*']);
        });
    });
});
