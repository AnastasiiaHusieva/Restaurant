// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

document.addEventListener("DOMContentLoaded", () => {
  console.log("DataDine JS imported successfully!");
});
window.onscroll = function () {
  const formFields = document.querySelector(".form-style");
  const tableheader = document.querySelector(".table-header");
  const description = document.querySelector(".stickyDescription");
  const name = document.querySelector(".stickyName");
  const price = document.querySelector(".stickyPrice");
  const title = document.querySelector(".addfood-title");

  const scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition > 220) {
    formFields.classList.add("sticky");
    tableheader.classList.add("sticky-header");
    description.classList.add("spacebetween");
    name.classList.add("nameSpacebetween");
    price.classList.add("betweenPrice");
    title.classList.add("titlestick");
  } else {
    formFields.classList.remove("sticky");
    tableheader.classList.remove("sticky-header");
    description.classList.remove("spacebetween");
    name.classList.remove("nameSpacebetween");
    price.classList.remove("betweenPrice");
    title.classList.remove("titlestick");
  }
};
