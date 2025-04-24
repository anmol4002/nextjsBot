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
  
//   var container = document.createElement('div');
//   container.id = 'punjab-bot-container';
//   container.style.position = 'fixed';
//   container.style.bottom = '0';
//   container.style.right = '0';
//   container.style.width = '90px'; 
//   container.style.height = '90px';
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
//           container.style.width = '90px';
//           container.style.height = '90px';
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

// 🌸🌸🌸🌸🌸


function loadChatWidget(url) {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", url);
  iframe.setAttribute("allowtransparency", "true");
  iframe.setAttribute("class", "chatbot-iframe");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("scrolling", "no");
  iframe.style.position = "fixed";
  iframe.style.bottom = "0px";
  iframe.style.right = "0px";
  iframe.style.width = "auto";
  iframe.style.height = "auto";
  iframe.style.float = "none";
  iframe.style.overflow = "visible";
  iframe.style.background = "none";
  iframe.style.backgroundColor = "transparent";
  iframe.style.zIndex = "99999";
  iframe.style.pointerEvents = "auto";
  iframe.style.transition = "all 0.3s ease";
  document.body.appendChild(iframe);
  
 
  var widgetContainer = document.createElement("div");
  widgetContainer.id = "punjab-gov-chatbot-container";
  widgetContainer.style.position = "fixed";
  widgetContainer.style.bottom = "0";
  widgetContainer.style.right = "0";
  widgetContainer.style.zIndex = "99999";
  widgetContainer.style.pointerEvents = "auto";
  widgetContainer.style.transition = "all 0.3s ease";
  widgetContainer.appendChild(iframe);
  document.body.appendChild(widgetContainer);
  
  window.addEventListener("message", function (event) {
    if (event.data === "widgetOpen") {
      iframe.style.width = "95%";
      iframe.style.maxWidth = "450px";
      iframe.style.height = "550px";
      widgetContainer.style.width = "auto";
      widgetContainer.style.height = "auto";
    } else if (event.data === "widgetClosed") {
      iframe.style.width = "auto";
      iframe.style.height = "auto";
      widgetContainer.style.width = "auto";
      widgetContainer.style.height = "auto";
    } else if (event.data === "widgetMaximized") {
     
      // widgetContainer.style.top = "0";
      // widgetContainer.style.left = "0";
      widgetContainer.style.right = "0";
      widgetContainer.style.bottom = "0";
      widgetContainer.style.width = "100%";
      widgetContainer.style.height = "100%";
      
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.maxWidth = "100%";
      iframe.style.position = "absolute";
      // iframe.style.top = "0";
      // iframe.style.left = "0";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.zIndex = "999999";
    }
  });
}

function loadWhenReady(url) {
  if (document.readyState === "complete" || 
      (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    loadChatWidget(url);
  } else {
    document.addEventListener("DOMContentLoaded", function() {
      loadChatWidget(url);
    });
  }
}

loadWhenReady("https://nextjs-bot-ten.vercel.app/widget");
