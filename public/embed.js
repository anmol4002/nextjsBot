
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

function loadChatWidget(chatUrl) {
  var iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.position = 'fixed';
  iframe.style.setProperty('bottom', '0px', 'important');
  iframe.style.right = '2px';
  iframe.style.width = '150px';
  iframe.style.height = '150px';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.style.zIndex = '9999';
  iframe.title = 'Punjab Government Chatbot';
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'no');
  
  document.body.appendChild(iframe);
  
  // Handle messages for expanding/collapsing the chatbot
  window.addEventListener('message', function(event) {
    if (event.data === 'openChat') {
      iframe.style.width = '100%';
      iframe.style.height = '100%';
    }
    if (event.data === 'closeChat') {
      iframe.style.width = '150px';
      iframe.style.height = '150px';
    }
  });
  
  setTimeout(() => {
    iframe.style.setProperty('bottom', '0px', 'important');
  }, 100);
}

function loadChatWhenReady(chatUrl) {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    loadChatWidget(chatUrl);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      loadChatWidget(chatUrl);
    });
  }
}

loadChatWhenReady('https://nextjs-bot-ten.vercel.app/widget');
