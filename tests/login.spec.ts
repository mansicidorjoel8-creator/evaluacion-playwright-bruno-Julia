import { test, expect } from '@playwright/test';

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test('Login exitoso con credenciales correctas', async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verificar redirección al dashboard
    await expect(page).toHaveURL(/logged-in-successfully/);
  });

  test('Login fallido con contraseña incorrecta', async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('WrongPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Your password is invalid!');
  });

  test('Login fallido con usuario inexistente', async ({ page }) => {
    await page.getByLabel('Username').fill('nonexistentuser');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Your username is invalid!');
  });

});
