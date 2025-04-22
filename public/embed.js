
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
  container.style.width = '100%';
  container.style.maxWidth = '400px'; // Default max width
  container.style.height = 'auto';
  container.style.pointerEvents = 'none';

  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-govt-chatbot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.maxHeight = '100vh';
  iframe.style.pointerEvents = 'auto';
  iframe.style.borderRadius = '12px 12px 0 0';
  iframe.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)';
  iframe.title = 'Punjab Government Chatbot';

  container.appendChild(iframe);
  document.body.appendChild(container);

  // Handle responsive behavior
  function handleResize() {
    if (window.innerWidth < 768) {
      container.style.maxWidth = '100%';
      container.style.right = '0';
      container.style.bottom = '0';
    } else {
      container.style.maxWidth = '400px';
      container.style.right = '20px';
      container.style.bottom = '20px';
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize(); // Initial call

  window.addEventListener('message', function(event) {
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app') {
      return;
    }

    if (event.data.type === 'chatOpen') {
      container.style.pointerEvents = 'auto';
      iframe.style.pointerEvents = 'auto';
    } else if (event.data.type === 'chatClosed') {
      container.style.pointerEvents = 'none';
      iframe.style.pointerEvents = 'none';
    } else if (event.data.type === 'maximize') {
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.maxWidth = 'none';
      container.style.top = '0';
      container.style.left = '0';
      container.style.right = 'auto';
      container.style.bottom = 'auto';
      iframe.style.height = '100%';
      iframe.style.borderRadius = '0';
    } else if (event.data.type === 'restore') {
      container.style.width = '100%';
      container.style.maxWidth = window.innerWidth < 768 ? '100%' : '400px';
      container.style.height = 'auto';
      container.style.top = 'auto';
      container.style.left = 'auto';
      container.style.right = window.innerWidth < 768 ? '0' : '20px';
      container.style.bottom = window.innerWidth < 768 ? '0' : '20px';
      iframe.style.height = '600px';
      iframe.style.borderRadius = '12px 12px 0 0';
    }
  });
})();
