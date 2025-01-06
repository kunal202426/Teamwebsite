document.addEventListener("DOMContentLoaded", function () {
  const teamMembers = document.querySelectorAll(".team-member");
  const backgroundElement = document.getElementById('rotating-background');
  const backgroundSection = document.getElementById('background-section');
  const images = ['BG.png', 'BG.png', 'BG.png']; // Array of images for rotating background
  let currentImageIndex = 0;

  // Function to check if an element is in the viewport
  function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  // Function to add "show" class to elements in view
  function revealTeamMembers() {
      teamMembers.forEach((member) => {
          if (isElementInViewport(member)) {
              member.classList.add("show");
          }
      });
  }

  // Initial check
  revealTeamMembers();

  // Check again on scroll
  window.addEventListener("scroll", () => {
      revealTeamMembers();

      // Add class to hide background image when user scrolls
      if (window.scrollY > window.innerHeight * 0.5) {
          document.body.classList.add('background-hidden');
      } else {
          document.body.classList.remove('background-hidden');
      }

      // Add class to show content when it comes into view
      if (window.scrollY > window.innerHeight * 0.5) {
          document.body.classList.add('content-visible');
      } else {
          document.body.classList.remove('content-visible');
      }
  });

  // Function to change the background image every few seconds
  function changeBackgroundImage() {
      backgroundElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
      currentImageIndex = (currentImageIndex + 1) % images.length;
  }

  // Set interval for background rotation
  setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds

  // Initial call to set the first background image
  changeBackgroundImage();
});

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');  // Toggles the 'active' class to show/hide the menu
  }