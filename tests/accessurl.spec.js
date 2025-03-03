import {test, expect} from '@playwright/test';


test('access', async({page})=>{
 
    // https://www.saucedemo.com/
    await page.goto("https://www.saucedemo.com/");
   await page.locator("#user-name").fill("standard_user");
   await page.locator("#password").fill("secret_sauce");
    await page.pause();
   await page.locator("#login-button").click();


});
