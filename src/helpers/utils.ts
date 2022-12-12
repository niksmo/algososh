export function swap(arr: unknown[], indexA: number, indexB: number) {
  [arr[indexB], arr[indexA]] = [arr[indexA], arr[indexB]];
}

export function getRandomInteger(min: number, max: number) {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}

export function waitWithDelay(delayInSec: number) {
  return () => new Promise(resolve => setTimeout(resolve, delayInSec));
}
