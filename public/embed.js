
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
  // Check if the iframe already exists to avoid duplicates
  if (document.getElementById('punjab-govt-chatbot-iframe')) {
    return;
  }
  
  // Create a container div for better control
  var container = document.createElement('div');
  container.id = 'punjab-govt-chatbot-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.zIndex = '9999';
  container.style.pointerEvents = 'none'; // Initially no pointer events to let clicks pass through
  
  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-govt-chatbot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.width = '500px'; // Default width for the widget view
  iframe.style.height = '600px'; // Default height for the widget view
  iframe.style.pointerEvents = 'auto'; // The iframe itself should receive pointer events
  iframe.title = 'Punjab Government Chatbot';
  
  // Add iframe to container
  container.appendChild(iframe);
  
  // Append the container to the body
  document.body.appendChild(container);
  
  // Communication with iframe using messages
  window.addEventListener('message', function(event) {
    // Only accept messages from your iframe source
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app') {
      return;
    }
    
    // Handle different messages from the iframe
    if (event.data.type === 'chatOpen') {
      container.style.pointerEvents = 'auto'; // Enable pointer events when chat is open
    } else if (event.data.type === 'chatClosed') {
      container.style.pointerEvents = 'none'; // Disable pointer events when chat is closed
    } else if (event.data.type === 'maximize') {
      iframe.style.width = '100vh';
      iframe.style.height = '100vh';
      container.style.width = '100%'; 
      container.style.height = '100%';
      container.style.top = '0';
      container.style.left = '0';
    } else if (event.data.type === 'restore') {
      iframe.style.width = '500px';
      iframe.style.height = '600px';
      container.style.width = 'auto';
      container.style.height = 'auto';
      container.style.top = 'auto';
      container.style.left = 'auto';
    }
  });
})();
