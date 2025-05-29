# New Day Mortgage Integration Test Suite

This document explains the test suite that has been created for the New Day Mortgage application, how to set it up, and what it covers.

## Overview

The test suite (`newdaymortgage.test.js`) covers both unit tests and integration tests for the mortgage calculator application. It tests the individual functions as well as the end-to-end flow, including various edge cases.

## Test Setup

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Create a new directory for testing:
```
mkdir newdaymortgage-tests
cd newdaymortgage-tests
```

2. Initialize a new npm project:
```
npm init -y
```

3. Install Jest and required dependencies:
```
npm install --save-dev jest jest-environment-jsdom
```

4. Copy the test file to your project:
```
cp /path/to/newdaymortgage.test.js ./
```

5. Add the following to your `package.json`:
```json
{
  "scripts": {
    "test": "jest --env=jsdom"
  },
  "jest": {
    "testEnvironment": "jsdom"
  }
}
```

### Running the Tests

```
npm test
```

## What the Tests Cover

### Unit Tests

- `calcRate`: Tests conversion from annual percentage rate to monthly decimal rate
- `calcInterest`: Tests calculation of monthly interest
- `calculatePayment`: Tests calculation of monthly loan payment
- `buildSchedule`: Tests generation of complete payment schedule

### Integration Tests

- Full end-to-end calculation workflow from input to display
- Verification of payment calculations with standard loan scenarios
- Validation that UI elements are updated correctly

### Edge Cases

- Invalid inputs (non-numeric values)
- Zero interest rate loans
- Very high interest rates
- Extremely long loan terms
- Single payment loans

## How to Modify the Tests

If you need to modify the test to match changes in the application:

1. Update the mock DOM structure in the test file to match any HTML changes
2. Adjust the expected values in the test assertions to match new calculation methodologies
3. Add additional tests for new features or edge cases

## Test Structure

- Mock DOM setup at the top
- Function implementations copied from the original site.js
- Unit tests focusing on individual functions
- Integration tests focusing on the whole application flow
- Edge case tests for boundary conditions

## Notes for Further Development

1. This test suite assumes the DOM structure of the application remains consistent. If the HTML structure changes, the mock DOM and test assertions may need to be updated.

2. For a more robust testing setup in a production environment, consider:
   - Setting up a proper module system to import functions directly
   - Using a tool like webpack to bundle your code for testing
   - Implementing a more sophisticated DOM mocking solution

3. Additional tests that could be added:
   - Accessibility testing
   - UI event testing (clicks, form submission)
   - Performance testing for large loan calculations
