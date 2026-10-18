const BasePage = require('./BasePage');

class AuthPage extends BasePage {
  get loginInput() { return this.byId('login_edit_text'); }
  get passwordInput() { return this.byId('password_edit_text'); }
  get signInButton() { return this.byId('enter_button'); }

  async open() {
    await this.loginInput.waitForDisplayed();
  }

  async signIn(login, password) {
    await this.fill(this.loginInput, login);
    await this.fill(this.passwordInput, password);
    await this.tap(this.signInButton);
  }

  async signInWithValidData() {
    await this.signIn(process.env.TEST_LOGIN, process.env.TEST_PASSWORD);
    const mainMenu = this.byId('main_menu_image_button');
    const opened = await mainMenu.waitForDisplayed({ timeout: 12000 }).catch(() => false);
    if (!opened) {
      await this.tap(this.signInButton);
      await mainMenu.waitForDisplayed({ timeout: 15000 });
    }
  }
}

module.exports = new AuthPage();
