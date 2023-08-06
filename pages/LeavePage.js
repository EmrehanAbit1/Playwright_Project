const { expect } = require('@playwright/test');

exports.LeavePage = class LeavePage {
    constructor(page) {
        this.page = page;
    }

    async navigateToEmployeeEntitlements() {
        await this.page.waitForSelector("//*[text()='Leave']");
        await this.page.locator("//*[text()='Leave']").click();
        await this.page.waitForSelector("//*[text()='Entitlements ']");
        await this.page.locator("//*[text()='Entitlements ']").click();
        await this.page.locator("//*[text()='Employee Entitlements']").click();
    }

    async createNewEntitlement() {
        await this.page.locator("//*[text()=' Add ']").click();
        await this.page.getByPlaceholder('Type for hints...').fill('Emre Abit');
        await this.page.getByRole('option', { name: 'Emre Abit' }).click();
        await this.page.locator('form i').first().click();
        await this.page.getByRole('option', { name: 'US - Vacation' }).click();
        await this.page.getByRole('textbox').nth(2).fill('20');
        await this.page.locator("[type=submit]").click();
        await this.page.locator("//*[text()=' Confirm ']").click();
    }

    async assignNewLeave() {
        await this.page.locator("//*[text()='Assign Leave']").click();
        await this.page.getByPlaceholder('Type for hints...').fill('Emre Abit');
        await this.page.getByRole('option', { name: 'Emre Abit' }).click();
        await this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
        await this.page.getByRole('option', { name: 'US - Vacation' }).click();
        await this.page.locator('form i').nth(2).click();
        await this.page.getByText('21').click();
        await this.page.locator('form i').nth(3).click();
        await this.page.getByText('25').click();
        await this.page.locator("(//*[@class='oxd-select-text--after'])[2]").click();
        await this.page.getByRole('option', { name: 'All Days' }).click();
        await this.page.locator("(//*[@class='oxd-select-text--after'])[3]").click();
        await this.page.getByRole('option', { name: 'Half Day - Afternoon' }).click();
        await this.page.locator('textarea').fill('This Leave is for testing purposes');
        await this.page.locator("[type=submit]").click();
        await this.page.waitForTimeout(1000);
    }

    async checkIfLeaveCreatedSuccessfully() {
        await this.page.locator("//*[text()='Leave List']").click();
        await this.page.getByPlaceholder('Type for hints...').fill('Emre Abit');
        await this.page.getByRole('option', { name: 'Emre Abit' }).click();
        await this.page.locator("(//*[@class='oxd-select-text--after'])[1]").click();
        await this.page.getByRole('option', { name: 'Scheduled' }).click();
        await this.page.locator("[type=submit]").click();
        await this.page.getByText('Emre Abit').first().isVisible();
    }
}