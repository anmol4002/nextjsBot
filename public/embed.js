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
 
//   var iframe = document.createElement('iframe');
//   iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
//   iframe.style.position = 'fixed';
//   iframe.style.bottom = '0';
//   iframe.style.right = '2px';
//   iframe.style.width = '100vh'; 
//   iframe.style.height = '100vh'; 
  
//   iframe.style.border = 'none';
//   iframe.style.background = 'transparent';
//   iframe.style.zIndex = '9999';
//   iframe.title = 'Punjab Government Chatbot';
  
//   // Append the iframe to the body
//   document.body.appendChild(iframe);
// })();











(function() {
  // Create container div for better positioning
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.zIndex = '9999';
  container.style.maxWidth = '500px';
  container.style.width = '95%';
  container.style.height = 'auto';
  container.style.transition = 'all 0.3s ease';
  
  // Create iframe with minimal size to start
  var iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.width = '100%';
  iframe.style.height = '80px'; // Start minimized (just showing the chat icon)
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.overflow = 'hidden';
  iframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  iframe.style.background = 'transparent';
  iframe.title = 'Punjab Government Chatbot';
  iframe.id = 'punjab-gov-chatbot';
  
  // Add iframe to container
  container.appendChild(iframe);
  
  // Add container to body
  document.body.appendChild(container);
  
  // Handle messages from the iframe
  window.addEventListener('message', function(event) {
    // Make sure message is from our iframe
    if (event.source !== iframe.contentWindow) return;
    
    switch(event.data) {
      case 'widgetReady':
        // Iframe is ready
        break;
      case 'chatOpened':
        // Expand iframe when chat opens
        iframe.style.height = '600px';
        break;
      case 'chatClosed':
        // Minimize iframe when chat closes
        iframe.style.height = '80px';
        break;
      case 'chatMaximized':
        // Maximize iframe
        iframe.style.height = '100vh';
        iframe.style.width = '100vw';
        container.style.right = '0';
        container.style.bottom = '0';
        container.style.maxWidth = '100%';
        break;
      case 'chatRestored':
        // Restore iframe to normal size
        iframe.style.height = '600px';
        iframe.style.width = '100%';
        container.style.right = '20px';
        container.style.bottom = '20px';
        container.style.maxWidth = '500px';
        break;
    }
  });
})();







