import { test, expect } from '@playwright/test';

// test('записывает HAR-файл для ингредиентов', async({page}) => {
//   await page.routeFromHAR('./tests/hars/ingredients.har', {
//     url: '**/api/ingredients',
//     update: false, 
//   });

//   await page.goto('http://localhost:4000/');
//   await page.waitForResponse('**/api/ingredients');
// })


// test('записывает HAR для user и order', async ({ page }) => {
//   await page.routeFromHAR('./tests/hars/user.har', {
//     url: '**/auth/user',
//     update: false
//   });
//   await page.routeFromHAR('./tests/hars/order.har', {
//     url: '**/orders',
//     update: false
//   });

//   await page.goto('http://localhost:4000/login');
//   await page.locator('input[name="email"]').fill('katya@yandex.ru');
//   await page.locator('input[name="password"]').fill('12345');
//   await page.getByText('Войти').click();

//   await page.waitForURL('http://localhost:4000/');

//   await page.reload();
//   await page.waitForTimeout(2000);

//   await expect(page.getByText('Краторная булка N-200i')).toBeVisible();

//   const bunId = '643d69a5c3f7b9001cfa093c';
//   const mainId = '643d69a5c3f7b9001cfa0949';

//   await page.getByTestId(`ingredient-${bunId}`).getByText('Добавить').click({ force: true });
//   await page.getByTestId(`ingredient-${mainId}`).getByText('Добавить').click({ force: true });

//   const constructorSection = page.getByTestId('burger-constructor');
//   await expect(constructorSection.getByText('Краторная булка N-200i (верх)')).toBeVisible();

//   await page.getByText('Оформить заказ').click();
//   await page.waitForResponse('**/api/orders');
//   await page.waitForTimeout(1000);
// });

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
  });

  test('открытие модального окна ингредиента', async({page}) => {

    const cardId = '643d69a5c3f7b9001cfa094a';

    await page.getByTestId(`ingredient-${cardId}`).click();
    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Сыр с астероидной плесенью');
  });

  test('закрытие модального окна ингредиента по клику на крестик', async({page}) => {
    const cardId = '643d69a5c3f7b9001cfa094a';

    const ingredientCard = page.getByTestId(`ingredient-${cardId}`);
    await expect(ingredientCard).toBeVisible();
    await ingredientCard.click();

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();

    const modalClose = page.getByTestId('modal-close');
    await expect(modalClose).toBeVisible();
    await modalClose.click();

    await expect(modal).toBeHidden();
  });

  test('закрытие модального окна ингредиента по оверлею', async({page}) => {
    const cardId = '643d69a5c3f7b9001cfa094a';

    const ingredientCard = page.getByTestId(`ingredient-${cardId}`);
    await expect(ingredientCard).toBeVisible();
    await ingredientCard.click();

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();

    const overlay = page.getByTestId('close-overlay');
    await expect(overlay).toBeVisible();
    await overlay.click({ position: { x: 10, y: 10 } });

    await expect(modal).toBeHidden();
  })
})

test.describe('Оформление заказа', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    await context.addCookies([
      {
        name: 'accessToken',
        value: 'fake-access-token',
        url: 'http://localhost:4000'
      }
    ]);

    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients'
    });
    await page.routeFromHAR('./tests/hars/user.har', {
      url: '**/auth/user'
    });
    await page.routeFromHAR('./tests/hars/order.har', {
      url: '**/orders'
    });

    await page.goto('http://localhost:4000/');
    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();
  });

  test('оформление заказа', async ({ page }) => {
    const bunId = '643d69a5c3f7b9001cfa093c';
    const mainId = '643d69a5c3f7b9001cfa0949';
  
    await page.getByTestId(`ingredient-${bunId}`).getByText('Добавить').click({ force: true });
  
    const constructorSection = page.getByTestId('burger-constructor');
    await expect(constructorSection.getByText('Краторная булка N-200i (верх)')).toBeVisible();
  
    await page.getByTestId(`ingredient-${mainId}`).getByText('Добавить').click({ force: true });
    await expect(constructorSection.getByText('Мини-салат Экзо-Плантаго')).toBeVisible();
  
    await page.getByText('Оформить заказ').click();
  
    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('108598')).toBeVisible();
  
    await expect(constructorSection.getByText('Выберите булки').first()).toBeVisible();
  
    await page.getByTestId('modal-close').click();
    await expect(modal).toBeHidden();
  });
});