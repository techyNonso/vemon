//const axios = require("axios");
const ourStore = require("../../src/js/store");
const ourStockModel = require("../../models/stockModel");
const modules = require("./modules");

// instantiate classes
const store = new ourStore();
const stockModel = new ourStockModel();

class Stock {
  constructor() {
    this.currentUser = store.getLoginDetail();
  }

  //upload
  uploadStockToRemote(stock, proceedTo) {
    //filter out stocks with remote =  false
    let filteredStock = modules.filterStock(stock);
    //upload these stocks
    if (filteredStock.length > 0) {
      let upload = modules.upload(filteredStock);
    }
    //move on while the task runs asynchronously
    //proceedToStock();
  }

  //handle stocks
  handleStock(proceedTo) {
    //get staff list
    const allStock = stockModel.getStock();
    allStock.then(({ data, headers, status }) => {
      this.uploadStockToRemote(data.rows, proceedTo);
    });
  }
}

module.exports = Stock;
