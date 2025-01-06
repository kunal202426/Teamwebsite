function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');  // Toggles the 'active' class to show/hide the menu
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const popup = document.querySelector(".popup");
    const closePopup = document.querySelector(".close-popup");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission
      showPopup(); // Show popup
      form.reset(); // Reset form
    });
  
    closePopup.addEventListener("click", () => {
      hidePopup(); // Hide popup
    });
  
    function showPopup() {
      popup.classList.remove("hidden", "exiting");
      popup.style.display = "block"; // Ensure it's visible
    }
  
    function hidePopup() {
      popup.classList.add("exiting");
      setTimeout(() => {
        popup.classList.add("hidden");
        popup.style.display = "none"; // Fully hide the popup
      }, 500); // Match transition duration
    }
  });
  
  document.querySelector('.close-btn').addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    popup.classList.add('exiting'); // Add animation
    setTimeout(() => popup.classList.add('hidden'), 500); // Hide after animation
  });
  

// // Add event listener to the form submit
// document.getElementById('contactForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent form from refreshing the page

//     // Show the popup
//     const popup = document.getElementById('popup');
//     popup.classList.add('show');
//     popup.classList.remove('hide');

//     // Reset the form after submission
//     this.reset();
// });

// // Add event listener to the close button
// document.getElementById('popupClose').addEventListener('click', function () {
//     const popup = document.getElementById('popup');
//     popup.classList.remove('show'); // Remove the popup from view
//     popup.classList.add('hide');   // Reset state for future submissions
// });
