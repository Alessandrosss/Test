"use strict";

function validate() {
    const createAccountForm = document.querySelector("#createAccount");
    const createUsername = document.querySelector("#signupUsername");
    const createEmail = document.querySelector("#signupEmail");
    const createPhoneNumber = document.querySelector("#signupPhoneNumber");
    const createPassword = document.querySelector("#signupPassword");
    const createConfirmPassword = document.querySelector("#signupConfirmPassword");

    //parentChild

    const checkBtns = document.querySelector('#checkboxs');
    const check = checkBtns.querySelector('input');
    check.addEventListener('click', (e) => e.preventDefault());

    //SUBMITTING EVENT LISTENER
    createAccountForm.addEventListener("submit", (e) => {
        e.preventDefault();

        //validate inputs
        let isUsernameValid = checkNewUsername();
        let isEmailValid = checkNewEmail();
        let isPhoneNumberValid = checkNewPhoneNumber();
        let isPasswordValid = checkNewPassword();
        let isConfirmPasswordValid = checkConfirmNewPassword();
        let isChecked = checkCheckbox();

        let isFormValid = isUsernameValid && isEmailValid && isPhoneNumberValid && isChecked && isPasswordValid && isConfirmPasswordValid;

        if (isFormValid) {
            //submit to the server if the form is valid
            console.log("eingeloggt");
        }
    })

    //UTILITY FUNCTIONS

    const isRequired = value => value !== "";
    const isBetween = (length, min, max) => !(length < min || length > max);
    const isEmailValid = (email) => {
        const require = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return require.test(email);
    };
    const isPhoneNumberValid = (phonenumber) => {
        const require = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return require.test(phonenumber);
    };
    const isPasswordSecure = (password) => {
        const require = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return require.test(password);
    };

    //ERROR/SUCCESS

    const showError = (input, message) => {
        //get the form field
        const formField = input.parentElement;

        //add error class (border)
        input.classList.add("form__input--error");
        input.classList.remove("form__input--success");

        //show error message
        const error = formField.querySelector(".form__input-error-message");
        error.textContent = message;
    };
    const showSuccess = (input) => {
        //get the form field
        const formField = input.parentElement;

        //add error class (border)
        input.classList.remove("form__input--error");
        input.classList.add("form__input--success");

        //show error message
        const error = formField.querySelector(".form__input-error-message");
        error.textContent = "";
    };

    //CHECKS

    const checkCheckbox = () => {

        let valid = false;


        if (!check.checked) {
            showError(check, "(*) You have to accept that");
        } else {
            showSuccess(check, "");
            valid = true;
        }
        return valid;
    }
    const checkNewUsername = () => {

        let valid = false;
        const min = 3;
        const max = 15;
        const username = createUsername.value.trim();

        if (!isRequired(username)) {
            showError(createUsername, 'Username cannot be empty!');
        } else if (!isBetween(username.length, min, max)) {
            showError(createUsername, `Username must be between ${min} and ${max} characters`);
        } else {
            showSuccess(createUsername);
            valid = true;
        }
        return valid;
    };
    const checkNewEmail = () => {

        let valid = false;
        const email = createEmail.value.trim();

        if (!isRequired(email)) {
            showError(createEmail, 'Email cannot be empty!');
        } else if (!isEmailValid(email)) {
            showError(createEmail, `${email} is not valid`);
        } else {
            showSuccess(createEmail);
            valid = true;
        }
        return valid;
    };
    const checkNewPhoneNumber = () => {
        let valid = false;

        const phoneNumber = createPhoneNumber.value.trim();

        if (!isRequired(phoneNumber)) {
            showError(createPhoneNumber, 'Phone Number cannot be empty!');
        } else if (!isPhoneNumberValid(phoneNumber)) {
            showError(createPhoneNumber, `Your Telephonnumber isn't valid!`);
        } else {
            showSuccess(createPhoneNumber);
            valid = true;
        }
        return valid;
    };
    const checkNewPassword = () => {

        let valid = false;
        const password = createPassword.value.trim();

        if (!isRequired(password)) {
            showError(createPassword, 'This field cannot be empty!');
        } else if (!isPasswordSecure(password)) {
            showError(createPassword, "Password must has at leat 8 characters, that include at least 1 lowercase, 1 uppercase, 1 number and 1 special character");
        } else {
            showSuccess(createPassword);
            valid = true;
        }
        return valid;
    };
    const checkConfirmNewPassword = () => {

        let valid = false;
        const confirmPassword = createConfirmPassword.value.trim();
        const password = createPassword.value.trim();

        if (!isRequired(confirmPassword)) {
            showError(createConfirmPassword, 'This field cannot be empty!');
        } else if (password !== confirmPassword) {
            showError(createConfirmPassword, "Password doesn't match!");
        } else {
            showSuccess(createConfirmPassword);
            valid = true;
        }
        return valid;
    };


    //EVENT LISTENERS
    createUsername.addEventListener("blur", checkNewUsername);
    createEmail.addEventListener("blur", checkNewEmail);
    createPhoneNumber.addEventListener("blur", checkNewPhoneNumber);
    createPassword.addEventListener("blur", checkNewPassword);
    createConfirmPassword.addEventListener("blur", checkConfirmNewPassword);
}
validate();