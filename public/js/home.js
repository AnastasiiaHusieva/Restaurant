const addToCartButton = document.querySelectorAll(".add-to-cart-button");
addToCartButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log("button clicked");
  });
});

// Carousel Item

/*

  <div class="carousel-item">
      <img src="{{this.itemImageURL}}" alt="Food">
      <h3>{{this.itemName}}</h3>
      <p>{{this.ingredients}}</p>
      <button class="add-to-cart-button">Add to Cart</button>
  </div>

*/
let carouselItemsTopChoice = [];

const refreshCarouselTopChoice = () => {
  const carousel = document.querySelector(".TopChoice");
  carousel.innerHTML = "";
  carouselItemsTopChoice.forEach((item) => {
    carousel.innerHTML += `
        <div class="item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button class="add-to-cart-button" data-item="${item.itemId}">Add to Cart</button>
        </div>
        `;
  });
};
//
const getCarouselItemsTopChoice = () => {
  const category = "TopChoice"; // Replace with the actual category value
  fetch(`/items/${category}`) // Use backticks (``) for string interpolation
      .then((response) => response.json())
      .then((data) => {
          carouselItemsTopChoice = data;
          refreshCarouselTopChoice();
          console.log(data);
      })
      .catch((error) => {
          console.error("Error fetching items:", error);
      });
};

let carouselItemsPizza = [];

const refreshCarouselPizza = () => {
  const carousel = document.querySelector(".Pizza");
  carousel.innerHTML = "";
  carouselItemsPizza.forEach((item) => {
    carousel.innerHTML += `
        <div class="item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button class="add-to-cart-button" data-item="${item.itemId}">Add to Cart</button>
        </div>
        `;
  });
};
//
const getCarouselItemsPizza = () => {
  const category = "Pizza"; // Replace with the actual category value
  fetch(`/items/${category}`) // Use backticks (``) for string interpolation
      .then((response) => response.json())
      .then((data) => {
          carouselItemsPizza = data;
          refreshCarouselPizza();
          console.log(data);
      })
      .catch((error) => {
          console.error("Error fetching items:", error);
      });
};

let carouselItemsSalads = [];

const refreshCarouselSalads = () => {
  const carousel = document.querySelector(".Salads");
  carousel.innerHTML = "";
  carouselItemsSalads.forEach((item) => {
    carousel.innerHTML += `
        <div class="item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button class="add-to-cart-button" data-item="${item.itemId}">Add to Cart</button>
        </div>
        `;
  });
};
//
const getCarouselItemsSalads = () => {
  const category = "Salads"; // Replace with the actual category value
  fetch(`/items/${category}`) // Use backticks (``) for string interpolation
      .then((response) => response.json())
      .then((data) => {
          carouselItemsSalads = data;
          refreshCarouselSalads();
          console.log(data);
      })
      .catch((error) => {
          console.error("Error fetching items:", error);
      });
};

let carouselItemsBurgers = [];

const refreshCarouselBurgers = () => {
  const carousel = document.querySelector(".Burgers");
  carousel.innerHTML = "";
  carouselItemsBurgers.forEach((item) => {
    carousel.innerHTML += `
        <div class="item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button class="add-to-cart-button" data-item="${item.itemId}">Add to Cart</button>
        </div>
        `;
  });
};
//
const getCarouselItemsBurgers = () => {
  const category = "Burgers"; // Replace with the actual category value
  fetch(`/items/${category}`) // Use backticks (``) for string interpolation
      .then((response) => response.json())
      .then((data) => {
          carouselItemsBurgers = data;
          refreshCarouselBurgers();
          console.log(data);
      })
      .catch((error) => {
          console.error("Error fetching items:", error);
      });
};

let carouselItemsSushi = [];

const refreshCarouselSushi = () => {
  const carousel = document.querySelector(".sushi");
  carousel.innerHTML = "";
  carouselItemsSushi.forEach((item) => {
    carousel.innerHTML += `
        <div class="item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button class="add-to-cart-button" data-item="${item.itemId}">Add to Cart</button>
        </div>
        `;
  });
};
//
const getCarouselItemsSushi = () => {
  const category = "sushi"; // Replace with the actual category value
  fetch(`/items/${category}`) // Use backticks (``) for string interpolation
      .then((response) => response.json())
      .then((data) => {
          carouselItemsSushi = data;
          refreshCarouselSushi();
          console.log(data);
      })
      .catch((error) => {
          console.error("Error fetching items:", error);
      });
};

let carouselItemsSoups = [];

const refreshCarouselSoups = () => {
  const carousel = document.querySelector(".Soups");
  carousel.innerHTML = "";
  carouselItemsSoups.forEach((item) => {
    carousel.innerHTML += `
        <div class="item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button class="add-to-cart-button" data-item="${item.itemId}">Add to Cart</button>
        </div>
        `;
  });
};
//
const getCarouselItemsSoups = () => {
  const category = "Soups"; // Replace with the actual category value
  fetch(`/items/${category}`) // Use backticks (``) for string interpolation
      .then((response) => response.json())
      .then((data) => {
          carouselItemsSoups = data;
          refreshCarouselSoups();
          console.log(data);
      })
      .catch((error) => {
          console.error("Error fetching items:", error);
      });
};

let carouselItemsDesserts = [];

const refreshCarouselDesserts = () => {
  const carousel = document.querySelector(".Desserts");
  carousel.innerHTML = "";
  carouselItemsDesserts.forEach((item) => {
    carousel.innerHTML += `
        <div class="item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button class="add-to-cart-button" data-item="${item.itemId}">Add to Cart</button>
        </div>
        `;
  });
};
//
const getCarouselItemsDesserts = () => {
  const category = "Desserts"; // Replace with the actual category value
  fetch(`/items/${category}`) // Use backticks (``) for string interpolation
      .then((response) => response.json())
      .then((data) => {
          carouselItemsDesserts = data;
          refreshCarouselDesserts();
          console.log(data);
      })
      .catch((error) => {
          console.error("Error fetching items:", error);
      });
};

let carouselItemsCocktails = [];

const refreshCarouselCocktails = () => {
  const carousel = document.querySelector(".Cocktails");
  carousel.innerHTML = "";
  carouselItemsCocktails.forEach((item) => {
    carousel.innerHTML += `
        <div class="item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button class="add-to-cart-button" data-item="${item.itemId}">Add to Cart</button>
        </div>
        `;
  });
};

// Assuming carouselItemsCocktails is an array of items with unique item IDs

//
const getCarouselItemsCocktails = () => {
  const category = "Cocktails"; // Replace with the actual category value
  fetch(`/items/${category}`) // Use backticks (``) for string interpolation
      .then((response) => response.json())
      .then((data) => {
          carouselItemsCocktails = data;
          refreshCarouselCocktails();
          console.log(data);
      })
      .catch((error) => {
          console.error("Error fetching items:", error);
      });
};






window.onload = () => {
  getCarouselItemsTopChoice();
  getCarouselItemsPizza();
  getCarouselItemsSalads();
  getCarouselItemsBurgers();
  getCarouselItemsSushi();
  getCarouselItemsSoups();
  getCarouselItemsDesserts();
  getCarouselItemsCocktails();

};
/*
const addToCart = (id) => {
  // do animations here
  

  const item = carouselItems.find((item) => item._id === id);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // see if the item exists in ther cart, if so, add 1
  // if not, add the item to the cart with a quantity of 1

  console.log(id);
};
*/
let cart = JSON.parse(localStorage.getItem("cart")) || ["hello"];
const addToCart = (_id) => {
  const item = carouselItems.find((item) => item._id === _id);
  const cartItem = cart.find((item) => item._id === _id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

