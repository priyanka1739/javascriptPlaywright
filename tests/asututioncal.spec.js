import {test, expect} from '@playwright/test';
import { link } from 'fs';


test('ASU tuition cal', async({page})=>{
    await page.goto("https://qa.asuonline.asu.edu/what-it-costs");

    const tuitionresident =page.locator("[data-cy = '“tuition-calculator-Resident-dropdown”']");
    const tuitionresidentbutton= tuitionresident.locator("button");
    const tuitionresidentElements = tuitionresident.locator("ul li");
    console.log(await tuitionresident.count());
    await tuitionresidentbutton.click();
    // await page.pause();
    await tuitionresidentElements.nth(1).click();
    console.log(await tuitionresidentElements.nth(1).textContent());

    const tuitionstatus = page.locator("[data-cy='“tuition-calculator-degree-dropdown”']");
    const tuitonstatusbutton= tuitionstatus.locator("button");
    const tuitonstatusElement = tuitionstatus.locator("ul li");
    await tuitonstatusbutton.click();
    await tuitonstatusElement.nth(2).click();
    console.log(await tuitonstatusElement.nth(2).textContent());

    const tuitionprogram = page.locator("[data-cy='“tuition-calculator-program-dropdown”']");
    const tuitionprogrambutton = tuitionprogram.locator("button");
    const tuitonprogramElements = tuitionprogram.locator("ul li");
    await tuitionprogrambutton.click();
    await tuitonprogramElements.nth(1).click();
    console.log(await tuitonprogramElements.nth(1).textContent());
    await tuitionprogram.scrollIntoViewIfNeeded();

    const tuitionyear = page.locator("[data-cy='“tuition-calculator-academic-year-dropdown”']");
    const tuitionyearbutton= tuitionyear.locator("button");
    const tuitionyearElements = tuitionyear.locator("ul li");
    await tuitionyearbutton.click();
    await tuitionyearElements.nth(1).click();
    console.log(await tuitionyearElements.nth(1).textContent());
    await page.locator("[data-cy='tuition-calculator-calculate-button']").click();
    
    
    const delay=  page.locator("#cost-collapse-res-fall-credit-hour-data");
    await delay.waitFor();
    const tutionestimate = await page.locator("h3:has-text('Your tuition estimate')").isVisible();
    expect(tutionestimate).toBeTruthy();

    const academicyear = await page.locator("[data-cy='“tuition-calculator-Academic-year-text”']").textContent();
    // console.log(academicyear);

    const whatitcostacademicyearTotal = await page.locator("[data-cy='tuition-calculator-total-cost']").textContent();
    console.log(whatitcostacademicyearTotal)
  

    await Promise.all([page.waitForNavigation(),page.locator("[data-cy='tuition-calculator-program-link']").click()]);


   
    await page.locator("p:has-text('Quick facts')").waitFor();
    await page.locator("#nav-item-program-cost").click();
    await page.locator("#program-cost").waitFor();
    const tuitionLink = page.locator('#program-cost').getByRole('link', {name : 'Estimate tuition and fees'});

    //modal opens
    await expect(tuitionLink).toBeVisible();
    await tuitionLink.scrollIntoViewIfNeeded();
    await tuitionLink.click();
    const modal = page.getByRole('dialog').filter({hasText: 'Your tuition estimate'});
    await modal.waitFor({state: 'visible'});
    // await page.pause();

    // academic yearDropdown in modal
    const nonresident= modal.getByRole('tab', {name: 'Non-Resident tuition' });
    await nonresident.click();
    const yeardropdown = modal.locator('#calc-academic-year-nores button');
    await yeardropdown.click();   
    const listbox = page.locator('#calc-academic-year-nores_typeahead__listbox');
    await expect(listbox).toBeVisible({ timeout: 10000 });
    await listbox.getByRole('option', { name: '2024-2025' }).click();
        
 

    const degreetuitionamountTotal=await modal.locator("[data-cy='tuition-calculator-total-cost']").textContent();

    console.log(degreetuitionamountTotal);

    expect(whatitcostacademicyearTotal.includes(degreetuitionamountTotal)).toBeTruthy();
})