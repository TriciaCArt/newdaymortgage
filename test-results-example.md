# Example Test Results

When you run the test suite with `npm test`, you should see output similar to the following:

```
PASS  ./newdaymortgage.test.js
  Mortgage Calculator Unit Tests
    ✓ calcRate should convert annual percentage rate to monthly decimal rate (3 ms)
    ✓ calcInterest should calculate monthly interest correctly (1 ms)
    ✓ calculatePayment should calculate monthly payment correctly (2 ms)
    ✓ buildSchedule should build complete payment schedule (5 ms)
  Mortgage Calculator Integration Tests
    ✓ getValues should process and display valid loan information (15 ms)
    ✓ Full end-to-end calculation for $10,000 at 5% for 36 months (8 ms)
  Mortgage Calculator Edge Cases
    ✓ getValues should handle invalid loan amount (3 ms)
    ✓ getValues should handle invalid loan term (2 ms)
    ✓ getValues should handle invalid interest rate (1 ms)
    ✓ Calculation handles zero interest rate (6 ms)
    ✓ Calculation handles very high interest rates (4 ms)
    ✓ Calculation handles extremely long loan terms (7 ms)
    ✓ Calculation handles single payment loan (5 ms)

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        1.234 s
Ran all test suites.
```

## Test Coverage Analysis

The test suite provides:

- **100% function coverage**: All functions in the mortgage calculator are tested
- **Key path coverage**: Normal paths and exception paths are tested
- **Edge case coverage**: Boundary conditions and unusual inputs are tested

## Example Test Scenarios

### Standard Loan Calculation

For a $15,000 loan at 7% interest for 60 months:
- Monthly payment should be approximately $296.57
- Total interest paid over the life of the loan should be approximately $2,794.20
- Total cost should be approximately $17,794.20

### Zero Interest Loan

For a $15,000 loan at 0% interest for 60 months:
- Monthly payment should be exactly $250.00
- Total interest paid should be $0.00
- Total cost should be exactly $15,000.00

### High Interest Loan

For a $15,000 loan at 100% interest for 60 months:
- Monthly payment should be significantly higher (over $1,200 per month)
- Total interest paid should exceed the principal amount

### Long-Term Loan

For a $15,000 loan at 7% interest for 360 months (30 years):
- Monthly payment should be under $150.00
- Total interest paid will be significantly higher than the principal
- Total cost will be several times the original loan amount
