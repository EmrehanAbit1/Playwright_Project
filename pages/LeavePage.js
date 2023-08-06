const { expect } = require('@playwright/test');

exports.LeavePage = class LeavePage {
    constructor(page) {
        this.page = page;
        this.waitForLeavePage = page.waitForSelector("//*[text()='Leave']");
        this.leaveTab = page.locator("//*[text()='Leave']");
        this.waitForentitlementsPage = page.waitForSelector("//*[text()='Entitlements ']");
        this.entitlementsTab = page.locator("//*[text()='Entitlements ']");
        this.employeeEntitlementTab = page.locator("//*[text()='Employee Entitlements']");
        this.addButton = page.locator("//*[text()=' Add ']");
        this.nameLastNameField = page.getByPlaceholder('Type for hints...');
        this.entitlementField = page.getByRole('textbox').nth(2);
        this.submitButton = page.locator("[type=submit]");
        this.confirmButton = page.locator("//*[text()=' Confirm ']");
        this.assignLeaveTab = page.locator("//*[text()='Assign Leave']");
        this.firstDropDown = page.locator('div').filter({ hasText: /^-- Select --$/ });
        this.firstDate = page.getByText('21');
        this.secondDate = page.getByText('25');
        this.leaveResultDropDown = page.locator("(//*[@class='oxd-select-text--after'])[1]");
        this.partialDayDropDown = page.locator("(//*[@class='oxd-select-text--after'])[2]");
        this.durationDropDown = page.locator("(//*[@class='oxd-select-text--after'])[3]");
        this.commentField = page.locator('textarea');
        this.checkNameField = page.getByText('Emre Abit');
        this.leaveListTab = "//*[text()='Leave List']";
        this.nameAndLastName = 'Emre Abit';
        this.vacationType = 'US - Vacation';
        this.dayTypeAllDay = 'All Days';
        this.dayTypeHalfDay = 'Half Day - Afternoon';
        this.numOfLeaveDays = '20';
        this.commentMessage = 'This Leave is for testing purposes';
        this.leaveResultType = 'Scheduled';
    }

    /**
     * Navigating to Entitlement tab
     */
    async navigateToEmployeeEntitlements() {
        await this.waitForLeavePage;
        await this.leaveTab.click();
        await this.waitForLeavePage;
        await this.entitlementsTab.click();
        await this.employeeEntitlementTab.click();
    }

    /**
     * Element to click on fields
     * @param {string} name attribute value
     */
    async clickOnFieldComplementary(name) {
        await this.page.getByRole('option', { name: name }).click();
    }

    /**
     * Element to click on forms
     * @param {int} num 
     */
    async clickOnForm(num) {
        await this.page.locator('form i').nth(num).click();
    }

    /**
     * Creating new entitlement to get leave days
     */
    async createNewEntitlement() {
        await this.addButton.click();
        await this.nameLastNameField.type(this.nameAndLastName);
        await this.clickOnFieldComplementary(this.nameAndLastName);
        await this.clickOnForm(0);
        await this.clickOnFieldComplementary(this.vacationType);
        await this.entitlementField.type(this.numOfLeaveDays);
        await this.submitButton.click();
        await this.confirmButton.click();
    }

    /**
     * Assigning new leave for the employee
     */
    async assignNewLeave() {
        await this.assignLeaveTab.click();
        await this.nameLastNameField.type(this.nameAndLastName);
        await this.clickOnFieldComplementary(this.nameAndLastName);
        await this.firstDropDown.nth(2).click();
        await this.clickOnFieldComplementary(this.vacationType);
        await this.clickOnForm(2);
        await this.firstDate.click();
        await this.page.waitForTimeout(200);
        await this.clickOnForm(3);
        await this.secondDate.click();
        await this.partialDayDropDown.click();
        await this.clickOnFieldComplementary(this.dayTypeAllDay);
        await this.durationDropDown.click();
        await this.clickOnFieldComplementary(this.dayTypeHalfDay);
        await this.commentField.type(this.commentMessage);
        await this.submitButton.click();
        await this.page.waitForTimeout(200);
    }

    /**
     * Check if leave has been created successfully
     */
    async checkIfLeaveCreatedSuccessfully() {
        await this.page.locator(this.leaveListTab).click();
        await this.nameLastNameField.type(this.nameAndLastName);
        await this.clickOnFieldComplementary(this.nameAndLastName);
        await this.leaveResultDropDown.click();
        await this.clickOnFieldComplementary(this.leaveResultType);
        await this.submitButton.click();
        await this.checkNameField.first().isVisible();
    }
}