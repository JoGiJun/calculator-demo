import Operation from '../Operation.js';

export default class UnaryMinus extends Operation {
    execute(a) {
        return -a;
    }
}
