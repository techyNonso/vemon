/* eslint-disable no-unused-vars */
//import db file
const Database = require("../src/js/db");

class Login extends Database {
  constructor() {
    super();
  }

  getUsers() {
    let viewUrl = this.viewUrl.users;
    return this.couch.get("users", viewUrl);
  }

  filterUsers(users, email, pwd) {
    let match = users.filter(user => {
      return (
        user.value.email == email.value.trim() &&
        user.value.pwd == pwd.value.trim()
      );
    });

    if (match.length > 0) {
      return true;
    }
  }

  checkAccess(users, email) {
    let match = users.filter(user => {
      return (
        user.value.email == email.value.trim() && user.value.access == "open"
      );
    });

    if (match.length > 0) {
      return true;
    }
  }

  getUserData(users, email) {
    let match = users.filter(user => {
      return user.value.email == email.value.trim();
    });

    let [userObj] = match;
    return userObj;
  }
}

module.exports = Login;
