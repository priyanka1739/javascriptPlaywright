import {test, expect} from '@playwright/test';
import { builtinModules } from 'module';



test ('UI flow', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("priyankakayastha123@gmail.com");
    await page.locator("#userPassword").fill("Learning1");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    const productName = "iphone 13 pro";
    const product = page.locator(".card-body");
    const name = page.locator(".card-body b");
    const count = await name.count();
 

    for(let i =0; i<count; i++){
      if(productName === await name.nth(i).textContent()){
        // await page.pause();
       await product.nth(i).locator("text= Add To Cart").click();
       break;
       
      }
    //   console.log(" is added to the cart");
    }
    // await page.pause();
    await page.locator("[routerlink*= cart]").click();

    await page.locator("div li").first().waitFor();
    const cartName =await page.locator("h3:has-text('iphone 13 pro')").isVisible();
     expect(cartName).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.getByPlaceholder("Select Country").pressSequentially("nep", {delay:100});

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const dropdownCount = await dropdown.locator("button").count();
    

    for(let i =0; i<dropdownCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();

        if(text === " Nepal"){
            await dropdown.locator("button").nth(i).click();
            break;
        }

    }

    await page.locator("text=Place Order").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();

    for(let i=0; i<rowCount; i++){
        const textContent = await rows.nth(i).locator("th").textContent();

        if(orderId.includes(textContent)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetailsId = await page.locator(".col-text").textContent();
    console.log(orderDetailsId);
    expect (orderId.includes(orderDetailsId)).toBeTruthy();

    

    
})