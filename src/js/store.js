const store = require("electron-store");

class Store {
  constructor() {
    //declare schema
    const schema = {
      loginDetails: {
        type: "object"
      },
      recordedProducts: {
        type: "object"
      },
      records: {
        type: "object"
      }
    };
    //instantiate store
    this.store = new store({ schema });
  }

  forceLogout() {
    this.store.set("loginDetails", {
      loginStatus: false
    });
  }

  getLoginDetail() {
    return this.store.get("loginDetails");
  }

  getRecordStore() {
    return this.store.get("recordedProducts");
  }

  getSaleStore() {
    return this.store.get("records");
  }

  setUserData(user) {
    this.store.set("loginDetails", {
      loginStatus: true,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      position: user.position,
      image: user.image,
      access: user.access,
      docId: user.id
    });

    return true;
  }

  setRecordStore(recordedProduct) {
    this.store.set("recordedProducts", {
      record: recordedProduct
    });
  }

  setSaleStore(record) {
    this.store.set("records", {
      record: record
    });
  }
}

module.exports = Store;
