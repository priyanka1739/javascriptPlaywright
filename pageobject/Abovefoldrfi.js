
const { expect } = require("@playwright/test");
class Abovefoldrfi{

    constructor(page){
        this.page =page;
        this.degreeType = page.locator("[data-cy='rfi-degree-type-filter']");
        this.degreeTypeButton = page.locator("[data-cy='rfi-degree-type-filter'] button");
        this.degreeElements =page.locator("[data-cy='rfi-degree-type-filter'] ul li");
        this.interestArea = page.locator("[data-cy='rfi-interest-area-filter']").nth(0);
        this.interestAreaButton = page.locator("[data-cy='rfi-interest-area-filter'] button").first();
        this.interestElements = this.interestArea.locator(" ul li");
        this.programType = page.locator("[data-cy='rfi-program-filter']").nth(0);
        this.programTypeButton = page.locator("[data-cy='rfi-program-filter'] button").first();
        this.programElements = this.programType.locator ("ul li");
    
       
    }

    async goTo(){
        await  this.page.goto("https://asuonline.asu.edu/students/courses/#asuo-rfi-section", { timeout: 90000, waitUntil: 'domcontentloaded' });
    }

    async selectDegreeType(index){
        // await this.degreeTypeButton.waitFor({ state: 'visible', timeout: 25000 });
        await this.degreeTypeButton.first().click({force: true});
        await this.degreeElements.nth(index).click();
        console.log(await this.degreeElements.nth(index).textContent());
    }

    async selectInterestArea(){
        const interestAreaCount = await this.interestElements.count();
        const interestAreaSelected = Math.floor(Math.random() * interestAreaCount);
        const targetElement = this.interestElements.nth(interestAreaSelected);

        
        await this.interestAreaButton.waitFor({ state: 'visible', timeout: 25000 });
        await this.interestAreaButton.click({force: true});

        // await expect(targetElement).toBeVisible({ timeout: 25000 });
        // await targetElement.scrollIntoViewIfNeeded();
        // aw[[[[[ait expect(targetElement).toBeVisible({ timeout: 5000 });

        await this.interestElements.nth(interestAreaSelected).click();
        console.log(await targetElement.textContent());
        
    }

    async selectProgramType(){
        const programCount = await this.programElements.count();
        const programSelected = Math.floor(Math.random() * programCount);
        const targetElement1 = this.programElements.nth(programSelected);

        await this.programTypeButton.waitFor({ state: 'visible', timeout: 25000 });
        await this.programTypeButton.click({force: true});
        // await this.programElements.nth(programSelected).scrollIntoViewIfNeeded();
        await this.programElements.nth(programSelected).click();
        console.log(await targetElement1.textContent());
        
    }

    async continueButton(){
        await this.page.locator("[data-cy='rfi-continue-button']").first().click();

    }

    async firstNameFill(firstname){
        await this.page.locator("[data-cy = 'rfi-first-name']").first().fill(firstname);
    }

    async lastNameFill(lastname){
        await this.page.locator("[data-cy = 'rfi-last-name']").first().fill(lastname);
    }

    async emailFill(email){
        await this.page.locator("[data-cy = 'rfi-email']").first().fill(email);
    }

    async phoneFill(phone){
        await this.page.locator("[data-cy = 'rfi-phone-number']").first().fill(phone);
    }

    async submitForm(){
        await this.page.locator("[data-cy='rfi-submit-button']").first().click();
    }

    async verifyThankYouMessage(){
        // const thankYouMessage = await this.page.locator("[data-cy='rfi-thank-you-message']").textContent();
        // return thankYouMessage.includes("Thank you for your interest in ASU Online");
        await expect(this.page).toHaveTitle("Thanks for Contacting Us | ASU Online");
        // await this.page.goto("https://asuonline.asu.edu/#asuo-rfi-section");
    }

    async closeChatBotPopupIfPresent() {
        const chatCloseBtn = this.page.locator('#insync-chat-preview-module-container-cross-icon');
      
        try {
          if (await chatCloseBtn.isVisible({ timeout: 5000 })) {
            console.log("💬 Chat popup detected. Attempting to close...");
            await chatCloseBtn.click({ timeout: 5000 });
            console.log("✅ Chat popup closed.");
          } else {
            console.log("ℹ️ Chat popup not visible.");
          }
        } catch (error) {
          console.log("⚠️ Chat popup not found or already closed. Continuing...");
        }
      }


}

module.exports = {Abovefoldrfi};