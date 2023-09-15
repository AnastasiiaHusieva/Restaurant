const express = require("express");
const router = express.Router();
module.exports = router;

//const progressRound = window.querySelector('.progress-round');

// Function to update the progress indicator position
function updateProgressIndicator(status) {
  switch (status) {
    case 'Confirmed':
      progressRound.style.left = '0%';
      break;
    case 'Preparation':
      progressRound.style.left = '25%';
      break;
    case 'On the way':
      progressRound.style.left = '50%';
      break;
    case 'Delivered':
      progressRound.style.left = '75%';
      break;
    default:
      break;
  }
}
