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

  // Handle resize on window changes
  function handleResize() {
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
      // Save current state for resize handler
      container.dataset.state = event.data.state;
      
      // Handle different widget states with smoother transitions
      switch(event.data.state) {
        case 'icon':
          // Single chat icon state
          container.style.width = '80px';
          container.style.height = '80px';
          container.style.borderRadius = '50%';
          break;
          
        case 'icons':
          // Expanded icons bar state
          container.style.width = '500px';
          container.style.maxWidth = '95%';
          container.style.height = '80px';
          container.style.borderRadius = '40px';
          break;
          
        case 'chat': 
          // Chat window state
          container.style.width = '500px';
          container.style.maxWidth = '95%';
          container.style.height = '700px';
          container.style.maxHeight = '80vh';
          container.style.borderRadius = '12px';
          break;
          
        case 'maximized':
          // Full screen chat state
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.right = '0';
          container.style.bottom = '0';
          container.style.maxWidth = '100%';
          container.style.maxHeight = '100%';
          container.style.borderRadius = '0';
          break;
          
        case 'qr':
          // QR code display state
          container.style.width = '500px';
          container.style.maxWidth = '95%';
          container.style.height = '600px';
          container.style.borderRadius = '12px';
          break;
      }
      
      // Re-run resize logic to ensure proper dimensions
      handleResize();
    }
  });
  
  // Initialize with a clean fade-in
  setTimeout(function() {
    container.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  }, 1000);
})();

