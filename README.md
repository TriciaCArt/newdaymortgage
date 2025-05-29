# New Day Mortgage Test Suite

## Overview
This repository contains comprehensive testing materials for the New Day Mortgage calculator application. The tests focus on verifying the JavaScript functionality, including unit tests for individual functions and integration tests for the complete application flow.

## Included Files

1. **newdaymortgage.test.js** - The main Jest test file containing:
   - Unit tests for calculation functions
   - Integration tests for full application flow
   - Edge case tests for boundary conditions

2. **test-setup.md** - Documentation on how to set up and run the tests.

3. **run-tests.sh** - A bash script to automate the test setup and execution.

4. **test-results-example.md** - Example of expected test results and coverage.

5. **code-improvements.md** - Suggestions for improving the calculator code for better reliability, maintainability, and user experience.

## How to Use

1. Start by reading `test-setup.md` to understand how to set up the testing environment.
2. Run the tests manually or use the `run-tests.sh` script to automate the setup and test execution.
3. Review the test results and compare with `test-results-example.md`.
4. Consider implementing the suggestions in `code-improvements.md` to improve the application.

## Key Test Areas

1. **Core Calculation Accuracy**
   - Monthly payment calculation
   - Amortization schedule generation
   - Interest and principal calculations

2. **Input Validation**
   - Handling invalid numeric inputs
   - Proper error message display

3. **Edge Cases**
   - Zero interest loans
   - Very high interest rates
   - Very long-term loans
   - Single payment loans

## Requirements

- Node.js (v12 or higher)
- npm or yarn
- Jest testing framework

## Running the Tests

After extracting the archive or cloning the repo, navigate to the project root folder:

```bash
cd newdaymortgage_B
```

### Automated (via script)

```bash
./run-tests.sh
```

### Manual via npm

Initialize and install dependencies:

```bash
npm init -y
npm install --save-dev jest jest-environment-jsdom
```

Ensure your `package.json` includes:

```json
"scripts": {
  "test": "jest --env=jsdom"
}
```

Run the tests:

```bash
npm test
```

### Using a globally installed Jest

If you have Jest installed globally:

```bash
cd newdaymortgage_B
jest
```

Jest will automatically discover and run all `*.test.js` files in the `tests/` directory.
