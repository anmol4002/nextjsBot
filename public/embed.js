(function() {
  
  var container = document.createElement('div');
  container.id = 'punjab-bot-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.width = '80px'; 
  container.style.height = '80px';
  container.style.pointerEvents = 'none'; 
  container.style.zIndex = '9999';
  container.style.transition = 'all 0.4s ease-in-out';

  var iframe = document.createElement('iframe');
  iframe.id = 'punjab-bot-iframe';
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.pointerEvents = 'auto'; 
  iframe.title = 'Punjab Government Chatbot';
  
  
  container.appendChild(iframe);
  document.body.appendChild(container);
  
  
  window.addEventListener('message', function(event) {
  
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;
    
   
    if (event.data && event.data.type === 'widgetState') {
      switch(event.data.state) {
        case 'icon':
          container.style.width = '80px';
          container.style.height = '80px';
          break;
        case 'icons':
          container.style.width = '600px';
          container.style.maxWidth = '95%';
          container.style.height = '80px';
          break;
        case 'chat': 
          container.style.width = '600px';
          container.style.maxWidth = '95%';
          container.style.height = '800px';
          container.style.maxHeight = '95%';
          break;
        case 'maximized':
          container.style.width = '100%';
          container.style.height = '100%';
          container.style.right = '0';
          container.style.bottom = '0';
          container.style.maxWidth = '100%';
          container.style.maxHeight = '100%';
          break;
        case 'qr':
          
          container.style.width = '600px';
          container.style.maxWidth = '95%';
          container.style.height = '700px';
          break;
      }
    }
  });
})(); 



// (function() {
//   // Create container and iframe elements
//   const container = createContainer();
//   const iframe = createIframe();
  
//   // Add to DOM
//   container.appendChild(iframe);
//   document.body.appendChild(container);
  
//   // Initialize and add styling
//   initWidget();
  
//   // Functions
//   function createContainer() {
//     const div = document.createElement('div');
//     div.id = 'punjab-bot-container';
//     div.style.cssText = `
//       position: fixed;
//       bottom: 0;
//       right: 0;
//       width: 80px; 
//       height: 80px;
//       pointer-events: none;
//       z-index: 9999;
//       transition: all 0.3s ease;
//       overflow: hidden;
//       border-radius: 50%;
//     `;
//     return div;
//   }
  
//   function createIframe() {
//     const frame = document.createElement('iframe');
//     frame.id = 'punjab-bot-iframe';
//     frame.src = 'https://nextjs-bot-ten.vercel.app/widget';
//     frame.style.cssText = `
//       width: 100%;
//       height: 100%;
//       border: none;
//       background: transparent;
//       pointer-events: auto;
//       transition: opacity 0.2s ease;
//       opacity: 0;
//     `;
//     frame.title = 'Punjab Government Chatbot';
    
//     // Fade in the iframe
//     setTimeout(() => {
//       frame.style.opacity = '1';
//     }, 200);
    
//     return frame;
//   }
  
//   function initWidget() {
//     // Add animation styles
//     addAnimationStyles();
    
//     // Set up event listeners
//     window.addEventListener('resize', handleResize);
//     window.addEventListener('message', handleMessages);
    
//     handleResize();
//   }
  
//   function addAnimationStyles() {
//     const styleSheet = document.createElement('style');
//     styleSheet.textContent = `
//       @keyframes fadeIn {
//         from { opacity: 0; }
//         to { opacity: 1; }
//       }
      
//       .punjab-bot-fade-in {
//         animation: fadeIn 0.3s ease-out forwards;
//       }
//     `;
//     document.head.appendChild(styleSheet);
//   }
  
//   function handleResize() {
//     const viewportHeight = window.innerHeight;
//     const viewportWidth = window.innerWidth;

//     if (container.dataset.state === 'chat' || container.dataset.state === 'qr') {
//       const maxHeight = Math.min(800, viewportHeight * 0.95);
//       container.style.maxHeight = maxHeight + 'px';
//     }

//     if (container.dataset.state === 'maximized' && viewportWidth < 768) {
//       container.style.width = '100%';
//       container.style.height = '100%';
//     }
//   }
  
//   function handleMessages(event) {

//     if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;

//     if (event.data && event.data.type === 'widgetState') {

//       const newState = event.data.state;
//       container.dataset.state = newState;
//       container.className = '';
      

//       switch(newState) {
//         case 'icon':
//           applyStateStyles({
//             width: '80px',
//             height: '80px',
//             borderRadius: '50%'
//           });
//           break;
          
//         case 'icons':
//           container.classList.add('punjab-bot-fade-in');
//           applyStateStyles({
//             width: '600px',
//             maxWidth: '95%',
//             height: '80px',
//             borderRadius: '30px'
//           });
//           break;
          
//         case 'chat':
//           container.classList.add('punjab-bot-fade-in');
//           applyStateStyles({
//             width: '600px',
//             maxWidth: '95%',
//             height: '700px',
//             maxHeight: '90vh',
//             borderRadius: '8px'
//           });
//           break;
          
//         case 'maximized':
//           container.classList.add('punjab-bot-fade-in');
//           applyStateStyles({
//             width: '100%',
//             height: '100%',
//             right: '0',
//             bottom: '0',
//             maxWidth: '100%',
//             maxHeight: '100%',
//             borderRadius: '0'
//           }, true);
//           break;
          
//         case 'qr':
//           container.classList.add('punjab-bot-fade-in');
//           applyStateStyles({
//             width: '600px',
//             maxWidth: '95%',
//             height: '700px',
//             borderRadius: '8px'
//           });
//           break;
//       }
      
//       handleResize();
//     }
//   }
  
//   function applyStateStyles(styles, isMaximized) {
//     // Set appropriate transition based on state
//     container.style.transition = isMaximized 
//       ? 'all 0.3s ease'
//       : 'all 0.3s ease';
    
//     // Apply all style properties
//     Object.assign(container.style, styles);
//   }
// })();
