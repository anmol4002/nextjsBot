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
  var iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '500px'; 
  iframe.style.height = '600px';
  iframe.style.maxWidth = '100%'; 
  iframe.id = 'punjab-chatbot-frame';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.zIndex = '9999';
  iframe.style.transition = 'all 0.3s ease';
  iframe.title = 'Punjab Government Chatbot';
  
  
  window.addEventListener('message', function(event) {
    if (event.data.type === 'maximize-widget') {
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
    } else if (event.data.type === 'restore-widget') {
      iframe.style.width = '500px';
      iframe.style.height = '600px';
      iframe.style.top = 'auto';
      iframe.style.left = 'auto';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
    }
  });
  

  document.body.appendChild(iframe);
})();

















