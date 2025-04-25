// (function () {
//   var iframe = document.createElement('iframe');
//   iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
//   iframe.style.position = 'fixed';
//   iframe.style.bottom = '0';
//   iframe.style.right = '0';
//   iframe.style.width = '150px';
//   iframe.style.height = '150px';
//   iframe.style.border = 'none';
//   iframe.style.background = 'transparent';
//   iframe.style.zIndex = '99999';
//   iframe.style.transition = 'all 0.3s ease';
//   iframe.title = 'Punjab Government Chatbot';
//   iframe.allowTransparency = 'true';
//   iframe.className = 'chatbotFrame';
//   iframe.setAttribute('frameborder', '0');
//   iframe.setAttribute('scrolling', 'yes');

//   document.body.appendChild(iframe);

//   function handleMessage(event) {
//     if (event.data.type === 'widgetState') {
//       switch (event.data.state) {
//         case 'chatOpen':
//           iframe.style.width = '100%';
//           iframe.style.height = '100%';
//           break;
//         case 'showIcons':
//           iframe.style.width = '600px';
//           iframe.style.height = '150px';
//           break;
//         default:
//           iframe.style.width = '150px';
//           iframe.style.height = '150px';
//       }
//     }
//   }

//   function handleClickOutside(event) {
//     if (!iframe.contains(event.target)) {
//       iframe.contentWindow.postMessage({
//         type: 'closeWidget'
//       }, '*');
//     }
//   }

//   window.addEventListener('message', handleMessage);
//   document.addEventListener('click', handleClickOutside);
// })();




// (function () {
//   var iframe = document.createElement('iframe');
//   iframe.src = 'https://nextjs-bot-ten.vercel.app/'; 
//   iframe.style.position = 'fixed';
//   iframe.style.bottom = '0';
//   iframe.style.right = '0';
//   iframe.style.width = '150px';
//   iframe.style.height = '150px';
//   iframe.style.border = 'none';
//   iframe.style.background = 'transparent';
//   iframe.style.zIndex = '99999';
//   iframe.style.transition = 'all 0.3s ease';
//   iframe.title = 'Punjab Government Chatbot';
//   iframe.allowTransparency = 'true';
//   iframe.className = 'chatbotFrame';
//   iframe.setAttribute('frameborder', '0');
//   iframe.setAttribute('scrolling', 'yes');

//   document.body.appendChild(iframe);

//   function handleMessage(event) {
//     if (event.data.type === 'widgetState') {
//       switch (event.data.state) {
//         case 'chatOpen':
//           iframe.style.width = '100%';
//           iframe.style.height = '100%';
//           break;
//         case 'showIcons':
//           iframe.style.width = '600px';
//           iframe.style.height = '150px';
//           break;
//         default:
//           iframe.style.width = '150px';
//           iframe.style.height = '150px';
//       }
//     }
//   }

//   function handleClickOutside(event) {
//     if (!iframe.contains(event.target)) {
//       iframe.contentWindow.postMessage({
//         type: 'closeWidget'
//       }, '*');
//     }

//   }

//   window.addEventListener('message', handleMessage);
//   document.addEventListener('click', handleClickOutside);
// })();


// 🌸🌸🌸🌸🌸🌸🌸🌸🌸


(function() {
  
  const allowedDomains = [
    'localhost:3000',
  '127.0.0.1:5500',
  'connect.punjab.gov.in',
  'github.com',
  'github.io',
  'anmolbenipal.github.io',
  ];
  
  // Check current domain
  const currentDomain = window.location.hostname;
  const isAllowed = allowedDomains.some(domain => 
    currentDomain === domain || currentDomain.endsWith(`.${domain}`)
  );

  if (!isAllowed) {
    console.warn('Chatbot embedding not allowed on this domain');
    return;
  }

  // Create iframe only on allowed domains
  const iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/';
  iframe.title = 'Punjab Government Chatbot';
  iframe.className = 'chatbotFrame';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '150px';
  iframe.style.height = '150px';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.zIndex = '99999';
  iframe.style.transition = 'all 0.3s ease';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'yes');

  document.body.appendChild(iframe);

  // Resize logic
  window.addEventListener('message', (event) => {
    if (event.data.type === 'widgetState') {
      switch (event.data.state) {
        case 'chatOpen':
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          break;
        case 'showIcons':
          iframe.style.width = '600px';
          iframe.style.height = '150px';
          break;
        default:
          iframe.style.width = '150px';
          iframe.style.height = '150px';
      }
    }
  });
})();

