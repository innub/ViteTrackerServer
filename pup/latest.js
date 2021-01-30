const puppeteer = require("puppeteer");

const baseUrl = "https://www.techbargains.com/";
async function Latest(limit) {
  let lim = limit != undefined ? limit : 15;
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1600, height: 8000 },
  });

  const page = await browser.newPage();
  await page.goto(baseUrl, {
    waitUntil: "domcontentloaded",
  });
  let data = await page.evaluate(
    (lim, url) => {
      let nl = document.querySelectorAll('div[data-ga-element="deal_tile"]');
      var arr = Array.from(nl);
      let ids = arr.map((n) => {
        return n.getAttribute("id");
      });
      ids.splice(ids.indexOf(null), ids.length - ids.indexOf(null));
      let obj = [];

      for (let i = 0; i < lim; i++) {
        let title = document.querySelector(`#${ids[i]} > h3 > a`).innerText;
        let time = document.querySelector(`#${ids[i]} > div > time`).innerText;
        let img = document
          .querySelector(`#${ids[i]} > div > a > img`)
          .getAttribute("src");
        obj.push({
          url: url,
          title: title,
          recent: time,
          img: img,
        });
      }
      return obj;
    },
    lim,
    baseUrl
  );
  await browser.close();
  return data;
}

module.exports = Latest;
