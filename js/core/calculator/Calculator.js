import ExpressionParser from '../parser/ExpressionParser.js';
import Token from '../parser/Token.js';
import { Addition, Subtraction, Multiplication, Division } from './operations/BasicOperation.js';
import { Sin, Cos, Tan, Log, Ln, Power, Sqrt } from './operations/ScientificOperation.js';
import UnaryMinus from './operations/UnaryMinus.js';

export default class Calculator {
    constructor() {
        this.parser = new ExpressionParser();
        this.operations = new Map();
        this.angleMode = 'RAD';
        this.registerOperations();
    }

    registerOperations() {
        this.operations.set('+', new Addition());
        this.operations.set('-', new Subtraction());
        this.operations.set('*', new Multiplication());
        this.operations.set('/', new Division());
        this.operations.set('^', new Power());
        this.operations.set('sin', new Sin());
        this.operations.set('cos', new Cos());
        this.operations.set('tan', new Tan());
        this.operations.set('log', new Log());
        this.operations.set('ln', new Ln());
        this.operations.set('sqrt', new Sqrt());
        this.operations.set('~', new UnaryMinus());
    }

    setAngleMode(mode) {
        if (mode !== 'DEG' && mode !== 'RAD') {
            throw new Error('Invalid angle mode');
        }
        this.angleMode = mode;
    }

    getArity(opName) {
        const binaryOps = ['+', '-', '*', '/', '^'];
        if (binaryOps.includes(opName)) return 2;
        return 1;
    }

    evaluate(expression) {
        const rpnQueue = this.parser.parse(expression);
        const stack = [];

        for (const token of rpnQueue) {
            if (token.type === Token.NUMBER) {
                stack.push(parseFloat(token.value));
            } else if (token.type === Token.FUNCTION && (token.value.toUpperCase() === 'PI')) {
                stack.push(Math.PI);
            } else if (token.type === Token.OPERATOR || token.type === Token.FUNCTION || token.type === Token.UNARY_MINUS) {
                const op = this.operations.get(token.value);
                if (!op) {
                    throw new Error(`Unknown operation: ${token.value}`);
                }

                const arity = this.getArity(token.value);

                if (stack.length < arity) {
                    throw new Error('Invalid expression');
                }

                const args = [];
                for (let i = 0; i < arity; i++) {
                    args.unshift(stack.pop());
                }

                const result = op.execute(...args, this.angleMode);
                stack.push(result);
            }
        }

        if (stack.length !== 1) {
            throw new Error('Invalid expression');
        }

        return stack[0];
    }
}
