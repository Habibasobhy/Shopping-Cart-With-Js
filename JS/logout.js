// & Select the logout button element
let logoutBtn = document.querySelector("#logoutBtn");

let navbarCartBadge = document.querySelector("#cartBadge");
let externalCartBadge = document.querySelector("#externalCartBadge");
let navbarWishlistBadge = document.querySelector("#wishlistBadge");
let externalWishlistBadge = document.querySelector("#externalWishlistBadge");

// & Arrays to store products added to the cart and wishlist
let productsAddedToCart = [];
let wishList = [];

// ^ ====================================================

// & Event listener for logout button click
logoutBtn.addEventListener("click", logout);

// & Function to handle user logout
function logout() {
    // Check if there's a logged-in user in local storage
    if (localStorage.getItem("loggedInUser")) {
        // Remove user data from local storage
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInUserName");
        
        // Redirect to login page
        location.href = "../index.html";
    }
}

// ^ ====================================================

// & Update the wishlist badge on page load
updateWishlistBadge();

// & Function to update the wishlist badge
function updateWishlistBadge() {
    let totalItemsInWishlist = 0;

    // Check if there are items stored in the wishlist in local storage
    if (localStorage.getItem("wishlist") != null) {
        // Retrieve the wishlist items from local storage and parse them
        wishList = JSON.parse(localStorage.getItem("wishlist"));

        // Calculate the total number of items in the wishlist
        totalItemsInWishlist = wishList.length;
    }

    // console.log(totalItemsInWishlist); 

    // Update the wishlist badge with the total number of items
    // Update the navbar wishlist badge
    if (navbarWishlistBadge) {
        navbarWishlistBadge.innerHTML = totalItemsInWishlist; 
    }

    // Update the external wishlist badge
    if (externalWishlistBadge) {
        externalWishlistBadge.innerHTML = totalItemsInWishlist; 
    }
}

// ^ ====================================================

// & Update the cart badge on page load
updateCartBadge();

// & Function to update the cart badge
function updateCartBadge() {
    let totalItems = 0;

    // Check if there are products added to the cart in local storage
    if (localStorage.getItem("productsAddedToCart") != null) {
        // Retrieve the cart items from local storage and parse them
        productsAddedToCart = JSON.parse(localStorage.getItem("productsAddedToCart"));

        // Sum up the quantities of each product in the cart
        productsAddedToCart.forEach((item) => {
            totalItems += item.quantity;
        });
    }
    
    console.log(totalItems); // Debugging line

    // Update the cart badge with the total number of items
    // Update the navbar cart badge
    if (navbarCartBadge) {
        navbarCartBadge.innerHTML = totalItems; 
    }

    // Update the external cart badge
    if (externalCartBadge) {
        externalCartBadge.innerHTML = totalItems; 
    }
}

// ^ ====================================================

