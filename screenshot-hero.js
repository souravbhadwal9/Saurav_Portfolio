const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(4000);

  // Dark mode
  await page.evaluate(() => document.documentElement.classList.remove('light'));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'd:/Saurav_Portfolio/hero-new-dark.png', fullPage: false });

  // Light mode
  await page.evaluate(() => document.documentElement.classList.add('light'));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'd:/Saurav_Portfolio/hero-new-light.png', fullPage: false });

  await browser.close();
  console.log('Done');
})();
