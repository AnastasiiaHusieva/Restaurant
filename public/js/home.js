
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



let carouselItems = [];

const refreshCarousel = () => {
    const carousel = document.querySelector(".carousel-container");
    carousel.innerHTML = "";
    carouselItems.forEach((item) => {
        carousel.innerHTML += `
        <div class="carousel-item">
            <img src="${item.itemImageURL}" alt="Food">
            <h3>${item.itemName}</h3>
            <p>${item.itemDescription}</p>
            <p>${item.itemPrice}</p>
            <button onclick="addToCart(${item._id})" class="add-to-cart-button">Add to Cart</button>
        </div>
        `;
    });
}

const getCarouselItems = () => {

    fetch("/products")
    .then((response) => response.json())
    .then((data) => {
        carouselItems = data;
        refreshCarousel();
    })
    .catch((err) => {
        console.log(err);
    });

}

const addToCart = (id) => { 

    // do animations here

    const item = carouselItems.find((item) => item._id === id);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // see if the item exists in ther cart, if so, add 1
    // if not, add the item to the cart with a quantity of 1


    console.log(id);
}

window.onload = () => {

    getCarouselItems();
  
}