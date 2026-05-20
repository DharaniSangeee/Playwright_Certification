const { test, expect } = require('../lambdatest-setup');

test('Simple Form Demo – Validate message', async ({ page }) => {

    const message = 'Welcome to TestMu AI';

    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    await page.waitForLoadState('networkidle');

    const inputBox = page.locator('input#user-message');

    await inputBox.fill(message);
    await expect(inputBox).toHaveValue(message);

    await page.locator('#showInput').click();
    await expect(page.locator('#message')).toHaveText(message);
});
