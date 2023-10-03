// Wrap your code in an event listener for the DOMContentLoaded event
const cartDiv = document.getElementById("carting");
const checkoutBtn = document.querySelector(".cartBTN");
const orderPrice = document.querySelector(".total");

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/cart/json")
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

            totalPrice += item.itemPrice;

            const div = document.createElement("div");
            div.classList.add("cartItems", "col-lg-2", "col-md-4", "col-sm-6");
            div.setAttribute("data-items-id", item._id);
            const itemId = `item-${nameHolder.length}`;
            div.innerHTML = `
            <div class="cart-item-description">
            <p>Quantity <span class="quantity" data-item-id="${itemId}">${
              quantity[item.itemName]
            }</span></p>
            <p class="cart-itemName"><strong>${item.itemName}</strong></p>
            
                    
                    <p >${item.itemDescription}</p>
                    <p>${item.itemCategory}</p>
                    <p class='cartItemPrice'>$${item.itemPrice}</p>
                    
                    </div>
                    <div class="img-cart"><img src="${
                      item.itemImageURL
                    }" alt="food images" class="card-img-top" /></div><span id='icon-container'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cart-icon plus-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cart-icon minus-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                </svg>
                </span>
                   
                  
                `;

            cartDiv.appendChild(div);
          } else {
            // Find the specific quantity element within the current item's div and update it
            // console.log("siiiiiiiiiiiii", nameHolder, quantity);
            const itemId = `item-${nameHolder.indexOf(item.itemName) + 1}`;
            quantity[item.itemName]++;
            // console.log("noooooooooooo", quantity);
            const quantityElement = document.querySelector(
              `[data-item-id="${itemId}"]`
            );
            if (quantityElement) {
              quantityElement.textContent = quantity[item.itemName];
            }
            totalPrice += item.itemPrice;
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
        plusIcon.addEventListener("click", () => {
          // event.preventDefault();
          const itemId = event.target
            .closest(".cartItems")
            .getAttribute("data-items-id");

          console.log("Clicked plus icon for item ID:", itemId);

          const createItemClicked = { itemId };

          fetch("http://localhost:3000/cart/add", {
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
    })
    .catch((error) => console.error(error));
});
