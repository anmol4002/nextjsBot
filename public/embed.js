// (function() {
 
//   var iframe = document.createElement('iframe');
//   iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
//   iframe.style.position = 'fixed';
//   iframe.style.bottom = '0';
//   iframe.style.right = '2px';
//   iframe.style.width = '100%'; 
//   iframe.style.height = '100%'; 
  
//   iframe.style.border = 'none';
//   iframe.style.background = 'transparent';
//   iframe.style.zIndex = '9999';
//   iframe.title = 'Punjab Government Chatbot';
  
//   // Append the iframe to the body
//   document.body.appendChild(iframe);
// })();


//-------------------------------------------------------------
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

//  --------------------------------------------------------------------------------

(function() {
  // Create main container with improved styling
  var container = document.createElement('div');
  container.id = 'punjab-bot-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.width = '80px'; 
  container.style.height = '80px';
  container.style.zIndex = '9999';
  container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  container.style.borderRadius = '50%';
  container.style.overflow = 'hidden';
  
  
 
  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-bot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.pointerEvents = 'auto';
  iframe.style.transition = 'opacity 0.2s ease';
  iframe.title = 'Punjab Government Chatbot';
  iframe.setAttribute('loading', 'lazy');
  iframe.allow = 'autoplay; clipboard-write';

  container.appendChild(iframe);
  document.body.appendChild(container);
  

  setTimeout(() => {
    container.style.opacity = '1';
  }, 100);

  function adjustForScreenSize() {
    const isMobile = window.innerWidth <= 768;
    
    if (currentState === 'maximized') {
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.right = '0';
      container.style.bottom = '0';
      container.style.borderRadius = '0';
    } else if (isMobile && (currentState === 'chat' || currentState === 'qr')) {
      container.style.width = '95%';
      container.style.height = '80%';
      container.style.right = '2.5%';
    }
  }
  
 
  let currentState = 'icon';
  

  window.addEventListener('message', function(event) {
    // Security check for origin
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;
    
    if (event.data && event.data.type === 'widgetState') {
      currentState = event.data.state;
      
      switch(currentState) {
        case 'icon':
          container.style.width = '80px';
          container.style.height = '80px';
          container.style.borderRadius = '50%';
          break;
        case 'icons':
          container.style.width = '500px';
          container.style.maxWidth = '95%';
          container.style.height = '80px';
          container.style.borderRadius = '35px';
          break;
        case 'chat': 
          container.style.width = '500px';
          container.style.maxWidth = '95%';
          container.style.height = '700px';
          container.style.maxHeight = '90vh';
          container.style.borderRadius = '12px';
          break;
        case 'maximized':
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.right = '0';
          container.style.bottom = '0';
          container.style.maxWidth = '100%';
          container.style.maxHeight = '100%';
          container.style.borderRadius = '0';
          break;
        case 'qr':
          container.style.width = '500px';
          container.style.maxWidth = '95%';
          container.style.height = '700px';
          container.style.maxHeight = '90vh';
          container.style.borderRadius = '12px';
          break;
      }
      
      // Adjust for screen size after state change
      adjustForScreenSize();
    }
  });
  
  // Adjust on resize
  window.addEventListener('resize', adjustForScreenSize);
  
  // Initial adjustment
  adjustForScreenSize();
})();




