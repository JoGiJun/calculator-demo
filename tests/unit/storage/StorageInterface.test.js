import StorageInterface from '../../../js/core/storage/StorageInterface.js';

describe('StorageInterface', () => {
    test('should match interface spec', () => {
        const storage = new StorageInterface();
        expect(() => storage.save('key', 'value')).toThrow('Method "save" must be implemented');
        expect(() => storage.load('key')).toThrow('Method "load" must be implemented');
        expect(() => storage.delete('key')).toThrow('Method "delete" must be implemented');
        expect(() => storage.clear()).toThrow('Method "clear" must be implemented');
    });
});
