import { useCallback, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const useTokenManagement = () => {
  const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY as string;
  const [isInitialized, setIsInitialized] = useState(false);
  
  
  const getStorageItem = useCallback((key: string): string => {
    return typeof window !== "undefined" ? localStorage.getItem(key) || "" : "";
  }, []);

  const setStorageItem = useCallback((key: string, value: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }, []);

  const getAuthToken = useCallback(() => getStorageItem("x-auth-token"), [getStorageItem]);
  const setAuthToken = useCallback((token: string) => setStorageItem("x-auth-token", token), [setStorageItem]);
  const getVerificationToken = useCallback(() => getStorageItem("verification-token"), [getStorageItem]);
  const setVerificationToken = useCallback((token: string) => setStorageItem("verification-token", token), [setStorageItem]);

  
  const generateTokens = useCallback(async () => {
    try {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const authToken = jwt.sign(
        {
          property: "Punjab Government",
          iat: nowInSeconds - 100,
        },
        JWT_KEY,
        {
          expiresIn: "1h",
        }
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
      if (typeof window !== "undefined") {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        return payload.exp <= Date.now() / 1000;
      } else {
        const decoded = jwt.verify(token, JWT_KEY) as { exp: number };
        return decoded.exp < (Date.now() / 1000) + 300; // 5-minute buffer
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return true;
    }
  }, [JWT_KEY]);


  const refreshTokens = useCallback(async () => {
    return await generateTokens();
  }, [generateTokens]);

  
  const ensureValidTokens = useCallback(async () => {
    if (typeof window !== "undefined" && !isInitialized) {
      await new Promise<void>(resolve => {
        const checkInitialized = () => {
          if (isInitialized) {
            resolve();
          } else {
            setTimeout(checkInitialized, 100);
          }
        };
        checkInitialized();
      });
    }
    
  
    const authToken = getAuthToken();
    if (!authToken || isTokenExpired(authToken)) {
      return await refreshTokens();
    }
    
    return {
      authToken,
      verificationToken: getVerificationToken(),
    };
  }, [getAuthToken, getVerificationToken, isTokenExpired, refreshTokens, isInitialized]);
 
 
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const initialize = async () => {
      try {
        const authToken = getAuthToken();
        if (!authToken || isTokenExpired(authToken)) {
          await refreshTokens();
        }
      } catch (err) {
        console.error("Failed to initialize tokens:", err);
      } finally {
        setIsInitialized(true);
      }
    };
    
    initialize();
  }, [getAuthToken, isTokenExpired, refreshTokens]);

  return {
    ensureValidTokens,
    isTokenExpired,
    isInitialized,
    refreshTokens
  };
};










