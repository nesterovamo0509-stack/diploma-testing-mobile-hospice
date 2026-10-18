const BasePage = require('./BasePage');

class MainPage extends BasePage {
  get menuButton() { return this.byId('main_menu_image_button'); }
  get allNewsButton() { return this.byId('all_news_text_view'); }
  get missionButton() { return this.byId('our_mission_image_button'); }
  get authorizationButton() { return this.byId('authorization_image_button'); }
  get newsListAppBar() { return this.byId('news_list_app_bar'); }

  async openNews() {
    await this.tap(this.allNewsButton);
    await this.newsListAppBar.waitForDisplayed({ timeout: 15000 });
  }

  async openMission() {
    await this.tap(this.missionButton);
  }

  async logOut() {
    await this.tap(this.authorizationButton);
    await this.tap(this.byText('Выйти'));
  }
}

module.exports = new MainPage();
