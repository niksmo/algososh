export function swap(arr: unknown[], indexA: number, indexB: number) {
  [arr[indexB], arr[indexA]] = [arr[indexA], arr[indexB]];
}

export function getRandomInteger(min: number, max: number) {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}

export function waitWithDelay(delayInSec: number, abortController?: AbortController) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(resolve, delayInSec);
      abortController?.signal.addEventListener('abort', reject);
    });
}

export function withMessage(error: unknown): error is Error {
  return Boolean((error as Error).message);
}
