const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator("[name=username]");
        this.passwordField = page.locator("[name=password]");
        this.submitButton = page.locator("[type=submit]");
        this.mainMenu = page.locator("[class=oxd-main-menu]");
        this.username = "Admin";
        this.password = "admin123";
    }

    /**
     * Navigate to OrangeHRM page
     */
    async navigateTo() {
        await this.page.goto('/');
        await expect(this.page).toHaveTitle('OrangeHRM');
    }

    /**
     * Login to system
     */
    async loginSuccessfully() {
        await this.usernameField.type(this.username);
        await this.passwordField.type(this.password);
        await this.submitButton.click(this.submitButton);
        await expect(this.mainMenu).toBeVisible();
    }
}