import Operation from '../Operation.js';

export class Addition extends Operation {
    execute(a, b) {
        return a + b;
    }
}

export class Subtraction extends Operation {
    execute(a, b) {
        return a - b;
    }
}

export class Multiplication extends Operation {
    execute(a, b) {
        return a * b;
    }
}

export class Division extends Operation {
    execute(a, b) {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }
}
