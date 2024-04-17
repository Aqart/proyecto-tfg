import { test, expect } from '@playwright/test'

test('Login, con campos vacíos', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Acceder' }).click()

  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByRole('alert')).toContainText('Debes rellenar todos los campos')
  await page.waitForTimeout(7000)
  await expect(page.getByRole('alert')).toBeHidden()
})

test('Login, con credenciales erroneas', async ({ page }) => {
  await page.goto('/')
  await page.getByPlaceholder('email@email.es').fill('error@error.es')
  await page.getByPlaceholder('•••••••••').fill('error')
  await page.getByRole('button', { name: 'Acceder' }).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByRole('alert')).toContainText('Email o Contraseña inválidos')
  await page.waitForTimeout(7000)
  await expect(page.getByRole('alert')).toBeHidden()
})

test('Login, con credenciales correctas', async ({ page }) => {
  await page.goto('/')
  await page.getByPlaceholder('email@email.es').fill('admin@admin.es')
  await page.getByPlaceholder('•••••••••').fill('admin')
  await page.getByRole('button', { name: 'Acceder' }).click()
  await expect(page).toHaveURL('/home')
})

test.afterAll(async ({ page }) => {
  //cerrar navegador
  await page.close()
})
