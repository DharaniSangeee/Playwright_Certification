const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120000,
  fullyParallel: true,

  use: {
    video: 'on',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], browserName: 'chromium', channel: 'chrome' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], browserName: 'firefox' },
    },
    {
      name: 'pw-chromium:latest:Windows 10@lambdatest',
      use: { viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'pw-firefox:latest:Windows 10@lambdatest',
      use: { viewport: { width: 1280, height: 720 } },
    },
  ],
});
