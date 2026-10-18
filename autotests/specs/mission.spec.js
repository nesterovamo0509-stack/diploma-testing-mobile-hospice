const assert = require('assert');
const allure = require('@wdio/allure-reporter').default;
const authPage = require('../pages/AuthPage');
const mainPage = require('../pages/MainPage');
const missionPage = require('../pages/MissionPage');
const sessionSteps = require('../utils/SessionSteps');

describe('Раздел «Наша миссия»', () => {
  beforeEach(async () => {
    await sessionSteps.openAuthorization();
    await authPage.open();
    await authPage.signInWithValidData();
  });

  it('открывает страницу с цитатами', async () => {
    allure.addFeature('Наша миссия');
    allure.addStory('Открытие раздела');
    allure.addDescription('Проверка открытия раздела с цитатами.');
    await allure.addStep('Открываю раздел «Наша миссия»');
    await mainPage.openMission();
    await missionPage.title.waitForDisplayed();
    assert.strictEqual(await missionPage.quotesList.isDisplayed(), true);
  });

  it('раскрывает первую цитату', async () => {
    allure.addFeature('Наша миссия');
    allure.addStory('Раскрытие цитаты');
    allure.addDescription('Проверка раскрытия текста первой цитаты.');
    await allure.addStep('Открываю раздел и раскрываю первую цитату');
    await mainPage.openMission();
    await missionPage.expandFirstQuote();
    await missionPage.firstQuoteDescription.waitForDisplayed();
    assert.strictEqual(await missionPage.firstQuoteDescription.isDisplayed(), true);
  });
});
