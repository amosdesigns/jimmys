"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function SplashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      router.replace("/menu");
    }, 3000);
    return () => clearTimeout(id);
  }, [router]);

  return null;
}
