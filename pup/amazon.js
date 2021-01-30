const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function ScanPage(url) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    page.goto(url, { waitUntil: ["networkidle2"] });
    try {
      await page.waitForSelector("#imgTagWrapperId > img", {
        timeout: 5500,
      });
    } catch (err) {
      await browser.close();
      return undefined;
    }

    let data = await page.evaluate((url) => {
      let obj = [];
      let img;
      let imgUrl;
      let title;
      try {
        img = document.querySelector("#imgTagWrapperId > img");
        imgUrl = img
          .getAttribute("src")
          .replace(/\\n|\n|data:image\/webp;base64,/g, "");
        title = img.getAttribute("alt");
      } catch {
        img = 0;
      }

      let price;
      try {
        price = document.querySelector("#priceblock_ourprice").innerHtml;
      } catch {
        price = document.querySelector("#priceblock_saleprice").innerHTML;
      }

      obj.push({
        url: url,
        title: title,
        imgUrl: imgUrl,
        price: price,
      });

      return obj;
    }, url);
    await browser.close();
    return data;
  } catch {
    return undefined;
  }
}

module.exports = ScanPage;
