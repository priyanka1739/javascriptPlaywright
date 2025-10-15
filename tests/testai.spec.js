import {test, expect} from '@playwright/test';
import {ai} from '@zerostep/playwright';
import { abort } from 'process';

test('testing using ai', async({page})=>{
    const aiArg ={test, page};
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const value = await ai("What is the Discount price of tomato",aiArg);
    expect(value).toEqual("26");
})

test.only ('testing of hybrid test case', async({page})=>{
    
    await page.goto("https://asuonline.asu.edu/");
   
    const aiArg ={test, page};
    await ai("Close the banner", aiArg);
  
    await ai("Click on the 'Request Info' ", aiArg);
   
    await ai("Select 'Undergraduate' in Degree Type dropdown", aiArg);


    await ai("Select 'Business' in Area of Interest dropdown", aiArg);


    await ai("Select 'Management' in Program dropdown", aiArg);
    
  
    await ai("Click on Continue", aiArg);
  
    // await ai("Enter 'Embtest' in the First name", aiArg);
    // await ai("Enter 'Embtest' in the Last name", aiArg);
    // await ai("Enter 'embtest@asu.edu' in the Email", aiArg);
    // await ai("Enter '9192342232' in the Phone number", aiArg);
    // await ai ("Click on Submit", aiArg);

})