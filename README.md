# Автотесты приложения «В Хосписе»

В проекте находятся UI-тесты Android-приложения на JavaScript. Они проверяют авторизацию, работу с новостями и раздел «Наша миссия».

## Что нужно для запуска

- Android Studio и Android SDK;
- запущенный эмулятор Android API 36;
- Node.js 20 или новее;
- Appium 3 с драйвером UiAutomator2;
- установленное приложение `ru.edu.qamid`;
- доступ к учебному серверу.

Тестировалось на эмуляторе `Diploma_API_36` с идентификатором `emulator-5554`.

## Подготовка

1. Открыть каталог `autotests`.
2. Установить зависимости: `npm install`.
3. Запустить Appium: `npx appium --allow-insecure=uiautomator2:adb_shell`.
4. Указать учётные данные в переменных среды. В PowerShell:

```powershell
$env:TEST_LOGIN = "login2"
$env:TEST_PASSWORD = "password2"
```

Учётные данные не хранятся в исходном коде.

## Запуск

В каталоге `autotests`:

```powershell
npm test
```

Можно запустить отдельную группу:

```powershell
npm run test:auth
npm run test:news
npm run test:mission
```

Перед каждым сценарием очищаются данные приложения. Поэтому тесты не зависят от порядка запуска. При падении WebdriverIO сохраняет снимок экрана в Allure results.

## Структура

- `pages` — Page Objects с селекторами и действиями на экранах;
- `specs` — тесты, разделённые по функциям;
- `utils/SessionSteps.js` — подготовка независимой сессии;
- `wdio.conf.js` — настройки WebdriverIO, Appium и Allure.

В тестах нет фиксированных `sleep()`: перед каждым действием используется ожидание нужного элемента или экрана.

## Allure

После прогона исходные результаты появляются в `allure-results`. Архив `allure-results.zip` создаётся командой:

```powershell
Compress-Archive -Path allure-results\* -DestinationPath allure-results.zip -Force
```

Чтобы открыть HTML-отчёт локально при установленной Allure CLI: `allure serve allure-results`.
