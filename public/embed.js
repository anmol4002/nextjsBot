// (function() {
  
//   var container = document.createElement('div');
//   container.id = 'punjab-bot-container';
//   container.style.position = 'fixed';
//   container.style.bottom = '0';
//   container.style.right = '0';
//   container.style.width = '80px'; 
//   container.style.height = '80px';
//   container.style.pointerEvents = 'none'; 
//   container.style.zIndex = '9999';
//   container.style.transition = 'all 0.4s ease-in-out';

//   var iframe = document.createElement('iframe');
//   iframe.id = 'punjab-bot-iframe';
//   iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
//   iframe.style.width = '100%';
//   iframe.style.height = '100%';
//   iframe.style.border = 'none';
//   iframe.style.background = 'transparent';
//   iframe.style.pointerEvents = 'auto'; 
//   iframe.title = 'Punjab Government Chatbot';
  
  
//   container.appendChild(iframe);
//   document.body.appendChild(container);
  
  
//   window.addEventListener('message', function(event) {
  
//     if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;
    
   
//     if (event.data && event.data.type === 'widgetState') {
//       switch(event.data.state) {
//         case 'icon':
//           container.style.width = '80px';
//           container.style.height = '80px';
//           break;
//         case 'icons':
//           container.style.width = '500px';
//           container.style.maxWidth = '95%';
//           container.style.height = '80px';
//           break;
//         case 'chat': 
//           container.style.width = '500px';
//           container.style.maxWidth = '95%';
//           container.style.height = '800px';
//           container.style.maxHeight = '95%';
//           break;
//         case 'maximized':
//           container.style.width = '100%';
//           container.style.height = '100%';
//           container.style.right = '0';
//           container.style.bottom = '0';
//           container.style.maxWidth = '100%';
//           container.style.maxHeight = '100%';
//           break;
//         case 'qr':
          
//           container.style.width = '500px';
//           container.style.maxWidth = '95%';
//           container.style.height = '700px';
//           break;
//       }
//     }
//   });
// })(); 




(function() {
  // Create container for the widget
  var container = document.createElement('div');
  container.id = 'punjab-bot-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.width = '80px'; 
  container.style.height = '80px';
  container.style.pointerEvents = 'none'; 
  container.style.zIndex = '9999';
  container.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  container.style.overflow = 'hidden';
  container.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
  container.style.transformOrigin = 'bottom right';

  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-bot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.pointerEvents = 'auto'; 
  iframe.title = 'Punjab Government Chatbot';
  iframe.style.transition = 'opacity 0.3s ease';
  iframe.style.opacity = '0'; // Start invisible for smooth fade-in
  
  // Add to DOM
  container.appendChild(iframe);
  document.body.appendChild(container);
  
  // Fade in the iframe
  setTimeout(function() {
    iframe.style.opacity = '1';
  }, 300);

  // Add animation styles
  var styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes scaleIn {
      0% {
        opacity: 0;
        transform: scale(0.9) translateY(10px);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      }
    }
    
    @keyframes scaleOut {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(0.95);
        opacity: 0;
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideInRight {
      0% {
        opacity: 0;
        transform: translateX(30px);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
    }
    
    @keyframes restoreAnimation {
      0% {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
      }
      100% {
        width: 500px;
        max-width: 95%;
        height: 700px;
        max-height: 80vh;
        border-radius: 12px;
      }
    }
    
    .punjab-bot-scale-in {
      animation: scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .punjab-bot-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    .punjab-bot-slide-in {
      animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .punjab-bot-restore {
      animation: restoreAnimation 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
  `;
  document.head.appendChild(styleSheet);

  // Flag to track animation in progress
  var animationInProgress = false;

  // Handle resize on window changes
  function handleResize() {
    // Only handle resize if no animation is in progress
    if (animationInProgress) return;
    
    // Adjust container maximum dimensions based on viewport
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Set max height for chat mode based on viewport
    if (container.dataset.state === 'chat' || container.dataset.state === 'qr') {
      const maxHeight = Math.min(800, viewportHeight * 0.95);
      container.style.maxHeight = maxHeight + 'px';
    }
    
    // For small screens, adjust maximized position if needed
    if (container.dataset.state === 'maximized' && viewportWidth < 768) {
      container.style.width = '100%';
      container.style.height = '100%';
    }
  }

  // Listen for window resize events
  window.addEventListener('resize', handleResize);
  
  // Initial setup
  handleResize();

  // Listen for messages from iframe
  window.addEventListener('message', function(event) {
    // Security check - only accept messages from our widget or same origin
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;

    if (event.data && event.data.type === 'widgetState') {
      // If animation is in progress, queue this state change
      if (animationInProgress) {
        setTimeout(() => {
          handleStateChange(event.data.state);
        }, 100);
        return;
      }

      handleStateChange(event.data.state);
    }
  });
  
  function handleStateChange(newState) {
    // Get current state
    var currentState = container.dataset.state || 'icon';
    
    // Save current state for resize handler
    container.dataset.state = newState;
    
    // Set animation flag
    animationInProgress = true;
    
    // Special handling for maximized to chat transition
    if (currentState === 'maximized' && newState === 'chat') {
      // Clear any existing classes and use special restore animation
      container.className = '';
      container.classList.add('punjab-bot-restore');
      
      // Set proper box shadow
      container.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
      
      // Wait for animation to complete
      setTimeout(() => {
        animationInProgress = false;
        handleResize();
      }, 500);
      
      return;
    }
    
    // Remove any existing animation classes
    container.className = '';
    
    // Handle different widget states with smoother transitions
    switch(newState) {
      case 'icon':
        // Single chat icon state
        applyStateTransition(container, {
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        });
        break;
        
      case 'icons':
        // Expanded icons bar state
        container.classList.add('punjab-bot-slide-in');
        applyStateTransition(container, {
          width: '500px',
          maxWidth: '95%',
          height: '80px',
          borderRadius: '40px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        });
        break;
        
      case 'chat': 
        // Chat window state
        container.classList.add('punjab-bot-scale-in');
        applyStateTransition(container, {
          width: '500px',
          maxWidth: '95%',
          height: '700px',
          maxHeight: '80vh',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
        });
        break;
        
      case 'maximized':
        // Full screen chat state
        container.classList.add('punjab-bot-fade-in');
        applyStateTransition(container, {
          width: '100%',
          height: '100%',
          right: '0',
          bottom: '0',
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '0',
          boxShadow: 'none'
        }, true);
        break;
        
      case 'qr':
        // QR code display state
        container.classList.add('punjab-bot-scale-in');
        applyStateTransition(container, {
          width: '500px',
          maxWidth: '95%',
          height: '600px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        });
        break;
    }
    
    // Re-run resize logic to ensure proper dimensions after animation completes
    setTimeout(() => {
      animationInProgress = false;
      handleResize();
    }, 500);
  }
  
  // Helper function to apply transitions
  function applyStateTransition(element, styles, isMaximized) {
    // Apply custom transition based on state change
    if (isMaximized) {
      // Use faster, more dramatic transition for maximizing
      element.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      // Use bounce-like easing for other transitions
      element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
    
    // Apply all styles
    for (var prop in styles) {
      element.style[prop] = styles[prop];
    }
  }
  
  // Initialize with a clean fade-in
  setTimeout(function() {
    container.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  }, 300);
})();

