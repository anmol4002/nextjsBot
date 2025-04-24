// (function() {
//   var iframe = document.createElement('iframe');
//   iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
//   iframe.style.position = 'fixed';
//   iframe.style.bottom = '0';
//   iframe.style.right = '0';
//   iframe.style.width = '150px'; 
//   iframe.style.height = '150px';
//   iframe.style.border = 'none';
//   iframe.style.background = 'transparent';
//   iframe.style.zIndex = '9999';
//   iframe.style.transition = 'all 0.3s ease';
//   iframe.title = 'Punjab Government Chatbot';
//   iframe.id = 'punjab-chatbot-frame';
  
//   document.body.appendChild(iframe);
  
//   var currentState = 'icon-only';
  
//   window.addEventListener('message', function(event) {
//     if (event.source !== iframe.contentWindow) return;
    
//     if (event.data.type === 'resize') {
//       var newState = event.data.state;
//       var showIcons = event.data.showIcons;
      
//       if (newState === 'icon-only') {
//         iframe.style.width = '150px';
//         iframe.style.height = '150px';
//       } else if (newState === 'icons-panel') {
//         iframe.style.width = '500px';
//         iframe.style.height = '150px';
//       } else if (newState === 'chat-open' || newState === 'qr-open') {
//         iframe.style.width = '500px';
     
//         iframe.style.height = showIcons ? '660px' : '600px';
//       } else if (newState === 'chat-maximized') {
//         iframe.style.width = '100%';
//         iframe.style.height = '100%';
//         iframe.style.bottom = '0';
//         iframe.style.right = '0';
//       }
      
//       currentState = newState;
//     }
//   });
// })();

// 🌸🌸🌸🌸🌸🌸🌸🌸🌸

// (function() {

//   var iframe = document.createElement('iframe');
//   iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
//   iframe.title = 'Punjab Government Chatbot';
//   iframe.className = 'chatbotFrame';
//   iframe.allowTransparency = true;
//   iframe.frameBorder = '0';
//   iframe.scrolling = 'yes';

//   iframe.style.position = 'fixed';
//   iframe.style.bottom = '0';
//   iframe.style.right = '0';
//   iframe.style.width = '150px';
//   iframe.style.height = '150px';
//   iframe.style.border = 'none';
//   iframe.style.background = 'transparent';
//   iframe.style.zIndex = '99999';
//   iframe.style.overflow = 'visible';
//   iframe.style.float = 'none';
  

//   document.body.appendChild(iframe);
  
//   window.addEventListener('message', function(event) {

//     if (event.origin !== 'https://nextjs-bot-ten.vercel.app') {
//       return;
//     }
 
//     if (event.data && event.data.type === 'CHATBOT_STATE') {
//       switch(event.data.state) {
//         case 'icon':
         
//           iframe.style.width = '150px';
//           iframe.style.height = '150px';
//           break;
          
//         case 'icons':
        
//           iframe.style.width = '500px'; 
//           iframe.style.height = '100px';  
//           break;
          
//         case 'open':
       
//           if (event.data.maximized) {
         
//             iframe.style.width = '100%';
//             iframe.style.height = '100%';
//           } else {
            
//             iframe.style.width = '500px';  
//             iframe.style.height = '600px'; 
//           }
//           break;
//       }
//     }
//   });
// })();











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
  iframe.style.zIndex = '99999';
  iframe.title = 'Punjab Government Chatbot';
  iframe.allowTransparency = 'true';
  iframe.className = 'chatbotFrame';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'yes');  
  iframe.style.overflow = 'auto';
  
  document.body.appendChild(iframe);

  function handleMessage(event) {
    if (event.origin !== "https://nextjs-bot-ten.vercel.app") return;
    
    if (event.data.type === 'widgetState') {
      if (event.data.state === 'expanded') {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.overflow = 'auto';
      } else {
        iframe.style.width = '150px';
        iframe.style.height = '150px';
        iframe.style.overflow = 'visible';
      }
    }
  }

  window.addEventListener('message', handleMessage);
})();
