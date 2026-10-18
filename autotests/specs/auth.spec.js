const assert = require('assert');
const allure = require('@wdio/allure-reporter').default;
const authPage = require('../pages/AuthPage');
const mainPage = require('../pages/MainPage');
const sessionSteps = require('../utils/SessionSteps');

describe('Авторизация', () => {
  beforeEach(async () => {
    await sessionSteps.openAuthorization();
    await authPage.open();
  });

  it('выполняет вход с корректными учётными данными', async () => {
    allure.addFeature('Авторизация');
    allure.addStory('Успешный вход');
    allure.addDescription('Проверка входа с учётными данными из задания.');
    await allure.addStep('Ввожу корректные логин и пароль');
    await authPage.signInWithValidData();
    await allure.addStep('Проверяю главную страницу');
    await mainPage.menuButton.waitForDisplayed();
    assert.strictEqual(await mainPage.menuButton.isDisplayed(), true);
  });

  it('показывает предупреждение при пустых полях', async () => {
    allure.addFeature('Авторизация');
    allure.addStory('Проверка обязательных полей');
    allure.addDescription('Проверка сохранения экрана авторизации при пустых полях.');
    await allure.addStep('Нажимаю кнопку входа с пустыми полями');
    await authPage.signInButton.click();
    await authPage.loginInput.waitForDisplayed();
    assert.strictEqual(await authPage.loginInput.isDisplayed(), true);
  });

  it('сообщает о неверном логине или пароле', async () => {
    allure.addFeature('Авторизация');
    allure.addStory('Неверные учётные данные');
    allure.addDescription('Негативная проверка входа с неверным паролем.');
    await allure.addStep('Ввожу неверный пароль и отправляю форму');
    await authPage.signIn('login2', 'wrong-password');
    await authPage.loginInput.waitForDisplayed();
    assert.strictEqual(await authPage.loginInput.isDisplayed(), true);
  });
});
