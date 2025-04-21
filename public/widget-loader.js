(function() {
  console.log("Punjab Chatbot widget loader script is running");
  
  // Create the iframe element
  const iframe = document.createElement('iframe');
  
  // Set its attributes
  iframe.src = "https://nextjs-bot-ten.vercel.app/widget";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";  // Changed from 0 to be more visible
  iframe.style.right = "20px";   // Changed from 2px to be more visible
  iframe.style.width = "350px";  // Fixed width instead of 100%
  iframe.style.height = "600px"; // Fixed height instead of 100%
  iframe.style.border = "1px solid #ccc"; // Added border for visibility during testing
  iframe.style.background = "transparent";
  iframe.style.zIndex = "9999";
  iframe.style.overflow = "hidden";
  iframe.title = "Punjab Government Chatbot";
  
  console.log("Creating iframe for Punjab Chatbot");
  
  // Append the iframe to the body
  document.body.appendChild(iframe);
  
  console.log("Punjab Chatbot iframe added to page");
})();
