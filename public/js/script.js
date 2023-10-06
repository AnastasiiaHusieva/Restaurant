const baseUrl = 'https://ill-tan-wildebeest-wig.cyclic.app'

document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    if (
      window.location.href === `${baseUrl}/admin/add-meals-form` ||
      window.location.href === `${baseUrl}/adminusers`
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
  const open = document.getElementById("open");
  const closeBtn = document.getElementById("closeBtn");
  const profileBar = document.getElementById("profileBar");
 console.log(open)
  document.addEventListener("click", (event) => {
   
    if (open) {
      if (open.contains(event.target)) {
        profileBar.style.display = "block";
      } else if (!profileBar.contains(event.target)) {
        profileBar.style.display = "none";
      }
    }
  });

  closeBtn.addEventListener("click", () => {
    profileBar.style.display = "none";
  });


    const isAdmin = {{isAdmin}}; 
    const profileBar = document.getElementById("profileBar");
    if (isAdmin) {
      profileBar.style.height = "28rem";
    } else {
      profileBar.style.height = "18rem";
    }
});
