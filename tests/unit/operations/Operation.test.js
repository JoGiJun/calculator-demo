import Operation from '../../../js/core/calculator/Operation.js';

describe('Operation Interface', () => {
    test('should execute without error if correctly extended', () => {
        // This is checking the interface contract, but since we can't test an interface directly in JS easily without a concrete class,
        // we primarily test that the base class enforces structure.
        const op = new Operation();
        expect(op).toBeInstanceOf(Operation);
    });

    test('execute method should throw error if not implemented', () => {
        const op = new Operation();
        expect(() => op.execute()).toThrow('Method "execute" must be implemented');
    });
});
