<a name="deepMerge"></a>

## deepMerge(...sources)
注意事项：
* 合并时会复制对象，不会修改原对象
* 合并顺序是后面的覆盖前面的
* 若有数组形式的属性，数组里的内容将被去重合并

**Kind**: global function  

| Param | Description |
| --- | --- |
| ...sources | [...any] 合并对象 |

