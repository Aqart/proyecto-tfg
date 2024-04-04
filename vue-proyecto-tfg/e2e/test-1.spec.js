import { test, expect } from '@playwright/test';

test('Login correcto', async ({ page }) => {

  await page.goto('http://localhost:5173/login');
  await page.getByPlaceholder('email@email.es').fill('admin@admin.es');
  await page.getByPlaceholder('•••••••••').fill('admin');
  await page.getByRole('button', { name: 'Acceder' }).click();

  await expect(page).toHaveURL('http://localhost:5173/home')
  //cerrar el navegador
  await page.close()
});