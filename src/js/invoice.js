/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

//globale variables
var invoices;

var debtClearanceInvoice =
  '<h4 class="text-center" id="debtCompanyName"></h4>' +
  '<div class="text-center mt-2" id="debtCompanyAddress"></div>' +
  '<div class="text-center mt-2" id="debtCompanyNumber"></div>' +
  '<div class="text-center mt-2" id="debtClearanceDate"></div>' +
  '<h5 class="text-center mt-2">Debt Clearance</h5>' +
  '<div class="border border-bottom-0 border-right-0 border-left-0">' +
  ' <table class="table table-borderless table-sm mt-3">' +
  " <tr>" +
  " <td>" +
  "       <strong>For:</strong>" +
  "      </td>" +
  '      <td id="clearedFor"></td>' +
  "   </tr>" +
  "    <tr>" +
  "      <td>" +
  "        <strong>Sub Total:</strong>" +
  "      </td>" +
  '     <td id="clearedTotal"></td>' +
  "    </tr>" +
  "   <tr>" +
  "     <td>" +
  "       <strong>Paid:</strong>" +
  "     </td>" +
  '     <td id="clearedPaid"></td>' +
  "   </tr>" +
  "   <tr>" +
  "     <td>" +
  "       <strong>Total Paid:</strong>" +
  "     </td>" +
  '     <td id="clearedTotalPaid"></td>' +
  "   </tr>" +
  "   <tr>" +
  "     <td>" +
  "       <strong>Balance:</strong>" +
  "     </td>" +
  '     <td id="clearedBal"></td>' +
  "   </tr>" +
  " </table>" +
  ' <div class="border border-right-0 border-left-0 text-center">' +
  "  <h5>Thank You</h5>" +
  " </div>" +
  "</div>";

//debt payment template
var debtForm =
  '<form action="form">' +
  '<div class=" alert alert-danger hide" id="errorModalBox"></div>' +
  '<div class=" alert alert-success hide" id="successModalBox"></div>' +
  '<label for="amt">Total Amount:</label>' +
  "<div" +
  '  class="border border-success border-top-0 border-right-0 border-left-0 "' +
  ">" +
  " <input" +
  '  type="text"' +
  "  readonly" +
  '  value=""' +
  '  class="form-control border-success border-top-0 border-right-0 border-left-0 border-bottom-0 bg-light"' +
  '  id="amt"' +
  " />" +
  "</div>" +
  '<label for="paid" class="pt-3">Paid:</label>' +
  "<div" +
  '  class="border border-success border-top-0 border-right-0 border-left-0 "' +
  ">" +
  "  <input" +
  '   type="text"' +
  "   readonly" +
  '   value=""' +
  '   class="form-control border-success border-top-0 border-right-0 border-left-0 border-bottom-0 bg-light"' +
  '   id="paid"' +
  " />" +
  "</div>" +
  '<label for="balance" class="pt-3">Balance:</label>' +
  "<div" +
  ' class="border border-success border-top-0 border-right-0 border-left-0 "' +
  ">" +
  " <input" +
  '   type="text"' +
  "    readonly" +
  '  value=""' +
  '  class="form-control border-success border-top-0 border-right-0 border-left-0 border-bottom-0 bg-light"' +
  '  id="invoiceClearBalance"' +
  " />" +
  "</div>" +
  '<label for="paying" class="pt-3">Paying:</label>' +
  "<div" +
  ' class="border border-success border-top-0 border-right-0 border-left-0 "' +
  ">" +
  "<input" +
  '  type="text"' +
  '  placeholder="enter amount being paid"' +
  '  class="form-control border-success border-top-0 border-right-0 border-left-0 border-bottom-0 bg-light"' +
  '  id="paying"' +
  " />" +
  '<input type="hidden" id="invoiceHidden"/>' +
  "</div>" +
  "</form>";

var invoiceOtherTemplate =
  '<h4 class="text-center" id="companyStaticName"></h4>' +
  '<div class="text-center mt-2" id="companyStaticAddress"></div>' +
  '<div class="text-center mt-2" id="companyStaticNumber"></div>' +
  '<h5 class="text-center mt-2" id="transTypeStatic"></h5>' +
  "<div>" +
  '  <table class="table table-borderless table-sm mt-3">' +
  "   <tr>" +
  "     <td>" +
  "       <strong>Invoice Id:</strong>" +
  "    </td>" +
  '    <td id="invoiceId"></td>' +
  "  </tr>" +
  "  <tr>" +
  "  <td>" +
  "    <strong>Date:</strong>" +
  "  </td>" +
  '  <td id="date"></td>' +
  " </tr>" +
  "</table>" +
  "</div>" +
  '<div class="border border-dark"></div>' +
  "<div>" +
  ' <table class="table  table-borderless table-sm mt-3">' +
  "<thead" +
  ' class="border border-dark border-top-0 border-left-0 border-right-0"' +
  ">" +
  "  <tr>" +
  "   <th>" +
  "    ITEM" +
  "   </th>" +
  "<th>" +
  "    QTY" +
  "  </th>" +
  "  <th>" +
  "    Price" +
  "  </th>" +
  " </tr>" +
  " </thead>" +
  " <tbody" +
  ' class="border border-dark border-top-0 border-left-0 border-right-0"' +
  ' id="purchase"' +
  "  ></tbody>" +
  '<tfoot class="pt-3">' +
  " <tr>" +
  "   <th>Sub Total</th>" +
  "   <td></td>" +
  '  <td><stong id="invoiceTotal"></stong></td>' +
  " </tr>" +
  " <tr>" +
  "  <th>Disccount</th>" +
  "  <td></td>" +
  '  <td id="disccountStatic"></td>' +
  "</tr>" +
  " <tr>" +
  "   <th>Net Price</th>" +
  "   <td></td>" +
  '  <td id="netPriceStatic"></td>' +
  " </tr>" +
  " <tr>" +
  "   <th>Amount Paid</th>" +
  "   <td></td>" +
  '   <td id="invoiceAmtPaid"></td>' +
  " </tr>" +
  " <tr>" +
  "  <th>Balance</th>" +
  "  <td></td>" +
  '  <td id="invoiceBalance">0</td>' +
  " </tr>" +
  "</tfoot>" +
  " </table>" +
  "<div" +
  '  class="border border-right-0 border-left-0 text-center pt-3 pb-3"' +
  ">" +
  "  <strong>THANK YOU</strong>" +
  "</div>" +
  "</div>";

//get all invoices for the mathching date
const getInvoices = (day, month, year) => {
  //get sales if sales have been defined
  let match = invoiceModel.getMatchInvoices(invoices, day, month, year);

  //display sales date
  document.getElementById("dispDate").textContent =
    day + "-" + month + "-" + year;
  if (match != false) {
    displayMatchInvoices(match);

    //get total sales on display
    /* addUpOtherDispSalesMoney(match, saleType);

    //get average disccount
    getOtherAverageDisccount(match, saleType);

    //get balance
    getOtherBalance(match, saleType);*/
  } else {
    document.getElementById("invoicesList").innerHTML =
      " <tr>" +
      ' <td colspan="7" class="text-center">' +
      "  <span>No sales found</span>" +
      " </td>" +
      " </tr>";

    // allSummaryHandle(saleType);
  }
};

//get other invoices for the mathching date
const getOtherInvoices = (day, month, year, invoiceType) => {
  //get sales if sales have been defined
  let match = invoiceModel.getOtherMatchInvoices(
    invoices,
    day,
    month,
    year,
    invoiceType
  );

  //show display date
  document.getElementById("dispDate").textContent =
    day + "-" + month + "-" + year;

  if (match != false) {
    if (invoiceType == "cleared") {
      //display cleared invoices
      displayClearedMatchInvoices(match);
    } else {
      //display debt invoices
      displayDebtMatchInvoices(match);
    }

    //get total sales on display
    /* addUpOtherDispSalesMoney(match, saleType);

    //get average disccount
    getOtherAverageDisccount(match, saleType);

    //get balance
    getOtherBalance(match, saleType);*/
  } else {
    if (invoiceType == "cleared") {
      document.getElementById("invoicesList").innerHTML =
        " <tr>" +
        ' <td colspan="7" class="text-center">' +
        "  <span>No sales found</span>" +
        " </td>" +
        " </tr>";
    } else {
      document.getElementById("invoicesList").innerHTML =
        " <tr>" +
        ' <td colspan="8" class="text-center">' +
        "  <span>No sales found</span>" +
        " </td>" +
        " </tr>";
    }

    // allSummaryHandle(saleType);
  }
};

//load current invoices page
const loadCurrentInvoices = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  //get all invoices
  let myInvoices = invoiceModel.getAllInvoices();
  myInvoices.then(({ data, headers, status }) => {
    invoices = data.rows;
    //get all invoices for the mathching date
    getInvoices(day, month, year);

    //enable button
    document.getElementById("processBtn").disabled = false;
  });

  document.getElementById("invoiceDay").value = day;
  document.getElementById("invoiceMonth").value = month;
  document.getElementById("invoiceYear").value = year;
};

//load other invoices page
const loadOtherInvoices = invoiceType => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  //get all invoices
  let myInvoices = invoiceModel.getAllInvoices();
  myInvoices.then(({ data, headers, status }) => {
    invoices = data.rows;
    //get other invoices for the mathching date
    getOtherInvoices(day, month, year, invoiceType);

    //enable button
    document.getElementById("processBtn").disabled = false;
  });

  document.getElementById("otherInvoiceDay").value = day;
  document.getElementById("otherInvoiceMonth").value = month;
  document.getElementById("otherInvoiceYear").value = year;
};

//process invoice for date entered
const loadInvoices = e => {
  e.preventDefault();

  document.getElementById("invoicesList").innerHTML =
    "<tr>" +
    '<td colspan="5" class="text-center" >' +
    '<div class="spinner-grow text-success"></div>' +
    "</td>" +
    "</tr>";

  let day = document.getElementById("invoiceDay").value;
  let month = document.getElementById("invoiceMonth").value;
  let year = document.getElementById("invoiceYear").value;

  //get all invoices for the mathching date
  getInvoices(day, month, year);
};

//process other  invoice for date entered
const loadOtherEnteredInvoices = (e, invoiceType) => {
  e.preventDefault();

  document.getElementById("invoicesList").innerHTML =
    "<tr>" +
    '<td colspan="5" class="text-center" >' +
    '<div class="spinner-grow text-success"></div>' +
    "</td>" +
    "</tr>";

  let day = document.getElementById("otherInvoiceDay").value;
  let month = document.getElementById("otherInvoiceMonth").value;
  let year = document.getElementById("otherInvoiceYear").value;

  //get other invoices for the mathching date
  getOtherInvoices(day, month, year, invoiceType);
};

//invoice view button
const viewInvoice = (e, invoiceId, saleDate, invoiceType) => {
  //get details about this invoice
  let matchingInvoice = invoiceModel.getSelectedInvoice(invoices, invoiceId);
  let selectedInvoice = matchingInvoice[0];

  let salesLoader = salesModel.getSales();
  salesLoader.then(({ data, headers, status }) => {
    let sales = data.rows;

    //get match sales
    let matchedSales = invoiceModel.getSalesForInvoice(sales, invoiceId);
    //display and print invoice
    if (showStaticModal(invoiceOtherTemplate)) {
      if (invoiceType == "all") {
        //load purchase  invoice for all sales
        displaySalesInvoice(matchedSales);
      } else if (invoiceType == "cleared") {
        //load purchase invoice for cleared sales
        displayClearedSalesInvoice(matchedSales);
      } else {
        //load purchase invoice for debt sales
        displayDebtSalesInvoice(matchedSales);
      }
      //get info from DOM
      //let saleDate = document.getElementById("dispDate").textContent;

      //add to DOM
      let { detail } = store.getSetupDetail();
      document.getElementById("companyStaticName").textContent =
        detail[0].value.companyName;
      document.getElementById("companyStaticAddress").textContent =
        detail[0].value.branchAddress;
      document.getElementById("companyStaticNumber").textContent =
        detail[0].value.branchPhone;
      document.getElementById("transTypeStatic").textContent =
        "CREDIT TRANSACTION";
      document.getElementById("date").textContent = saleDate;
      document.getElementById("invoiceId").textContent = invoiceId;
      document.getElementById("invoiceTotal").textContent = formatMoney(
        selectedInvoice.value.totalPrice
      );
      document.getElementById("disccountStatic").textContent =
        selectedInvoice.value.disccount + " %";
      document.getElementById("netPriceStatic").textContent = formatMoney(
        selectedInvoice.value.netPrice
      );
      document.getElementById("invoiceAmtPaid").textContent = formatMoney(
        selectedInvoice.value.amtPaid
      );
      document.getElementById("invoiceBalance").textContent = formatMoney(
        selectedInvoice.value.balance
      );
    }
  });
};

//click clear button
const clearInvoice = (e, id) => {
  //show modal
  let debtModal = showDebtForm(debtForm, "form");
  if (debtModal) {
    //get details for the invoice
    let invoiceDetail = invoiceModel.getSelectedInvoice(invoices, id);
    let detail = invoiceDetail[0];
    document.getElementById("amt").value = detail.value.netPrice;
    document.getElementById("paid").value = detail.value.amtPaid;
    document.getElementById("invoiceClearBalance").value = detail.value.balance;
    document.getElementById("clearProcessBtn").dataset.id = id;
  }
};

//update invoices array
const invoiceUpdator = (invoices, newBalance, newAmtPaid, detail) => {
  invoices.forEach(invoice => {
    if (invoice.value.invoiceId == detail.value.invoiceId) {
      invoice.value.balance = newBalance;
      invoice.value.amtPaid = newAmtPaid;
    }
  });
  return invoices;
};

//process debt payment
const processDebtPayment = e => {
  e.preventDefault();
  //hide alert boxes
  let errorBox = document.getElementById("errorModalBox");
  let successBox = document.getElementById("successModalBox");
  if (!errorBox.classList.contains("hide")) {
    errorBox.classList.add("hide");
  }

  if (!successBox.classList.contains("hide")) {
    successBox.classList.add("hide");
  }
  let invoiceId = document.getElementById("clearProcessBtn").dataset.id;
  let amtEntered = document.getElementById("paying").value;

  //get detils for the invoice
  let invoiceDetail = invoiceModel.getSelectedInvoice(invoices, invoiceId);

  let myInvoiceDetail = invoiceDetail[0];

  let regex = /[0-9]/;
  if (!regex.test(amtEntered)) {
    errorBox.classList.remove("hide");
    errorBox.textContent = "Please enter a valid input";
  } else if (amtEntered > Number(myInvoiceDetail.value.balance)) {
    errorBox.classList.remove("hide");
    errorBox.textContent = "Amount entered exceeds balance";
  } else {
    //get new paid amount
    let newAmtPaid = Number(myInvoiceDetail.value.amtPaid) + Number(amtEntered);
    //get new balance
    let newBalance =
      Number(myInvoiceDetail.value.netPrice) - Number(newAmtPaid);
    //update invoice in db
    let invoiceUpdate = invoiceModel.updateInvoice(
      myInvoiceDetail,
      newBalance,
      newAmtPaid
    );
    invoiceUpdate.then(({ data, headers, status }) => {
      if (status == 201) {
        let idGen = invoiceModel.generateId();
        idGen.then(ids => {
          let id = ids[0];
          //store in debtClearance database
          let insertClearance = invoiceModel.insertClearanceDetails(
            id,
            amtEntered,
            invoiceId
          );

          insertClearance.then(({ data, headers, status }) => {
            if (status == 201) {
              //show Debt invoice
              if (showDebtForm(debtClearanceInvoice, "invoice")) {
                //get company detials
                let { detail } = store.getSetupDetail();

                //get detials for the invoice
                let getDetail = invoiceModel.getSelectedInvoice(
                  invoices,
                  invoiceId
                );
                let currentInvoice = getDetail[0];

                //generate Date
                let date = new Date();
                let clearanceDay = date.getDate();
                let clearanceMonth = date.getMonth() + 1;
                let clearanceYear = date.getFullYear();

                // fill in invoice detail to the DOM
                document.getElementById("debtCompanyName").textContent =
                  detail[0].value.companyName;
                document.getElementById("debtCompanyAddress").textContent =
                  detail[0].value.branchAddress;
                document.getElementById("debtCompanyNumber").textContent =
                  detail[0].value.companyNumber;
                document.getElementById("clearedFor").textContent = invoiceId;
                document.getElementById("clearedTotal").textContent =
                  "₦ " + formatMoney(currentInvoice.value.netPrice);
                document.getElementById("clearedPaid").textContent =
                  "₦ " + formatMoney(amtEntered);
                document.getElementById("clearedTotalPaid").textContent =
                  "₦ " + formatMoney(newAmtPaid);
                document.getElementById("clearedBal").textContent =
                  "₦ " + formatMoney(newBalance);
                document.getElementById("debtClearanceDate").textContent =
                  clearanceDay + "-" + clearanceMonth + "-" + clearanceYear;
                //display success
                /* successBox.classList.remove("hide");
                successBox.textContent = "Transaction successfull";*/

                document.getElementById("invoicesList").innerHTML =
                  "<tr>" +
                  '<td colspan="8" class="text-center" >' +
                  '<div class="spinner-grow text-success"></div>' +
                  "</td>" +
                  "</tr>";

                let day = document.getElementById("otherInvoiceDay").value;
                let month = document.getElementById("otherInvoiceMonth").value;
                let year = document.getElementById("otherInvoiceYear").value;
                //update invoices
                invoices = invoiceUpdator(
                  invoices,
                  newBalance,
                  newAmtPaid,
                  myInvoiceDetail
                );

                //get other invoices for the mathching date
                getOtherInvoices(day, month, year, "debt");
              }
            }
          });
        });
      }
    });
  }

  //hideDebtModal();
};

//function for handeling invoice search
const processInvoiceSearch = (e, invoiceType) => {
  let searchValue = e.target.value.trim();

  //if no input was provided
  if (!searchValue.length == 0) {
    //fetch the invoice
    let matchingInvoices = invoiceModel.getMatchingInvoice(
      searchValue,
      invoices,
      invoiceType
    );

    if (matchingInvoices != false) {
      //show display date
      document.getElementById("dispDate").textContent = "all date";

      if (invoiceType == "cleared") {
        //display cleared invoices
        displayClearedMatchInvoices(matchingInvoices);
      } else if (invoiceType == "debt") {
        //display debt invoices
        displayDebtMatchInvoices(matchingInvoices);
      } else {
        displayMatchInvoices(matchingInvoices);
      }
    } else {
      //display no record found
      if (invoiceType == "cleared" || invoiceType == "all") {
        document.getElementById("invoicesList").innerHTML =
          " <tr>" +
          ' <td colspan="7" class="text-center">' +
          "  <span>No sales found</span>" +
          " </td>" +
          " </tr>";
      } else {
        document.getElementById("invoicesList").innerHTML =
          " <tr>" +
          ' <td colspan="8" class="text-center">' +
          "  <span>No sales found</span>" +
          " </td>" +
          " </tr>";
      }
    }
  } else {
    //click process button
    document.getElementById("processBtn").click();
  }
};
