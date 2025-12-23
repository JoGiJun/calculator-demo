import HistoryManager from '../../../js/core/storage/HistoryManager.js';
// We'll mock the storage adapter
import StorageInterface from '../../../js/core/storage/StorageInterface.js';

class MockStorage extends StorageInterface {
    constructor() {
        super();
        this.store = {};
    }
    save(key, value) { this.store[key] = value; }
    load(key) { return this.store[key] || null; }
    delete(key) { delete this.store[key]; }
    clear() { this.store = {}; }
}

describe('HistoryManager', () => {
    let historyManager;
    let mockStorage;

    beforeEach(() => {
        mockStorage = new MockStorage();
        historyManager = new HistoryManager(mockStorage);
    });

    test('should add new history item', () => {
        const item = { expression: '2+2', result: '4' };
        historyManager.addHistory(item);
        const history = historyManager.getHistory();
        expect(history.length).toBe(1);
        expect(history[0]).toEqual(item);
    });

    test('should limit history items (max 100)', () => {
        for (let i = 0; i < 110; i++) {
            historyManager.addHistory({ id: i });
        }
        const history = historyManager.getHistory();
        expect(history.length).toBe(100);
        expect(history[0].id).toBe(109); // Newest first
    });

    test('should clear history', () => {
        historyManager.addHistory({ a: 1 });
        historyManager.clearHistory();
        expect(historyManager.getHistory().length).toBe(0);
    });

    test('should persist to storage', () => {
        historyManager.addHistory({ a: 1 });
        expect(mockStorage.load('calculator_history')).toBeTruthy();
    });
});
