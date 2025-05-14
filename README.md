# TestRail Sync Extension

A Visual Studio Code extension that enables seamless synchronization between your codebase unit tests and TestRail test cases. Version 0.0.1.

## Features

### Main Commands

- `Sync Test Cases`: Synchronize test cases between your local codebase and TestRail with a simple right-click
- `Settings`: Configure your TestRail integration settings through an intuitive interface

### Interface Integration

- Access TestRail Sync through the editor context menu
- Access TestRail Sync through the explorer context menu
- Dedicated submenu for all TestRail Sync operations

## Configuration Settings

### API Settings

- `testRailSync.api.organizationUrl`: Set the base URL for your TestRail instance (e.g., https://yourcompany.testrail.com/index.php?)
- `testRailSync.api.username`: Your TestRail login username
- `testRailSync.api.key`: Your TestRail API key for authentication
- `testRailSync.api.projectId`: The ID of your TestRail project

### Test Case Settings

- `testRailSync.testCase.section_id`: Default section ID for test cases
- `testRailSync.testCase.suite_id`: Default suite ID for test cases
- `testRailSync.testCase.template_id`: Template type for test cases
- `testRailSync.testCase.type_id`: Type of test case
- `testRailSync.testCase.priority_id`: Priority level of test cases
- `testRailSync.testCase.custom_manual_vs_automated`: Test case automation status
- `testRailSync.testCase.custom_manual_automated`: Type of automation
- `testRailSync.testCase.custom_automation_tool_type`: Automation tool used
- `testRailSync.testCase.custom_test_level`: Level of testing

### Test Case Settings Options

#### template_id

| Value | Description         |
| ----- | ------------------- |
| 0     | Exploratory Charter |
| 1     | Test Case           |
| 2     | UniTest / WebIR     |

#### type_id

| Value | Description      |
| ----- | ---------------- |
| 0     | API Postman      |
| 1     | API Unit Test    |
| 2     | Autify ETE Test  |
| 3     | Automated        |
| 4     | Client Unit Test |
| 5     | Database Test    |
| 6     | DBT Test         |
| 7     | E2E Test         |
| 8     | Exploratory      |
| 9     | Functionality    |
| 10    | Glue Unit Test   |
| 11    | Integration Test |
| 12    | Manual           |
| 13    | Other            |
| 14    | Sanity Test      |
| 15    | Smoke Test       |
| 16    | Unit Test        |

#### priority_id

| Value | Description      |
| ----- | ---------------- |
| 0     | 1 - Don't Test   |
| 1     | 2 - Test If Time |
| 2     | 3 - MustTest     |

#### custom_manual_vs_automated

| Value | Description |
| ----- | ----------- |
| 0     | None        |
| 1     | Manual      |
| 3     | Automated   |

#### custom_manual_automated

| Value | Description                             |
| ----- | --------------------------------------- |
| 0     | None                                    |
| 1     | Manual                                  |
| 2     | Under ENG development (manually tested) |
| 3     | E2E ENG Automated Test                  |
| 4     | Unit Test                               |
| 5     | Autify Automated                        |
| 6     | Postman API Automated                   |
| 7     | Selenium Automated                      |
| 8     | Older Tests                             |
| 9     | Nightwatch Automated                    |
| 10    | Playwright Automated                    |
| 11    | Synthetic Test                          |
| 12    | Smoke Test                              |

#### custom_automation_tool_type

| Value | Description |
| ----- | ----------- |
| 0     | None        |
| 1     | Jest        |
| 2     | Autify      |
| 3     | Nightwatch  |
| 4     | Cypress     |
| 5     | Selenium    |
| 6     | Mocha       |
| 7     | Playwright  |
| 8     | Postman     |
| 9     | Manual      |
| 10    | DataDog     |
| 11    | XUnit       |
| 12    | Q4DataLib   |
| 13    | Airflow     |

#### custom_test_level

| Value | Description                 |
| ----- | --------------------------- |
| 0     | None                        |
| 1     | Unit test                   |
| 2     | Integration test            |
| 3     | Exploratory test            |
| 4     | Regression test             |
| 5     | Smoke test                  |
| 6     | Sanity Post-deployment test |
| 7     | Functionality test          |
| 8     | Smoke &amp; Regression Test |
| 9     | Sanity Test                 |

## Development

1. Run `npm run compile`
2. Press F5 to start debugging
3. Right click on your file and select the option TestRail sync on the context menu

### Requirements

- Visual Studio Code ^1.98.0
- Node.js

### Available Scripts

- `npm run compile`: Build the extension
- `npm run watch`: Watch mode for development
- `npm run package`: Package for production with source maps hidden
- `npm run lint`: Run ESLint on TypeScript and TSX files
- `npm run format`: Format code using Prettier
- `npm test`: Run extension tests

### Tech Stack

- TypeScript/React for the extension
- Material-UI components
- Webpack for bundling
- ESLint and Prettier for code quality
