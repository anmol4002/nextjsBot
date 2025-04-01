// https://connect.punjab.gov.in/chatbotapi/dgr-stream

// import { NextApiRequest, NextApiResponse } from "next";

// export const config = {
//   runtime: 'edge',
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const { message, department,lang="auto" } = req.body;

//     // Retrieve tokens from the request headers
//     const authToken = req.headers["x-auth-token"] as string;
//     const verificationToken = req.headers["x-request-verification-token"] as string;

//     // Log tokens for debugging
//     // console.log("Auth Token from headers:", authToken);
//     // console.log("Verification Token from headers:", verificationToken);

//     if (!authToken || !verificationToken) {
//       return res.status(400).json({ message: "Tokens are missing in the request headers" });
//     }

//     // Forward the request to the chatbot API
//     const response = await fetch("https://chatbotapi.psegs.in/dgr-stream", {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         Accept: "text/event-stream",
//         "Content-Type": "application/json",
//         "X-Auth-Token": authToken,
//         "X-Request-Verification-Token": verificationToken,
//         Connection: "keep-alive",
//       },
//       body: JSON.stringify({ message, department,lang }),
//     });

//     // Log the response status and body for debugging
//     if (!response.ok) {
//       const errorResponse = await response.json();
//       console.error("API Error Response:", errorResponse);

//       // Handle specific error for "Invalid X-Auth-Token"
//       if (errorResponse.error === "Invalid X-Auth-Token") {
//         console.error("Invalid X-Auth-Token error. Details:", {
//           authToken,
//           verificationToken,
//         });
//         return res.status(401).json({ message: "Invalid X-Auth-Token" });
//       }

//       // Handle specific error for "stream busy"
//       if (response.status === 429) {
//         return res.status(429).json({ message: "The stream is busy. Please try again later." });
//       }

//       // Handle other errors
//       throw new Error(errorResponse.error || `HTTP error! Status: ${response.status}`);
//     }

//     // Stream the response back to the client
//     const reader = response.body?.getReader();
//     if (!reader) {
//       throw new Error("No reader available");
//     }

//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");
//     res.setHeader("Connection", "keep-alive");
 

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       const chunk = new TextDecoder().decode(value);
//       res.write(chunk);
//     }

//     res.end();
//   } catch (error) {
//     console.error("Error in /api/chat:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }




import { NextRequest } from "next/server";

export const config = {
  runtime: 'edge',
};

// Token validation function (replace with your actual validation logic)
const validateToken = (token: string): boolean => {
  if (!token) return false;
  
  // Simple JWT expiration check (for more robust validation, use a JWT library)
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return false;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    
    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

export default async function handler(req: NextRequest) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-auth-token, x-request-verification-token',
      },
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    // Parse request body
    const { message, department, lang = "auto" } = await req.json();

    // Retrieve and validate tokens from headers
    const authToken = req.headers.get('x-auth-token');
    const verificationToken = req.headers.get('x-request-verification-token');

    if (!authToken || !verificationToken) {
      return new Response(
        JSON.stringify({ 
          message: "Authentication tokens are missing",
          error: "MISSING_TOKENS"
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Validate tokens
    if (!validateToken(authToken) || !validateToken(verificationToken)) {
      return new Response(
        JSON.stringify({ 
          message: "Invalid or expired authentication tokens",
          error: "INVALID_TOKENS"
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Forward the request to the chatbot API
    const chatbotResponse = await fetch("https://chatbotapi.psegs.in/dgr-stream", {
      method: "POST",
      headers: {
        "Accept": "text/event-stream",
        "Content-Type": "application/json",
        "X-Auth-Token": authToken,
        "X-Request-Verification-Token": verificationToken,
      },
      body: JSON.stringify({ 
        message, 
        department, 
        lang 
      }),
    });

    // Handle chatbot API errors
    if (!chatbotResponse.ok) {
      let errorResponse;
      try {
        errorResponse = await chatbotResponse.json();
      } catch {
        errorResponse = { error: "Unknown error occurred" };
      }

      // Special handling for token errors
      if (chatbotResponse.status === 401) {
        return new Response(
          JSON.stringify({ 
            message: "Chatbot API rejected our tokens",
            error: "CHATBOT_AUTH_FAILURE",
            details: errorResponse
          }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Handle rate limiting
      if (chatbotResponse.status === 429) {
        return new Response(
          JSON.stringify({ 
            message: "Chatbot API is busy. Please try again later.",
            error: "RATE_LIMITED"
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Forward other errors
      return new Response(
        JSON.stringify({ 
          message: "Chatbot API request failed",
          error: "CHATBAPI_ERROR",
          status: chatbotResponse.status,
          details: errorResponse
        }),
        {
          status: chatbotResponse.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = chatbotResponse.body?.getReader();
        
        if (!reader) {
          controller.error(new Error("No reader available"));
          return;
        }

        const processStream = async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              controller.enqueue(value);
            }
            controller.close();
          } catch (error) {
            console.error("Stream error:", error);
            controller.error(error);
          }
        };

        await processStream();
      },
      cancel() {
        // Clean up if the stream is cancelled
        chatbotResponse.body?.cancel();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ 
        message: "Internal Server Error",
        error: "INTERNAL_ERROR"
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
