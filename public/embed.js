// (function() {
  
//   var container = document.createElement('div');
//   container.id = 'punjab-bot-container';
//   container.style.position = 'fixed';
//   container.style.bottom = '0';
//   container.style.right = '0';
//   container.style.width = '80px'; 
//   container.style.height = '80px';
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
//           container.style.width = '80px';
//           container.style.height = '80px';
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
 
  const container = document.createElement('div');
  const iframe = document.createElement('iframe');
  
 
  container.id = 'punjab-bot-container';
  container.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    width: 80px; 
    height: 80px;
    z-index: 9999;
    transition: all 0.3s ease;
    overflow: hidden;
  `;
  
  iframe.id = 'punjab-bot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    pointer-events: auto;
  `;
  iframe.title = 'Punjab Government Chatbot';

  container.appendChild(iframe);
  document.body.appendChild(container);
  

  window.addEventListener('resize', handleResize);
  window.addEventListener('message', handleMessages);
  
  function handleResize() {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    if (container.dataset.state === 'chat' || container.dataset.state === 'qr') {
      const maxHeight = Math.min(800, viewportHeight * 0.95);
      container.style.maxHeight = maxHeight + 'px';
    }

    if (container.dataset.state === 'maximized' && viewportWidth < 768) {
      container.style.width = '100%';
      container.style.height = '100%';
    }
  }
  
  function handleMessages(event) {
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;

    if (event.data && event.data.type === 'widgetState') {
      const newState = event.data.state;
      container.dataset.state = newState;

      switch(newState) {
        case 'icon':
          
          container.style.width = '80px';
          container.style.height = '80px';
          container.style.borderRadius = '50%';
          break;
          
        case 'icons':
          container.style.width = '600px';
          container.style.maxWidth = '95%';
          container.style.height = '80px';
          container.style.borderRadius = '30px';
          break;
          
        case 'chat':
          container.style.width = '600px';
          container.style.maxWidth = '95%';
          container.style.height = '700px';
          container.style.maxHeight = '90vh';
          container.style.borderRadius = '8px';
          break;
          
        case 'maximized':
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.right = '0';
          container.style.bottom = '0';
          container.style.maxWidth = '100%';
          container.style.maxHeight = '100%';
          container.style.borderRadius = '0';
          break;
          
        case 'qr':
          container.style.width = '600px';
          container.style.maxWidth = '95%';
          container.style.height = '700px';
          container.style.borderRadius = '8px';
          break;
      }
      
      handleResize();
    }
  }
})();
