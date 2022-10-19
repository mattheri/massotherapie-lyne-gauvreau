type LocalStorage = typeof window.localStorage;

const fakeLocalStorage: LocalStorage = {
  getItem: () => null,
  setItem: () => null,
  clear: () => null,
  removeItem: () => null,
  length: 0,
  key: () => null,
};

const useLocalStorage = (localStorageKey?: string) => {
  const storage =
    typeof window !== "undefined" ? window.localStorage : fakeLocalStorage;

  const get = <T = unknown>(
    key: string = localStorageKey || ""
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      try {
        if (!key) throw new Error("No key provided");

        const item = storage.getItem(key);
        resolve(item ? JSON.parse(item) : null);
      } catch (error) {
        reject(error);
      }
    });
  };

  const set = <T = unknown>(
    value: T,
    key: string = localStorageKey || ""
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        if (!key) throw new Error("No key provided");

        storage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const remove = (key: string = localStorageKey || ""): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        if (!key) throw new Error("No key provided");

        storage.removeItem(key);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const clear = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        storage.clear();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    get,
    set,
    remove,
    clear,
  };
};

export default useLocalStorage;
