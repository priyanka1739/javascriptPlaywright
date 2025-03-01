import {test, expect} from '@playwright/test';


test('access', async({page})=>{
 
    
    await page.getByRole('button', {name:"Log In to Sandbox"}).click();
    await page.locator("[title ='Service Console']").waitFor();
    await page.locator("[title ='Reports']").click();


});
