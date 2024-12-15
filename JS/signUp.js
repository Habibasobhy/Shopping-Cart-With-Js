let signupUserName = document.querySelector("#signupUserName");
let signupUserEmail = document.querySelector("#signupUserEmail");
let signupUserPassword = document.querySelector("#signupUserPassword");
let signUpBtn = document.querySelector("#signUpBtn");
let validateSignUpName = document.querySelector("#validateSignupName");
let validateSignUpEmail = document.querySelector("#validateSignupEmail");
let validateSignUpPassword = document.querySelector("#validateSignupPassword");
let confirm = document.querySelector("#confirm");
let togglePassword = document.querySelector("#togglePassword");
let userIcon = document.querySelector("#userIcon");
let emailIcon = document.querySelector("#emailIcon");
let passIcon = document.querySelector("#passIcon");
let signupList = [];

// & Check if there are any stored user data in localStorage
if(localStorage.getItem("userData") != null){
    signupList = JSON.parse(localStorage.getItem("userData"));
}

// ^ ================================================================

//~ Add an event listener to the togglePassword element to handle click events
togglePassword.addEventListener("click" , function(){
    // Check if the current type of the password input field is "password"
    if(signupUserPassword.type === "password"){

        // Change the type of the password input field to "text" to show the password
        signupUserPassword.type = "text";

        // Update the inner HTML of the togglePassword icon to show an "eye" icon
        togglePassword.innerHTML = `<i class="fa-solid fa-eye position-absolute"></i>`

        // passIcon.style.right = "35px";
        togglePassword.classList = `position-absolute`
        togglePassword.style.right = "25px";
        togglePassword.style.top = "0px";
    }
    else{
        
        // If the type is not "password", change it back to "password" to hide the password
        signupUserPassword.type = "password";

        // Update the inner HTML of the togglePassword icon to show an "eye-slash" icon
        togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash position-absolute"></i>`
        
        togglePassword.classList = `position-absolute`
        togglePassword.style.right = "25px";
        togglePassword.style.top = "0px";
    }
})

// ^ ================================================================

// ~ Onclick Event of signUp => Button
signUpBtn.addEventListener('click' , function(e){
    e.preventDefault(); // Prevent default form submission behavior

    // Check if all inputs are not empty
    if(signUpIsEmpty() == true){
        // Validate inputs and proceed if all validations pass
        if(validateSignupName() && validateSignupEmail() && validateSignupPassword()){

            // ^ Check if email already exists in the stored signup list
            let flag = true;

            for(let i = 0; i< signupList.length; i++){
                if(signupUserEmail.value == signupList[i].email){
                    flag = false;
                    break;
                }
            }

            // If email is not duplicated, add user data and show success message
            if(flag){
                addUser();
                
                confirm.innerHTML = `<span class="text-success fw-bold">Success</span>`;

                // Redirect to the login page
                location.href = "../index.html"; 
            }
            else{
                // Show email already exists message
                confirm.innerHTML = `<span class="text-danger fw-bold">Email already exists</span>`;
            }
        }
    }
    else{
         // Show message if some inputs are empty
        confirm.innerHTML = `<span class="text-danger fw-bold">All inputs is required</span>`;
    }
    
})

// ^ ================================================================

// & for addUser function: Add the new user to the signupList and store it in localStorage
function addUser(){
    let user = {
        name : signupUserName.value,
        email : signupUserEmail.value,
        password : signupUserPassword.value
    };

    signupList.push(user);
    // console.log(signupList);
    localStorage.setItem('userData', JSON.stringify(signupList));
    clearSignupInputs(); // Clear the form inputs after user registration
}

// ^ ===============================================================

// ~ Oninput Event of signUp => Name validation
signupUserName.addEventListener('input', function(){

    userIcon.style.right = "35px";
    validateSignupName();
})

// & for check SignUPName: Validate the name input using regex 
function validateSignupName(){
    // Regex to allow only alphabets and spaces, and ensure the name is between 3 to 50 characters
    let regex = /^[a-z\s]{3,50}$/gmi;

    // If the name matches the regex, apply valid style and hide error message
    if(regex.test(signupUserName.value) == true){
        applyValidStyle(signupUserName);
        validateSignUpName.classList.replace('d-block', 'd-none');
        return true;
    }
    else{
        // If the name doesn't match the regex, apply invalid style and show error message
        applyInValidStyle(signupUserName);
        validateSignUpName.classList.replace('d-none','d-block');
        return false;
    }
}

// ^ ===============================================================

// ~ Oninput Event of signUp => Email validation
signupUserEmail.addEventListener('input', function(){

    emailIcon.style.right = "35px";
    validateSignupEmail();

})

// & for check SignUPEmail: Validate the email input using regex
function validateSignupEmail(){
    // Regex for valid Gmail email format
    let regex = /^[a-zA-Z0-9._%+-]{3,}@gmail\.com$/;

    // If the email matches the regex, apply valid style and hide error message
    if(regex.test(signupUserEmail.value) == true){
        applyValidStyle(signupUserEmail);
        validateSignUpEmail.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        // If the email doesn't match the regex, apply invalid style and show error message
        applyInValidStyle(signupUserEmail);
        validateSignUpEmail.classList.replace('d-none','d-block');
        return false;
    }
}

// ^ ===============================================================

// ~ Oninput Event of signUp => Password validation
signupUserPassword.addEventListener('input' , function(){

    passIcon.style.right = "35px";
    validateSignupPassword();
});

// & for check SignUPPassword: Validate the password input using regex
function validateSignupPassword(){
    // Regex for valid password (at least one lowercase letter, one uppercase letter, one digit, and at least 8 characters)
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // If the password matches the regex, apply valid style and hide error message
    if(regex.test(signupUserPassword.value)){
        applyValidStyle(signupUserPassword);
        validateSignUpPassword.classList.replace('d-block', 'd-none');
        return true;
    }
    else{
        // If the password doesn't match the regex, apply invalid style and show error message
        applyInValidStyle(signupUserPassword);
        validateSignUpPassword.classList.replace('d-none','d-block');
        return false;
    }
}

// ^ ===============================================================

// & for check inputs of signUp Is Empty or not 
function signUpIsEmpty() {
    // If any input is empty, return false
    if(signupUserName.value == '' || signupUserName.value == '' || signupUserPassword.value == '')
        return false;
    
    else
        return true; // If all inputs are filled, return true
}

// ^ ===============================================================

// & Function to apply valid styles (green color and valid class)
function applyValidStyle(inputName) {
    inputName.classList.add('is-valid');
    inputName.classList.remove('is-invalid');
    inputName.style.boxShadow = "0 0 0 .25rem #198754";
    
}

// & Function to apply invalid styles (red color and invalid class)
function applyInValidStyle(inputName){
    inputName.classList.add('is-invalid');
    inputName.classList.remove('is-valid');
    inputName.style.boxShadow = "0 0 0 .25rem #dc3545";
}

// ^ ===============================================================

// & Function to clear all the sign-up inputs
function clearSignupInputs(){
    signupUserName.value = "";
    signupUserEmail.value = "";
    signupUserPassword.value = "";
}