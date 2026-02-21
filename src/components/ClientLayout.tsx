"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";

function ClientContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, setIsLoading } = useLoading();

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {children}
    </>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <ClientContent>{children}</ClientContent>
    </LoadingProvider>
  );
}