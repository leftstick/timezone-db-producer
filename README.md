# timezone-db-producer

处理生成时区数据库

这个用来干嘛的么？

你要做应用，当你需要一个时区选择的功能时，基础数据从哪里来呢？基础数据又应该包含哪些字段呢？客户端拿到的客户所在时区的数据又是什么格式呢？客户端的时区数据和你的时区基础数据如何匹配呢？

其实最标准的时区数据库是[tz-database](https://www.iana.org/time-zones)，但关键问题是，这个又太基础，和客户端没了关系，客户端还需要时区选项的啊。

那么好了，你来对了。这个时区数据库就是在这帮你的。

客户端一般可以通过系统 api 拿到两个东西，一个是`rawOffset`，即：客户当前所在时区和`UTC`之间的偏移；另一个是`timezoneName`，即：类似 `Asia/Shanghai` 格式的文本，详情请查看[timezone_list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。

`rawOffset` 是不足以用来形容客户当前所在时区的，因为同一 `rawOffset` 可能有好多时区。所以这个时候，`timezoneName`就显得很重要了。

话不多说，请疯狂操作，输出你的`timezone_v3.json`，看看结果，你就什么都懂了。

## 准备工作

从谷歌日历页面爬取时区数据的原始数据，中英文分别拉取保存在`google_en.json`，`google_zh.json`中。

## 生成时区数据库

```bash
yarn start
```

> 生成数据库文件`timezone_v3.json`

## 惨

惨的部分是，`google_en.json`，`google_zh.json`里的原始内容，是手动分别在中/英文情况下，从[谷歌日历](https://calendar.google.com/calendar/r/settings?tab=cc)的页面源码里拷贝出来的，蠢是蠢了点，希望有识之士能给我方案。
