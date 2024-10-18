import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=playwright&sca_esv=e8313a84c6056b2f&source=hp&ei=RScMZ8jrIN-H4-EP95e0yA4&iflsig=AL9hbdgAAAAAZww1VSbkmOxZHg-XEcB1Rm5xzwp0s7O5&ved=0ahUKEwiIovORk4yJAxXfwzgGHfcLDekQ4dUDCA0&uact=5&oq=&gs_lp=Egdnd3Mtd2l6IgBIAFAAWABwAHgAkAEAmAEAoAEAqgEAuAEDyAEAmAIAoAIAmAMAkgcAoAcA&sclient=gws-wiz');
  await page.getByRole('link', { name: 'Playwright: Fast and reliable' }).click();
  await page.getByRole('link', { name: 'Get started' }).click();
});