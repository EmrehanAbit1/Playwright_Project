const { expect } = require('@playwright/test');

exports.PIMPage = class PIMPage {
    constructor(page) {
        this.page = page;
        this.waitFormenuPIM = page.waitForSelector("//*[text()='PIM']");
        this.menuPIM = page.locator("//*[text()='PIM']");
        this.addEmployeeButton = page.locator("//*[text()='Add Employee']");
        this.firstNameField = page.locator("[name=firstName]");
        this.lastNameField = page.locator("[name=lastName]");
        this.submitButton = page.locator("[type=submit]");
        this.employeeListTab = page.locator("//*[text()='Employee List']");
        this.employeeNameField = page.getByPlaceholder("Type for hints...");
        this.employeeList = page.locator("[class='oxd-table-cell oxd-padding-cell']");
        this.employeeInDeleteList = page.getByRole('cell', { name: 'Emre' });
        this.employeeIdField = page.locator('form').getByRole('textbox');
        this.idExistsWarningMessage = page.getByText('Employee Id already exists');
        this.waitForSubmitButton = page.waitForSelector("[type=submit]");
        this.checkboxInEMployeeList = page.locator("//*[@class='oxd-icon bi-check oxd-checkbox-input-icon']");
        this.deleteEmpButton = page.locator("//*[text()=' Delete Selected ']");
        this.deleteConfirmButton = page.locator("//*[text()=' Yes, Delete ']");
        this.waitForCellValues = page.waitForSelector("[class='oxd-table-body']");
        this.empName = "Emre";
        this.empLastName = "Abit";
    }

    /**
     * Navigating to PIM page in menu
     */
    async navigateToPIMPage() {
        await this.waitFormenuPIM;
        await this.menuPIM.click();
    }

    async deleteIfEmployeeExists() {
        await this.searchForEmployee();
        if (await this.employeeInDeleteList.first().isVisible()) {
            await this.checkboxInEMployeeList.nth(0).click();
            await this.deleteEmpButton.click();
            await this.deleteConfirmButton.click();
        }
    }

    /**
     * Adding new employee by filling name and surname fields
     */
    async addNewEmployee() {
        await this.addEmployeeButton.click();
        await this.firstNameField.type(this.empName);
        await this.lastNameField.type(this.empLastName);
        await this.submitButton.click();
    }

    /**
     * Search for employee in employee list page. This function created to prevent code repeat.
     */
    async searchForEmployee() {
        await this.employeeListTab.click();
        await this.employeeNameField.first().fill("");
        await this.employeeNameField.first().type(this.empName + " " + this.empLastName);
        await this.waitForSubmitButton;
        await this.submitButton.click();
        await this.waitForCellValues;
    }

    /**
     * Check if employee created successfully
     */
    async verifyIfEmployeeCreatedSuccessfully() {
        await this.searchForEmployee();
        await expect(this.employeeList.nth(2)).toHaveText(this.empName)
    }

    /**
     * Get employee id to use in negative test case
     * @returns employee id string
     */
    async getEmployeeId() {
        await this.searchForEmployee();
        var employeeId = await this.employeeList.nth(1).innerText();
        return employeeId;
    }

    /**
     * Negative test case to check if it confirms that new employee with the same id can not be created
     * Elements like getByRole are taken from Recording option because it was much stable to do so.
     */
    async verifyIfNewEmployeeWithSameIdCannotBeCreated() {
        await this.navigateToPIMPage();
        const employeeId = await this.getEmployeeId();
        await this.addEmployeeButton.click();
        await this.employeeIdField.nth(4).click();
        await this.employeeIdField.nth(4).fill("");
        await this.employeeIdField.nth(4).type(employeeId);
        await expect(this.idExistsWarningMessage).toBeVisible();
    }
}