## Classes

<dl>
<dt><a href="#Log">Log</a></dt>
<dd><p>日志类</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#deepMerge">deepMerge(...sources)</a></dt>
<dd><p>注意事项：</p>
<ul>
<li>合并时会复制对象，不会修改原对象</li>
<li>合并顺序是后面的覆盖前面的</li>
<li>若有数组形式的属性，数组里的内容将被去重合并</li>
</ul>
</dd>
<dt><a href="#request">request(url, [options])</a> ⇒ <code>promise</code></dt>
<dd><p>发起网络请求</p>
</dd>
</dl>

<a name="Log"></a>

## Log
日志类

**Kind**: global class  

* [Log](#Log)
    * [new Log(label)](#new_Log_new)
    * [.debug(message, [...args])](#Log+debug)
    * [.info(message, [...args])](#Log+info)
    * [.warn(message, [...args])](#Log+warn)
    * [.error(message, [...args])](#Log+error)
    * [.time(key, level)](#Log+time)
    * [.timeEnd(key, message, [...args])](#Log+timeEnd)

<a name="new_Log_new"></a>

### new Log(label)
初始化日志


| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | 日志前缀 |

<a name="Log+debug"></a>

### log.debug(message, [...args])
调试级别日志

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | 日志内容 |
| [...args] | <code>any</code> | 内容参数 |

<a name="Log+info"></a>

### log.info(message, [...args])
信息级别日志

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | 日志内容 |
| [...args] | <code>any</code> | 内容参数 |

<a name="Log+warn"></a>

### log.warn(message, [...args])
警告级别日志

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | 日志内容 |
| [...args] | <code>any</code> | 内容参数 |

<a name="Log+error"></a>

### log.error(message, [...args])
错误级别日志

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>any</code> | 日志内容，可以为 Error 对象 |
| [...args] | <code>any</code> | 内容参数 |

<a name="Log+time"></a>

### log.time(key, level)
设置一个计时器

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | 计时器标识 |
| level |  | [string=debug] 日志级别，支持 debug、info、warn、error |

<a name="Log+timeEnd"></a>

### log.timeEnd(key, message, [...args])
结束计时并显示日志

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | 计时器标识 |
| message | <code>string</code> | 日志内容 |
| [...args] | <code>any</code> | 内容参数 |

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

<a name="request"></a>

## request(url, [options]) ⇒ <code>promise</code>
发起网络请求

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | 请求路径或完整网址 |
| [options] | <code>object</code> | <code>{}</code> | 参数和配置 |
| [options.methd] | <code>string</code> | <code>&quot;GET&quot;</code> | 请求方法 |
| [options.query] | <code>object</code> | <code>{}</code> | 请求参数，放置于 path 后，若需放置在 body 中，请使用 body 参数 |
| [options.headers] | <code>object</code> | <code>{}</code> | 请求头 |
| [options.body] | <code>object</code> |  | 请求体 |

