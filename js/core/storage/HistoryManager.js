export default class HistoryManager {
    constructor(storageAdapter) {
        this.storage = storageAdapter;
        this.STORAGE_KEY = 'calculator_history';
        this.MAX_HISTORY = 100;
    }

    addHistory(item) {
        const history = this.getHistory();
        history.unshift(item); // Add to beginning

        if (history.length > this.MAX_HISTORY) {
            history.length = this.MAX_HISTORY; // Truncate
        }

        this.storage.save(this.STORAGE_KEY, history);
    }

    getHistory() {
        return this.storage.load(this.STORAGE_KEY) || [];
    }

    clearHistory() {
        this.storage.save(this.STORAGE_KEY, []);
    }
}
