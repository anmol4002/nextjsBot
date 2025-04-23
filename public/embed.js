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





(function() {
  var container = document.createElement('div');
  container.id = 'punjab-bot-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
    container.style.width = '90px'; 
  container.style.height = '90px';
  container.style.pointerEvents = 'none'; 
  container.style.zIndex = '9999';
  container.style.transition = 'all 0.4s ease-in-out';

  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-bot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.width = '80%';
  iframe.style.height = '80%';
  container.appendChild(iframe);
  document.body.appendChild(container);

  window.addEventListener('message', function(event) {
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && 
        event.origin !== window.location.origin) return;
    
    if (event.data && event.data.type === 'widgetState') {
      switch(event.data.state) {
        case 'icon':
          container.style.width = '90px';
          container.style.height = '90px';
          container.style.pointerEvents = 'none'; // Only iframe is clickable
          break;
        case 'icons':
          container.style.width = '700px';
          container.style.maxWidth = '95%';
          container.style.height = '80px';
          container.style.pointerEvents = 'none';
          break;
        case 'chat':
          container.style.width = '700px';
          container.style.maxWidth = '95%';
          container.style.height = '800px';
          container.style.maxHeight = '95%';
          container.style.pointerEvents = 'none';
          break;
        case 'maximized':
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.right = '0';
          container.style.bottom = '0';
          container.style.maxWidth = '100%';
          container.style.maxHeight = '100%';
          container.style.pointerEvents = 'auto'; // Block clicks when maximized
          break;
        case 'qr':
          container.style.width = '700px';
          container.style.maxWidth = '95%';
          container.style.height = '800px';
          container.style.pointerEvents = 'none';
          break;
      }
    }
    
    // Add handling for privacy policy and toast messages
    if (event.data.type === 'showPrivacyPolicy') {
      // Create/show modal in parent window
    }
    
    if (event.data.type === 'showToast') {
      // Create/show toast in parent window
    }
  });
})();







