---
# Project Setup Guide
---

## Pre-requisites
* Install Node.js to your machine
* Install a Text Editor that supports Javascript like VS Code

## Setup project
* Clone repository to your local machine
* Navigate to root path of the project and run command `npm install` in terminal. This should install all dependencies to execute tests

## Test runner
* Navigate to root path of the project and run command `npm test`

## HTML report
* Go to Project root directory: `./playwright-report/index.html`
* Also run command `npx playwright show-report` to get the report

## Project Structure
* Page Object Modeling has been used. Location to page object go to: `pages` folder
* Before all tests, it navigates to base url which is OrangeHRM and logins to system

## Scenarios

```bash
Scenario 1: Create a new employee and verify if created successfully
Description: User navigates to PIM page, deletes if the employee with the same name has already been created, adds new employee
and verifies if created successfully

Testname: TC_01_Add new employee
```

```bash
Scenario 2: Another scenario for negative test has been added
Description: Normally system does not allow to create a new employee with an existing employee id
In this test scenario, a new employee is being tried to add with an existing employee id and checked
if it shows the warning message and not allow to add employee

Testname: TC_02_Negative test to check if new employee with the same id can not be created
```