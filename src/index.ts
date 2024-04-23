import {createReportFunction, setArgsColor} from "./utils";

/**
 * WxReport 上报函数的接口
 * info: 信息上报
 * log: 日志上报
 * warn: 警告上报
 * error: 错误上报
 */
interface WxReport {
  info(...data: any[]): void;

  log(...data: any[]): void;

  warn(...data: any[]): void;

  error(...data: any[]): void;
}

/**
 * wx 上报函数 默认定义为一个空对象
 */
declare var wx: any;

/**
 * wx 上报函数
 * 判断是否为微信小程序环境，如果是则使用微信小程序的上报函数
 */
let wxReport: WxReport;
if (typeof wx !== 'undefined' && typeof wx === 'object' && typeof wx.getRealtimeLogManager === 'function') {
  wxReport = wx.getRealtimeLogManager();
} else {
  wxReport = {
    info: () => {
    },
    log: () => {
    },
    warn: () => {
    },
    error: () => {
    },
  };
}

/**
 * 代理 console 对象的方法
 * 将同上报重名的方法进行封装，加入链式调用的 report 方法
 */
const vLog = new Proxy(console, {
  get(target, p, receiver) {
    return function (...args: any[]) {
      switch (p) {
        case 'log':
        case 'info':
          Reflect.get(target, p, receiver).apply(target, setArgsColor(args, `${p}`))
          return {
            report: createReportFunction(args, wxReport?.info)
          }

        case 'warn':
          Reflect.get(target, p, receiver).apply(target, setArgsColor(args, `${p}`))
          return {
            report: createReportFunction(args, wxReport?.warn)
          }
        case 'error':
          Reflect.get(target, p, receiver).apply(target, setArgsColor(args, `${p}`))
          return {
            report: createReportFunction(args, wxReport?.error)
          }

        default:
          return Reflect.get(target, p, receiver).apply(target, args)
      }
    }
  }
})

export default vLog