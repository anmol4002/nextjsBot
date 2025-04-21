(function() {
    // Only initialize if not already done
    if (document.getElementById('punjab-govt-chatbot')) return;
    
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'punjab-govt-chatbot';
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'punjab-govt-chatbot-iframe';
    iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '85px';
    iframe.style.height = '85px';
    iframe.style.maxWidth = '500px';
    iframe.style.maxHeight = '700px';
    iframe.style.border = 'none';
    iframe.style.background = 'transparent';
    iframe.style.zIndex = '999999';
    iframe.style.transition = 'all 0.3s ease';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('allowtransparency', 'true');
    iframe.title = 'Punjab Government Chatbot';
    
    // Append iframe to container
    widgetContainer.appendChild(iframe);
    document.body.appendChild(widgetContainer);
    
    // Handle messages from iframe
    window.addEventListener('message', function(event) {
      // Validate origin for security
      if (event.origin !== 'https://nextjs-bot-ten.vercel.app') return;
      
      // Process iframe messages
      if (event.data && event.data.type === 'chatState') {
        if (event.data.isOpen) {
          iframe.style.width = '450px';
          iframe.style.height = '650px';
        } else {
          iframe.style.width = '85px';
          iframe.style.height = '85px';
        }
      }
      
      // Handle resizing requests
      if (event.data && event.data.type === 'resize') {
        if (event.data.width) iframe.style.width = event.data.width + 'px';
        if (event.data.height) iframe.style.height = event.data.height + 'px';
      }
    });
    
    // Check if script loaded
    console.log('Punjab Govt Chatbot widget initialized');
  })();
