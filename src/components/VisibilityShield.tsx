"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function VisibilityShield({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // If we are anywhere inside the /admin routing tree, completely unmount the children
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  return <>{children}</>;
}