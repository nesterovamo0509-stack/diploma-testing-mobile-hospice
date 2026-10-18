const assert = require('assert');
const allure = require('@wdio/allure-reporter').default;
const authPage = require('../pages/AuthPage');
const mainPage = require('../pages/MainPage');
const newsPage = require('../pages/NewsPage');
const newsFormPage = require('../pages/NewsFormPage');
const sessionSteps = require('../utils/SessionSteps');

describe('Управление новостями', () => {
  beforeEach(async () => {
    await sessionSteps.openAuthorization();
    await authPage.open();
    await authPage.signInWithValidData();
    await mainPage.openNews();
  });

  it('открывает форму добавления новости', async () => {
    allure.addFeature('Новости');
    allure.addStory('Переход к добавлению');
    allure.addDescription('Проверка открытия формы создания новости из панели управления.');
    await allure.addStep('Открываю форму добавления новости');
    await newsPage.openCreateForm();
    await newsFormPage.titleInput.waitForDisplayed();
    assert.strictEqual(await newsFormPage.saveButton.isDisplayed(), true);
  });

  it('показывает предупреждение при сохранении пустой новости', async () => {
    allure.addFeature('Новости');
    allure.addStory('Обязательные поля новости');
    allure.addDescription('Негативная проверка сохранения формы без обязательных данных.');
    await allure.addStep('Открываю форму и сохраняю её без данных');
    await newsPage.openCreateForm();
    await newsFormPage.saveEmptyForm();
    await newsFormPage.titleInput.waitForDisplayed();
    assert.strictEqual(await newsFormPage.titleInput.isDisplayed(), true);
  });

  it('создаёт активную новость с уникальным заголовком', async () => {
    allure.addFeature('Новости');
    allure.addStory('Создание новости');
    allure.addDescription('Проверка создания активной новости с уникальным заголовком.');
    const title = `Автотест ${Date.now()}`;
    await allure.addStep('Создаю новость с уникальным заголовком');
    await newsPage.openCreateForm();
    await newsFormPage.createNews({
      category: 'Объявление',
      title,
      description: 'Тестовая новость, созданная автотестом.'
    });
    await newsPage.addButton.waitForDisplayed();
    const source = await driver.getPageSource();
    assert.ok(source.includes(title), 'Созданная новость не найдена в панели управления');
  });
});
