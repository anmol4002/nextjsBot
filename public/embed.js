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
 
//   var iframe = document.createElement('iframe');
//   iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
//   iframe.style.position = 'fixed';
//   iframe.style.bottom = '0';
//   iframe.style.right = '2px';
//   iframe.style.width = '100vh'; 
//   iframe.style.height = '100vh'; 
  
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
  iframe.style.width = '600px'; // Fixed width for widget
  iframe.style.height = '700px'; // Fixed height for widget
  iframe.style.maxWidth = '100%'; // Responsive constraint
  iframe.style.maxHeight = '100%'; // Responsive constraint
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.background = 'transparent';
  iframe.style.zIndex = '9999';
  iframe.style.overflow = 'hidden';
  iframe.style.transition = 'all 0.3s ease';
  iframe.title = 'Punjab Government Chatbot';
  
  // Handle responsive behavior
  function handleResize() {
    if (window.innerWidth < 500) {
      iframe.style.width = 'calc(100% - 20px)';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
    } else {
      iframe.style.width = '600px';
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize();
  
  document.body.appendChild(iframe);
})();









