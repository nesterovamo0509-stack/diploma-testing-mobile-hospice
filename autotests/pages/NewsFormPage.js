const BasePage = require('./BasePage');

class NewsFormPage extends BasePage {
  get category() { return this.byId('news_category_auto_complete'); }
  get titleInput() { return this.byId('news_title_edit_text'); }
  get dateInput() { return this.byId('news_publish_date_edit_text'); }
  get timeInput() { return this.byId('news_publish_time_edit_text'); }
  get descriptionInput() { return this.byId('news_description_edit_text'); }
  get saveButton() { return this.byId('news_save_button'); }
  get cancelButton() { return this.byId('news_cancel_button'); }

  async saveEmptyForm() {
    await this.tap(this.saveButton);
  }

  async createNews({ category, title, description }) {
    await this.fill(this.category, category);
    await this.fill(this.titleInput, title);
    await this.tap(this.dateInput);
    await this.tap($('id=android:id/button1'));
    await this.tap(this.timeInput);
    await this.tap($('id=android:id/button1'));
    await this.fill(this.descriptionInput, description);
    await this.tap(this.saveButton);
  }
}

module.exports = new NewsFormPage();
