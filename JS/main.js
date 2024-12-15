let allProducts = document.querySelector("#products");
let toastr = document.querySelector("#toastr");
let searchInput = document.querySelector("#searchInput");
let navbarCartBadge = document.querySelector("#cartBadge");
let externalCartBadge = document.querySelector("#externalCartBadge");
let navbarWishlistBadge = document.querySelector("#wishlistBadge");
let externalWishlistBadge = document.querySelector("#externalWishlistBadge");
let productsAddedToCart = []; // Array to store products added to the cart
let wishList = []; // Array to store wishlist items

// & Product data array containing details of all products
let products = [
    {
        id : 1,
        name : `Woman Shawl`,
        description : `Material Polyester Blend Color Name Multi color Department Women.`,
        imageUrl : `Images/1.png`,
        price : 149,
        quantity : 1
    },
    {
        id : 2,
        name : `Woman Shawl`,
        description : `Material Polyester Blend Color Name Multi color Department Women.`,
        imageUrl : `Images/2.png`,
        price : 149,
        quantity : 1
    },
    {
        id : 3,
        name : `Woman Shawl`,
        description : `Material Polyester Blend Color Name Multi color Department Women`,
        imageUrl : `Images/3.png`,
        price : 149,
        quantity : 1
    },
    {
        id : 4,
        name : `Duramo 10 Running Shoes`,
        description : `Clean, fresh, understated style that takes your breath away. That's what you'll see when you pull these adidas kicks out of their box. Tonal 3-Stripes on the uncluttered synthetic leather upper rock a heritage vibe. A cushiony midsole adds soft support over the retro rubber outsole.`,
        imageUrl : `Images/4.png`,
        price : 1999,
        quantity : 1
    },
    {
        id : 5,
        name : `Hoops 3.0 Low Classic Vintage Shoes`,
        description : `Clean, fresh, understated style that takes your breath away. That's what you'll see when you pull these adidas kicks out of their box. Tonal 3-Stripes on the uncluttered synthetic leather upper rock a heritage vibe. A cushiony midsole adds soft support over the retro rubber outsole.`,
        imageUrl : `Images/5.png`,
        price : 1629,
        quantity : 1
    },
    {
        id : 6,
        name : `Galaxy 6 Running Shoes`,
        description : `Material Cotton Blend Color Name BLUE Department Men Material Composition MAIN FABRIC: 64% Cotton 36% Polyester Item Pack Quantity Single Pack Size Single Model Number W21770Z8-S7N-823090 Model Name W21770Z8-S7N-823090`,
        imageUrl : `Images/6.png`,
        price : 1629,
        quantity : 1
    },
    {
        id : 7,
        name : `PS5 DualSense Charging Station`,
        description : `Charge up to two DualSense Wireless Controllers at the same time without having to connect them to your PlayStation 5 Console Your Controllers charge as quickly as when connected to your PS5 Console – so you can free up USB ports without sacrificing performance Dock your DualSense Wireless Controllers quickly and easily with the charging station’s click-in design and leave them to charge at your convenience`,
        imageUrl : `Images/7.png`,
        price : 1245,
        quantity : 1
    },
    {
        id : 8,
        name : `Digital Camera With 15-45mm Lens Black`,
        description : `24.1 megapixel (aps-c) cmos sensor with iso 100-25600 (h: 51200) digic 8 image processor with auto lighting optimizer improved dual pixel cmos af and eye detection af (still/movie servo af support) 4k uhd 24p and hd 120p for slow motion vari-angle touchscreen lcd convenient for vlogging and various composition`,
        imageUrl : `Images/8.png`,
        price : 19699,
        quantity : 1
    },
    {
        id : 9,
        name : `Laptop With 16" Display Core I7-12700H`,
        description : `NVIDIA GeForce RTX 3060, 6 GB GDDR6 15.6 inch, FHD 1920x1080, 120Hz, Non-Touch, AG, WVA, LED-Backlit, 300 nit, Narrow Border 16 GB, 2 x 8 GB, DDR5, 4800 MHz, dual-channel 512GB M.2 PCIe NVMe Solid State Drive, Nahimic 3D Audio Office Home & Student 2021, US English orange qwerty backlit keyboard with numeric keypad and G-key`,
        imageUrl : `Images/9.png`,
        price : 42960,
        quantity : 1
    },
];

// ^ =========================================================

// & Check if the user is logged in. If not, redirect to the login page
if(localStorage.getItem("loggedInUser") === null){
    location.href = "../index.html";
}

// & Load cart data from localStorage if it exists
if(localStorage.getItem("productsAddedToCart") != null){
    productsAddedToCart = JSON.parse(localStorage.getItem("productsAddedToCart"));
}

// & Load wishlist data from localStorage if it exists
if(localStorage.getItem("wishlist") != null){
    wishList = JSON.parse(localStorage.getItem("wishlist"));
}

// & Perform necessary updates once the page has loaded
window.onload = function() {
    updateCartBadge(); // Update cart badge on load
    updateWishlistBadge(); // Update wishlist badge on load
    displayProducts(products); // Display all products
    updateWishlistDisplay(); // Sync wishlist icons with current data
};

// console.log(wishList);

// ^ =======================================================

// & Function to display all products on the home page
function displayProducts(product){
    
    let cartona = "";

    for (let i = 0; i < product.length; i++) {

        // Generate a short description from the full product description
        let shortDescription = `${product[i].description.split(" ").slice(0 , 10).join(" ")} ...`;
        cartona += `<div class="col-md-4">

                        <div class="product p-2 pb-3">
                            <div class="product-img d-flex justify-content-center" onclick="redirectToProductDetails(${product[i].id})">
                                <img src="../${product[i].imageUrl}" alt="${product[i].name}">
                            </div>
                            <div class="product-content px-2 pb-3 mt-3">
                                <p class = "productName">${product[i].name}</p>
                                <p class="h6 description" data-tooltip = "${product[i].description}">
                                    ${shortDescription}
                                </p>
                                <div class = "d-flex justify-content-between align-items-center mt-4">
                                    <p class="mb-0">EGP${product[i].price}</p>
                                    <i class="fa-regular fa-heart fs-4" id="heart-${product[i].id}" onclick="toggleWishlist(${i})"></i>
                                    <i class="fa-solid fa-heart fs-4 d-none" id="redHeart-${product[i].id}" onclick="toggleWishlist(${i})" style = "color : #f50000;"></i>
                                </div>
                                <button class="btn text-white px-5 fw-bold d-block mx-auto mt-4" id="addToCartBtn" onclick = "addProductToCart(${i})">Add To Cart</button>
                            </div>
                        </div>
                    </div>`
    }
    // console.log(cartona);
    
    // Inject the constructed HTML into the page
    allProducts.innerHTML = cartona;
}

// ^ =======================================================

// & Function to add a product to the cart
function addProductToCart(productIndex){
    let chosenProduct = products[productIndex]; // Get the product based on the index provided
    // console.log(chosenProduct);

    let existingProductIndex = productsAddedToCart.findIndex((item) => item.id === chosenProduct.id);

    if(existingProductIndex !== -1){
        // If the product is already in the cart, increment its quantity
        productsAddedToCart[existingProductIndex].quantity +=1;
    }
    else{
        // Otherwise, add the product to the cart
        productsAddedToCart.push(chosenProduct);
    }

    // console.log(productsAddedToCart);

    // Save updated cart to localStorage
    localStorage.setItem("productsAddedToCart" , JSON.stringify(productsAddedToCart));

    updateCartBadge(); // Refresh cart badge

    // Display success message using toastr
    toastr.innerHTML = "Product added to cart successfully!"
    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    }, 2000);
}

// ^ =======================================================

//& Attach an event listener to the search input to trigger the searchProducts function on every keyup event
searchInput.addEventListener("keyup", searchProducts);

function searchProducts() {
    // Get the value entered by the user in the search input field, converted to lowercase for case-insensitive matching
    let searchInputValue = searchInput.value.toLowerCase();

    // Filter the products array to include only those products whose name matches the search input
    let filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchInputValue) // Check if the product name includes the search input value
    );

    // Update the product display with the filtered products
    displayProducts(filteredProducts);
}

// ^ =======================================================

// & Function to update the cart badge with the total number of items
function updateCartBadge(){
    let totalItems = 0;
    
    productsAddedToCart.forEach((item) => {
        totalItems += item.quantity; // Calculate total quantity
    })

    // Update the navbar cart badge
    if (navbarCartBadge) {
        navbarCartBadge.innerHTML = totalItems; 
    }

    // Update the external cart badge
    if (externalCartBadge) {
        externalCartBadge.innerHTML = totalItems; 
    }
}

// ^ =======================================================

// & Function to update the wishlist icons on the products
function updateWishlistDisplay(){

    products.forEach((product) => {

        let heartIcon = document.querySelector(`#heart-${product.id}`);
        let redHeartIcon = document.querySelector(`#redHeart-${product.id}`);

        // Check if the product is in the wishlist
        let isInWishlist = wishList.some((item) => item.id === product.id); // some return true or false

        if(isInWishlist){
            heartIcon.classList.add("d-none");
            redHeartIcon.classList.remove("d-none");
        }
        else{
            heartIcon.classList.remove("d-none");
            redHeartIcon.classList.add("d-none");
        }
    })

}

// ^ =======================================================

// & Function to add or remove a product from the wishlist
function toggleWishlist(productIndex){

    // Retrieve the selected product object from the 'products' array using the provided index
    let productChosen = products[productIndex];

    // Check if the product is already in the wishlist
    let existingProductIndex = wishList.findIndex((item) => item.id === productChosen.id);

    if(existingProductIndex == -1){
        // If product is not in wishlist, add it
        wishList.push(productChosen);
    }
    else{
        // If product is already in wishlist, remove it
        wishList.splice(existingProductIndex,1);
    }

    // Save updated wishlist to localStorage
    localStorage.setItem("wishlist" , JSON.stringify(wishList));

    toastr.innerHTML = existingProductIndex == -1 ? "Product added successfully to your wishlist" : "Product removed successfully from your wishlist";;
    updateWishlistDisplay(); // Refresh icons
    updateWishlistBadge(); // Refresh badge

    console.log("Wishlist:", wishList);

    // Show toastr message with fading effect
    toastr.style.opacity = 1;
    toastr.style.top = "80px";

    setTimeout(() => {
        toastr.style.opacity = 0;
        toastr.style.top = "-100px";
    }, 2000);
}

// ^ =======================================================

// & Function to update the wishlist badge with the total number of items
function updateWishlistBadge(){
    // Count wishlist items
    let totalItemsInWishlist = wishList.length;

    // Update the navbar wishlist badge
    if (navbarWishlistBadge) {
        navbarWishlistBadge.innerHTML = totalItemsInWishlist; 
    }

    // Update the external wishlist badge
    if (externalWishlistBadge) {
        externalWishlistBadge.innerHTML = totalItemsInWishlist; 
    }
}

// ^ =======================================================

// & Function to redirects the user to the product details page after saving the selected product's details in localStorage.
function redirectToProductDetails(productId){

    // Find the product details from the products array using the provided product ID
    let selectedProduct = products.find((item) => item.id === productId);

    // console.log(selectedProduct);

    // Save the selected product details in localStorage as a JSON string for use on the product details page
    localStorage.setItem("productDetails" , JSON.stringify(selectedProduct));
    
    // Redirect the user to the product details page
    location.href = "../HTML/productDetails.html";
}