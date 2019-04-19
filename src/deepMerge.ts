const shouldMerge = function (item: any) {
  const type = Object.prototype.toString.call(item);
  return type === '[object Object]' || type === '[object Array]';
};

/**
 * 合并对象
 * @description
 * 注意事项：
 * * 合并时会复制对象，不会修改原对象
 * * 合并顺序是后面的覆盖前面的
 * * 若有数组形式的属性，数组里的内容将被去重合并
 * @param sources [...any] 合并对象
 */
export default function deepMerge<T extends object = object>(...sources: T[]) {
  let acc = Object.create(null);
  for (const source of sources) {
    if (source instanceof Array) {
      if (!(acc instanceof Array)) {
        acc = [];
      }
      acc = [...new Set((source).concat(...acc as T[]))];
    } else if (shouldMerge(source)) {
      for (let [key, value] of Object.entries(source)) {
        if (shouldMerge(value) && key in acc) {
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
