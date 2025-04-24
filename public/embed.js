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






// (function() {
  
//   var container = document.createElement('div');
//   container.id = 'punjab-bot-container';
//   container.style.position = 'fixed';
//   container.style.bottom = '0';
//   container.style.right = '0';
//   container.style.width = '90px'; 
//   container.style.height = '90px';
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
//           container.style.width = '90px';
//           container.style.height = '90px';
//           break;
//         case 'icons':
//           container.style.width = '700px';
//           container.style.maxWidth = '95%';
//           container.style.height = '80px';
//           break;
//         case 'chat': 
//           container.style.width = '700px';
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
//           container.style.width = '700px';
//           container.style.maxWidth = '95%';
//           container.style.height = '800px';
//           break;
//       }
//     }
//   });
// })();

// 🌸🌸🌸🌸🌸






(function() {
  console.log("Initializing Punjab Government Chatbot widget...");
  
  // Create iframe for the widget
  var iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '80px';  // Initial small size for just the icon
  iframe.style.height = '80px';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.zIndex = '9999';
  iframe.style.transition = 'all 0.3s ease';
  iframe.style.overflow = 'hidden'; // Prevent scrollbars
  iframe.title = 'Punjab Government Chatbot';
  iframe.id = 'punjab-chatbot-frame';
  
  // Append the iframe to the body
  document.body.appendChild(iframe);

  // Debug counter to track postMessage events
  var messageCount = 0;
  
  // Track the current state to avoid redundant resizes
  var currentState = null;
  
  // Helper function to actually resize the iframe
  function resizeIframe(state) {
    if (state === currentState) {
      console.log("No resize needed - already in state:", state);
      return;
    }
    
    currentState = state;
    
    console.log("Resizing iframe to state:", state);
    
    // Clear any existing transition to prevent issues
    iframe.style.transition = 'none';
    
    // Force a reflow
    void iframe.offsetWidth;
    
    // Set dimensions based on widget state
    switch(state) {
      case 'icon-only':
        iframe.style.width = '80px';
        iframe.style.height = '80px';
        break;
      case 'icons-panel':
        iframe.style.width = '500px';
        iframe.style.height = '80px';
        break;
      case 'chat-open':
        iframe.style.width = '380px';
        iframe.style.height = '600px';
        break;
      case 'chat-maximized':
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        break;
      default:
        console.warn("Unknown state:", state);
        return;
    }
    
    // Restore transition after a brief delay
    setTimeout(function() {
      iframe.style.transition = 'all 0.3s ease';
    }, 50);
    
    console.log("Iframe dimensions updated to:", {
      width: iframe.style.width,
      height: iframe.style.height,
      state: state
    });
  }
  
  // Handle messages from the iframe
  window.addEventListener('message', function(event) {
    messageCount++;
    
    try {
      // Validate message source and format
      if (!event.data || typeof event.data !== 'object') {
        return;
      }
      
      console.log("Message received #" + messageCount + ":", event.data);
      
      // Check if message is from our iframe
      if (event.source !== iframe.contentWindow) {
        console.log("Message ignored - not from our iframe");
        return;
      }
      
      if (event.data.type === 'resize') {
        // Add a slight delay to ensure DOM has time to update
        setTimeout(function() {
          resizeIframe(event.data.state);
        }, 50);
      }
    } catch (err) {
      console.error("Error handling iframe message:", err);
    }
  });
  
  // Force initial size after loading
  iframe.onload = function() {
    console.log("Iframe loaded, setting initial size");
    // Reset to initial state
    resizeIframe('icon-only');
    
    // Send a message to the iframe to ensure it knows it's in an iframe
    try {
      iframe.contentWindow.postMessage({
        type: 'iframe-ready'
      }, '*');
    } catch (err) {
      console.error("Error sending ready message to iframe:", err);
    }
  };
  
  // Log that the widget has been initialized
  console.log("Punjab Government Chatbot widget initialization complete");
})();
