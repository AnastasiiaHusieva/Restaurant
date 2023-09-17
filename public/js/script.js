// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

document.addEventListener("DOMContentLoaded", () => {
  console.log("DataDine JS imported successfully!");
});
document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    const formFields = document.querySelector(".form-style");
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > 220) {
      formFields.classList.add("sticky");
    } else {
      formFields.classList.remove("sticky");
    }
  };
});

// To display account pop-up
const open = document.getElementById("open");
const closeBtn = document.getElementById("closeBtn");
const profileBar = document.getElementById("profileBar");

open.addEventListener("click", (event) => {
  event.preventDefault();
  profileBar.style.display = "block";
  console.log("display block");
});

closeBtn.addEventListener("click", () => {
  profileBar.style.display = "none";
  console.log("display none added ");
});

// document.addEventListener('click', (event) => {
//   if (!profileBar.contains(event.target) && event.target !== open) {
//       profileBar.style.display = 'none';
//       console.log("display none")
//   }
// });
