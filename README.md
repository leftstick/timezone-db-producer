# timezone-db-producer

The repo produce a timezome database with `json` structure for backend/frontend developers.

Why we need it?

You will need a timezone database while you get requirement with timezone feature involved. As a experienced developer, you may have thought of [iana-tz-database](https://www.iana.org/time-zones).

But, there is always a "but" here, [iana-tz-database](https://www.iana.org/time-zones) is designed for operating system, which means you have to create your own data processor, otherwise you cannot use it within your application.

> Once you want to create your own data-processor for [iana-tz-database](https://www.iana.org/time-zones). Take [moment-timezone](https://github.com/moment/moment-timezone/blob/develop/tasks/data.js) as example.

As a proud `java` developer, you probably have thought of the following way:

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

As you mentioned, the `displayName` is not what you want, since it isn't like the description you usually seen.

The description you used to seen is someting like: `UTC+8 北京、上海、重庆、哈尔滨` / `UTC+8 Beijing, Shanghai, Chongqing, Harbin`. It will definitely not be `China standard time`.

You will also find there are several `id`s with `displayName` = `China standard time`, such as: `Asia/Harbin`、`Asia/Taipei`、`Asia/Chongqing`、`Asia/Chungking`、`Asia/Macao`、`Asia/Macau`. And the `displayName` of `Asia/Hong_kong` is `Hong Kong time`. What the fuck it is....

If you are seeking for more stories about this timezone `id`, see below:

- [Windows 时区设置中给出了北京、重庆、乌鲁木齐和香港，北京因为是首都，其它几个是什么原因呢？](https://www.zhihu.com/question/20052268/answer/13815835)
- [为何计算机里面只有上海重庆时间没有北京时间？](https://www.zhihu.com/question/278932712)

But the thing is, the data created above cannot be used in communication between frontend and backend. Because the improper `displayName` and un-grouped `timezone` categories.

Now, you will like this repo.

Client(browser, or other container) is able to get two things: `rawOffset`, which is the timezone offset between the client and `UTC`; `timezoneName`, which is the `id` we talked at above phase. Check [timezone_list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for more detail about `timezoneName`.

`rawOffset` cannot be used to identify what `timezone` it is, because the same `rawOffset` may shared in several timezones. You will need `timezoneName` for this.

try to generate `timezone_v3.json`, you will know me.

## prepare

The raw data was crawled from google calendar, and stored in `google_en.json`，`google_zh.json`.

## generate database

```bash
yarn start
```

> created at `timezone_v3.json`

## pain

The bad part is, raw data `google_en.json`,`google_zh.json` was copied from [google calendar](https://calendar.google.com/calendar/r/settings?tab=cc) manually.

If you have better solution, please let me know.
