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
  // Create iframe for the widget
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

 
  window.addEventListener('message', function(event) {
    
    if (event.source !== iframe.contentWindow) return;
    
    if (event.data.type === 'resize') {
    
      if (event.data.state === 'icon-only') {
        iframe.style.width = '80px';
        iframe.style.height = '80px';
      } else if (event.data.state === 'icons-panel') {
        iframe.style.width = '500px';
        iframe.style.height = '80px';
      } else if (event.data.state === 'chat-open') {
        iframe.style.width = '500px';
        iframe.style.height = '600px';
      } else if (event.data.state === 'chat-maximized') {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
      }
    }
  });
})();
