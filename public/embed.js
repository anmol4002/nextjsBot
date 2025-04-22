
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
  

  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-govt-chatbot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.width = '625px'; 
  iframe.style.height = '600px'; 
  iframe.style.pointerEvents = 'auto'; 
  iframe.title = 'Punjab Government Chatbot';

  container.appendChild(iframe);
  

  document.body.appendChild(container);
  
  
  window.addEventListener('message', function(event) {

    if (event.origin !== 'https://nextjs-bot-ten.vercel.app') {
      return;
    }
    
 
    if (event.data.type === 'chatOpen') {
      container.style.pointerEvents = 'auto'; 
    } else if (event.data.type === 'chatClosed') {
      container.style.pointerEvents = 'none'; 
    } else if (event.data.type === 'maximize') {
      iframe.style.width = '100vh';
      iframe.style.height = '100vh';
      container.style.width = '100%'; 
      container.style.height = '100%';
      container.style.top = '0';
      container.style.left = '0';
    } else if (event.data.type === 'restore') {
      iframe.style.width = '625px';
      iframe.style.height = '600px';
      container.style.width = 'auto';
      container.style.height = 'auto';
      container.style.top = 'auto';
      container.style.left = 'auto';
    }
  });
})();
