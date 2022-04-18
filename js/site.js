// get the loans from the page
function getValues() {

    // step1 get values from the page
    let loanAmt = Number(document.getElementById("loanAmount").value);
    let loanTerm = parseInt(document.getElementById("loanPayment").value);
    let intRate = parseFloat(document.getElementById("loanRate").value);

    // check for NAN
    if (isNaN(loanAmt)) {
        alert("Enter Valid Loan Amount! It CANNOT be a CAT!");
        document.getElementById("loanAmt").focus();
    } else if (isNaN(loanTerm)) {
        alert("Enter a Payment Term! Enter the number of months you will take to pay back this loan.");
        document.getElementById("loanTerm").focus();
    } else if (isNaN(intRate)) {
        alert("Enter a valid loan percentage rate. Must be a valid number.");
        document.getElementById("intRate").focus();
    } else {
        alert("Values are correct.");
        let newRate = calcRate(intRate);

        let lpayment = calculatePayment(loanAmt, newRate, loanTerm);

        let paymentsched = buildSchedule(loanAmt, newRate, loanTerm, lpayment);

        displayData(paymentsched, loanAmt, lpayment);
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
        }

        payments.push(curPayObj);
    }

    return payments;
}


// display the table of payments add the summary info at the top of page
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

// helper functions
function calculatePayment(loanAmt, intRate, loanTerm) {
    let payment3 = 0;

    payment3 = (loanAmt * intRate) / (1 - Math.pow(1 + intRate, -loanTerm));


    return payment3;
}

// calculate the rate for the loan
function calcRate(rate) {
    return rate = rate / 1200;
}

// calculate 
function calcInterest(balance, intRate) {
    return balance * intRate;
}