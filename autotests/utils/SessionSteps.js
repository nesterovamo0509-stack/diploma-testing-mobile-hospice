const BasePage = require('../pages/BasePage');

class SessionSteps extends BasePage {
  async openAuthorization() {
    await driver.execute('mobile: shell', {
      command: 'pm',
      args: ['clear', 'ru.edu.qamid']
    });
    await driver.execute('mobile: activateApp', { appId: 'ru.edu.qamid' });
    const loginInput = this.byId('login_edit_text');
    const authorizationButton = this.byId('authorization_image_button');

    await browser.waitUntil(
      async () =>
        (await loginInput.isDisplayed().catch(() => false)) ||
        (await authorizationButton.isDisplayed().catch(() => false)),
      { timeout: 20000, timeoutMsg: 'Не открылся экран авторизации или главная страница' }
    );
    if (await loginInput.isDisplayed().catch(() => false)) return;

    await this.tap(authorizationButton);
    await this.tap(this.byText('Выйти'));
    await loginInput.waitForDisplayed();
  }
}

module.exports = new SessionSteps();
