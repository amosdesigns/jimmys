import { test, expect } from '@playwright/test'

// NOTE: These tests require a valid authenticated session.
// Set PLAYWRIGHT_TEST_BASE_URL and configure auth tokens as needed.

test.describe('Orders', () => {
  test.skip('orders page loads correctly', async ({ page }) => {
    await page.goto('/orders')
    await expect(page.getByRole('heading', { name: 'Orders' })).toBeVisible()
  })

  test.skip('can create a new order', async ({ page }) => {
    await page.goto('/orders')
    await page.getByRole('button', { name: 'New Order' }).click()
    // Add more assertions as the UI is built out
  })
})
