(function() {
  // Prevent duplicate widgets
  if (window.punjabGovChatbotLoaded) return;
  window.punjabGovChatbotLoaded = true;
  
  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '350px';
  iframe.style.height = '500px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  iframe.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  iframe.style.zIndex = '9999';
  iframe.title = 'Punjab Government Chatbot';
  
  // Create close button
  var closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '-10px';
  closeButton.style.right = '-10px';
  closeButton.style.background = '#fff';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '50%';
  closeButton.style.width = '24px';
  closeButton.style.height = '24px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  closeButton.onclick = function() {
    iframe.remove();
    closeButton.remove();
    window.punjabGovChatbotLoaded = false;
  };
  
  // Add to document
  document.body.appendChild(iframe);
  document.body.appendChild(closeButton);
  
  // Position close button relative to iframe
  closeButton.style.position = 'fixed';
  closeButton.style.bottom = 'calc(500px + 20px - 10px)'; // iframe height + bottom position - offset
  closeButton.style.right = 'calc(20px - 10px)'; // right position - offset
})();
