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
  // Create container for the bot
  var container = document.createElement('div');
  container.id = 'punjab-bot-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.width = '80px'; 
  container.style.height = '80px';
  container.style.pointerEvents = 'none'; 
  container.style.zIndex = '9999';
  container.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  container.style.overflow = 'hidden';
  
  // Create iframe for the bot
  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-bot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.pointerEvents = 'auto'; 
  iframe.style.borderRadius = '12px';
  iframe.title = 'Punjab Government Chatbot';
  
  // Add the iframe to the container
  container.appendChild(iframe);
  document.body.appendChild(container);
  
  // Responsive resizing based on window size
  function adjustForScreenSize() {
    const isMobile = window.innerWidth < 768;
    
    // Only adjust default sizes, not active states
    if (container.style.width === '80px' && container.style.height === '80px') {
      container.style.width = isMobile ? '60px' : '80px';
      container.style.height = isMobile ? '60px' : '80px';
    }
  }
  
  // Initial adjustment
  adjustForScreenSize();
  
  // Listen for resize events
  window.addEventListener('resize', adjustForScreenSize);
  
  // Handle messages from the iframe
  window.addEventListener('message', function(event) {
    // Security check - only accept messages from our widget domain
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;
    
    // Handle widget state changes
    if (event.data && event.data.type === 'widgetState') {
      const isMobile = window.innerWidth < 768;
      
      switch(event.data.state) {
        case 'icon':
          container.style.width = isMobile ? '60px' : '80px';
          container.style.height = isMobile ? '60px' : '80px';
          container.style.bottom = isMobile ? '20px' : '24px';
          container.style.right = isMobile ? '20px' : '24px';
          break;
        case 'icons':
          container.style.width = isMobile ? '95%' : '500px';
          container.style.height = isMobile ? '70px' : '80px';
          container.style.bottom = '24px';
          container.style.right = isMobile ? '10px' : '24px';
          break;
        case 'chat': 
          container.style.width = isMobile ? '95%' : '500px';
          container.style.height = isMobile ? '80vh' : '700px';
          container.style.maxHeight = '80vh';
          container.style.bottom = '24px';
          container.style.right = isMobile ? '10px' : '24px';
          break;
        case 'maximized':
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.right = '0';
          container.style.bottom = '0';
          container.style.maxWidth = '100%';
          container.style.maxHeight = '100%';
          container.style.borderRadius = '0';
          iframe.style.borderRadius = '0';
          break;
        case 'qr':
          container.style.width = isMobile ? '95%' : '500px';
          container.style.height = isMobile ? '80vh' : '600px';
          container.style.maxHeight = '80vh';
          container.style.bottom = '24px';
          container.style.right = isMobile ? '10px' : '24px';
          break;
      }
      
      // Toggle visibility of scroll in container based on state
      if (event.data.state === 'maximized') {
        container.style.overflow = 'auto';
      } else {
        container.style.overflow = 'hidden';
      }
    }
  });
})();


