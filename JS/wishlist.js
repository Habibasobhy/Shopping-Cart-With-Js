// Selecting the HTML elements required for functionality
let productWishlist = document.querySelector("#productWishlist");
let clearWishlistBtn = document.querySelector("#clearWishlistBtn");
let toastr = document.querySelector("#toastr"); // Element to show notifications
let navbarCartBadge = document.querySelector("#cartBadge");
let externalCartBadge = document.querySelector("#externalCartBadge");
let navbarWishlistBadge = document.querySelector("#wishlistBadge");
let externalWishlistBadge = document.querySelector("#externalWishlistBadge");
let productsAddedToCart = []; // Array to store items added to cart
let wishlistList = []; // Array to store wishlist items

// ^ ======================================================

// & Check if there is a wishlist in local storage and load it
if (localStorage.getItem("wishlist") != null) {
    wishlistList = JSON.parse(localStorage.getItem("wishlist"));
}

// ^ ======================================================

// & Event listener to clear the wishlist when the button is clicked
clearWishlistBtn.addEventListener("click" , clearWishlist)

// & Clears the wishlist, updates local storage, and refreshes the wishlist display
function clearWishlist(){
    wishlistList = []; // Empty the wishlist array
    localStorage.setItem("wishlist" , JSON.stringify(wishlistList)); // Save the empty array to local storage
    displayWishlist(wishlistList); // Update the UI

    toastr.innerHTML = "All product removed successfully from your wishlist";

    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    }, 2000);
}

// ^ ======================================================

// & Display the wishlist items on page load
displayWishlist(wishlistList);

// & Displays wishlist items in the wishlist container.
// & If the wishlist is empty, shows an empty wishlist message.
function displayWishlist(list){

    let cartona = ''; // Variable to accumulate the HTML for the wishlist items

    // If the wishlist is empty
    if(list.length == 0){
        document.getElementById("totalItems").innerHTML = 0; // Set total items count to 0
        updateWishlistBadge(0); // Update the wishlist badge
        updateCartBadge(); // Update the cart badge

        // Display a message indicating the wishlist is empty
        productWishlist.innerHTML = `<div class="text-center py-5">
                                    <h4 class = "text-danger w-100">Your wishlist is empty!</h4>
                                    <p>Add items to your wishlist to see them here.</p>
                                </div>`
        return;
    }

    let totalItems = 0; // Initialize the total items counter

    // Loop through each item in the wishlist
    for (let i = 0; i < list.length; i++) {

        totalItems = list.length; // Accumulate the quantity of items

        cartona += `<div class="row mt-4 position-relative py-4 item">
                        <div class="col-md-2">
                            <img src="../${list[i].imageUrl}" alt="${list[i].name}" onclick="redirectToProductDetails(${list[i].id})" class = "w-100 cursor-pointer">
                        </div>
                        <div class="col-md-7 d-flex flex-column justify-content-center wishlist-content">
                            <h4 class = "productName">${list[i].name}</h4>
                            <p>${list[i].description}</p>
                            <div class="d-flex align-items-center">
                                <p class="mb-0 me-3 price">EGP 149</p>
                                <button class="btn text-danger" onclick = "deleteProductFromWishlist(${i})">
                                    <i class="fa-regular fa-trash-can"></i>
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div class="col-md-3 d-flex align-items-center">
                            <button class = "btn text-white fw-bold px-5" id="addToCartBtn" onclick = "addProductToCart(${list[i].id})">Add To Cart</button>
                        </div>
                    </div>`
    }

    document.getElementById("totalItems").innerHTML = totalItems; // Update the total items count on the UI
    updateWishlistBadge(totalItems); // Update the wishlist badge with the new count
    updateCartBadge(); // Ensure the cart badge is updated
    productWishlist.innerHTML = cartona; // Display the wishlist items
}

// ^ ======================================================

// & Deletes a product from the wishlist based on its index
// & Updates local storage and refreshes the wishlist display
// & @param {number} index - The index of the product to be removed from the wishlist
function deleteProductFromWishlist(index){
    console.log(index); // Debugging: show which item is being deleted

    wishlistList.splice(index,1); // Remove the item from the wishlist
    localStorage.setItem("wishlist" , JSON.stringify(wishlistList)); // Update local storage
    displayWishlist(wishlistList); // Refresh the wishlist display

    toastr.innerHTML = "Product removed successfully from your wishlist";

    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    }, 2000);
}

// ^ ======================================================

// & Updates the wishlist badge with the number of items in the wishlist
// & @param {number} count - The total number of items in the wishlist
function updateWishlistBadge(count){
    // Update the navbar wishlist badge
    if (navbarWishlistBadge) {
        navbarWishlistBadge.innerHTML = count; 
    }

    // Update the external wishlist badge
    if (externalWishlistBadge) {
        externalWishlistBadge.innerHTML = count; 
    }
}

// ^ ======================================================

// & Updates the cart badge with the number of items in the cart
function updateCartBadge(){

    let totalItems = 0;

    if(localStorage.getItem("productsAddedToCart") != null){
        productsAddedToCart = JSON.parse(localStorage.getItem("productsAddedToCart")); // Get items from local storage
        productsAddedToCart.forEach((item) => {
            totalItems += item.quantity; // Sum the quantities of each item
        })
    }

    // Update the navbar cart badge
    if (navbarCartBadge) {
        navbarCartBadge.innerHTML = totalItems; 
    }

    // Update the external cart badge
    if (externalCartBadge) {
        externalCartBadge.innerHTML = totalItems; 
    }

}

// ^ ======================================================

 // & Adds a product from the wishlist to the cart
 // & Displays a toast message on successful addition
 // & @param {number} productId - The ID of the product to be added to the cart
function addProductToCart(productId){
    // console.log(productId); 

    let chosenProduct = wishlistList.find((item) => item.id === productId); // Find the selected product in the wishlist

    let existingProductIndex = productsAddedToCart.findIndex((item) => item.id === chosenProduct.id); // Check if the product is already in the cart

    if(existingProductIndex != -1){
        productsAddedToCart[existingProductIndex].quantity += 1; // Increase quantity if product is already in cart
    }
    else{
        productsAddedToCart.push(chosenProduct); // Add new product to the cart
    }

    localStorage.setItem("productsAddedToCart" , JSON.stringify(productsAddedToCart)); // Update local storage
    updateCartBadge(); // Refresh the cart badge

    // Show toastr notification
    toastr.innerHTML = "Product added to cart successfully!";

    // Show and hide the toastr notification for a brief period
    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    },1500);
}

// ^ ======================================================

// & Function to redirects the user to the product details page after saving the selected product's details in localStorage.
function redirectToProductDetails(productId){

    // Find the product details from the products array using the provided product ID
    let selectedProduct = wishlistList.find((item) => item.id === productId);

    // console.log(selectedProduct);

    // Save the selected product details in localStorage as a JSON string for use on the product details page
    localStorage.setItem("productDetails" , JSON.stringify(selectedProduct));
    
    // Redirect the user to the product details page
    location.href = "../HTML/productDetails.html";
}

// ^ ======================================================
