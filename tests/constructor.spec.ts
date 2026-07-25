import { test, expect } from '@playwright/test';

// test('записывает HAR-файл для ингредиентов', async({page}) => {
//   await page.routeFromHAR('./tests/hars/ingredients.har', {
//     url: '**/api/ingredients',
//     update: false, 
//   });

//   await page.goto('http://localhost:4000/');
//   await page.waitForResponse('**/api/ingredients');
// })

test.describe('Конструктор бургера', () => {

  test.beforeEach(async ({page}) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients'
    })

    await page.goto('http://localhost:4000/');
    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();
  });

  test('добавление ингредиента в конструктор', async({page}) => {

const bunId = '643d69a5c3f7b9001cfa093c';
const mainId = '643d69a5c3f7b9001cfa0941';

    await page.getByTestId(`ingredient-${bunId}`).getByText('Добавить').click();
    await page.getByTestId(`ingredient-${mainId}`).getByText('Добавить').click();

    const constructorSection = page.getByTestId('burger-constructor');

    await expect(constructorSection.getByText('Краторная булка N-200i (верх)')).toBeVisible();
    await expect(constructorSection.getByText('Биокотлета из марсианской Магнолии')).toBeVisible();
  })
})

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
