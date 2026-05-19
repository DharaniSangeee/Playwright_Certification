const { test, expect } = require('@playwright/test');

test('Input Form Submit - Validation and success', async ({ page }) => {

    await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');

    const nameInput = page.locator('#name');
    const submitButton = page.locator('(//button[@type="submit"])[2]');

    await expect(nameInput).toBeVisible();

    // Submit without filling the form.
    await submitButton.click();

    const message = await nameInput.evaluate(element => element.validationMessage);
    console.log(message);
    expect(message).toBe('Please fill out this field.');

    // Fill form.
    await nameInput.fill('Sangeetha');
    await page.locator('#inputEmail4').fill('test@test.com');
    await page.locator('#company').fill('Accenture');
    await page.locator('#inputPassword4').fill('Accenture');
    await page.locator('#websitename').fill('Playwright 101 Assignment');
    await page.selectOption('select[name="country"]', { label: 'United States' });
    await page.locator('#inputCity').fill('Chennai');
    await page.locator('#inputAddress1').fill('Test Address1');
    await page.locator('#inputAddress2').fill('Test Address2');
    await page.locator('#inputState').fill('TN');
    await page.locator('#inputZip').fill('600001');

    await submitButton.click();

    await expect(page.locator('.success-msg'))
        .toHaveText('Thanks for contacting us, we will get back to you shortly.');
});
