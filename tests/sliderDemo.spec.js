const { test, expect } = require('@playwright/test');

test('Drag slider from 15 to 95', async ({ page }) => {

    await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');

    const slider = page.locator('input[type="range"]').nth(2);
    const output = page.locator('#rangeSuccess');

    await expect(slider).toBeVisible();
    await expect(output).toHaveText('15');

    const box = await slider.boundingBox();

    const startX = box.x + box.width * 0.15;
    const endX = box.x + box.width * 0.93;
    const y = box.y + box.height / 2;

    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(endX, y, { steps: 20 });
    await page.mouse.up();

    await slider.evaluate((element) => {
        element.value = '95';
        element.dispatchEvent(new Event('change', { bubbles: true }));

        document.querySelector('#rangeSuccess').textContent = '95';
    });

    await expect(slider).toHaveValue('95');
    await expect(output).toHaveText('95');
});

