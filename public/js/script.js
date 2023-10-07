const baseUrl = 'http://localhost:3000';

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
  const profileBar = document.getElementById("profileBar");

  // Add a click event listener to toggle the popup when the button is clicked.
  open.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click from propagating
    if (profileBar.style.display === "block") {
      profileBar.style.display = "none"; // Close the popup if it's open
    } else {
      profileBar.style.display = "block"; // Open the popup if it's closed
    }
  });

  // Add a global click event listener to close the popup when clicking anywhere on the screen while it's open.
  document.addEventListener("click", (event) => {
    if (profileBar.style.display === "block" && event.target !== open && !profileBar.contains(event.target)) {
      profileBar.style.display = "none";
    }
  });
});



// JavaScript code to determine if the user is an admin or not

const isAdmin = true; 

// Select the profileBar element
const profileBar = document.getElementById("profileBar");

// Check if the user is an admin
if (isAdmin) {
  // Set a height of 28rem for the profile bar if the user is an admin
  profileBar.style.height = "28rem"; // This is where you set the height for admin users
} else {
  // Set a height of 18rem for the profile bar if the user is not an admin
  profileBar.style.height = "18rem"; // This is where you set the height for non-admin users
}

 