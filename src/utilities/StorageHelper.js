export default class StorageHelper {
    static set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (e) {
            console.error('Error on save data in localStorage', e);
            return false;
        }
    }

    static get(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (!serializedValue) {
                console.info('No data in localStorage for key', key);
                return null;
            }
            return JSON.parse(serializedValue);
        } catch (e) {
            console.error('Error on get data in localStorage', e);
            return null;
        }
    }
}