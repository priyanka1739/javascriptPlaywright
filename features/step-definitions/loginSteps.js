const {Given} = require('@cucumber/cucumber');
// setDefaultTimeout(60*1000)
const {expect} = require ('@playwright/test');

const playwright = require('@playwright/test');


Given('user login', async function(){
    // const browser =await chromium.launch({headless: false});
    const browser= await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    await this.page.goto("https://www.saucedemo.com/");
    await browser.close();

});