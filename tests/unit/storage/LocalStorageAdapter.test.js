import LocalStorageAdapter from '../../../js/core/storage/LocalStorageAdapter.js';

describe('LocalStorageAdapter', () => {
    let adapter;
    let mockStore = {};

    beforeAll(() => {
        // Mock localStorage using Object.defineProperty to ensure it overrides JSDOM's default
        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: (key) => mockStore[key] || null,
                setItem: (key, value) => { mockStore[key] = value.toString(); },
                removeItem: (key) => { delete mockStore[key]; },
                clear: () => { mockStore = {}; }
            },
            writable: true
        });
    });

    beforeEach(() => {
        mockStore = {};
        adapter = new LocalStorageAdapter();
    });

    test('should save data', () => {
        adapter.save('testKey', { data: 123 });
        expect(JSON.parse(mockStore['testKey'])).toEqual({ data: 123 });
    });

    test('should load data', () => {
        mockStore['testKey'] = JSON.stringify({ data: 123 });
        const result = adapter.load('testKey');
        expect(result).toEqual({ data: 123 });
    });

    test('should return null for missing data', () => {
        const result = adapter.load('missing');
        expect(result).toBeNull();
    });

    test('should delete data', () => {
        mockStore['testKey'] = 'data';
        adapter.delete('testKey');
        expect(mockStore['testKey']).toBeUndefined();
    });

    test('should clear all data', () => {
        mockStore['a'] = '1';
        mockStore['b'] = '2';
        adapter.clear();
        expect(Object.keys(mockStore).length).toBe(0);
    });
});
