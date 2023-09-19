// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

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
});
