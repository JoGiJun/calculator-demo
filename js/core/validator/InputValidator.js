export default class InputValidator {
    validate(expression) {
        if (!expression) {
            return { isValid: false, error: 'Empty expression' };
        }

        // Remove spaces for validation
        const clean = expression.replace(/\s+/g, '');

        // 1. Check for invalid characters
        // Added % to valid regex
        if (/[^0-9+\-*/().^%e\s]/.test(clean)) {
            return { isValid: false, error: 'Invalid characters' };
        }

        // 2. Check for parentheses balance
        let balance = 0;
        for (const char of clean) {
            if (char === '(') balance++;
            if (char === ')') balance--;
            if (balance < 0) return { isValid: false, error: 'Mismatched parentheses' };
        }
        if (balance !== 0) {
            return { isValid: false, error: 'Mismatched parentheses' };
        }

        // 3. Check for consecutive operators (allow unary minus)
        // Find sequences of 2 or more operators
        const operatorSequences = clean.match(/[+\-*/^%]{2,}/g);
        if (operatorSequences) {
            for (const seq of operatorSequences) {
                // Allow exactly 2 operators if the second one is '-' (e.g., '*-', '/-', '+-', '--')
                // Rejects '---', '*+', '/*', etc.
                if (seq.length > 2 || seq[1] !== '-') {
                    return { isValid: false, error: 'Invalid operator placement' };
                }
            }
        }

        // 4. Check syntax (start/end)
        // Expression cannot start with operator except - or + or (
        // Actually usually just - or + or (. * or / at start is bad.
        if (/^[*/^%]/.test(clean)) {
            return { isValid: false, error: 'Invalid start of expression' };
        }

        // Expression cannot end with operator except % or )
        // % is allowed at end. ) is allowed.
        // Op at end is bad.
        if (/[+\-*/^]$/.test(clean)) {
            return { isValid: false, error: 'Expression cannot end with operator' };
        }

        return { isValid: true };
    }

    _hasMismatchedParentheses(input) {
        let count = 0;
        for (const char of input) {
            if (char === '(') count++;
            if (char === ')') count--;
            if (count < 0) return true;
        }
        return count !== 0;
    }

    _hasInvalidOperatorPlacement(input) {
        // Remove spaces to check adjacency
        const clean = input.replace(/\s+/g, '');
        // Check for double operators like ++, +*, etc. avoiding negative numbers which context usually handles, 
        // but for safety in simple validation we flag it unless it's carefully handled relative to parser.
        // Our parser handles unary minus only if it's tokenized correctly, but standard infix usually disallows `*+` etc.
        // Allowing `*-` (times negative) might be valid in some parsers, but here we keep it simple conformant to test.
        return /[+\-*/^]{2,}/.test(clean);
    }

    _endsWithOperator(input) {
        return /[+\-*/^]$/.test(input.trim());
    }
}
