import { useState, useEffect } from "react";

function useSessionStorage(key, initialValue) {
  const getStoredValue = () => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    return getStoredValue();
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useSessionStorage;
