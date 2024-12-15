let productCart = document.querySelector("#productCart");
let clearCartBtn = document.querySelector("#clearCartBtn");
let toastr = document.querySelector("#toastr");
let navbarCartBadge = document.querySelector("#cartBadge");
let externalCartBadge = document.querySelector("#externalCartBadge");
let navbarWishlistBadge = document.querySelector("#wishlistBadge");
let externalWishlistBadge = document.querySelector("#externalWishlistBadge");
let cartItems = []; // Array to store cart items
let wishlistList = []; // Array to store wishlist items

// ^ =========================================================

// & Redirect to login page if the user is not logged in
if(localStorage.getItem("loggedInUser") === null){
    location.href = "../index.html";
}

// & Load cart items from local storage
// Retrieve the "productsAddedToCart" data from localStorage, if available, and parse it into the `cartItems` array.
if(localStorage.getItem("productsAddedToCart") != null){
    cartItems = JSON.parse(localStorage.getItem("productsAddedToCart"));
    // console.log(cartItems);
}

// ^ =========================================================

// & Event Listener: Clear Cart Button
clearCartBtn.addEventListener("click" , clearCart);

// & Clears the cart and updates local storage and UI
function clearCart(){
    cartItems = [];
    localStorage.setItem("productsAddedToCart" , JSON.stringify(cartItems));
    displayProductCart(cartItems);

    toastr.innerHTML = "All product removed successfully from your Cart";

    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    }, 2000);
}

// ^ =========================================================


// & Display the cart items when the page loads
displayProductCart(cartItems);

// & Displays cart items in the cart container.
// & If the cart is empty, shows an empty cart message.
function displayProductCart(product){
    let cartona = "";

    // If the cart is empty
    if(product.length === 0){
        document.getElementById("totalItems").innerHTML = 0;  // Update total item
        document.getElementById("totalPrice").innerHTML = 0; // Update total price
        updateCartBadge(0); // Update cart badge

        // Display empty cart message
        productCart.innerHTML = `<div class="text-center py-5">
                                    <h4 class = "text-danger w-100">Your cart is empty!</h4>
                                    <p>Add items to your cart to see them here.</p>
                                </div>`
        return;
    }

    let totalItems = 0; // Initialize total items count
    let totalPrice = 0; // Initialize total price

    // Loop through cart items and build the cart display
    for (let i = 0; i < product.length; i++) {

        totalItems += product[i].quantity; // Add the item's quantity to the total items count
        totalPrice += product[i].price * product[i].quantity; // Add the item's total price to the total price

        cartona += `
                <div class="row mt-4 product position-relative py-3">
                    <div class="col-md-2">
                        <img src="../${product[i].imageUrl}" alt="${product[i].name}" onclick="redirectToProductDetails(${product[i].id})" class = "w-100 cursor-pointer">
                    </div>

                    <div class="col-md-8 d-flex flex-column justify-content-center cart-content">
                        <h4 class = "productName">${product[i].name}</h4>
                        <p>${product[i].description}</p>
                        <div class="d-flex align-items-center">
                            <p class="mb-0 me-3 price">EGP ${product[i].price}</p>
                            <button class="btn text-danger" onclick = "deleteProductFromCart(${i})">
                                <i class="fa-regular fa-trash-can"></i>
                                Remove
                            </button>
                        </div>
                    </div>

                    <div class="col-md-2 d-flex align-items-center ItemQuantityManager">
                        <button class="btn btn-update" onclick = "changeProductQuantity(${i} ,-1)">-</button>
                        <span class="mx-3 d-inline-block quantity">${product[i].quantity || 1}</span>
                        <button class="btn btn-update" onclick = "changeProductQuantity(${i} , 1)">+</button>
                    </div>
                </div>`
    }

    // Update total items and price on the UI
    document.getElementById("totalItems").innerHTML = totalItems;
    document.getElementById("totalPrice").innerHTML = totalPrice;

    // Update cart badge with total number of items
    updateCartBadge(totalItems);

    // console.log(cartona);
    productCart.innerHTML = cartona; // Display the cart items in the cart container
}

// ^ =========================================================

 // & Updates the cart badge to show the number of items in the cart.
 // & @param {number} count - The total number of items in the cart.
function updateCartBadge(count){
    // Update the navbar cart badge
    if (navbarCartBadge) {
        navbarCartBadge.innerHTML = count; 
    }

    // Update the external cart badge
    if (externalCartBadge) {
        externalCartBadge.innerHTML = count; 
    }
}

// ^ =========================================================

 // & Deletes a product from the cart based on its ID.
 // & Updates local storage and refreshes the cart display.
 // & @param {number} index - The index of the product to be removed.
function deleteProductFromCart(index){

    cartItems.splice(index,1); // Remove the product from the cartItems array

    console.log(cartItems);

    // Update local storage with the modified cart
    localStorage.setItem("productsAddedToCart",JSON.stringify(cartItems));

    displayProductCart(cartItems); // Refresh the cart display

    toastr.innerHTML = "Product removed successfully from your Cart";

    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    }, 2000);
}

// ^ =========================================================

// & Changes the quantity of a product in the cart.
// & Increases or decreases the quantity, and removes the product if the quantity reaches zero.
// & Updates local storage and refreshes the cart display.
// & @param {number} productIndex - The index of the product in the cart.
// & @param {number} change - The change in quantity (+1 for increase, -1 for decrease).
function changeProductQuantity(productIndex , change){
    console.log(productIndex);
    
    if(productIndex !== -1)
    {
        cartItems[productIndex].quantity += change; // Update the product's quantity

        // If the quantity becomes 0 or less, remove the product
        if (cartItems[productIndex].quantity <= 0) {
            deleteProductFromCart(productIndex); // Remove the product
        }
        else{
            // Save the updated cart to local storage and refresh the display
            localStorage.setItem("productsAddedToCart", JSON.stringify(cartItems));
            displayProductCart(cartItems);
        }  
    }
}

// ^ =========================================================

// & Updates the wishlist badge to show the total number of items in the wishlist.
updateWishlistBadge();
function updateWishlistBadge(){
    let totalItemsInWishlist = 0;

    // Check if there are items in the local storage under the key "wishlist"
    if(localStorage.getItem("wishlist") != null){

        // Retrieve and parse the wishlist from local storage
        wishlistList = JSON.parse(localStorage.getItem("wishlist"));

        // Calculate the total number of items in the wishlist
        totalItemsInWishlist = wishlistList.length; // Since each item is represented by an object in the array
    }

    // Update the navbar wishlist badge
    if (navbarWishlistBadge) {
        navbarWishlistBadge.innerHTML = totalItemsInWishlist; 
    }

    // Update the external wishlist badge
    if (externalWishlistBadge) {
        externalWishlistBadge.innerHTML = totalItemsInWishlist; 
    }
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