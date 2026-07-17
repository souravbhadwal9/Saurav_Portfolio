const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Scroll to skills section
  await page.evaluate(() => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(800);

  // Dark mode
  await page.evaluate(() => document.documentElement.classList.remove('light'));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'd:/Saurav_Portfolio/skills-dark.png', fullPage: false });

  // Light mode
  await page.evaluate(() => document.documentElement.classList.add('light'));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'd:/Saurav_Portfolio/skills-light.png', fullPage: false });

  await browser.close();
  console.log('Done');
})();
