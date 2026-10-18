const BasePage = require('./BasePage');

class MissionPage extends BasePage {
  get title() { return this.byId('our_mission_title_text_view'); }
  get quotesList() { return this.byId('our_mission_item_list_recycler_view'); }
  get firstQuoteToggle() { return this.byId('our_mission_item_open_card_image_button'); }
  get firstQuoteDescription() { return this.byId('our_mission_item_description_text_view'); }

  async expandFirstQuote() {
    await this.tap(this.firstQuoteToggle);
  }
}

module.exports = new MissionPage();
