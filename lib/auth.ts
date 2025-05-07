import { useCallback, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const useTokenManagement = () => {
  const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY as string;
  const [isInitialized, setIsInitialized] = useState(false);

  const getToken = useCallback((key: string) => {
    return typeof window !== "undefined" ? localStorage.getItem(key) || "" : "";
  }, []);

  const setToken = useCallback((key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }, []);

  const getAuthToken = useCallback(() => getToken("x-auth-token"), [getToken]);
  const setAuthToken = useCallback((token: string) => setToken("x-auth-token", token), [setToken]);
  const getVerificationToken = useCallback(() => getToken("verification-token"), [getToken]);
  const setVerificationToken = useCallback((token: string) => setToken("verification-token", token), [setToken]);

  const generateTokens = useCallback(async () => {
    try {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      
      const authToken = jwt.sign(
        { property: "Punjab Government", iat: nowInSeconds - 100 },
        JWT_KEY,
        { expiresIn: "1h" }
      );

      const verificationToken = `verification-token-${Date.now()}`;

      setAuthToken(authToken);
      setVerificationToken(verificationToken);

      return { authToken, verificationToken };
    } catch (error) {
      console.error("Error generating tokens:", error);
      throw new Error("Failed to generate authentication tokens");
    }
  }, [JWT_KEY, setAuthToken, setVerificationToken]);

  const isTokenExpired = useCallback((token: string) => {
    if (!token) return true;
    try {
     
      const decoded = jwt.verify(token, JWT_KEY);
      return !decoded || typeof decoded !== 'object';
    } catch (error: unknown) {
     
      if (error && typeof error === 'object' && 'name' in error && error.name === 'TokenExpiredError') {
        return true;
      }
      console.error("Error verifying token:", error);
      return true; 
    }
  }, [JWT_KEY]);
  
  const ensureValidTokens = useCallback(async () => {
    const authToken = getAuthToken();
    if (!authToken || isTokenExpired(authToken)) {
      return await generateTokens();
    }
    return { 
      authToken,
      verificationToken: getVerificationToken()
    };
  }, [getAuthToken, getVerificationToken, isTokenExpired, generateTokens]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initialize = async () => {
      try {
        const authToken = getAuthToken();
        if (!authToken || isTokenExpired(authToken)) {
          await generateTokens();
        }
      } catch (err) {
        console.error("Failed to initialize tokens:", err);
      } finally {
        setIsInitialized(true);
      }
    };

    initialize();
  }, [getAuthToken, isTokenExpired, generateTokens]);

  return {
    ensureValidTokens,
    isInitialized,
  };
};






