const handleScroll = () => {
  const formFields = document.querySelector(".form-style");
  const scrollPosition = window.scrollY || window.pageYOffset;

  // Check if the elements exist before accessing their classList
  const tableheader = document.querySelector(".tableheader");
  const description = document.querySelector(".description");
  const name = document.querySelector(".name");
  const price = document.querySelector(".price");
  const title = document.querySelector(".title");

  if (scrollPosition > 220) {
    // Check if the elements exist before adding classes
    if (tableheader) tableheader.classList.add("sticky-header");
    if (description) description.classList.add("spacebetween");
    if (name) name.classList.add("nameSpacebetween");
    if (price) price.classList.add("betweenPrice");
    if (title) title.classList.add("titlestick");
  } else {
    // Check if the elements exist before removing classes
    if (tableheader) tableheader.classList.remove("sticky-header");
    if (description) description.classList.remove("spacebetween");
    if (name) name.classList.remove("nameSpacebetween");
    if (price) price.classList.remove("betweenPrice");
    if (title) title.classList.remove("titlestick");
  }
};

// Event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  console.log("DataDine JS imported successfully!");

  // Set up the scrolling behavior when the DOM is loaded
  window.onscroll = handleScroll;
});

// To display the account pop-up
const open = document.getElementById("open");
const closeBtn = document.getElementById("closeBtn");
const profileBar = document.getElementById("profileBar");

// Event listener for opening the profile bar
open.addEventListener("click", (event) => {
  event.preventDefault();
  profileBar.style.display = "block";
  console.log("Display block");
});

// Event listener for closing the profile bar
closeBtn.addEventListener("click", () => {
  profileBar.style.display = "none";
  console.log("Display none");
});

// Event listener to close the profile bar when clicking outside of it (uncomment if needed)
/*
document.addEventListener('click', (event) => {
  if (!profileBar.contains(event.target) && event.target !== open) {
    profileBar.style.display = 'none';
    console.log("Display none");
  }
});
*/





