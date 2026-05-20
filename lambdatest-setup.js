const base = require('@playwright/test');
const path = require('path');
const { chromium, firefox } = require('playwright');
const cp = require('child_process');

const playwrightClientVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];

const buildCapabilities = (projectName, testName) => {
  const [browserName = 'pw-chromium', browserVersion = 'latest', platform = 'Windows 10'] =
    projectName.split('@lambdatest')[0].split(':');

  return {
    browserName,
    browserVersion,
    'LT:Options': {
      platform,
      build: 'Playwright Certification Build',
      name: testName,
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      network: true,
      video: true,
      console: true,
      tunnel: false,
      useSpecificBundleVersion: true,
      playwrightClientVersion,
    },
  };
};

exports.test = base.test.extend({
  page: async ({}, use, testInfo) => {
    if (!testInfo.project.name.includes('@lambdatest')) {
      const browserType = testInfo.project.use.browserName === 'firefox' ? firefox : chromium;
      const browser = await browserType.launch({
        channel: testInfo.project.use.channel,
      });
      const context = await browser.newContext({
        viewport: testInfo.project.use.viewport,
      });
      const localPage = await context.newPage();

      try {
        await use(localPage);
      } finally {
        await localPage.close();
        await context.close();
        await browser.close();
      }
      return;
    }

    if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
      throw new Error('Set LT_USERNAME and LT_ACCESS_KEY before running LambdaTest projects.');
    }

    const fileName = path.basename(testInfo.file);
    const capabilities = buildCapabilities(
      testInfo.project.name,
      `${testInfo.title} - ${fileName}`,
    );

    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities),
      )}`,
    });

    const context = await browser.newContext({
      viewport: testInfo.project.use.viewport,
    });
    const ltPage = await context.newPage();

    try {
      await use(ltPage);
    } finally {
      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status === 'passed' ? 'passed' : 'failed',
          remark: testInfo.error?.stack || testInfo.error?.message || '',
        },
      };

      await ltPage.evaluate(
        () => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`,
      );

      await ltPage.close();
      await context.close();
      await browser.close();
    }
  },
});

exports.expect = base.expect;
