export default class Token {
    static NUMBER = 'NUMBER';
    static OPERATOR = 'OPERATOR';
    static FUNCTION = 'FUNCTION';
    static LPAREN = 'LPAREN';
    static RPAREN = 'RPAREN';
    static UNARY_MINUS = 'UNARY_MINUS';

    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
