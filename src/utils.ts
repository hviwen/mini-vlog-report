interface Config {
  report: { backgroundColor: string, color: string },
  log: { backgroundColor: string, color: string },
  info: { backgroundColor: string, color: string },
  warn: { backgroundColor: string, color: string },
  error: { backgroundColor: string, color: string },
}

interface ReportArgs {
  tag: string,
  reportArgs: any[]
}

type ColorType = 'report' | 'log' | 'info' | 'warn' | 'error'

const defaultConfig: Config = {
  report: {backgroundColor: '#00a803', color: '#fff'},
  log: {backgroundColor: '#5b5de5ff', color: '#fff'},
  info: {backgroundColor: '#810081', color: '#fff'},
  warn: {backgroundColor: '#bda101', color: '#fff'},
  error: {backgroundColor: '#ff4b28ff', color: '#fff'}
}

const baseDataType: string[] = ['string', 'number', 'boolean', 'undefined', 'symbol', 'bigint']
const specialDataType: string[] = ['Undefined', 'Null', 'NaN', 'Infinity', '-Infinity']

export function getStringifySpecialDataType(obj: any): string {
  let originType = Object.prototype.toString.call(obj).slice(8, -1)
  if (specialDataType.indexOf(originType) > -1) {
    return originType
  }

  return ''
}

export function formatReportArgs(args: any[] = []): ReportArgs {
  let reportTag: string = ''
  let reportArgs: any[] = []
  if (!args?.length) {
    return {
      tag: 'TAG', reportArgs: args
    }
  }

  reportTag = args && args[0]
  args.shift()
  for (let arg of args) {
    if (baseDataType.indexOf(typeof arg) > -1 || !isComplexObject(arg)) {
      reportArgs.push(arg)
    } else if (getStringifySpecialDataType(arg)) {
      reportArgs.push(getStringifySpecialDataType(arg))
    }
  }

  return {tag: reportTag, reportArgs: reportArgs}
}

export function setArgsColor(args: any[] = [], type?: ColorType): any[] {
  if (!args?.length || !type) return args

  if (typeof args[0] === 'string' && !args[0].startsWith('%c')) {
    args = [`%c ${args[0]} `, `background:${defaultConfig[type].backgroundColor};color:${defaultConfig[type].color}`, ...args.slice(1)]
  }

  return args
}

export function createReportFunction(args: any[], reportMethod: (data: any) => void) {
  return function () {
    const {tag = '', reportArgs = []} = formatReportArgs(args);
    if (reportArgs && reportArgs.length) {
      for (let reportInfo of reportArgs) {
        reportMethod({reportTag: tag, reportInfo});
      }
    }
  }
}

export function isComplexObject(obj: any): boolean {
  let isComplex = false
  if ((typeof obj === 'object' || typeof obj === 'function') && obj !== null) {

    if (obj instanceof Object) {
      let allKeys = Reflect.ownKeys(obj)
      let __count = 0
      for (let key of allKeys) {
        if (typeof key === 'string' && key.startsWith('__')) {
          __count++
        }
        if (__count > 2) {
          isComplex = true
          break
        }
      }
    } else if (Array.isArray(obj)) {
      if (obj.length >= 30) {
        isComplex = true
      }
    } else if (obj instanceof Map || obj instanceof Set) {
      if (obj.size >= 30) {
        isComplex = true
      }
    } else if (obj instanceof WeakMap || obj instanceof WeakSet) {
      isComplex = true
    } else if (obj instanceof Function) {
      isComplex = true
    } else if (obj instanceof Promise) {
      isComplex = true
    } else if (obj instanceof Error) {
      isComplex = true
    }
  }

  return isComplex
}