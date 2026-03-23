import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('redirects unauthenticated users to sign-in', async ({ page }) => {
    await page.goto('/')
    // Clerk middleware should redirect to sign-in
    await expect(page).toHaveURL(/sign-in/)
  })

  test('sign-in page renders correctly', async ({ page }) => {
    await page.goto('/sign-in')
    await expect(page.locator('body')).toBeVisible()
  })
})
