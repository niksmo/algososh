export function swap(arr: unknown[], indexA: number, indexB: number) {
  [arr[indexB], arr[indexA]] = [arr[indexA], arr[indexB]];
}
