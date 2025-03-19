import { test, expect } from '@playwright/test';


test('access', async ({ page }) => {

    // https://www.saucedemo.com/
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");

    await page.locator("#login-button").click();
    await page.locator(".inventory_item").nth(1).waitFor();

    const orderName = "Sauce Labs Backpack";
    const inventory = page.locator(".inventory_item");
    const textInventory = inventory.locator(".inventory_item_name");

    for (let i = 0; i < await inventory.count(); i++) {
        if (orderName === await textInventory.nth(i).textContent()) {
            await inventory.locator("#add-to-cart-sauce-labs-backpack").nth(i).click();
            break;

        }
    }
    await page.locator("#shopping_cart_container").click();
    
    await page.locator(".cart_item").waitFor();
    
    await page.getByText("Sauce Labs Backpack").isVisible();
    
    await page.getByRole('button', {name: "Checkout"}).click();
    // console.log(textInventory);

    await page.locator("#first-name").fill('student');
    await page.locator("#last-name").fill('usa');
    await page.locator("#postal-code").fill('23452');
    await page.pause();
    await page.getByRole('button', {name:"Continue"}).click();

    await page.locator("#finish").click();
    await expect(page.getByText("Thank you for your order!")).toBeVisible();

});


test.only('Invalid credential', async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("abc");
    await page.locator("#password").fill("abc");
    await page.locator("#login-button").click();
    await page.pause();
    await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username and password do not match any user in this service");
})
