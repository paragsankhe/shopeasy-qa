import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {

  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('testuser', 'Test123');

    await expect(page).toHaveURL(/dashboard/);
  });

  test('should show error for invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('testuser', 'WrongPassword');

    await expect(loginPage.errorMessage)
      .toContainText('Invalid credentials');
  });

  test('should require username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', 'Test123');

    await expect(loginPage.errorMessage)
      .toContainText('Username is required');
  });

  test('should require password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('testuser', '');

    await expect(loginPage.errorMessage)
      .toContainText('Password is required');
  });

});
