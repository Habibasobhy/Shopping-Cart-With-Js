let product = {};
let productDetails = document.querySelector("#productDetails");
let toastr = document.querySelector("#toastr");
let navbarCartBadge = document.querySelector("#cartBadge");
let externalCartBadge = document.querySelector("#externalCartBadge");
let navbarWishlistBadge = document.querySelector("#wishlistBadge");
let externalWishlistBadge = document.querySelector("#externalWishlistBadge");
let productsAddedToCart = [];
let wishList = [];

// ^ ===================================================

// & Retrieve cart items from localStorage if they exist
if(localStorage.getItem("productsAddedToCart") != null){
    productsAddedToCart = JSON.parse(localStorage.getItem("productsAddedToCart"));
}

// & Retrieve wishlist items from localStorage if they exist
if(localStorage.getItem("wishlist") != null){
    wishList = JSON.parse(localStorage.getItem("wishlist"));
}

// & Retrieve product details from localStorage if they exist
if(localStorage.getItem("productDetails") != null){
    product = JSON.parse(localStorage.getItem("productDetails"));
}

window.onload = function(){
    // Update the cart and wishlist badges
    updateCartBadge();
    updateWishlistBadge();

    // Display the product details on the page
    displayProductDetails(product);

    // Update the wishlist display to reflect the current state
    updateWishlistDisplay(product.id);
};

// ^ ===================================================

// & Function to display product details on the page
function displayProductDetails(product){
    let cartona = '';

    cartona = `<div class="col-md-4 rounded-2 d-flex justify-content-center">
                    <img src="../${product.imageUrl}" alt="${product.name}">
                </div>

                <div class="col-md-8">
                    <h4 class="fw-bolder productName">${product.name}</h4>
                    <p>${product.description}</p>

                    <div class = "d-flex justify-content-between align-items-center mt-4">
                        <p class="mb-0">EGP${product.price}</p>
                        <i class="fa-regular fa-heart fs-4 heart" id="heart" onclick="toggleWishlist(${product.id})"></i>
                        <i class="fa-solid fa-heart fs-4 d-none red-heart" id="redHeart" onclick="toggleWishlist(${product.id})" style="color: #f50000;"></i>
                    </div>

                    <button class="btn text-white px-5 fw-bold mt-5" id="addToCartBtn" onclick="addToCart(${product.id})">Add To Cart</button>
                </div>`;
    
    productDetails.innerHTML = cartona; // Inject the HTML into the product details container
}

// ^ ===================================================

// & Function to add a product to the cart
function addToCart(productId){
    console.log(productId);

    // Check if the product already exists in the cart
    let existingProductIndex = productsAddedToCart.findIndex((item) => item.id === productId);
    console.log(existingProductIndex);

    if(existingProductIndex == -1){
        // If the product is not in the cart, add it
        productsAddedToCart.push(product);
    } else {
        // If the product is already in the cart, increment its quantity
        productsAddedToCart[existingProductIndex].quantity += 1;
    }

    // Save the updated cart to localStorage
    localStorage.setItem("productsAddedToCart", JSON.stringify(productsAddedToCart));

    // Update the cart badge
    updateCartBadge();

    // Show a toastr notification
    toastr.innerHTML = "Product added to cart successfully!";
    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    // Hide the toastr after 2 seconds
    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    }, 2000);
}

// ^ ===================================================

// & Function to update the wishlist badge
function updateWishlistBadge() {
    let totalItemsInWishlist = wishList.length; // Calculate the number of items in the wishlist

    // Update the navbar wishlist badge
    if (navbarWishlistBadge) {
        navbarWishlistBadge.innerHTML = totalItemsInWishlist; 
    }

    // Update the external wishlist badge
    if (externalWishlistBadge) {
        externalWishlistBadge.innerHTML = totalItemsInWishlist; 
    }
}

// ^ ===================================================

// & Function to update the cart badge
function updateCartBadge() {
    let totalItems = 0;

    // Calculate the total quantity of items in the cart
    productsAddedToCart.forEach((item) => {
        totalItems += item.quantity;
    });

    // Update the navbar cart badge
    if (navbarCartBadge) {
        navbarCartBadge.innerHTML = totalItems; 
    }

    // Update the external cart badge
    if (externalCartBadge) {
        externalCartBadge.innerHTML = totalItems; 
    }
}

// ^ ===================================================

// & Function to toggle a product's presence in the wishlist
function toggleWishlist(productId){
    let existingProductIndex = wishList.findIndex((item) => item.id === productId);

    if (existingProductIndex == -1) {
        // If the product is not in the wishlist, add it
        wishList.push(product);
    } else {
        // If the product is in the wishlist, remove it
        wishList.splice(existingProductIndex, 1);
    }

    // Save the updated wishlist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishList));

    // Show a toastr notification
    toastr.innerHTML = existingProductIndex == -1 ? "Product added successfully to your wishlist" : "Product removed successfully from your wishlist";

    // Refresh the wishlist display and badge
    updateWishlistDisplay(productId);
    updateWishlistBadge();

    console.log("Wishlist:", wishList);

    // Show toastr message with fading effect
    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    // Hide the toastr after 2 seconds
    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    }, 2000);
}

// ^ ===================================================

// & Function to update the wishlist display (icon state)
function updateWishlistDisplay(productId){
    let heartIcon = document.getElementById("heart"); // Regular heart icon
    let redHeartIcon = document.getElementById("redHeart"); // Filled red heart icon

    // Check if the product is in the wishlist
    let isInWishlist = wishList.some((item) => item.id === productId);

    if(isInWishlist){
        // If in wishlist, show the red heart and hide the regular heart
        heartIcon.classList.add("d-none");
        redHeartIcon.classList.remove("d-none");
    } else {
        // If not in wishlist, show the regular heart and hide the red heart
        heartIcon.classList.remove("d-none");
        redHeartIcon.classList.add("d-none");
    }
}

// ^ ===================================================