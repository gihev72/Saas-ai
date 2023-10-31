"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("baa5eca0-92fd-4e18-8e28-dd9a22b50e82");
  }, []);

  return null;
};
