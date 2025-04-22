
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
  if (document.getElementById('punjab-govt-chatbot-iframe')) {
    return;
  }
  
  var container = document.createElement('div');
  container.id = 'punjab-govt-chatbot-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.zIndex = '9999';
  container.style.pointerEvents = 'none';
  container.style.transition = 'all 0.3s ease-in-out';
  container.style.width = 'auto';
  container.style.height = 'auto';
  
  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-govt-chatbot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.maxWidth = '625px';
  iframe.style.maxHeight = '600px';
  iframe.style.pointerEvents = 'auto';
  iframe.style.transition = 'all 0.3s ease-in-out';
  iframe.title = 'Punjab Government Chatbot';
  
  container.appendChild(iframe);
  document.body.appendChild(container);
  
  // Create a resize observer to handle viewport changes
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const viewportWidth = entry.contentRect.width;
      // Adjust for small screens
      if (viewportWidth < 640) {
        iframe.style.maxWidth = '100%';
        container.style.width = '100%';
      } else {
        iframe.style.maxWidth = '625px';
        container.style.width = 'auto';
      }
    }
  });
  
  // Observe the document body for size changes
  resizeObserver.observe(document.body);
  
  window.addEventListener('message', function(event) {
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app') {
      return;
    }
    
    switch(event.data.type) {
      case 'chatOpen':
        container.style.pointerEvents = 'auto';
        break;
      
      case 'chatClosed':
        container.style.pointerEvents = 'none';
        break;
      
      case 'maximize':
        iframe.style.maxWidth = 'none';
        iframe.style.maxHeight = 'none';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.top = '0';
        container.style.left = '0';
        container.style.right = '0';
        container.style.bottom = '0';
        break;
      
      case 'restore':
        iframe.style.maxWidth = '625px';
        iframe.style.maxHeight = '600px';
        container.style.width = 'auto';
        container.style.height = 'auto';
        container.style.top = 'auto';
        container.style.left = 'auto';
        container.style.right = '0';
        container.style.bottom = '0';
        break;
    }
  });
})();
