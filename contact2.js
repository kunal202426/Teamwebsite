function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');  // Toggles the 'active' class to show/hide the menu
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
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
