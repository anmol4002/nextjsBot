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
//           container.style.width = '500px';
//           container.style.maxWidth = '95%';
//           container.style.height = '80px';
//           break;
//         case 'chat': 
//           container.style.width = '500px';
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
          
//           container.style.width = '500px';
//           container.style.maxWidth = '95%';
//           container.style.height = '700px';
//           break;
//       }
//     }
//   });
// })(); 



(function() {
  // Create container and iframe elements
  const container = createContainer();
  const iframe = createIframe();
  
  // Add to DOM
  container.appendChild(iframe);
  document.body.appendChild(container);
  
  // Initialize and add styling
  initWidget();
  
  // Functions
  function createContainer() {
    const div = document.createElement('div');
    div.id = 'punjab-bot-container';
    div.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      width: 80px; 
      height: 80px;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      overflow: hidden;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    `;
    return div;
  }
  
  function createIframe() {
    const frame = document.createElement('iframe');
    frame.id = 'punjab-bot-iframe';
    frame.src = 'https://nextjs-bot-ten.vercel.app/widget';
    frame.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      pointer-events: auto;
      transition: opacity 0.3s ease;
      opacity: 0;
    `;
    frame.title = 'Punjab Government Chatbot';
    
    // Fade in the iframe
    setTimeout(() => {
      frame.style.opacity = '1';
    }, 300);
    
    return frame;
  }
  
  function initWidget() {
    // Add animation styles
    addAnimationStyles();
    
    // Set up event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('message', handleMessages);
    
    // Initialize container appearance
    setTimeout(() => {
      container.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }, 300);
    
    handleResize();
  }
  
  function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes scaleIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(10px);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideInRight {
        0% {
          opacity: 0;
          transform: translateX(30px);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      }
      
      .punjab-bot-scale-in {
        animation: scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      .punjab-bot-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .punjab-bot-slide-in {
        animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  function handleResize() {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Adjust container for chat or QR mode
    if (container.dataset.state === 'chat' || container.dataset.state === 'qr') {
      const maxHeight = Math.min(800, viewportHeight * 0.95);
      container.style.maxHeight = maxHeight + 'px';
    }
    
    // Adjust for small screens in maximized mode
    if (container.dataset.state === 'maximized' && viewportWidth < 768) {
      container.style.width = '100%';
      container.style.height = '100%';
    }
  }
  
  function handleMessages(event) {
    // Security check
    if (event.origin !== 'https://nextjs-bot-ten.vercel.app' && event.origin !== window.location.origin) return;

    if (event.data && event.data.type === 'widgetState') {
      // Update widget state
      const newState = event.data.state;
      container.dataset.state = newState;
      container.className = '';
      
      // Apply styling based on widget state
      switch(newState) {
        case 'icon':
          applyStateStyles({
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          });
          break;
          
        case 'icons':
          container.classList.add('punjab-bot-slide-in');
          applyStateStyles({
            width: '500px',
            maxWidth: '95%',
            height: '80px',
            borderRadius: '40px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          });
          break;
          
        case 'chat':
          container.classList.add('punjab-bot-scale-in');
          applyStateStyles({
            width: '500px',
            maxWidth: '95%',
            height: '700px',
            maxHeight: '80vh',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
          });
          break;
          
        case 'maximized':
          container.classList.add('punjab-bot-fade-in');
          applyStateStyles({
            width: '100%',
            height: '100%',
            right: '0',
            bottom: '0',
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '0',
            boxShadow: 'none'
          }, true);
          break;
          
        case 'qr':
          container.classList.add('punjab-bot-scale-in');
          applyStateStyles({
            width: '500px',
            maxWidth: '95%',
            height: '600px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          });
          break;
      }
      
      handleResize();
    }
  }
  
  function applyStateStyles(styles, isMaximized) {
    // Set appropriate transition based on state
    container.style.transition = isMaximized 
      ? 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    // Apply all style properties
    Object.assign(container.style, styles);
  }
})();
