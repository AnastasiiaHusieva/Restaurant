// Wrap your code in an event listener for the DOMContentLoaded event
const cartDiv = document.getElementById("carting");
const checkoutBtn = document.querySelector(".cartBTN");
const orderPrice = document.querySelector(".total");

const baseUrl = "https://expensive-ruby-hospital-gown.cyclic.app"
//const baseUrl = process.env.BASEURL
//console.log(process.env.BASEURL)
document
  .addEventListener("DOMContentLoaded", function () {
    fetch(`${baseUrl}/cart/json`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`Request failed with status: ${res.status}`);
        }
      })
      .then((data) => {
        // console.log("lalalalallaal", data.userObject.cart);
        if (data.userObject.cart.length > 0) {
          const cartItems = data.userObject.cart;
          let totalPrice = 0;

          const createdP = document.createElement("p");
          let nameHolder = [];
          let nameRepeated = [];
          let quantity = {};

          cartDiv.innerHTML = "";
          cartItems.forEach((item) => {
            if (!nameHolder.includes(item.itemName)) {
              nameHolder.push(item.itemName);
              quantity[item.itemName] = 1;
              // console.log(nameHolder);

              const subtotal = item.itemPrice * quantity[item.itemName];

              totalPrice += subtotal;

              const div = document.createElement("div");
              div.classList.add(
                "cartItems",
                "col-lg-2",
                "col-md-4",
                "col-sm-6"
              );
              div.setAttribute("data-items-id", item._id);
              const itemId = `item-${nameHolder.length}`;
              div.innerHTML = `
                  <div class="cart-item-description">
                     <p class="cart-itemName text-center"><strong>${item.itemName}</strong></p>
                     <p>$${item.itemPrice}</p>
                     <p class= "cartItemSubtotal" data-subtotal-id="${itemId}">Sum: $${subtotal}</p>
                  </div>

                    <div class="img-cart"><img src="${
                      item.itemImageURL
                    }" alt="food images" class="card-img-top" />
                    </div>
                    <span id='icon-container'>
                    <button class="cart-icon plus-icon">+</button>
                    <div><span class="quantity" data-item-id="${itemId}">${
                quantity[item.itemName]
              }</span></div>
                    <button class="cart-icon minus-icon">-</button>
                    </span>`;

              cartDiv.appendChild(div);
            } else {
              // Find the specific quantity element within the current item's div and update it
              // console.log("siiiiiiiiiiiii", nameHolder, quantity);
              const itemId = `item-${nameHolder.indexOf(item.itemName) + 1}`;
              quantity[item.itemName]++;

              const subtotal = item.itemPrice * quantity[item.itemName];
              // console.log("noooooooooooo", quantity);
              const quantityElement = document.querySelector(
                `[data-item-id="${itemId}"]`
              );
              if (quantityElement) {
                quantityElement.textContent = quantity[item.itemName];
              }
              totalPrice = totalPrice - (item.itemPrice * (quantity[item.itemName] - 1)) + subtotal;
              const subtotalElement = document.querySelector(`[data-subtotal-id="${itemId}"]`);
              if (subtotalElement) {
                subtotalElement.textContent = `Sum: $${subtotal}`;
              }
            }
          });
          createdP.textContent = totalPrice;
          // console.log("the total", createdP);
          const amt = document.querySelector(".amt");
          amt.innerHTML = "Total : $" + totalPrice;
        } else if (data.userObject.cart.length === 0) {
          checkoutBtn.style.display = "none";
          cartDiv.innerHTML = "Your cart is empty";
          // console.log("ahhh the length is 0")
          throw new Error("Invalid data received from the server");
        }
        document.querySelectorAll(".plus-icon").forEach((plusIcon) => {
          plusIcon.addEventListener("click", (event) => {
            location.reload();
            const itemId = event.target
              .closest(".cartItems")
              .getAttribute("data-items-id");

            console.log("Clicked plus icon for item ID:", itemId);

            const createItemClicked = { itemId };

            fetch(`${baseUrl}/cart/add`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(createItemClicked),
            })
              .then((res) => {
                if (res.status === 200) {
                  // Item was added successfully, you can update the cart display here
                  console.log("Item added to cart:", createItemClicked);
                } else {
                  throw new Error(`Request failed with status: ${res.status}`);
                }
              })
              .catch((error) => console.error(error));
          });
        });
        document
          .querySelectorAll(".minus-icon")
          .forEach((minusIcon) => {
            minusIcon.addEventListener("click", (event) => {
              location.reload();
              const itemId = event.target
                .closest(".cartItems")
                .getAttribute("data-items-id");

              console.log("Clicked minus icon for item ID:", itemId);

              const subtractedItemClicked = { itemId };

              fetch(`${baseUrl}/cart/pull`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(subtractedItemClicked),
              }).then((res) => {
                if (res.status === 200) {
                  const quantityElement = event.target
                    .closest(".cartItems")
                    .querySelector(".quantity");
                  const currentQuantity = parseInt(
                    quantityElement.textContent,
                    10
                  );
                  if (currentQuantity > 1) {
                    quantityElement.textContent = currentQuantity - 1;
                    // Update the total price here
                  } else {
                    // Remove the item from the cart display
                    const cartItem = event.target.closest(".cartItems");
                    cartItem.parentNode.removeChild(cartItem);
                  }
                } else {
                  throw new Error(`Request failed with status: ${res.status}`);
                }
              });
            });
          })
          .catch((error) => console.error(error));
      })
       .catch((error) => console.error(error));
  })
 
