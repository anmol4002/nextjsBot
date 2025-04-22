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
  iframe.style.width = '100px';  // Small initial width for just the chat button
  iframe.style.height = '100px'; // Small initial height for just the chat button
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.zIndex = '9999';
  iframe.style.pointerEvents = 'none'; // Initially allow clicks to pass through
  iframe.title = 'Punjab Government Chatbot';
  
 
  iframe.id = 'punjab-chat-iframe';
  
  window.addEventListener('message', function(event) {
y
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app') return;
    
    const data = event.data;
    if (!data || typeof data !== 'object') return;
    
   
    if (data.type === 'chatStateChange') {
      const iframe = document.getElementById('punjab-chat-iframe');
      if (!iframe) return;
      
      if (data.state === 'button') {
        
        iframe.style.width = '100px';
        iframe.style.height = '100px';
        iframe.style.pointerEvents = 'none';
      } else if (data.state === 'icons') {
     
        iframe.style.width = '520px'; 
        iframe.style.height = '80px';
        iframe.style.pointerEvents = 'auto';
      } else if (data.state === 'chat') {
        
        iframe.style.width = '500px';
        iframe.style.height = '600px';
        iframe.style.pointerEvents = 'auto';
      } else if (data.state === 'maximized') {
    
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.pointerEvents = 'auto';
      }
    }
  });
  
 
  var style = document.createElement('style');
  style.innerHTML = `
    body #punjab-chat-iframe {
      pointer-events: none;
    }
    body #punjab-chat-iframe.active {
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);

  iframe.onload = function() {
 
    var chatButtonArea = document.createElement('div');
    chatButtonArea.style.position = 'fixed';
    chatButtonArea.style.bottom = '4px';
    chatButtonArea.style.right = '6px';
    chatButtonArea.style.width = '60px';
    chatButtonArea.style.height = '60px';
    chatButtonArea.style.zIndex = '9998';
    chatButtonArea.style.cursor = 'pointer';
    
    chatButtonArea.onclick = function() {
      iframe.classList.add('active');
     
      iframe.contentWindow.postMessage({type: 'chatButtonClick'}, 'https://nextjs-bot-ten.vercel.app');
    };
    
    document.body.appendChild(chatButtonArea);
  };
  
 
  document.body.appendChild(iframe);
})();

















