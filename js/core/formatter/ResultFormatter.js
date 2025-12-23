export default class ResultFormatter {
    constructor(precision = 8) {
        this.precision = precision;
    }

    format(value) {
        if (Number.isNaN(value)) return 'Error';
        if (!Number.isFinite(value)) return 'Infinity';

        const absValue = Math.abs(value);

        // Scientific notation for very large/small numbers
        if (absValue >= 1e10 || (absValue > 0 && absValue < 1e-9)) {
            // toPrecision(precision) returns a string in exponential or fixed point depending on logic,
            // but toExponential() forces it.
            // We want to limit significant digits.
            const precisionAdjusted = parseFloat(value.toPrecision(this.precision));
            return precisionAdjusted.toExponential().replace('+', '+'); // Ensure + sign for compatibility if needed, though standard JS uses + by default for positive exponents usually.
        }

        // Integers (if within normal range)
        if (Number.isInteger(value)) {
            return value.toString();
        }

        // Floating points
        // Fix floating point errors (e.g. 0.1 + 0.2)
        // parseFloat removes trailing zeros from toFixed string
        return parseFloat(value.toFixed(this.precision)).toString();
    }
}
