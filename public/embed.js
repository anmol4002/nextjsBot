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
  // Create the iframe
  var iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '150px'; 
  iframe.style.height = '150px'; 
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.zIndex = '99999';
  iframe.style.borderRadius = '12px';
  iframe.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  iframe.style.transition = 'all 0.3s ease';
  iframe.title = 'Punjab Government Chatbot';
  
  // Create the toggle button
  var toggleBtn = document.createElement('div');
  toggleBtn.innerHTML = `
    <div style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; 
                background: #3b82f6; border-radius: 50%; display: flex; 
                align-items: center; justify-content: center; cursor: pointer;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 99998;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" 
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
  `;
  
  // Append elements to the body
  document.body.appendChild(iframe);
  document.body.appendChild(toggleBtn);
  
  // Toggle between minimized and maximized states
  var isExpanded = false;
  toggleBtn.addEventListener('click', function() {
    isExpanded = !isExpanded;
    if (isExpanded) {
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.bottom = '0';
      iframe.style.right = '0';
      iframe.style.borderRadius = '0';
    } else {
      iframe.style.width = '150px';
      iframe.style.height = '150px';
      iframe.style.bottom = '20px';
      iframe.style.right = '20px';
      iframe.style.borderRadius = '12px';
    }
  });
  
  // Handle messages from the iframe
  window.addEventListener('message', function(event) {
    if (event.data === 'minimizeChat') {
      iframe.style.width = '150px';
      iframe.style.height = '150px';
      iframe.style.bottom = '20px';
      iframe.style.right = '20px';
      iframe.style.borderRadius = '12px';
      isExpanded = false;
    }
  });
  
  // Make sure the iframe is properly positioned after load
  setTimeout(() => {
    iframe.style.setProperty('bottom', '20px', 'important');
  }, 100);
})();

