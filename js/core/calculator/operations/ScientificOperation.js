import Operation from '../Operation.js';
import DegreeToRadian from '../../converter/DegreeToRadian.js';

class TrigOperation extends Operation {
    constructor() {
        super();
        this.degreeConverter = new DegreeToRadian();
    }

    _toRadian(value, mode) {
        if (mode === 'DEG') {
            return this.degreeConverter.convert(value);
        }
        return value;
    }
}

export class Sin extends TrigOperation {
    execute(value, mode) {
        return Math.sin(this._toRadian(value, mode));
    }
}

export class Cos extends TrigOperation {
    execute(value, mode) {
        return Math.cos(this._toRadian(value, mode));
    }
}

export class Tan extends TrigOperation {
    execute(value, mode) {
        return Math.tan(this._toRadian(value, mode));
    }
}

export class Log extends Operation {
    execute(value) {
        if (value <= 0) {
            throw new Error('Logarithm of non-positive number');
        }
        return Math.log10(value);
    }
}

export class Ln extends Operation {
    execute(value) {
        if (value <= 0) {
            throw new Error('Logarithm of non-positive number');
        }
        return Math.log(value);
    }
}

export class Power extends Operation {
    execute(base, exponent) {
        return Math.pow(base, exponent);
    }
}

export class Sqrt extends Operation {
    execute(value) {
        if (value < 0) {
            throw new Error('Square root of negative number');
        }
        return Math.sqrt(value);
    }
}
