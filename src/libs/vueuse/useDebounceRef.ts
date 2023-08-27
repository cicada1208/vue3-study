import { customRef } from 'vue';

/**
 * This value only updates delay ms after you've stopped assigning
 * @param value initial value
 * @param delay ms
 * @returns debounced value
 */
export function useDebounceRef<T>(value: T, delay = 200) {
  let timeout: NodeJS.Timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    };
  });
}
