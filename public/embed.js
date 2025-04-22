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


//-----------------------------------------------------------------------
(function() {
  // Create container div for positioning
  var container = document.createElement('div');
  container.id = 'punjab-bot-container';
  container.style.position = 'fixed';
  container.style.bottom = '2px';  // Give some space from bottom
  container.style.right = '2px';   // Give some space from right
  container.style.width = '80px';   // Initial width for chat icon
  container.style.height = '80px';  // Initial height for chat icon
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  container.style.transition = 'all 0.5s ease-in-out';
  
  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-bot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.pointerEvents = 'auto';
  iframe.title = 'Punjab Government Chatbot';
  iframe.style.borderRadius = '12px';
  
  // Append iframe to container, and container to body
  container.appendChild(iframe);
  document.body.appendChild(container);
  
  // Store current state
  var currentState = 'icon';
  
  // Listen for messages from iframe
  window.addEventListener('message', function(event) {
    // Check origin in production
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;
    
    if (event.data && event.data.type === 'widgetState') {
      var newState = event.data.state;
      
      // Don't do anything if state hasn't changed
      if (newState === currentState) return;
      
      // Always reset first to prevent transition issues
      if (newState !== 'maximized') {
        container.style.top = '';
        container.style.left = '';
        container.style.right = '1px';
        container.style.bottom = '0';
      }
      
      // Apply new state
      switch(newState) {
        case 'icon':
          container.style.width = '80px';
          container.style.height = '80px';
          break;
          
        case 'icons':
          container.style.width = '500px';
          container.style.maxWidth = '95vw';
          container.style.height = '80px';
          break;
          
        case 'chat':
          container.style.width = '500px';
          container.style.maxWidth = '95vw';
          container.style.height = '700px';
          container.style.maxHeight = '80vh';
          break;
          
        case 'maximized':
          container.style.top = '0';
          container.style.left = '0';
          container.style.right = '0';
          container.style.bottom = '0';
          container.style.width = '100vw';
          container.style.height = '100vh';
          container.style.maxWidth = '100vw';
          container.style.maxHeight = '100vh';
          break;
          
        case 'qr':
          container.style.width = '500px';
          container.style.maxWidth = '95vw';
          container.style.height = '500px';
          break;
      }
      
      // Update current state
      currentState = newState;
    }
  });
})();










