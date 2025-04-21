
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
(function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '370px';
    iframe.style.height = '500px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    iframe.style.zIndex = '9999';
    iframe.title = 'Punjab Government Chatbot';
    iframe.allow = 'clipboard-write';
    iframe.setAttribute('aria-label', 'Chatbot Widget');

    document.body.appendChild(iframe);
})();
