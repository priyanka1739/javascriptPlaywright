import {test, expect} from '@playwright/test';

function isSelectableOption(text) {
    return Boolean(text) && text !== 'No results found' && !/^Select\b/i.test(text);
}

// ASU renders these typeahead menus asynchronously. These helpers reopen the
// dropdown until real options are available, then select by strategy.
async function clickFirstVisibleOption(page, dropdown) {
    const trigger = dropdown.locator("button");
    const options = dropdown.locator("ul li");
    
    for (let attempt = 0; attempt < 5; attempt++) {
        await trigger.click();
        await page.waitForTimeout(500);

        const optionCount = await options.count();

        for (let i = 0; i < optionCount; i++) {
            const option = options.nth(i);
            const text = ((await option.textContent()) || '').trim();

            if (!isSelectableOption(text)) {
                continue;
            }

            await option.click();
            return text;
        }

        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
    }

    throw new Error('No selectable dropdown options were available.');
}

async function clickOptionByText(page, dropdown, optionPattern) {
    const trigger = dropdown.locator("button");
    const options = dropdown.locator("ul li");

    for (let attempt = 0; attempt < 5; attempt++) {
        await trigger.click();
        await page.waitForTimeout(500);

        const optionCount = await options.count();

        for (let i = 0; i < optionCount; i++) {
            const option = options.nth(i);
            const text = ((await option.textContent()) || '').trim();

            if (!isSelectableOption(text)) {
                continue;
            }

            if (optionPattern.test(text)) {
                await option.click();
                return text;
            }
        }

        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
    }

    throw new Error(`No dropdown option matched ${optionPattern}.`);
}

async function clickOptionByIndex(page, dropdown, index) {
    const trigger = dropdown.locator("button");
    const options = dropdown.locator("ul li");

    for (let attempt = 0; attempt < 5; attempt++) {
        await trigger.click();
        await page.waitForTimeout(500);

        const selectableTexts = [];
        const optionCount = await options.count();

        for (let i = 0; i < optionCount; i++) {
            const option = options.nth(i);
            const text = ((await option.textContent()) || '').trim();

            if (!isSelectableOption(text)) {
                continue;
            }

            selectableTexts.push(text);

            if (selectableTexts.length - 1 === index) {
                await option.click();
                return text;
            }
        }

        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
    }

    throw new Error(`No selectable dropdown option existed at index ${index}.`);
}


test('ASU tuition cal', async({page})=>{
    await page.goto("https://asuonline.asu.edu/what-it-costs",{
    waitUntil: 'domcontentloaded',
  });

    // Build a tuition estimate from the main calculator using the
    // nonresident / undergraduate path.
    const tuitionresident =page.locator("[data-cy = '“tuition-calculator-Resident-dropdown”']");
    console.log(await tuitionresident.count());
    console.log(await clickOptionByText(page, tuitionresident, /nonresident/i));

    const tuitionstatus = page.locator("[data-cy='“tuition-calculator-degree-dropdown”']");
    console.log(await clickOptionByText(page, tuitionstatus, /undergraduate/i));

    const tuitionprogram = page.locator("[data-cy='“tuition-calculator-program-dropdown”']");
    console.log(await clickFirstVisibleOption(page, tuitionprogram));
    await tuitionprogram.scrollIntoViewIfNeeded();

    const tuitionyear = page.locator("[data-cy='“tuition-calculator-academic-year-dropdown”']");
    console.log(await clickOptionByIndex(page, tuitionyear, 1));
    await page.locator("[data-cy='tuition-calculator-calculate-button']").click();
    
    // Wait for the calculator result area to render before reading totals.
    const delay=  page.locator("#cost-collapse-res-fall-credit-hour-data");
    await delay.waitFor();
    const tutionestimate = await page.locator("h3:has-text('Your tuition estimate')").isVisible();
    expect(tutionestimate).toBeTruthy();

    const academicyear = await page.locator("[data-cy='“tuition-calculator-Academic-year-text”']").textContent();
    // console.log(academicyear);

    const whatitcostacademicyearTotal = await page.locator("[data-cy='tuition-calculator-total-cost']").textContent();
    console.log(whatitcostacademicyearTotal)
  
    // Follow the calculator's program link so the same program can be checked
    // from the degree page modal.
    await Promise.all([page.waitForNavigation({
    waitUntil: 'domcontentloaded',
  }),page.locator("[data-cy='tuition-calculator-program-link']").click()]);


   
    await page.locator("p:has-text('Quick facts')").waitFor();
    await page.locator("#nav-item-program-cost").click();
    await page.locator("#program-cost").waitFor();
    const tuitionLink = page.locator('#program-cost').getByRole('link', {name : 'Estimate tuition and fees'});

    // Open the degree-page tuition modal and keep the residency path aligned
    // with the main calculator selection above.
    await expect(tuitionLink).toBeVisible();
    await tuitionLink.scrollIntoViewIfNeeded();
    await tuitionLink.click();
    const modal = page.getByRole('dialog').filter({hasText: 'Your tuition estimate'});
    await modal.waitFor({state: 'visible'});

    const nonResident = modal.getByRole('tab', {name: 'Non-Resident tuition', exact: true });
    await nonResident.click();

    const nonResidentSlider = modal
  .getByLabel('Non-Resident tuition', { exact: true })
  .getByRole('slider', { name: /select number of credit hours/i });

    // The slider is a custom widget, so direct DOM events are more reliable
    // than typing for setting the credit-hour value.
    await nonResidentSlider.evaluate((el) => {
    el.value = '6';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    });    
    
    const yeardropdown = modal.locator('#calc-academic-year-nores button');
    await yeardropdown.click();   
    const listbox = page.locator('#calc-academic-year-nores_typeahead__listbox');
    await expect(listbox).toBeVisible({ timeout: 10000 });

    await listbox.getByRole('option', { name: '2025-2026' }).click();
 

    const degreetuitionamountTotal=await modal.locator("[data-cy='tuition-calculator-total-cost']").last().textContent();

    console.log(degreetuitionamountTotal);

    // The degree-page modal should agree with the total previously shown in
    // the main tuition calculator for the same selection path.
    expect(whatitcostacademicyearTotal.includes(degreetuitionamountTotal)).toBeTruthy();
})
