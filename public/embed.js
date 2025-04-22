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



(function() {
  // Create container div for positioning
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.width = '600px'; // Maximum width matching your widget's max-width
  container.style.height = '700px'; // Enough height for expanded chat
  container.style.maxWidth = '100%'; // Responsive width
  container.style.pointerEvents = 'none'; // Important: allows clicking through when not on widget
  container.style.zIndex = '9999';
  
  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.pointerEvents = 'auto'; // Allow interactions with iframe content
  iframe.title = 'Punjab Government Chatbot';
  
  // Append iframe to container, and container to body
  container.appendChild(iframe);
  document.body.appendChild(container);
  
  // Optional: Listen for messages from iframe to adjust container size based on widget state
  window.addEventListener('message', function(event) {
    // Verify origin for security
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app') return;
    
    // Handle messages from iframe if you implement them
    if (event.data.type === 'widgetState') {
      switch(event.data.state) {
        case 'icon':
          // Just show icon
          container.style.height = '80px';
          break;
        case 'icons':
          // Show expanded icons
          container.style.height = '100px';
          break;
        case 'chat':
          // Show chat
          container.style.height = '600px';
          break;
        case 'maximized':
          // Full screen chat
          container.style.width = '100%';
          container.style.height = '100%';
          break;
      }
    }
  });
})();















