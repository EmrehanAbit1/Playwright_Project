const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
const { LeavePage } = require('../pages/LeavePage');

test.describe('Add employee in PIM and check if added successfully', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.loginSuccessfully();
  });

  test('TC_01_Add new employee', async ({ page }) => {
    const pimPage = new PIMPage(page);
    await pimPage.navigateToPIMPage();
    await pimPage.deleteIfEmployeeExists();
    await pimPage.addNewEmployee();
    await pimPage.verifyIfEmployeeCreatedSuccessfully();
  });

  test('TC_02_Negative test to check if new employee with the same id can not be created', async ({ page }) => {
    const pimPage = new PIMPage(page);
    await pimPage.verifyIfNewEmployeeWithSameIdCannotBeCreated();
  })

  test('TC_03_Assign leave to employee', async ({ page }) => {
    const pimPage = new PIMPage(page);
    const leavePage = new LeavePage(page);
    await leavePage.navigateToEmployeeEntitlements();
    await pimPage.searchForEmployee()
    await leavePage.createNewEntitlement();
    await leavePage.assignNewLeave();
    await leavePage.checkIfLeaveCreatedSuccessfully();
  })
});
