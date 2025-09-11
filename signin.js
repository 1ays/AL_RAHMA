// Gaza Images Array with proper paths
const gazaImages = [
  './GAZA.png', './background1.jpg', './gaza1.webp', './gaza2.webp', './gaza3.webp',
  './gaza4.avif', './gaza5.jpg', './gaza6.jpg', './gaza7.webp', './gaza8.webp',
  './gaza9.webp', './gaza10.webp', './gaza11.webp', './gaza12.jpg', './gaza13.jpg', './gaza14.webp'
];

let currentSlideRight = 0;
let currentSlideLeft = 0;
let slideshowIntervalRight;
let slideshowIntervalLeft;

// Initialize Gaza Slideshow
function initGazaSlideshow() {
  // Initialize right slideshow (for signup)
  const rightContainer = document.getElementById('slideshow-right');
  if (rightContainer) {
    gazaImages.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      if (index === 0) slide.classList.add('active');
      
      const img = document.createElement('img');
      img.src = image;
      img.alt = `Gaza Image ${index + 1}`;
      img.onload = function() {
        console.log('Loaded image:', image);
      };
      img.onerror = function() {
        console.log('Failed to load image:', image);
        this.style.display = 'none';
      };
      
      slide.appendChild(img);
      rightContainer.appendChild(slide);
    });
  }

  // Initialize left slideshow (for login)
  const leftContainer = document.getElementById('slideshow-left');
  if (leftContainer) {
    gazaImages.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      if (index === 0) slide.classList.add('active');
      
      const img = document.createElement('img');
      img.src = image;
      img.alt = `Gaza Image ${index + 1}`;
      img.onload = function() {
        console.log('Loaded image:', image);
      };
      img.onerror = function() {
        console.log('Failed to load image:', image);
        this.style.display = 'none';
      };
      
      slide.appendChild(img);
      leftContainer.appendChild(slide);
    });
  }

  // Start right slideshow
  startSlideshow('right');
}

// Start slideshow for specified side
function startSlideshow(side) {
  if (side === 'right') {
    slideshowIntervalRight = setInterval(() => {
      nextSlide('right');
    }, 3000);
  } else {
    slideshowIntervalLeft = setInterval(() => {
      nextSlide('left');
    }, 3000);
  }
}

// Stop slideshow for specified side
function stopSlideshow(side) {
  if (side === 'right') {
    clearInterval(slideshowIntervalRight);
  } else {
    clearInterval(slideshowIntervalLeft);
  }
}

// Next slide function
function nextSlide(side) {
  const container = side === 'right' ? 'slideshow-right' : 'slideshow-left';
  const slides = document.querySelectorAll(`#${container} .slide`);
  
  if (slides.length === 0) return;
  
  if (side === 'right') {
    slides[currentSlideRight].classList.remove('active');
    currentSlideRight = (currentSlideRight + 1) % slides.length;
    slides[currentSlideRight].classList.add('active');
  } else {
    slides[currentSlideLeft].classList.remove('active');
    currentSlideLeft = (currentSlideLeft + 1) % slides.length;
    slides[currentSlideLeft].classList.add('active');
  }
}

$(document).ready(function(){
  // Initialize Gaza slideshow only on desktop
  if (window.innerWidth > 768) {
    initGazaSlideshow();
    console.log('Slideshow initialized');
  }

  // Handle responsive behavior
  function handleResponsive() {
    if (window.innerWidth <= 768) {
      // Mobile: Show only one section at a time
      $('.left').removeClass('mobile-hidden').show();
      $('.right').removeClass('mobile-active').hide();
      $('#gaza-slideshow-right, #gaza-slideshow-left').hide();
      stopSlideshow('right');
      stopSlideshow('left');
      
      // Reset any desktop animations
      $('#slideBox').css({
        'margin-left': '0',
        'position': 'relative'
      });
      $('.topLayer').css({
        'margin-left': '0'
      });
    } else {
      // Desktop/Tablet: Initialize slideshow if not already done
      if ($('#slideshow-right .slide').length === 0) {
        initGazaSlideshow();
      }
      
      // Reset mobile classes
      $('.left').removeClass('mobile-hidden');
      $('.right').removeClass('mobile-active');
      
      // Restore desktop positioning based on screen size
      let initialMargin;
      if (window.innerWidth > 1024) {
        initialMargin = '50%';
      } else if (window.innerWidth > 768) {
        initialMargin = '40%';
      } else {
        initialMargin = '50%';
      }
      
      $('#slideBox').css({
        'position': 'fixed',
        'margin-left': initialMargin
      });
      
      // Ensure slideshow is visible on desktop
      $('#gaza-slideshow-right').show();
      $('#gaza-slideshow-left').hide();
    }
  }

  // Initial responsive check
  handleResponsive();

  // Handle window resize with debouncing
  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      handleResponsive();
      
      // Reinitialize slideshow if switching from mobile to desktop
      if (window.innerWidth > 768 && $('#slideshow-right .slide').length === 0) {
        initGazaSlideshow();
      }
    }, 250);
  });

  $('#goRight').on('click', function(){
    if (window.innerWidth <= 768) {
      // Mobile: Toggle sections
      $('.left').addClass('mobile-hidden').hide();
      $('.right').addClass('mobile-active').show();
    } else {
      // Desktop/Tablet: Animate based on screen size
      let targetMargin = '0';
      
      $('#slideBox').animate({
        'marginLeft' : targetMargin
      });
      $('.topLayer').animate({
        'marginLeft' : '100%'
      });
      
      // When login (right) is active, show slideshow on left side
      $('#gaza-slideshow-right').hide();
      $('#gaza-slideshow-left').show();
      stopSlideshow('right');
      startSlideshow('left');
    }
  });
  
  $('#goLeft').on('click', function(){
    if (window.innerWidth <= 768) {
      // Mobile: Toggle sections
      $('.right').removeClass('mobile-active').hide();
      $('.left').removeClass('mobile-hidden').show();
    } else {
      // Desktop/Tablet: Animate based on screen size
      let targetMargin;
      
      if (window.innerWidth > 1024){
        targetMargin = '50%';
      }
      else if (window.innerWidth > 768) {
        targetMargin = '40%';
      }
      else {
        targetMargin = '50%'; // Default for any other case
      }
      
      $('#slideBox').animate({
        'marginLeft' : targetMargin
      });
      $('.topLayer').animate({
        'marginLeft': '0'
      });
      
      // When signup (left) is active, show slideshow on right side
      $('#gaza-slideshow-left').hide();
      $('#gaza-slideshow-right').show();
      stopSlideshow('left');
      startSlideshow('right');
    }
  });

  // Social login handlers
  $('#apple-signup, #apple-login').on('click', function() {
    alert('Apple Sign-In integration would be implemented here');
  });

  $('#google-signup, #google-login').on('click', function() {
    alert('Google Sign-In integration would be implemented here');
  });

  // Forgot password handler
  $('#forgot-password-link').on('click', function(e) {
    e.preventDefault();
    alert('Forgot password functionality would be implemented here');
  });
});

      /* ====================== *
      *  Initiate Canvas       *
      * ====================== */
      paper.install(window);
      paper.setup(document.getElementById("canvas"));

      // Paper JS Variables
      var canvasWidth, 
          canvasHeight,
          canvasMiddleX,
          canvasMiddleY;

      var shapeGroup = new Group();

      var positionArray = [];

      function getCanvasBounds() {
        // Get current canvas size
        canvasWidth = view.size.width;
        canvasHeight = view.size.height;
        canvasMiddleX = canvasWidth / 2;
        canvasMiddleY = canvasHeight / 2;
        // Set path position
        var position1 = {
          x: (canvasMiddleX / 2) + 100,
          y: 100, 
        };

        var position2 = {
          x: 200,
          y: canvasMiddleY, 
        };

        var position3 = {
          x: (canvasMiddleX - 50) + (canvasMiddleX / 2),
          y: 150, 
        };

        var position4 = {
          x: 0,
          y: canvasMiddleY + 100, 
        };

        var position5 = {
          x: canvasWidth - 130,
          y: canvasHeight - 75, 
        };

        var position6 = {
          x: canvasMiddleX + 80,
          y: canvasHeight - 50, 
        };
        
        var position7 = {
          x: canvasWidth + 60,
          y: canvasMiddleY - 50, 
        };
        
        var position8 = {
          x: canvasMiddleX + 100,
          y: canvasMiddleY + 100, 
        };

        positionArray = [position3, position2, position5, position4, position1, position6, position7, position8];
        };


      /* ====================== *
      * Create Shapes          *
      * ====================== */
      function initializeShapes() {
        // Get Canvas Bounds
        getCanvasBounds();

        var shapePathData = [
          'M231,352l445-156L600,0L452,54L331,3L0,48L231,352', 
          'M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z', 
          'M0,65l16,138l96,107l270-2L470,0L337,4L0,65z',
          'M333,0L0,94l64,219L29,437l570-151l-196-42L333,0',
          'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
          'M389,352l92-113l195-43l0,0l0,0L445,48l-80,1L122.7,0L0,275.2L162,297L389,352',
          'M 50 100 L 300 150 L 550 50 L 750 300 L 500 250 L 300 450 L 50 100',
          'M 700 350 L 500 350 L 700 500 L 400 400 L 200 450 L 250 350 L 100 300 L 150 50 L 350 100 L 250 150 L 450 150 L 400 50 L 550 150 L 350 250 L 650 150 L 650 50 L 700 150 L 600 250 L 750 250 L 650 300 L 700 350 '
        ];

        for (var i = 0; i <= shapePathData.length; i++) {
          // Create shape
          var headerShape = new Path({
            strokeColor: 'rgba(46, 139, 87, 0.3)',
            strokeWidth: 2,
            parent: shapeGroup,
          });
          // Set path data
          headerShape.pathData = shapePathData[i];
          headerShape.scale(2);
          // Set path position
          headerShape.position = positionArray[i];
        }
      };

      initializeShapes();

      /* ====================== *
      * Animation              *
      * ====================== */
      view.onFrame = function paperOnFrame(event) {
        if (event.count % 4 === 0) {
          // Slows down frame rate
          for (var i = 0; i < shapeGroup.children.length; i++) {
            if (i % 2 === 0) {
              shapeGroup.children[i].rotate(-0.1);
            } else {
              shapeGroup.children[i].rotate(0.1);
            }
          }
        }
      };

      view.onResize = function paperOnResize() {
        getCanvasBounds();

        for (var i = 0; i < shapeGroup.children.length; i++) {
          shapeGroup.children[i].position = positionArray[i];
        }

        if (canvasWidth < 700) {
          shapeGroup.children[3].opacity = 0;
          shapeGroup.children[2].opacity = 0;
          shapeGroup.children[5].opacity = 0;
        } else {
          shapeGroup.children[3].opacity = 1;
          shapeGroup.children[2].opacity = 1;
          shapeGroup.children[5].opacity = 1;
        }
      };