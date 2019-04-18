/**
 * 合并 Object，若有数组形式的属性，也被自动合并
 * @param sources [...any] 合并对象
 */
export default function deepMerge<T extends object = object>(...sources: T[]) {
  let acc = Object.create(null);
  for (const source of sources) {
    if (source instanceof Array) {
      if (!(acc instanceof Array)) {
        acc = [];
      }
      acc = [...new Set((acc as T[]).concat(...sources))];
    } else if (source instanceof Object) {
      for (let [key, value] of Object.entries(source)) {
        if (value instanceof Object && key in acc) {
          value = deepMerge(acc[key], value);
        }
        acc = {
          ...acc,
          [key]: value,
        };
      }
    }
  }
  return acc;
}
