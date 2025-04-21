(function() {
  
    const iframe = document.createElement('iframe');
    
   
    iframe.src = 'https://nextjs-bot-ten.vercel.app/widget';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '2px';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.background = 'transparent';
    iframe.style.zIndex = '9999';
    iframe.style.overflow = 'hidden';
    iframe.title = 'Punjab Government Chatbot';
    
    document.body.appendChild(iframe);
  })();
