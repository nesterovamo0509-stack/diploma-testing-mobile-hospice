const APP_ID = 'ru.edu.qamid:id/';

class BasePage {
  byId(id) {
    return $(`id=${APP_ID}${id}`);
  }

  byText(text) {
    return $(`android=new UiSelector().text("${text}")`);
  }

  async visibleById(id) {
    const selector = `id=${APP_ID}${id}`;
    await browser.waitUntil(async () => {
      const elements = await $$(selector);
      for (const element of elements) {
        if (await element.isDisplayed().catch(() => false)) return true;
      }
      return false;
    }, { timeout: 15000, timeoutMsg: `Не найден видимый элемент ${id}` });

    const elements = await $$(selector);
    for (const element of elements) {
      if (await element.isDisplayed().catch(() => false)) return element;
    }
    throw new Error(`Не найден видимый элемент ${id}`);
  }

  async tap(element) {
    await element.waitForDisplayed();
    await element.click();
  }

  async tapVisibleById(id) {
    const element = await this.visibleById(id);
    await element.click();
  }

  async fill(element, value) {
    await element.waitForDisplayed();
    await element.clearValue();
    await element.setValue(value);
  }
}

module.exports = BasePage;
