<div align="center">
  <img src="./image/check.png" style="max-height: 50px" /><br/>
</div>

# mini-vlog-report [小程序实时日志上报]

-----------------

## 这是什么？

***mini-vlog-report*** 是一个封装了 **wx.getRealtimeLogManager** 方法的小程序(微信)上报工具。将上报能力抽象封装起来，同时本地日志台打印出来。
同时优化了console的使用，将更醒目的配色配置到不同类型的日志输出上，并提供了可定制的样式能力。
上报只需要通过调用 **.report()** 方法即可实现。同时可以在微信小程序后台WeData查看上报内容。

>ps：单条日志最大长度是3000字节
> 


## 如何使用
```javascript
import {vLog} from 'mini-vlog-report'

vLog.log('vLog log信息 不上报')
vLog.info('vLog info信息 不上报')
vLog.warn('vLog 警告信息 不上报')
vLog.error('vLog 错误信息 不上报')

vLog('直接用 不上报')

vLog('直接用', '多组', [1, 3, 4], false, '多类型','不上报')

vLog('直接用', '多组', [1, 3, 4], false, '多类型','不上报')

/**
 * 事件上报
 * name: reportWeData 固定值
 * eventName：reportEventName.※ 枚举类型 ✲ps: 需自定义✲
 * info: 事件上报内容 Object类型
 * 
 */
vLog({name: 'reportWeData', eventName: reportEventName.BI_wx_login, info: {key: 'Value'}})

/**
 * 日志上报
 * 调用 .report()方法
 * 
 */
vLog.info('vLog ORIGIN qs.parse(options) >>>>', qs.parse(options)).report()

/**
 * 过滤关键字，最多不超过1Kb，可以在小程序管理后台根据设置的内容搜索得到对应的日志。
 */
vLog.setFilterMsg('openid')

/**
 * 是setFilterMsg的添加接口。用于设置多个过滤关键字。
 */
vLog.addFilterMsg('wechatInfoId')

```

## 计划完善
- [] 单条日志超过3k字节的拆分成多个 批次提交
- [] 提供自定义日志类型能力


