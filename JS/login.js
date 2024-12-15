let userEmail = document.querySelector("#userEmail");
let userPassword = document.querySelector("#userPassword");
let signInBtn = document.querySelector("#signInBtn");
let confirm = document.querySelector("#confirm");
let togglePassword = document.querySelector("#togglePassword");
// declare array to get element from local storage 
let signInList = [];


// & Hide the body of login page to prevent unauthorized access before the check is complete
document.body.style.display = "none"; 

// & Check if the user is already logged in when the page loads
window.addEventListener("load", function () {
    // If a logged-in user exists in localStorage, redirect to the home page
    if (localStorage.getItem("loggedInUser") != null) {
        setTimeout(() => {
            location.href = "HTML/home.html";
        }, 500);
    } else {
        // If no logged-in user is found, make the page visible
        document.body.style.display = "block"; 
    }
});



// & LocalStorage: Check if any user data is saved in localStorage and if so, load it
if(localStorage.getItem("userData") != null){
    signInList = JSON.parse(localStorage.getItem("userData"));
    console.log("signin List" , signInList); 
}

// ^ ==============================================================

//~ Add an event listener to the togglePassword element to handle click events
togglePassword.addEventListener("click" , function(){
    // Check if the current type of the password input field is "password"
    if(userPassword.type === "password"){
        // Change the type of the password input field to "text" to show the password
        userPassword.type = "text";

        // Update the inner HTML of the togglePassword icon to show an "eye" icon
        togglePassword.innerHTML = `<i class="fa-solid fa-eye position-absolute"></i>`
    }
    else{
        // If the type is not "password", change it back to "password" to hide the password
        userPassword.type = "password";

        // Update the inner HTML of the togglePassword icon to show an "eye-slash" icon
        togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash position-absolute"></i>`
    }
})

// ^ ==============================================================

// ~ Event listener for the Sign In button to trigger sign-in process
signInBtn.addEventListener("click" , function(e){
    // Prevent default form submission behavior
    e.preventDefault();

     // Check if the sign-in form inputs are not empty
    if(signinIsEmpty()){
        checkIfUserExists(); // Call function to verify if the user exists in the list
    }
    else{
        // Error message if inputs are empty
        confirm.innerHTML = `<span class="text-danger fw-bold">All inputs is required</span>`;
    }
    
})

// ^ ==============================================================

// & Function to check if the entered email and password match any record in the signInList
function checkIfUserExists(){
    let flag = false; // Initialize a flag to track if a match is found
    let loggedInUser = null; // To hold the logged-in user's details

    // Loop through each user in the signInList to check for a matching email and password
    for (let i = 0; i < signInList.length; i++) {
        // If a match is found, set the flag to true and exit the loop
        if(userEmail.value == signInList[i].email && userPassword.value == signInList[i].password){
            flag = true;
            loggedInUser = signInList[i]; // Store the matched user object
            break;
        }
    }

    // If a match was found, clear the input fields and redirect to home page
    if(flag){
        clearSigninInputs();

        // Save the name of the user who logs in to localStorage
        localStorage.setItem("loggedInUserName", loggedInUser.name);
        localStorage.setItem("loggedInUser" , JSON.stringify(loggedInUser));
        
        location.href = "HTML/home.html"; // Redirect to the home page
    }
    else{
        confirm.innerHTML = `<span class = "text-danger fw-bold">incorrect email or password</span>`
    }
}

// ^ ==============================================================

// & Function to check if the email and password fields are not empty
function signinIsEmpty(){
    // Return false if either the email or password field is empty, else return true
    if(userEmail.value == '' || userPassword.value == '')
        return false;
    else
        return true;
}

// ^ ==============================================================

// & Function to clear all the sign-in inputs
function clearSigninInputs(){
    userEmail.value = '';
    userPassword.value = '';
}

// ^ ==============================================================