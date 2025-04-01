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

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { message, department, lang = "auto" } = await req.json();

    // Retrieve tokens from the request headers
    const authToken = req.headers.get("x-auth-token") || '';
    const verificationToken = req.headers.get("x-request-verification-token") || '';

    if (!authToken || !verificationToken) {
      return new Response(
        JSON.stringify({ message: "Tokens are missing in the request headers" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Forward the request to the chatbot API
    const response = await fetch("https://chatbotapi.psegs.in/dgr-stream", {
      method: "POST",
      headers: {
        "Accept": "text/event-stream",
        "Content-Type": "application/json",
        "X-Auth-Token": authToken,
        "X-Request-Verification-Token": verificationToken,
      },
      body: JSON.stringify({ message, department, lang }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);

      if (errorResponse.error === "Invalid X-Auth-Token") {
        return new Response(
          JSON.stringify({ message: "Invalid X-Auth-Token" }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ message: "The stream is busy. Please try again later." }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      throw new Error(errorResponse.error || `HTTP error! Status: ${response.status}`);
    }

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.error(new Error("No reader available"));
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}


