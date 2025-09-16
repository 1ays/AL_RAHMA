document.addEventListener("DOMContentLoaded", function () {
  // 📱 Mobile menu toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navbar = document.getElementById("navbar");

  if (mobileMenu && navbar) {
    // Toggle menu when clicking button
    mobileMenu.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
      navbar.classList.toggle("active");
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        navbar.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav = navbar.contains(event.target);
      const isClickOnToggle = mobileMenu.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnToggle &&
        navbar.classList.contains("active")
      ) {
        mobileMenu.classList.remove("active");
        navbar.classList.remove("active");
      }
    });

    // Close menu when resizing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove("active");
        navbar.classList.remove("active");
      }
    });
  }

  // 🇵🇸 Palestine flag click functionality
  const palestineFlag = document.getElementById("palestine-flag");
  const freePalestinePopup = document.getElementById("free-palestine-popup");

  if (palestineFlag && freePalestinePopup) {
    palestineFlag.addEventListener("click", function () {
      // Show the popup
      freePalestinePopup.classList.add("show");
      
      // Hide the popup after 5 seconds
      setTimeout(() => {
        freePalestinePopup.classList.remove("show");
      }, 5000);
    });

    // Close popup when clicking on the overlay
    freePalestinePopup.addEventListener("click", function (e) {
      if (e.target === freePalestinePopup) {
        freePalestinePopup.classList.remove("show");
      }
    });
  }
});