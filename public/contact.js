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
});
