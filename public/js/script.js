// DOMContentLoaded event listener to ensure the code runs when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DataDine JS imported successfully!");
  
  // Account Pop-up
  const open = document.getElementById('open');
  const closeBtn = document.getElementById('closeBtn');
  const profileBar = document.getElementById('profileBar');

  open.addEventListener('click', (event) => {
    event.preventDefault();
    profileBar.style.display = 'block';
    console.log("Display block");
  });

  closeBtn.addEventListener('click', () => {
    profileBar.style.display = 'none';
    console.log("Display none");
  });
});

