const {test, expect}= require('@playwright/test');
const {Belowfoldrfi} = require('../pageobject/Belowfoldrfi');
const {Abovefoldrfi} = require('../pageobject/Abovefoldrfi');

test.only('asuonlinewithdatacy', async({page})=>{
    // await page.goto("https://asuonline.asu.edu/#asuo-rfi-section");
    // const text= page.locator("[data-cy= 'rfi-degree-type-filter']");
    // const degreeElements = text.locator("ul li");
    // const degreeCount= await degreeElements.count();
    // const interestType = page.locator("[data-cy= 'rfi-interest-area-filter']");
    // const interestElements = interestType.locator("ul li");
    // const interestareaCount = await interestElements.count();
    
    const belowfoldrfi = new Belowfoldrfi(page);
    // await belowfoldrfi.goTo();
    const abovefoldrfi = new Abovefoldrfi(page);
    await abovefoldrfi.goTo();
    await page.waitForTimeout(3000);
    await abovefoldrfi.closeChatBotPopupIfPresent();
    
    
    const degreeCount= await belowfoldrfi.degreeElements.count();
    console.log(degreeCount + " degree count");

    for(let i=0; i<degreeCount; i++){
        // await belowfoldrfi.selectDegreeType(i);
        // await belowfoldrfi.selectInterestArea();
        // await belowfoldrfi.selectProgramType();
        // await belowfoldrfi.continueButton();
        // await belowfoldrfi.firstNameFill("embtest");
        // await belowfoldrfi.lastNameFill('embtest');
        // await belowfoldrfi.emailFill("embtest@asu.edu");
        // await belowfoldrfi.phoneFill('9197211223');
        // await page.pause(3000);
        // await belowfoldrfi.submitForm();

        // await belowfoldrfi.verifyThankYouMessage();
        // await belowfoldrfi.goTo();

        
        // const degreetype= page.locator("[data-cy='rfi-degree-type-filter'] button");
        // await degreetype.waitFor({ state: 'visible', timeout: 25000 });
        // await degreetype.last().click();
             
        // await degreeElements.nth(i).click();
        // console.log(await degreeElements.nth(i).textContent());

    
        // await page.pause(3000);

        // const interestareatype  = page.locator("[data-cy= 'rfi-interest-area-filter'] button");
        // await interestareatype.last().click();
        
        // const interestareaSelected =Math.floor(Math.random() * interestareaCount);
   
        // await interestElements.nth(interestareaSelected).click();
        // console.log(await interestElements.nth(interestareaSelected).textContent());

        

        // const programType = page.locator("[data-cy = 'rfi-program-filter']");
        // const programElements = programType.locator("ul li");
        // const programCount = await programElements.count();

        // console.log(programCount);

        // const programselectedType = page.locator("[data-cy = 'rfi-program-filter'] button");
        // await programselectedType.last().click();
        
        // const programSelected= Math.floor(Math.random() *programCount);
        // console.log(programSelected);
        // await programElements.nth(programSelected).click();
        // console.log(await programElements.nth(programSelected).textContent());

        
        
        // await page.getByRole('button',{name: ' Continue '}).click();
     

        // await page.locator("[data-cy = 'rfi-first-name']").fill("embtest");
        // await page.locator("[data-cy = 'rfi-last-name']").fill('embtest');
        // await page.locator("[data-cy = 'rfi-email']").fill('embtest@asu.edu');
        // await page.locator("[data-cy = 'rfi-phone-number']").fill('9197211223');

        // await page.getByRole('button', {name:' Submit '}).click();
        
        // await expect(page).toHaveTitle("Thanks for Contacting Us | ASU Online");
        // await page.goto("https://asuonline.asu.edu/#asuo-rfi-section");

    }

    for(let i=0; i<3; i++){

       
       
        await abovefoldrfi.selectDegreeType(i);
        
        await abovefoldrfi.selectInterestArea();
       
        await abovefoldrfi.selectProgramType();
      
        await abovefoldrfi.continueButton();
        await abovefoldrfi.firstNameFill("embtest");
        await abovefoldrfi.lastNameFill('embtest');
        await abovefoldrfi.emailFill("embtest@asu.edu");
        await abovefoldrfi.phoneFill('9197211223');
        // await page.pause(3000);
        await abovefoldrfi.submitForm();

        await abovefoldrfi.verifyThankYouMessage();
        await abovefoldrfi.goTo();
    }



})