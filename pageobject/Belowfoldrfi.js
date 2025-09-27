// const constant = require("../util/constant");
const { expect } = require("@playwright/test");
class Belowfoldrfi{
    
    
    constructor(page){
        this.page =page;
        this.degreeType = page.locator("[data-cy='rfi-degree-type-filter']");
        this.degreeTypeButton = page.locator("[data-cy='rfi-degree-type-filter'] button");
        this.degreeElements =page.locator("[data-cy='rfi-degree-type-filter'] ul li");
        this.interestArea = page.locator("[data-cy='rfi-interest-area-filter']");
        this.interestAreaButton = page.locator("[data-cy='rfi-interest-area-filter'] button");
        this.interestElements = page.locator("[data-cy='rfi-interest-area-filter'] ul li");
        this.programType = page.locator("[data-cy='rfi-program-filter']");
        this.programTypeButton = page.locator("[data-cy='rfi-program-filter'] button");
        this.programElements = page.locator("[data-cy='rfi-program-filter'] ul li");
       
    }

    async goTo(){
        await  this.page.goto("https://asuonline.asu.edu/#asuo-rfi-section");
    }

    async selectDegreeType(index){
        // await this.degreeTypeButton.waitFor({ state: 'visible', timeout: 25000 });
        await this.degreeTypeButton.last().click({force: true});
        await this.degreeElements.nth(index).click();
        console.log(await this.degreeElements.nth(index).textContent());
    }
    async selectInterestArea(){
        const interestAreaCount = await this.interestElements.count();
        const interestAreaSelected = Math.floor(Math.random() * interestAreaCount);

        await this.interestAreaButton.last().click();
        await this.interestElements.nth(interestAreaSelected).click();
        console.log(await this.interestElements.nth(interestAreaSelected).textContent());
        
    }

    async selectProgramType(){
        const programCount = await this.programElements.count();
        const programSelected = Math.floor(Math.random() * programCount);

        await this.programTypeButton.last().click();
        await this.programElements.nth(programSelected).click();
        console.log(await this.programElements.nth(programSelected).textContent());
        
    }

    async continueButton(){
        await this.page.getByRole('button',{name: ' Continue '}).click();

    }

    async firstNameFill(firstname){
        await this.page.locator("[data-cy = 'rfi-first-name']").fill(firstname);
    }

    async lastNameFill(lastname){
        await this.page.locator("[data-cy = 'rfi-last-name']").fill(lastname);
    }

    async emailFill(email){
        await this.page.locator("[data-cy = 'rfi-email']").fill(email);
    }

    async phoneFill(phone){
        await this.page.locator("[data-cy = 'rfi-phone-number']").fill(phone);
    }

    async submitForm(){
        await this.page.getByRole('button',{name: ' Submit '}).click();
    }

    async verifyThankYouMessage(){
        // const thankYouMessage = await this.page.locator("[data-cy='rfi-thank-you-message']").textContent();
        // return thankYouMessage.includes("Thank you for your interest in ASU Online");
        await expect(this.page).toHaveTitle("Thanks for Contacting Us | ASU Online");
        // await this.page.goto("https://asuonline.asu.edu/#asuo-rfi-section");
    }



}
module.exports={Belowfoldrfi};