// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("DataDine JS imported successfully!");
});
window.onscroll = function () {
  const formFields = document.querySelector(".form-style");
  const scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition > 208) {
    formFields.classList.add("sticky");
  } else {
    formFields.classList.remove("sticky");
  }
};
