"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  useEffect(() => {
    const readFromLocalStorage = () => {
      if (typeof window === "undefined") {
        return initialValue;
      }

      try {
        const jsonValue = window.localStorage.getItem(key);
        return jsonValue ? (JSON.parse(jsonValue) as T) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    };

    setValue(readFromLocalStorage);
    setFirstLoadDone(true);
  }, [initialValue, key]);

  useEffect(() => {
    if (!firstLoadDone) return;

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, firstLoadDone]);

  return [value, setValue];
}
