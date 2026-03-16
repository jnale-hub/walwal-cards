import AsyncStorage from "@react-native-async-storage/async-storage";

const PROBE_KEY = "__walwal_storage_probe__";

const memoryStorage = new Map<string, string>();
let nativeStorageAvailable: boolean | null = null;

const canUseNativeStorage = async (): Promise<boolean> => {
  if (nativeStorageAvailable !== null) {
    return nativeStorageAvailable;
  }

  try {
    await AsyncStorage.setItem(PROBE_KEY, "1");
    await AsyncStorage.removeItem(PROBE_KEY);
    nativeStorageAvailable = true;
  } catch {
    nativeStorageAvailable = false;
  }

  return nativeStorageAvailable;
};

const readMemory = (key: string): string | null => {
  return memoryStorage.has(key) ? memoryStorage.get(key)! : null;
};

export const appStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (await canUseNativeStorage()) {
      try {
        return await AsyncStorage.getItem(key);
      } catch {
        nativeStorageAvailable = false;
      }
    }

    return readMemory(key);
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (await canUseNativeStorage()) {
      try {
        await AsyncStorage.setItem(key, value);
        return;
      } catch {
        nativeStorageAvailable = false;
      }
    }

    memoryStorage.set(key, value);
  },

  removeItem: async (key: string): Promise<void> => {
    if (await canUseNativeStorage()) {
      try {
        await AsyncStorage.removeItem(key);
        return;
      } catch {
        nativeStorageAvailable = false;
      }
    }

    memoryStorage.delete(key);
  },
};
