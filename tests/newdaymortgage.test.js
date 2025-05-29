/**
 * New Day Mortgage Integration Tests
 * This file contains both unit and integration tests for the mortgage calculator application
 */

// Mock DOM elements
document.body.innerHTML = `
<input id="loanAmount" value="15000">
<input id="loanPayment" value="60">
<input id="loanRate" value="7">
<input id="loanAmt" hidden>
<input id="loanTerm" hidden>
<input id="intRate" hidden>
<button id="btnSubmit">Calculate</button>
<div id="payment">$250.00</div>
<div id="totPrincipal">$0.00</div>
<div id="totInt">$0.00</div>
<div id="totCost">$0.00</div>
<table><tbody id="payCalcBody"></tbody></table>
<template id="paymentCalculation-template">
  <tr>
    <td data-id="paymentMonth"></td>
    <td data-id="paymentAmount"></td>
    <td data-id="paymentPrincipal"></td>
    <td data-id="paymentInterest"></td>
    <td data-id="totalInterest"></td>
    <td data-id="balance"></td>
  </tr>
</template>
`;

// Mock alerts
global.alert = jest.fn();

// Import functions directly from site.js (simulated here since we can't import directly)
// In a real testing environment, these would be imported or copied from the actual source
function getValues() {
  // step1 get values from the page
  let loanAmt = Number(document.getElementById("loanAmount").value);
  let loanTerm = parseInt(document.getElementById("loanPayment").value);
  let intRate = parseFloat(document.getElementById("loanRate").value);

  // check for NAN
  if (isNaN(loanAmt)) {
    alert("Enter Valid Loan Amount! It CANNOT be a CAT!");
    document.getElementById("loanAmt").focus();
    return false;
  } else if (isNaN(loanTerm)) {
    alert("Enter a Payment Term! Enter the number of months you will take to pay back this loan.");
    document.getElementById("loanTerm").focus();
    return false;
  } else if (isNaN(intRate)) {
    alert("Enter a valid loan percentage rate. Must be a valid number.");
    document.getElementById("intRate").focus();
    return false;
  } else {
    alert("Values are correct.");
    let newRate = calcRate(intRate);

    let lpayment = calculatePayment(loanAmt, newRate, loanTerm);

    let paymentsched = buildSchedule(loanAmt, newRate, loanTerm, lpayment);

    displayData(paymentsched, loanAmt, lpayment);
    return true;
  }
}

function buildSchedule(loanAmt, rate, loanTerm, lpayment) {
  let payments = [];

  let balance = loanAmt;
  let totInt = 0;
  let monthlyInterest = 0;
  let monthlyPrincipal = 0;

  for (let month = 1; month <= loanTerm; month++) {
    monthlyInterest = calcInterest(balance, rate);
    totInt += monthlyInterest;
    monthlyPrincipal = lpayment - monthlyInterest;
    balance = balance - monthlyPrincipal;

    let curPayObj = {
      month: month,
      payment: lpayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      totalInterest: totInt,
      balance: balance
    };

    payments.push(curPayObj);
  }

  return payments;
}

function displayData(paymentsched, loanAmt, lpayment) {
  let tableBody = document.getElementById("payCalcBody");
  let template = document.getElementById("paymentCalculation-template");

  tableBody.innerHTML = "";

  for (let index = 0; index < paymentsched.length; index++) {
    // clone the template
    let paymentRow = document.importNode(template.content, true);
    // get an array of objects
    let paymentCols = paymentRow.querySelectorAll("td");

    paymentCols[0].textContent = paymentsched[index].month;
    paymentCols[1].textContent = paymentsched[index].payment.toFixed(2);
    paymentCols[2].textContent = paymentsched[index].principal.toFixed(2);
    paymentCols[3].textContent = paymentsched[index].interest.toFixed(2);
    paymentCols[4].textContent = paymentsched[index].totalInterest.toFixed(2);
    paymentCols[5].textContent = paymentsched[index].balance.toFixed(2);

    tableBody.appendChild(paymentRow);
  }

  document.getElementById("payment").innerHTML = Number(lpayment).toLocaleString("en-us", {
    style: "currency",
    currency: "USD"
  });
  document.getElementById("totPrincipal").innerHTML = Number(loanAmt).toLocaleString("en-us", {
    style: "currency",
    currency: "USD"
  });
  let totInt = paymentsched[paymentsched.length - 1].totalInterest;
  document.getElementById("totInt").innerHTML = Number(totInt).toLocaleString("en-us", {
    style: "currency",
    currency: "USD"
  });
  document.getElementById("totCost").innerHTML = Number(loanAmt + totInt).toLocaleString("en-us", {
    style: "currency",
    currency: "USD"
  });
}

function calculatePayment(loanAmt, intRate, loanTerm) {
  // Special-case zero interest loans
  if (intRate === 0) {
    return loanAmt / loanTerm;
  }
  let payment3 = 0;
  payment3 = (loanAmt * intRate) / (1 - Math.pow(1 + intRate, -loanTerm));
  return payment3;
}

function calcRate(rate) {
  return rate = rate / 1200;
}

function calcInterest(balance, intRate) {
  return balance * intRate;
}

// Mock the importNode method
document.importNode = jest.fn((content, deep) => {
  const template = document.createElement('tr');
  for (let i = 0; i < 6; i++) {
    const td = document.createElement('td');
    template.appendChild(td);
  }
  return template;
});

// Add a beforeEach to rebuild the DOM before each test
beforeEach(() => {
  document.body.innerHTML = `
    <input id="loanAmount" value="15000">
    <input id="loanPayment" value="60">
    <input id="loanRate" value="7">
    <input id="loanAmt" hidden>
    <input id="loanTerm" hidden>
    <input id="intRate" hidden>
    <button id="btnSubmit">Calculate</button>
    <div id="payment">$250.00</div>
    <div id="totPrincipal">$0.00</div>
    <div id="totInt">$0.00</div>
    <div id="totCost">$0.00</div>
    <table><tbody id="payCalcBody"></tbody></table>
    <template id="paymentCalculation-template">
      <tr>
        <td data-id="paymentMonth"></td>
        <td data-id="paymentAmount"></td>
        <td data-id="paymentPrincipal"></td>
        <td data-id="paymentInterest"></td>
        <td data-id="totalInterest"></td>
        <td data-id="balance"></td>
      </tr>
    </template>
  `;
});

// Unit Tests
describe('Mortgage Calculator Unit Tests', () => {
  
  // Rebuild the DOM and reset mocks before each unit test
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <input id="loanAmount" value="15000">
      <input id="loanAmt" hidden>
      <input id="loanPayment" value="60">
      <input id="loanTerm" hidden>
      <input id="loanRate" value="7">
      <input id="intRate" hidden>
      <button id="btnSubmit">Calculate</button>
      <div id="payment">$250.00</div>
      <div id="totPrincipal">$0.00</div>
      <div id="totInt">$0.00</div>
      <div id="totCost">$0.00</div>
      <table><tbody id="payCalcBody"></tbody></table>
      <template id="paymentCalculation-template">
        <tr>
          <td data-id="paymentMonth"></td>
          <td data-id="paymentAmount"></td>
          <td data-id="paymentPrincipal"></td>
          <td data-id="paymentInterest"></td>
          <td data-id="totalInterest"></td>
          <td data-id="balance"></td>
        </tr>
      </template>
    `;
  });

  test('calcRate should convert annual percentage rate to monthly decimal rate', () => {
    expect(calcRate(6)).toBeCloseTo(0.005);
    expect(calcRate(12)).toBeCloseTo(0.01);
    expect(calcRate(0)).toEqual(0);
  });

  test('calcInterest should calculate monthly interest correctly', () => {
    expect(calcInterest(10000, 0.005)).toEqual(50);
    expect(calcInterest(0, 0.005)).toEqual(0);
  });

  test('calculatePayment should calculate monthly payment correctly', () => {
    // $15,000 loan at 5% annual rate (0.00417 monthly) for 60 months should be ~$283.07
    const payment = calculatePayment(15000, 0.00417, 60);
    expect(payment).toBeCloseTo(283.07, 1);
  });

  test('buildSchedule should build complete payment schedule', () => {
    const rate = 0.00417; // 5%/12
    const term = 12; // 1 year
    const amount = 3000;
    const payment = calculatePayment(amount, rate, term);
    
    const schedule = buildSchedule(amount, rate, term, payment);
    
    // Should have 12 entries
    expect(schedule.length).toBe(12);
    
    // First month should have full loan amount
    expect(schedule[0].month).toBe(1);
    expect(schedule[0].payment).toBeCloseTo(payment);
    expect(schedule[0].interest).toBeCloseTo(12.51, 1); // 3000 * 0.00417
    
    // Verify running total of interest is tracked
    let runningInterest = 0;
    for (let i = 0; i < schedule.length; i++) {
      runningInterest += schedule[i].interest;
      expect(schedule[i].totalInterest).toBeCloseTo(runningInterest, 1);
    }
    
    // Last payment should nearly zero out the balance
    expect(schedule[term-1].balance).toBeCloseTo(0, 0);
  });
});

// Integration Tests
describe('Mortgage Calculator Integration Tests', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <input id="loanAmount" value="15000">
      <input id="loanAmt" hidden>
      <input id="loanPayment" value="60">
      <input id="loanTerm" hidden>
      <input id="loanRate" value="7">
      <input id="intRate" hidden>
      <button id="btnSubmit">Calculate</button>
      <div id="payment">$250.00</div>
      <div id="totPrincipal">$0.00</div>
      <div id="totInt">$0.00</div>
      <div id="totCost">$0.00</div>
      <table><tbody id="payCalcBody"></tbody></table>
      <template id="paymentCalculation-template">
        <tr>
          <td data-id="paymentMonth"></td>
          <td data-id="paymentAmount"></td>
          <td data-id="paymentPrincipal"></td>
          <td data-id="paymentInterest"></td>
          <td data-id="totalInterest"></td>
          <td data-id="balance"></td>
        </tr>
      </template>
    `;
    document.getElementById("payment").innerHTML = '$250.00';
    document.getElementById("totPrincipal").innerHTML = '$0.00';
    document.getElementById("totInt").innerHTML = '$0.00';
    document.getElementById("totCost").innerHTML = '$0.00';
  });

  test('getValues should process and display valid loan information', () => {
    // Run the main function that drives the calculation
    getValues();
    
    // Alert should be called with "Values are correct."
    expect(alert).toHaveBeenCalledWith("Values are correct.");
    
    // UI should be updated with calculation results
    expect(document.getElementById("payment").innerHTML).not.toBe('$250.00');
    expect(document.getElementById("totPrincipal").innerHTML).not.toBe('$0.00');
    expect(document.getElementById("totInt").innerHTML).not.toBe('$0.00');
    expect(document.getElementById("totCost").innerHTML).not.toBe('$0.00');
    
    // Payment should be roughly around $296.57 for a $15000 loan at 7% for 60 months
    const paymentTextContent = document.getElementById("payment").innerHTML;
    const paymentValue = parseFloat(paymentTextContent.replace(/[^0-9.-]+/g, ''));
    expect(paymentValue).toBeCloseTo(296.57, 0);
  });

  test('Full end-to-end calculation for $10,000 at 5% for 36 months', () => {
    // Set input values
    document.getElementById("loanAmount").value = '10000';
    document.getElementById("loanPayment").value = '36';
    document.getElementById("loanRate").value = '5';
    
    // Run calculation
    getValues();
    
    // Get outputs and convert to numbers
    const paymentText = document.getElementById("payment").innerHTML;
    const principalText = document.getElementById("totPrincipal").innerHTML;
    const interestText = document.getElementById("totInt").innerHTML;
    const totalCostText = document.getElementById("totCost").innerHTML;
    
    const payment = parseFloat(paymentText.replace(/[^0-9.-]+/g, ''));
    const principal = parseFloat(principalText.replace(/[^0-9.-]+/g, ''));
    const interest = parseFloat(interestText.replace(/[^0-9.-]+/g, ''));
    const totalCost = parseFloat(totalCostText.replace(/[^0-9.-]+/g, ''));
    
    // Expected values for $10,000 at 5% for 36 months
    expect(payment).toBeCloseTo(299.71, 0);
    expect(principal).toBeCloseTo(10000, 0);
    expect(interest).toBeCloseTo(789.52, 0);
    expect(totalCost).toBeCloseTo(10789.52, 0);
  });
});

// Edge Case Tests
describe('Mortgage Calculator Edge Cases', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <input id="loanAmount" value="15000">
      <input id="loanPayment" value="60">
      <input id="loanRate" value="7">
      <input id="loanAmt" hidden>
      <input id="loanTerm" hidden>
      <input id="intRate" hidden>
      <button id="btnSubmit">Calculate</button>
      <div id="payment">$250.00</div>
      <div id="totPrincipal">$0.00</div>
      <div id="totInt">$0.00</div>
      <div id="totCost">$0.00</div>
      <table><tbody id="payCalcBody"></tbody></table>
      <template id="paymentCalculation-template">
        <tr>
          <td data-id="paymentMonth"></td>
          <td data-id="paymentAmount"></td>
          <td data-id="paymentPrincipal"></td>
          <td data-id="paymentInterest"></td>
          <td data-id="totalInterest"></td>
          <td data-id="balance"></td>
        </tr>
      </template>
    `;
    document.getElementById("loanAmount").value = '15000';
    document.getElementById("loanPayment").value = '60';
    document.getElementById("loanRate").value = '7';
  });

  test('getValues should handle invalid loan amount', () => {
    document.getElementById("loanAmount").value = 'abc';
    getValues();
    expect(alert).toHaveBeenCalledWith("Enter Valid Loan Amount! It CANNOT be a CAT!");
  });

  test('getValues should handle invalid loan term', () => {
    document.getElementById("loanPayment").value = '';
    getValues();
    expect(alert).toHaveBeenCalledWith("Enter a Payment Term! Enter the number of months you will take to pay back this loan.");
  });

  test('getValues should handle invalid interest rate', () => {
    document.getElementById("loanRate").value = '#@!';
    getValues();
    expect(alert).toHaveBeenCalledWith("Enter a valid loan percentage rate. Must be a valid number.");
  });

  test('Calculation handles zero interest rate', () => {
    document.getElementById("loanRate").value = '0';
    getValues();
    
    // For a $15000 loan over 60 months with 0% interest, payment should be exactly $250
    const paymentText = document.getElementById("payment").innerHTML;
    const payment = parseFloat(paymentText.replace(/[^0-9.-]+/g, ''));
    expect(payment).toBeCloseTo(250, 0);
    
    // Interest should be $0
    const interestText = document.getElementById("totInt").innerHTML;
    const interest = parseFloat(interestText.replace(/[^0-9.-]+/g, ''));
    expect(interest).toBeCloseTo(0, 0);
  });

  test('Calculation handles very high interest rates', () => {
    document.getElementById("loanRate").value = '100';
    getValues();
    
    // Interest rate at 100% should result in a very high payment
    const paymentText = document.getElementById("payment").innerHTML;
    const payment = parseFloat(paymentText.replace(/[^0-9.-]+/g, ''));
    expect(payment).toBeGreaterThan(1200); // Significantly higher than normal payments
  });

  test('Calculation handles extremely long loan terms', () => {
    document.getElementById("loanPayment").value = '360'; // 30 years
    getValues();
    
    // For a 30-year mortgage at 7%, payment should be much lower
    const paymentText = document.getElementById("payment").innerHTML;
    const payment = parseFloat(paymentText.replace(/[^0-9.-]+/g, ''));
    expect(payment).toBeLessThan(150); // Should be lower for a longer term
  });

  test('Calculation handles single payment loan', () => {
    document.getElementById("loanPayment").value = '1';
    getValues();
    
    // For a 1-month loan, payment = principal + interest for 1 month
    const paymentText = document.getElementById("payment").innerHTML;
    const principalText = document.getElementById("totPrincipal").innerHTML;
    const interestText = document.getElementById("totInt").innerHTML;
    
    const payment = parseFloat(paymentText.replace(/[^0-9.-]+/g, ''));
    const principal = parseFloat(principalText.replace(/[^0-9.-]+/g, ''));
    const interest = parseFloat(interestText.replace(/[^0-9.-]+/g, ''));
    
    expect(payment).toBeCloseTo(principal + interest, 0);
  });
});
