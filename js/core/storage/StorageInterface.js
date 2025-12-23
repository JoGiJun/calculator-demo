export default class StorageInterface {
    save(key, value) {
        throw new Error('Method "save" must be implemented');
    }

    load(key) {
        throw new Error('Method "load" must be implemented');
    }

    delete(key) {
        throw new Error('Method "delete" must be implemented');
    }

    clear() {
        throw new Error('Method "clear" must be implemented');
    }
}
