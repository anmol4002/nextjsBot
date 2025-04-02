// import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";

// const JWT_KEY = process.env.JWT_KEY || "";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     // Generating X-Auth-Token
//     const authToken = jwt.sign(
//       {
//         property: "Punjab Government",
//       },
//       JWT_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );

//     // Generating Verification Token
//     const verificationToken = `verification-token-${Date.now()}`;

//     // Returning tokens
//     res.status(200).json({ authToken, verificationToken });
//   } catch (error) {
//     console.error("Error generating tokens:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }





import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const JWT_KEY = process.env.JWT_KEY;

export default async function handler(req: NextRequest) {
  if (req.method !== 'GET') {
    return new NextResponse(
      JSON.stringify({ message: 'Method Not Allowed' }),
      { status: 405 }
    );
  }

  try {
    if (!JWT_KEY) {
      throw new Error('JWT_KEY is not configured');
    }

    // Generating X-Auth-Token
    const authToken = await new Response(
      new TextEncoder().encode(
        JSON.stringify({
          property: "Punjab Government",
        })
      )
    ).text().then(() => {
      return jwt.sign(
        {
          property: "Punjab Government",
        },
        JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
    });

    // Generating Verification Token
    const verificationToken = `verification-token-${Date.now()}`;

    return new NextResponse(
      JSON.stringify({ authToken, verificationToken }),
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        }
      }
    );
  } catch (error) {
    console.error("Error generating tokens:", error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
