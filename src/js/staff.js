/* eslint-disable no-undef */

//validate came from files.js-
/* eslint-disable no-unused-vars */

//global variable definition
var oldDetails;
var allUsers;
let users = staffModel.getUsers();
users.then(({ data, headers, status }) => {
  allUsers = data.rows;
});
const fnameAlpha = e => {
  let fname = e.target.value.trim();
  let errorBox = document.getElementById("fnameError");

  if (validate.isNotAlpha(fname)) {
    errorBox.textContent = "Please enter alphabets only";
  } else {
    errorBox.textContent = "";
  }
};

const validateNumber = e => {
  let number = e.target.value.trim();
  let errorBox = document.getElementById("numberError");

  if (validate.isNotPhoneNumber(number)) {
    errorBox.textContent = "Please enter a valid phone number";
  } else {
    errorBox.textContent = "";
  }
};

const lnameAlpha = e => {
  let lname = e.target.value.trim();
  let errorBox = document.getElementById("lnameError");

  if (validate.isNotAlpha(lname)) {
    errorBox.textContent = "Please enter alphabets only";
  } else {
    errorBox.textContent = "";
  }
};

const validateEmail = e => {
  let email = e.target.value.trim();
  let errorBox = document.getElementById("emailError");

  if (validate.isNotEmail(email)) {
    errorBox.textContent = "Please enter a valid email ";
  } else {
    errorBox.textContent = "";
  }
};

const stateAlpha = e => {
  let state = e.target.value.trim();
  let errorBox = document.getElementById("stateError");

  if (validate.isNotAlpha(state)) {
    errorBox.textContent = "Please enter alphabets only";
  } else {
    errorBox.textContent = "";
  }
};

const validatePwd = e => {
  let pwd = e.target.value.trim();
  let errorBox = document.getElementById("pwdError");

  if (validate.notValidPassword(pwd)) {
    errorBox.textContent =
      "Password should have an uppercase, lowercase, number, special character and minimum of 6 characters";
  } else {
    errorBox.textContent = "";
  }
};

const validateSecPwd = e => {
  let pwd = document.getElementById("pwd").value.trim();
  let secPwd = e.target.value.trim();
  let errorBox = document.getElementById("secPwdError");

  if (pwd != secPwd) {
    document.getElementsByClassName("pwd2")[0].style.border = "1px solid red";
    errorBox.textContent = "Passwords do not match ";
  } else {
    document.getElementsByClassName("pwd2")[0].style.border = "1px solid green";
    errorBox.textContent = "";
  }
};

const showPwd = e => {
  let pwdBearer = document.getElementsByClassName("passwordBearer")[0];

  if (pwdBearer.classList.contains("hide")) {
    pwdBearer.classList.remove("hide");
  }
};

const hidePwd = e => {
  let pwdBearer = document.getElementsByClassName("passwordBearer")[0];

  if (!pwdBearer.classList.contains("hide")) {
    pwdBearer.classList.add("hide");
  }
};

const handlePwdBox = e => {
  let perm = e.target.value;
  let pwdBox = document.getElementsByClassName("pwdCarrier")[0];
  if (perm == "admin" && oldDetails.value.pwd == "") {
    if (pwdBox.classList.contains("hide")) {
      pwdBox.classList.remove("hide");
    }
  } else {
    if (!pwdBox.classList.contains("hide")) {
      pwdBox.classList.add("hide");
      //empty  passsword field
      document.getElementById("pwd").value = "";
      document.getElementById("pwd2").value = "";
      document.getElementById("pwdError").textContent = "";
      document.getElementById("secPwdError").textContent = "";
      document.getElementsByClassName("pwd2")[0].style.border = "none";
      document.getElementsByClassName("pwd2")[0].style.borderBottom =
        "1px solid #ccc";
    }
  }
};

const resetBtn = btn => {
  btn.textContent = "Register";
};

const resetSaveBtn = btn => {
  btn.textContent = "Save";
};

//email exists function
const emailExists = (errorDiv, email, btn, details) => {
  //check if email already exists
  let allUsers = staffModel.getUsers();
  //handle promise
  allUsers.then(({ data, headers, status }) => {
    let users = data.rows;
    //filter match
    let match = staffModel.filterUsers(users, email);
    if (match) {
      // eslint-disable-next-line no-undef
      displayError(errorDiv, " sorry this email already exist");
      resetBtn(btn);
    } else {
      //generate id for user
      let idGen = staffModel.generateId();
      idGen.then(ids => {
        const id = ids[0];
        //insert details
        let detailInsertion = staffModel.insertDetails(details, id);
        detailInsertion.then(({ data, headers, status }) => {
          if (status == 201) {
            // eslint-disable-next-line no-undef
            displaySuccess("Staff registered");
            setTimeout(() => {
              //clear and restart form
              document.getElementsByClassName("pwd2")[0].style.border = "";
              document.getElementsByClassName("staffReg")[0].reset();
              // eslint-disable-next-line no-undef
              hideSuccess();
              resetBtn(btn);
              document.getElementById("fname").focus();
            }, 900);
          } else {
            //display error
            // eslint-disable-next-line no-undef
            displayError(
              errorDiv,
              " sorry an error occured please try again later"
            );
            resetBtn(btn);
          }
        });
      });
    }
  });
};

//update staff details
const updateStaffDetails = (newDetails, oldDetails, errorDiv, btn) => {
  let id = oldDetails.id;
  let rev = oldDetails.value.rev;
  let update = staffModel.updateUser(id, rev, newDetails);
  update.then(
    ({ data, headers, status }) => {
      if (status != 201) {
        // eslint-disable-next-line no-undef
        displayError(errorDiv, "update not successfull, please try again");
      } else {
        displaySuccess("staff data updated successfully");
        resetSaveBtn(btn);
        setTimeout(() => {
          hideSuccess();
        }, 900);
      }
    },
    err => {
      // eslint-disable-next-line no-undef
      displayError(errorDiv, "oops!! an error occured");
      resetSaveBtn(btn);
    }
  );
};

//save edited detail
const saveDetails = e => {
  e.preventDefault();
  e.target.textContent = "please wait...";
  let btn = e.target;

  //get error div
  let errorDiv = document.getElementsByClassName("warning")[0];
  //hide error box
  if (!errorDiv.classList.contains("hide")) {
    errorDiv.classList.add("hide");
  }

  let fname = document.getElementById("fname");
  let lname = document.getElementById("lname");
  let email = document.getElementById("email");
  let number = document.getElementById("number");
  let street = document.getElementById("street");
  let position = document.getElementById("position");

  let town = document.getElementById("town");
  let state = document.getElementById("state");
  let gender = document.getElementById("gender");
  let permission = document.getElementById("permission");
  let pwd = document.getElementById("pwd");
  let pwd2 = document.getElementById("pwd2");
  let image = document.getElementById("staffImage").src;

  let details = {
    fname: fname.value.trim(),
    lname: lname.value.trim(),
    email: email.value.trim(),
    number: number.value.trim(),
    street: street.value.trim(),
    state: state.value.trim(),
    town: town.value.trim(),
    gender: gender.value,
    permission: permission.value,
    position: position.value.trim(),
    access: oldDetails.value.access,
    image: image,
    pwd: pwd.value.trim()
  };

  let inputs = [
    fname,
    lname,
    email,
    number,
    street,
    town,
    state,
    position,
    gender,
    permission
  ];

  if (validate.isEmpty(inputs)) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please fill all fields");
    resetSaveBtn(btn);
  } else if (validate.isNotAlpha(fname.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please firstname should be alphabets only");
    resetSaveBtn(btn);
  } else if (validate.isNotAlpha(lname.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please lastname should be alphabets only");
    resetSaveBtn(btn);
  } else if (validate.isNotEmail(email.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please enter a valid email");
    resetSaveBtn(btn);
  } else if (validate.isNotPhoneNumber(number.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please enter a valid phone number");
    resetSaveBtn(btn);
  } else if (validate.isNotAlpha(state.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please state should be alphabets only");
    resetSaveBtn(btn);
  } else if (
    permission.value == "admin" &&
    validate.notValidPassword(pwd.value.trim())
  ) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "please enter a valid password");
    resetSaveBtn(btn);
  } else if (
    permission.value == "admin" &&
    pwd.value.trim() != pwd2.value.trim()
  ) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "passwords do not match");
    resetSaveBtn(btn);
  } else if (
    details.email !== oldDetails.value.email &&
    staffModel.filterUsers(allUsers, email)
  ) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "This email already belong to another user");
    resetSaveBtn(btn);
  } else if (
    details.number !== oldDetails.value.number &&
    staffModel.filterNumber(allUsers, number)
  ) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "This phone number already belong to another user");
    resetSaveBtn(btn);
  } else {
    updateStaffDetails(details, oldDetails, errorDiv, btn);
  }
};

//register memeber
const register = e => {
  e.preventDefault();
  e.target.textContent = "please wait...";
  let btn = e.target;

  //get error div
  let errorDiv = document.getElementsByClassName("warning")[0];
  //hide error box
  if (!errorDiv.classList.contains("hide")) {
    errorDiv.classList.add("hide");
  }

  let fname = document.getElementById("fname");
  let lname = document.getElementById("lname");
  let email = document.getElementById("email");
  let number = document.getElementById("number");
  let street = document.getElementById("street");
  let town = document.getElementById("town");
  let state = document.getElementById("state");
  let adminPermission = document.getElementById("admin");
  let memberPermission = document.getElementById("member");
  let gender = document.getElementById("gender");
  let pwd = document.getElementById("pwd");
  let pwd2 = document.getElementById("pwd2");
  let position = document.getElementById("position");
  let permissionLevel;
  if (adminPermission.checked == true) {
    permissionLevel = "admin";
  } else if (memberPermission.checked == true) {
    permissionLevel = "member";
  }

  let details = {
    fname: fname.value.trim(),
    lname: lname.value.trim(),
    email: email.value.trim(),
    number: number.value.trim(),
    street: street.value.trim(),
    state: state.value.trim(),
    town: town.value.trim(),
    pwd: pwd.value.trim(),
    gender: gender.value,
    permission: permissionLevel,
    position: position.value.trim()
  };

  let inputs = [
    fname,
    lname,
    email,
    number,
    street,
    town,
    state,
    position,
    gender
  ];
  if (validate.isEmpty(inputs)) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please fill all fields");
    resetBtn(btn);
  } else if (validate.isNotAlpha(fname.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please firstname should be alphabets only");
    resetBtn(btn);
  } else if (validate.isNotAlpha(lname.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please lastname should be alphabets only");
    resetBtn(btn);
  } else if (validate.isNotEmail(email.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please enter a valid email");
    resetBtn(btn);
  } else if (validate.isNotPhoneNumber(number.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please enter a valid phone number");
    resetBtn(btn);
  } else if (validate.isNotAlpha(state.value.trim())) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please state should be alphabets only");
    resetBtn(btn);
  } else if (
    adminPermission.checked == false &&
    memberPermission.checked == false
  ) {
    // eslint-disable-next-line no-undef
    displayError(errorDiv, "Please select permission level");
    resetBtn(btn);
  } else if (adminPermission.checked == true) {
    if (pwd.value.trim() != pwd2.value.trim()) {
      // eslint-disable-next-line no-undef
      displayError(errorDiv, "Passwords do not match");
      resetBtn(btn);
    } else if (validate.notValidPassword(pwd.value.trim())) {
      // eslint-disable-next-line no-undef
      displayError(errorDiv, "Password not strong enough");
      resetBtn(btn);
    } else {
      //check email address
      emailExists(errorDiv, email, btn, details);
    }
  } else {
    //check if email exists
    emailExists(errorDiv, email, btn, details);
  }
};

const showList = () => {
  let users = staffModel.getUsers();
  users.then(({ data, headers, status }) => {
    //show staff template

    displayStaff(data.rows);
  });
};

//append details to view
const appendDetails = details => {
  document.getElementById("editBtn").dataset.staffemail = details.value.email;
  document.getElementsByClassName("viewName")[0].textContent =
    details.value.fname + " " + details.value.lname;
  document.getElementsByClassName("viewPosition")[0].textContent =
    details.value.position;
  document.getElementsByClassName("staffImage")[0].src = details.value.image;
  document.getElementsByClassName("id")[0].textContent = details.id;

  document.getElementsByClassName("gender")[0].textContent =
    details.value.gender;
  document.getElementsByClassName("email")[0].textContent = details.value.email;
  document.getElementsByClassName("number")[0].textContent =
    details.value.number;
  document.getElementsByClassName("street")[0].textContent =
    details.value.address.street;
  document.getElementsByClassName("town")[0].textContent =
    details.value.address.town;
  document.getElementsByClassName("state")[0].textContent =
    details.value.address.state;
  document.getElementsByClassName("permission")[0].textContent =
    details.value.permission;
  document.getElementsByClassName("access")[0].textContent =
    details.value.access;
};

//append values to form
const appendValues = details => {
  oldDetails = details;

  document.getElementById("fname").value = details.value.fname;
  document.getElementById("lname").value = details.value.lname;
  document.getElementById("email").value = details.value.email;
  document.getElementById("staffImage").src = details.value.image;
  document.getElementById("number").value = details.value.number;
  document.getElementById("street").value = details.value.address.street;
  document.getElementById("town").value = details.value.address.town;
  document.getElementById("state").value = details.value.address.state;
  document.getElementById("position").value = details.value.position;
  document.getElementById("pwd").value = details.value.pwd;
  document.getElementById("pwd2").value = details.value.pwd;
  let gender = details.value.gender;
  let permission = details.value.permission;
  let permissionIndex;
  let genderIndex;
  if (gender == "female") {
    genderIndex = 1;
  } else {
    genderIndex = 2;
  }

  if (permission == "admin") {
    permissionIndex = 1;
  } else {
    permissionIndex = 2;
  }

  document.getElementById("gender").selectedIndex = genderIndex;
  document.getElementById("permission").selectedIndex = permissionIndex;
};

//display staff details
const showStaffDetails = selectedEmail => {
  let users = staffModel.getUsers();
  users.then(({ data, headers, status }) => {
    //filter
    [details] = staffModel.filterStaffDetails(data.rows, selectedEmail);

    appendDetails(details);
  });
};

//display edit details
const showStaffValues = selectedEmail => {
  //get users and filter with email provided
  let users = staffModel.getUsers();
  users.then(({ data, headers, status }) => {
    //filter
    [staffDetails] = staffModel.filterStaffDetails(data.rows, selectedEmail);
    appendValues(staffDetails);
  });
};