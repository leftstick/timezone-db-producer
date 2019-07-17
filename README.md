# timezone-db-producer

生成一份给后端服务使用的基础时区数据库。

这个用来干嘛的？

当你得到一个涉及时区服务的应用需求时，你会想要一份基础是时区数据库。作为一个计算机行业的老兵，你可能直接想到了最标准的时区数据库[tz-database](https://www.iana.org/time-zones)。但这个是给操作系统用的，如果你想转换成其他可读格式，抱歉，你得自己写一系列处理脚本，具体可以参考[moment-timezone](https://github.com/moment/moment-timezone/blob/develop/tasks/data.js)的做法，从下载到处理成最后的`json`，如有需要，自行研究吧。

但又作为一个成熟的`java`工程师（其他语言也无所谓啦，思路差不多），你可能已经想到了更简单的办法：

```java
import java.util.Arrays;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

public class TimeZoneExample {

  public static void main(String[] args) {

  String[] ids = TimeZone.getAvailableIDs();

    List<TimeZone> zones = Arrays.asList(ids).stream().map(id -> TimeZone.getTimeZone(id)).collect(Collectors.toList());

    for (TimeZone zone : zones) {
      System.out.println(zone.getID() + " - " + zone.getDisplayName()); // something like: Asia/Shanghai - China Standard Time
    }
  }
}
```

但你同时可能也注意到了，那个`displayName`没个什么卵用，和你平时在其他软件里看到的描述中国时区的文字根本不一样。

你常见的描述大概类似：`UTC+8 北京、上海、重庆、哈尔滨` / `UTC+8 Beijing, Shanghai, Chongqing, Harbin`。绝不仅仅是一个什么`中国标准时间`。

而且你还会发现，叫`中国标准时间`的`id`有好多个，`Asia/Harbin`、`Asia/Taipei`、`Asia/Chongqing`、`Asia/Chungking`、`Asia/Macao`、`Asia/Macau`，但是`Asia/Hong_kong`反而叫`香港时间`。。。。

我就问你看到这，难受不难受？理解不理解？如果对于这么一堆奇怪的`id`不甚理解，又想听听故事的，不妨看看:

- [Windows 时区设置中给出了北京、重庆、乌鲁木齐和香港，北京因为是首都，其它几个是什么原因呢？](https://www.zhihu.com/question/20052268/answer/13815835)
- [为何计算机里面只有上海重庆时间没有北京时间？](https://www.zhihu.com/question/278932712)

然后话说回来，这个`id` 到底能拿来干嘛？

但关键问题是，无论如何，这个数据是不能拿来做前后端交互的，因为前端还指望着你告诉他这个时区叫什么呢？

那么好了，你来对了。这个时区数据库就是在这帮你的。

客户端一般可以通过系统 `api` （浏览器，或者其他载体）拿到两个东西，一个是`rawOffset`，即：客户当前所在时区和`UTC`之间的偏移；另一个是`timezoneName`，就是我们上面说的那个莫名其妙的 `id`，详情请查看[timezone_list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。

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
