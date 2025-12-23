import Token from './Token.js';

export default class ExpressionParser {
    constructor() {
        this.precedence = {
            '+': 1, '-': 1,
            '*': 2, '/': 2,
            '^': 3
        };
        this.associativity = {
            '+': 'Left', '-': 'Left',
            '*': 'Left', '/': 'Left',
            '^': 'Right'
        };
    }

    tokenize(expression) {
        const tokens = [];
        // Added % to pattern
        const pattern = /(\d*\.?\d+)|([+\-*/^%])|([a-zA-Z]+)|(\()|(\))/g;

        let match;
        while ((match = pattern.exec(expression)) !== null) {
            // eslint-disable-next-line no-unused-vars
            const [full, num, op, func, lparen, rparen] = match;

            if (num) tokens.push(new Token(Token.NUMBER, num));
            else if (op) tokens.push(new Token(Token.OPERATOR, op));
            else if (func) tokens.push(new Token(Token.FUNCTION, func));
            else if (lparen) tokens.push(new Token(Token.LPAREN, lparen));
            else if (rparen) tokens.push(new Token(Token.RPAREN, rparen));
        }
        return tokens;
    }

    parse(expression) {
        let tokens = this.tokenize(expression);
        tokens = this.preprocessTokens(tokens);
        const outputQueue = [];
        const operatorStack = [];

        for (const token of tokens) {
            if (token.type === Token.NUMBER) {
                outputQueue.push(token);
            } else if (token.type === Token.FUNCTION) {
                operatorStack.push(token);
            } else if (token.type === Token.LPAREN) {
                operatorStack.push(token);
            } else if (token.type === Token.RPAREN) {
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type !== Token.LPAREN) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop(); // Pop LPAREN
                if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type === Token.FUNCTION) {
                    outputQueue.push(operatorStack.pop());
                }
            } else if (token.type === Token.OPERATOR || token.type === Token.UNARY_MINUS) {
                // Determine precedence
                // UNARY_MINUS has higher precedence (say 4)
                const getPrec = (val, type) => {
                    if (type === Token.UNARY_MINUS) return 4;
                    return this.precedence[val] || 0;
                };

                const currPrec = getPrec(token.value, token.type);

                while (
                    operatorStack.length > 0 &&
                    operatorStack[operatorStack.length - 1].type !== Token.LPAREN &&
                    (
                        operatorStack[operatorStack.length - 1].type === Token.FUNCTION ||
                        getPrec(operatorStack[operatorStack.length - 1].value, operatorStack[operatorStack.length - 1].type) > currPrec ||
                        (getPrec(operatorStack[operatorStack.length - 1].value, operatorStack[operatorStack.length - 1].type) === currPrec && this.associativity[token.value] === 'Left')
                    )
                ) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        }

        while (operatorStack.length > 0) {
            const op = operatorStack.pop();
            if (op.type === Token.LPAREN) {
                throw new Error('Mismatched parentheses');
            }
            outputQueue.push(op);
        }

        return outputQueue;
    }

    preprocessTokens(tokens) {
        let processed = [];

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            // Handle Percentage (%)
            if (token.type === Token.OPERATOR && token.value === '%') {
                if (processed.length > 0 && processed[processed.length - 1].type === Token.NUMBER) {
                    const prev = processed.pop();
                    const value = parseFloat(prev.value) / 100;
                    processed.push(new Token(Token.NUMBER, value.toString()));
                }
                continue; // Skip the % token
            }

            // Handle Unary Minus
            if (token.type === Token.OPERATOR && token.value === '-') {
                const isUnary = (
                    i === 0 ||
                    tokens[i - 1].type === Token.OPERATOR ||
                    tokens[i - 1].type === Token.LPAREN ||
                    tokens[i - 1].type === Token.FUNCTION
                );

                if (isUnary) {
                    processed.push(new Token(Token.UNARY_MINUS, '~'));
                    continue;
                }
            }

            // Implicit Multiplication (insert *)
            // Only insert if NOT unary minus context
            // Conditions:
            // 1. Number -> Function/Lparen
            // 2. Rparen -> Number/Function/Lparen
            if (processed.length > 0) {
                const prev = processed[processed.length - 1];
                const isImplicit = (
                    (prev.type === Token.NUMBER && (token.type === Token.FUNCTION || token.type === Token.LPAREN)) ||
                    (prev.type === Token.RPAREN && (token.type === Token.NUMBER || token.type === Token.FUNCTION || token.type === Token.LPAREN))
                );

                if (isImplicit) {
                    processed.push(new Token(Token.OPERATOR, '*'));
                }
            }

            processed.push(token);
        }
        return processed;
    }
}
