// Define a global cart object to store selected items
const cart = [];

// Function to fetch items and refresh the carousel
const fetchAndRefreshCarousel = (category, carouselSelector) => {
  fetch(`/items/${category}`)
    .then((response) => response.json())
    .then((data) => {
      refreshCarousel(carouselSelector, data);
    })
    .catch((error) => {
      console.error(`Error fetching items for ${category}:`, error);
    });
};

// Function to refresh the carousel with items
const refreshCarousel = (carouselSelector, items) => {
  const carousel = document.querySelector(carouselSelector);
  carousel.innerHTML = "";
  items.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.className = "item";
    itemContainer.innerHTML = `
      <img src="${item.itemImageURL}" alt="${item.itemName}">
      <h3>${item.itemName}</h3>
      <p>${item.itemDescription}</p>
      <p>${item.itemPrice !== null ? `${item.itemPrice} €` : "Price not available"}</p>
    `;

    // Create an "Add to Cart" button dynamically
    const addToCartButton = document.createElement("button");
    addToCartButton.className = "add-to-cart-button";
    addToCartButton.textContent = "Add to Cart";

    // Set the data-item attribute with the item's ID
    addToCartButton.setAttribute("data-item", item._id.toString());

    // Add a click event listener to the button
    addToCartButton.addEventListener("click", handleAddToCartClick);

    // Append the button to the item container
    itemContainer.appendChild(addToCartButton);

    // Append the item container to the carousel
    carousel.appendChild(itemContainer);
  });

  // Add event listeners to "Add to Cart" buttons within the refreshed carousel
  addAddToCartListeners();
};

// Function to add an item to the cart
const addToCart = (itemId) => {
  // Check if itemId is undefined or null
  if (itemId === undefined || itemId === null) {
    console.error("Invalid item ID");
    return;
  }

  // Find the item with the given itemId
  const selectedItem = cart.find((item) => item.itemId === itemId);

  if (selectedItem) {
    // If the item is already in the cart, increase its quantity
    selectedItem.quantity++;
  } else {
    // If the item is not in the cart, add it with a quantity of 1
    cart.push({ itemId, quantity: 1 });
  }    
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(JSON.parse(localStorage.getItem("cart")));






  // Update the cart display (replace this with your cart display logic)
  updateCartDisplay();
};

// Function to update the cart display (replace this with your cart display logic)
const updateCartDisplay = () => {
  // Replace this with code to display the cart content, e.g., in a sidebar
  console.log("Cart updated:", cart);
};

// Event listener for the "Add to Cart" buttons
const handleAddToCartClick = (event) => {
  event.preventDefault();
  const button = event.target;
  const itemId = button.getAttribute("data-item");
  addToCart(itemId);
};

// Event listener for the "Add to Cart" buttons
const addAddToCartListeners = () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

  // Remove any existing click event listeners before adding new ones
  addToCartButtons.forEach((button) => {
    button.removeEventListener("click", handleAddToCartClick);
  });

  // Add a single click event listener to all buttons
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCartClick);
  });
};

// Fetch items and populate carousels on window load
window.onload = () => {
  fetchAndRefreshCarousel("TopChoice", ".TopChoice");
  fetchAndRefreshCarousel("Pizza", ".pizza");
  fetchAndRefreshCarousel("Salads", ".salads");
  fetchAndRefreshCarousel("Burgers", ".burgers");
  fetchAndRefreshCarousel("Sushi", ".sushi");
  fetchAndRefreshCarousel("Soups", ".soups");
  fetchAndRefreshCarousel("Desserts", ".desserts");
  fetchAndRefreshCarousel("Cocktails", ".cocktails");

  // Add event listeners to "Add to Cart" buttons
  addAddToCartListeners();
};



//


// CART LOGIC

// CART LOGIC












