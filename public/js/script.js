// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
const addtoCartBtn = document.querySelectorAll(".addToCartbtn");

document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    if (
      window.location.href === "http://localhost:3000/admin/add-meals-form" ||
      window.location.href === "http://localhost:3000/adminusers"
    ) {
      const formFields = document.querySelector(".form-style");
      const scrollPosition = window.scrollY || window.pageYOffset;

      if (scrollPosition > 220) {
        formFields.classList.add("sticky");
      } else {
        formFields.classList.remove("sticky");
      }
    }
  };

  addtoCartBtn.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

const open = document.getElementById("open");
const closeBtn = document.getElementById("closeBtn");
const profileBar = document.getElementById("profileBar");

document.addEventListener("click", (event) => {
  if (open) {
  if (open.contains(event.target)) {
    profileBar.style.display = "block";
  } else if (!profileBar.contains(event.target)) {
    profileBar.style.display = "none";
  }}
});

closeBtn.addEventListener("click", () => {
  profileBar.style.display = "none";
});

// To display bonuses

const bonuses = document.getElementById("bonuses");

profileButton.addEventListener("click", () => {
  bonuses.textContent = userData.bonuses;
});
