const puppeteer = require("puppeteer");

async function getleetCodePromise(){

return new Promise(async function (resolve) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto("https://leetcode.com/contest/");

  await page.waitForTimeout(3000);

  leetcode_data = await page
    .evaluate(() => {
      var contest_details = {};

      const contest_url = document.querySelector("div.contest-card > a").href;
      const contest_name = document.querySelector(".card-title").innerText;
      const time_info = document.querySelector(".time").innerText.split("@");
      // const start_time = time_info[1].trim();
      const start_time = "8:00 AM - 9:30 AM";
      const contest_date = time_info[0];
      const duration = "1.5 HRS";
      const website_name = "leetcode";
      contest_details = { website_name,contest_url, contest_name, duration, start_time,contest_date };

      return contest_details;
    })
    .catch(() => {
      resolve("error_leetcode");
    });

  resolve(leetcode_data);
  // console.log(leetcode_data);

  await browser.close();

}).catch(()=>resolve("error_leetcode"))
};

module.exports = {getleetCodePromise};