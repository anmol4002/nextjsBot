(function() {
  // Create the iframe element
  var iframe = document.createElement('iframe');
  
  // Set iframe attributes
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
  
  // Create a container div for better control
  var container = document.createElement('div');
  container.id = 'punjab-gov-chatbot-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.width = '400px'; // Default width
  container.style.height = '600px'; // Default height
  container.style.maxWidth = '100%';
  container.style.maxHeight = '100%';
  container.style.zIndex = '9999';
  container.style.border = 'none';
  
  // Add responsive behavior
  function adjustSize() {
    if (window.innerWidth < 768) {
      // Mobile view - full screen
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.right = '0';
      container.style.bottom = '0';
    } else {
      // Desktop view - widget style
      container.style.width = '400px';
      container.style.height = '600px';
      container.style.right = '20px';
      container.style.bottom = '20px';
    }
  }
  
  // Add the iframe to the container
  container.appendChild(iframe);
  
  // Add the container to the body
  document.body.appendChild(container);
  
  // Set up event listeners for responsiveness
  window.addEventListener('resize', adjustSize);
  adjustSize(); // Initial adjustment
  
  // Optional: Add a close button
  var closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.zIndex = '10000';
  closeButton.style.background = 'transparent';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.fontSize = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = function() {
    container.style.display = 'none';
  };
  container.appendChild(closeButton);
})();
