## Classes

<dl>
<dt><a href="#Log">Log</a></dt>
<dd><p>日志类</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#request">request(url, [options])</a> ⇒ <code>promise</code></dt>
<dd><p>发起网络请求</p></dd>
</dl>

<a name="Log"></a>

## Log
<p>日志类</p>

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
<p>初始化日志</p>


| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | <p>日志前缀</p> |

<a name="Log+debug"></a>

### log.debug(message, [...args])
<p>调试级别日志</p>

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | <p>日志内容</p> |
| [...args] | <code>any</code> | <p>内容参数</p> |

<a name="Log+info"></a>

### log.info(message, [...args])
<p>信息级别日志</p>

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | <p>日志内容</p> |
| [...args] | <code>any</code> | <p>内容参数</p> |

<a name="Log+warn"></a>

### log.warn(message, [...args])
<p>警告级别日志</p>

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | <p>日志内容</p> |
| [...args] | <code>any</code> | <p>内容参数</p> |

<a name="Log+error"></a>

### log.error(message, [...args])
<p>错误级别日志</p>

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>any</code> | <p>日志内容，可以为 Error 对象</p> |
| [...args] | <code>any</code> | <p>内容参数</p> |

<a name="Log+time"></a>

### log.time(key, level)
<p>设置一个计时器</p>

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>计时器标识</p> |
| level |  | <p>[string=debug] 日志级别，支持 debug、info、warn、error</p> |

<a name="Log+timeEnd"></a>

### log.timeEnd(key, message, [...args])
<p>结束计时并显示日志</p>

**Kind**: instance method of [<code>Log</code>](#Log)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>计时器标识</p> |
| message | <code>string</code> | <p>日志内容</p> |
| [...args] | <code>any</code> | <p>内容参数</p> |

<a name="request"></a>

## request(url, [options]) ⇒ <code>promise</code>
<p>发起网络请求</p>

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | <p>请求路径或完整网址</p> |
| [options] | <code>object</code> | <code>{}</code> | <p>参数和配置</p> |
| [options.methd] | <code>string</code> | <code>&quot;GET&quot;</code> | <p>请求方法</p> |
| [options.query] | <code>object</code> | <code>{}</code> | <p>请求参数，放置于 path 后，若需放置在 body 中，请使用 body 参数</p> |
| [options.headers] | <code>object</code> | <code>{}</code> | <p>请求头</p> |
| [options.body] | <code>object</code> |  | <p>请求体</p> |

