(function() {
  var iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '150px'; 
  iframe.style.height = '150px';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.zIndex = '9999';
  iframe.style.transition = 'all 0.3s ease';
  iframe.title = 'Punjab Government Chatbot';
  iframe.id = 'punjab-chatbot-frame';
  
  document.body.appendChild(iframe);
  
  var currentState = 'icon-only';
  
  window.addEventListener('message', function(event) {
    if (event.source !== iframe.contentWindow) return;
    
    if (event.data.type === 'resize') {
      var newState = event.data.state;
      var showIcons = event.data.showIcons;
      
      if (newState === 'icon-only') {
        iframe.style.width = '150px';
        iframe.style.height = '150px';
      } else if (newState === 'icons-panel') {
        iframe.style.width = '500px';
        iframe.style.height = '150px';
      } else if (newState === 'chat-open' || newState === 'qr-open') {
        iframe.style.width = '500px';
     
        iframe.style.height = showIcons ? '660px' : '600px';
      } else if (newState === 'chat-maximized') {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.bottom = '0';
        iframe.style.right = '0';
      }
      
      currentState = newState;
    }
  });
})();
