document.addEventListener("DOMContentLoaded", function () {
  // 📸 Background shuffle
  const backgroundImages = [
    "../gazaPics/GAZA.png",
    "../gazaPics/gaza1.webp",
    "../gazaPics/gaza2.webp",
    "../gazaPics/gaza3.webp",
    "../gazaPics/gaza4.avif",
    "../gazaPics/gaza5.jpg",
    "../gazaPics/gaza16.webp",
    "../gazaPics/gaza17.jpg",
    "../gazaPics/gaza8.jpg",
    "../gazaPics/gaza9.webp",
    "../gazaPics/gaza18.webp",
    "../gazaPics/gaza11.jpg",
    "../gazaPics/gaza12.jpg",
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
  setInterval(changeBackground, 2500);


  //  Mobile menu toggle
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

    document.querySelector(".chatbot-btn").addEventListener("click", () => {
    alert("Chatbot will open here!");
    // Or open popup, redirect, etc.
  });
  
}




);
