import StorageInterface from './StorageInterface.js';

export default class LocalStorageAdapter extends StorageInterface {
    save(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }

    load(key) {
        try {
            const serialized = localStorage.getItem(key);
            if (serialized === null) return null;
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Error loading from localStorage', error);
            return null;
        }
    }

    delete(key) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}
