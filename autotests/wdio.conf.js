const path = require('path');

exports.config = {
  runner: 'local',
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT || 4723),
  path: '/',
  specs: ['./specs/**/*.spec.js'],
  maxInstances: 1,
  logLevel: 'warn',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  services: [],
  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: path.join(__dirname, '..', 'allure-results'),
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 90000
  },
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:udid': process.env.ANDROID_UDID || 'emulator-5554',
    'appium:appPackage': 'ru.edu.qamid',
    'appium:appActivity': 'ru.edu.qamid.ui.AppActivity',
    'appium:noReset': true,
    'appium:newCommandTimeout': 120,
    'appium:language': 'ru',
    'appium:locale': 'RU'
  }],
  beforeTest: async () => {
    await driver.execute('mobile: activateApp', { appId: 'ru.edu.qamid' });
  },
  afterTest: async (_test, _context, { passed }) => {
    if (!passed) await browser.takeScreenshot();
  }
};
