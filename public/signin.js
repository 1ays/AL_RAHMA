// Gaza Images Array for background shuffling
const gazaImages = [
    '../gazaPics/gaza15.jpg',
  '../gazaPics/gaza16.webp',
  '../gazaPics/gaza17.jpg',
  '../gazaPics/gaza18.webp',
  '../gazaPics/gaza2. webp',
  '../gazaPics/gaza6.jpg',
  '../gazaPics/gaza7.jpg', 
  '../gazaPics/gaza8.jpg',
  '../gazaPics/gaza9.webp',

];

let currentImageIndexLeft = 0;
let currentImageIndexRight = 0;

// Function to shuffle left background images
function shuffleLeftBackgroundImage() {
  currentImageIndexLeft = (currentImageIndexLeft + 1) % gazaImages.length;
  const imageUrl = gazaImages[currentImageIndexLeft];
  $('.backLeft').css('background-image', `url(${imageUrl})`);
}

// Function to shuffle right background images
function shuffleRightBackgroundImage() {
  currentImageIndexRight = (currentImageIndexRight + 1) % gazaImages.length;
  const imageUrl = gazaImages[currentImageIndexRight];
  $('.backRight').css('background-image', `url(${imageUrl})`);
}

// Start background image shuffling for both sides
function startBackgroundShuffle() {
  // Start left side shuffling
  setInterval(shuffleLeftBackgroundImage, 2000); // Change every 4 seconds
  
  // Start right side shuffling with offset to avoid sync
  setTimeout(() => {
    setInterval(shuffleRightBackgroundImage, 2000); // Change every 4 seconds
  }, 2000); // 2 second offset
}

$(document).ready(function(){
  // Start background image shuffling
  startBackgroundShuffle();

  // Handle responsive behavior
  function handleResponsive() {
    const width = window.innerWidth;
    
    if (width <= 768) {
      // Mobile/Tablet Portrait: Show only one section at a time
      $('.left').removeClass('mobile-hidden').show();
      $('.right').removeClass('mobile-active').hide();
      
      // Reset any desktop animations
      $('#slideBox').css({
        'margin-left': '0',
        'position': 'relative',
        'width': '100%'
      });
      $('.topLayer').css({
        'margin-left': '0',
        'width': '100%'
      });
    } else {
      // Reset mobile classes
      $('.left').removeClass('mobile-hidden');
      $('.right').removeClass('mobile-active');
      
      // Restore desktop positioning based on screen size
      let initialMargin, slideBoxWidth;
      
      if (width >= 1440) {
        // Large Desktop
        initialMargin = '55%';
        slideBoxWidth = '45%';
      } else if (width >= 1025) {
        // Desktop
        initialMargin = '50%';
        slideBoxWidth = '50%';
      } else if (width >= 769) {
        // Tablet Landscape
        initialMargin = '45%';
        slideBoxWidth = '55%';
      } else {
        // Default
        initialMargin = '50%';
        slideBoxWidth = '50%';
      }
      
      $('#slideBox').css({
        'position': 'fixed',
        'margin-left': initialMargin,
        'width': slideBoxWidth
      });
      
      $('.topLayer').css({
        'width': '200%'
      });
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
    }, 250);
  });

  $('#goRight').on('click', function(){
    const width = window.innerWidth;
    
    if (width <= 768) {
      // Mobile/Tablet Portrait: Toggle sections
      $('.left').addClass('mobile-hidden').hide();
      $('.right').addClass('mobile-active').show();
    } else {
      // Desktop/Tablet Landscape: Animate based on screen size
      let targetMargin = '0';
      
      $('#slideBox').animate({
        'marginLeft' : targetMargin
      }, 400);
      $('.topLayer').animate({
        'marginLeft' : '100%'
      }, 400);
    }
  });
  
  $('#goLeft').on('click', function(){
    const width = window.innerWidth;
    
    if (width <= 768) {
      // Mobile/Tablet Portrait: Toggle sections
      $('.right').removeClass('mobile-active').hide();
      $('.left').removeClass('mobile-hidden').show();
    } else {
      // Desktop/Tablet Landscape: Animate based on screen size
      let targetMargin;
      
      if (width >= 1440) {
        targetMargin = '55%';
      } else if (width >= 1025) {
        targetMargin = '50%';
      } else if (width >= 769) {
        targetMargin = '45%';
      } else {
        targetMargin = '50%';
      }
      
      $('#slideBox').animate({
        'marginLeft' : targetMargin
      }, 400);
      $('.topLayer').animate({
        'marginLeft': '0'
      }, 400);
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
