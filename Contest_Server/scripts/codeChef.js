const puppeteer = require("puppeteer");

async function getCodechefPromise(){ 

return new Promise(async function (resolve) {
  var codechef_data = {};
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto("https://www.codechef.com/");

  const contest_details = await page
    .evaluate(() => {
      const contest_url =
        document.querySelector("#contest-title1").firstChild.firstChild.href;
      const contest_name =
        document.querySelector("#contest-title1").firstChild.firstChild.text;

      return { contest_url, contest_name };
    })
    .catch(() => {
      resolve("error_codechef_1");
    });

  codechef_data = Object.assign(codechef_data,contest_details);

  await page.goto(contest_details["contest_url"]);
  //   await page.waitForTimeout(1500);

  const time_details = await page
    .evaluate(() => {
      var duration = "";
      var start_time = "";

      const duration_details = $("ul.last").text();
      const arr = duration_details.split("\n", 2);

      duration = arr[0].split(":")[1].trim().split(" ")[0]+" HRS";
      const time_details = arr[1].split(":")[1].trim().split("at");
      const hrs = arr[1].split(":")[2].trim().split("HRS")[0];
      const contest_date = time_details[0];
      start_time = time_details[1]+":"+hrs;
      start_time = start_time.trim();
      const website_name = "codechef";
      return {contest_date, duration, start_time, website_name }
    // return {duration_details}
    })
    .catch(() => {
      resolve("error_codechef_2");
    });

  codechef_data = {...codechef_data,...time_details};

  await browser.close();

  resolve(codechef_data);
//    console.log(codechef_data);

})};


module.exports = {getCodechefPromise};
