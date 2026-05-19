# Playwright Certification

This repository contains Playwright automation tests created for certification practice using the LambdaTest/TestMu AI Selenium Playground demo pages.

## Project Overview

The test suite covers common web automation scenarios:

- Simple form input validation
- Input form submission with browser validation
- Range slider interaction and result verification

## Tech Stack

- Node.js
- Playwright Test
- JavaScript
- GitHub Actions

## Project Structure

```text
.
├── .github/workflows/playwright.yml
├── tests/
│   ├── inputFormSubmit.spec.js
│   ├── simpleFormDemo.spec.js
│   └── sliderDemo.spec.js
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests only on Chromium:

```bash
npx playwright test --project=chromium
```

Run tests only on Firefox:

```bash
npx playwright test --project=firefox
```

Run a specific test file:

```bash
npx playwright test tests/simpleFormDemo.spec.js --project=chromium
```

## Reports and Debugging

Open the HTML report:

```bash
npx playwright show-report
```

View a trace after a failed test:

```bash
npx playwright show-trace path/to/trace.zip
```

## GitHub Actions

The workflow file is located at:

```text
.github/workflows/playwright.yml
```

It can be used to run Playwright tests automatically in CI when code is pushed to GitHub.

## Notes

Generated files such as `node_modules`, `playwright-report`, and `test-results` are ignored through `.gitignore` and should not be committed.
