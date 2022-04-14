// get the loans from the page
function getValues() {

    // step1 get values from the page
    let loanAmt = document.getElementById("loanAmount").value;
    let loanPay = document.getElementById("loanPayment").value;
    let intRate = document.getElementById("loanRate").value;


    // step 2 calculate the payments
    function calculatePayment() {
        let interestRate = intRate / 1200;

        let lengthOfLoan = 12 * loanPay;

        let payAmt = (loanAmt * interestRate) / (1 - (Math.pow((1 + interestRate), lengthOfLoan * -1)));

    }

    // call buildschedule
    let payments = buildSchedule(amount, rate, term, payment);

    // call display data
    displayData(payments, ...arguments);

}

function buildSchedule() {
    let payments = [calculatePayment()];

    let curPayment = {
        month: 0,
        payment: 0,
        principal: 0,
        interest: 0,
        totalInterest: 0,
        balance: 0,
    }

    // return an array of payment objects
    return payments;
}

// display the table of payments add the summary info at the top of page
function displayData() {
    let template = document.getElementById("paymentCalculation-template");
    let payBody = document.getElementById("payCalcBody");
    payCalcBody.innerHTML = "";

    for (let index = 0; index < payments.length; index++) {
        let paymentRows = document.importNode(template.content, true);

        let paymentCols = paymentRows.querySelectorAll("td");
        paymentCols[0].textContent = payments[index].month;
        paymentCols[1].textContent = payments[index].payment;
        paymentCols[2].textContent = payments[index].principal;
        paymentCols[3].textContent = payments[index].interest;
        paymentCols[4].textContent = payments[index].totalInterest;
        paymentCols[5].textContent = payments[index].balance;

    }
}