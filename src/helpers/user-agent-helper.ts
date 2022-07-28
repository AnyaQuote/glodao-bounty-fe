import { UAParser } from 'ua-parser-js'

export const userAgentHelper = {
  checkDeviceType: () => {
    const parser = new UAParser()
    return parser.getResult()
  },
}
