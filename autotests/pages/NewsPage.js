const BasePage = require('./BasePage');

class NewsPage extends BasePage {
  get controlPanelButton() { return this.byId('news_edit_button'); }
  get addButton() { return this.byId('add_news_image_view'); }

  async openControlPanel() {
    await this.tap(this.controlPanelButton);
    await this.visibleById('add_news_image_view');
  }

  async openCreateForm() {
    await this.openControlPanel();
    await this.tapVisibleById('add_news_image_view');
  }
}

module.exports = new NewsPage();
