import { test, expect } from '@playwright/test';

test('Completar y enviar formulario de text-box', async ({ page }) => {
  // Navegar a la página
  await page.goto('https://demoqa.com/text-box');

  // Completar campos usando getByPlaceholder
  await page.getByPlaceholder('Full Name').fill('Juan Perez');
  await page.getByPlaceholder('name@example.com').fill('juan.perez@example.com');

  // Clic en el botón Submit usando getByRole
  await page.getByRole('button', { name: 'Submit' }).click();

  // Aserciones para verificar la salida en pantalla
  const output = page.locator('#output');
  await expect(output).toBeVisible();
  await expect(output).toContainText('Juan Perez');
});

test('Verificar el titulo de la página', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  await expect(page).toHaveTitle(/DEMOQA/);
});
