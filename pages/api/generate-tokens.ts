import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Generating X-Auth-Token
    const authToken = jwt.sign(
      {
        property: "Punjab Government",
      },
      JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Generating Verification Token
    const verificationToken = `verification-token-${Date.now()}`;

    // Returning tokens
    res.status(200).json({ authToken, verificationToken });
  } catch (error) {
    console.error("Error generating tokens:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

