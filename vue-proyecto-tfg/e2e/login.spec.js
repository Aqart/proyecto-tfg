import { test, expect } from '@playwright/test'

test('Login incorrecto no accede a la web', async ({ page }) => {
  await page.goto('http://localhost:5173/consumibles')
  await expect(page).toHaveURL('http://localhost:5173/login')
  await page.goto('http://localhost:5173/maquinas')
  await expect(page).toHaveURL('http://localhost:5173/login')
  await page.goto('http://localhost:5173/gastos-generales')
  await expect(page).toHaveURL('http://localhost:5173/login')
  await page.goto('http://localhost:5173/home')
  await expect(page).toHaveURL('http://localhost:5173/login')
  //cerrar el navegador
  await page.close()
})

test('Login correcto accede a la web', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await page.getByPlaceholder('email@email.es').click()
  await page.getByPlaceholder('email@email.es').fill('admin@admin.es')
  await page.getByPlaceholder('•••••••••').click()
  await page.getByPlaceholder('•••••••••').fill('admin')
  await page.getByRole('button', { name: 'Acceder' }).click()
  await expect(page).toHaveURL('http://localhost:5173/home')
  await expect(page).not.toHaveURL('http://localhost:5173/login')
  await page.goto('http://localhost:5173/consumibles')
  await expect(page).toHaveURL('http://localhost:5173/consumibles')
  await page.goto('http://localhost:5173/maquinas')
  await expect(page).toHaveURL('http://localhost:5173/maquinas')
  await page.goto('http://localhost:5173/gastos-generales')
  await expect(page).toHaveURL('http://localhost:5173/gastos-generales')

  //cerrar el navegador
  await page.close()
})
