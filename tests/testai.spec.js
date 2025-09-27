import {test, expect} from '@playwright/test';
import {ai} from '@zerostep/playwright';

test('testing using ai', async({page})=>{
    const aiArg ={test, page};
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const value = await ai("What is the Discount price of tomato",aiArg);
    expect(value).toEqual("26");
})

test.only('testing of hybrid test case', async({page})=>{
    const aiArg ={test, page};
    await page.goto("https://asuonline.asu.edu/");
    // await ai("Click the x button that pops out", aiArg);
    // await ai(" Click on the 'Request Info' button ", aiArg);
    // await page.waitForTimeout(2000);
    // await ai("Click the arrow button in Degree type", aiArg);
    // await ai("In Select the degree type, click Undergraduate ", aiArg);
    // await ai("Go to area od interest section", aiArg);
    // await ai("Click the arrow button in Area of Interest", aiArg);
    // await ai("In Select Area of Interest, Click  Business ", aiArg);
    // await ai("Click the arrow button in Program", aiArg);
    // await ai("In Select Program, Click  Management", aiArg);
    // await ai("Click Continue", aiArg);

     
    await ai("Click on the 'Request Info' button", aiArg);
    await page.waitForTimeout(2000);

    await ai("Click the arrow button in Degree type", aiArg);
    await ai("Select 'Undergraduate' in Degree Type", aiArg);

    await ai("Click the arrow in Area of Interest", aiArg);
    await ai("Choose 'Business' from the list", aiArg);

    await ai("Click the arrow in Program", aiArg);
    await ai("Select 'Management' as the program", aiArg);

    await ai("Click Continue", aiArg);

})