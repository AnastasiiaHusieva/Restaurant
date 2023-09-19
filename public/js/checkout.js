    const paymentCard = document.querySelector(".payment-card");
    const card = document.querySelector(".card");
    const paymentPaypal = document.querySelector(".payment-paypal");
    const paypal = document.querySelector(".paypal");
document.addEventListener("DOMContentLoaded", () => {

  
   paymentCard.addEventListener("click", () => {
       if (card.style.display === "block") {
         card.style.display = "none";
         console.log(" card none ")
       } else {
         card.style.display = "block";
         console.log(" card block ")
       }
     });
       
    paymentPaypal.addEventListener("click", () => {
      if (paypal.style.display === "block") {
        paypal.style.display = "none";
        console.log(" card none ")
      } else {
        paypal.style.display = "block";
        console.log(" card block ")
      }
     });
   });
   