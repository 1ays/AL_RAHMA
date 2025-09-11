document.addEventListener("DOMContentLoaded", function () {
  // 📸 Background shuffle
  const backgroundImages = [
    "gaza13.jpg",
    "gaza1.webp",
    "gaza2.webp",
    "gaza4.avif",
    "gaza5.jpg",
    "gaza14.webp",
    "gaza10.webp",
    "gaza7.webp",
    "gaza12.jpg",
    "gaza9.webp",
  ];

  let currentImageIndex = 0;
  const body = document.body;

  function changeBackground() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    body.style.background = `url("${backgroundImages[currentImageIndex]}") no-repeat center center/cover`;
  }

  // Set first background
  body.style.background = `url("${backgroundImages[0]}") no-repeat center center/cover`;

  // Change every 5 seconds
  setInterval(changeBackground, 5000);


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
