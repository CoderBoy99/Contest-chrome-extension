const puppeteer = require("puppeteer");

async function getCodeforcesPromise(){
return new Promise(async function (resolve) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto("https://codeforces.com/contests");

  codeforces_data = await page
    .evaluate(() => {
      var contest_details;

      $(
        "#pageContent > div.contestList > div.datatable > div:nth-child(6) > table > tbody"
      )
        .children()
        .each(function (idx) {
          var contest_name, duration, start_time,contest_date;
          if (
            $(this)
              .children()
              .eq(0)
              .text()
              .trim()
              .match("Codeforces Round #[0-9]+ (Div. [0-9])*") != null
          ) {
            $(this)
              .children()
              .each(function (index) {
                if (index == 0) contest_name = $(this).text().trim();
                else if (index == 2) {
                  const date_info = $(this).text().trim().split("UTC")[0].split(" ");
                  contest_date = date_info[0];
                  start_time = date_info[1];
                } else if (index == 3) {
                  duration = $(this).text().trim().split(":")[0].replace(/^0+/, '')+" HRS";
                }
              });
            contest_details = { contest_name, duration, start_time,contest_date };
            return false;
          }
        });

       contest_details = {...contest_details,contest_url: "https://codeforces.com/contests", website_name : "codeforces"}; 
      return contest_details;
    })
    .catch(() => {
      resolve("error_codeforces");
    });

  resolve(codeforces_data);
//   console.log(codeforces_data);
  
  await browser.close();

})};

module.exports = {getCodeforcesPromise};