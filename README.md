# Stellar Burgers

**Stellar Burgers** — учебное веб-приложение для заказа бургеров. Выбирайте ингредиенты, собирайте свой вариант и оформляйте заказ. В личном кабинете можно редактировать профиль и просматривать историю заказов, а в общей ленте — следить за их статусами.

## Технологический стек:

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=for-the-badge&logo=cssmodules&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-2B3A42?style=for-the-badge&logo=webpack&logoColor=8DD6F9)

### Тестирование и компоненты

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

Jest проверяет логику приложения, Playwright — пользовательские сценарии в браузере. Компоненты представлены в Storybook.


## Основной функционал
- Конструктор бургера: выбор булки, добавление и удаление ингредиентов с автоматическим расчётом стоимости.
- Детали ингредиентов: изображение, состав и пищевая ценность в модальном окне.
- Оформление заказа: отправка на сервер, получение номера и очистка конструктора.
- Личный кабинет: регистрация, вход, восстановление пароля и редактирование данных.
- Заказы: общая лента со статистикой и персональная история заказов.
- Навигация: защищённые страницы профиля и прямые ссылки на детали ингредиентов и заказов.

## Реализация:
- Состояние приложения разделено на Redux-слайсы: ингредиенты, конструктор, пользователь, лента и заказы. 
- Запросы к API выполняются через асинхронные действия. 
- Для личного кабинета настроены защищённые маршруты, для авторизации — обновление токена при его истечении.
- Тесты проверяют работу редьюсеров, добавление ингредиентов, открытие и закрытие модальных окон, а также оформление заказа.

## Запуск

1. В каталоге проекта установите зависимости:

```
npm ci
```

2. Запустите приложение:

```
npm start
```

## Полезные команды

| Команда | Назначение |
| --- | --- |
| `npm test` | запуск модульных тестов Jest |
| `npm run test:e2e` | запуск браузерных тестов Playwright |
| `npm run storybook` | запуск Storybook |
| `npm run lint` | проверка кода через ESLint |
| `npm run format` | форматирование исходных файлов |

### Перед первым запуском браузерных тестов выполните:
```
npx playwright install
```
