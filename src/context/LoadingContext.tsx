"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const LOADING_KEY = "__spnhaus_loaded";

const hasLoaded = () => {
    if (typeof window !== "undefined") {
        return !!(window as unknown as Record<string, unknown>)[LOADING_KEY];
    }
    return false;
};

const LoadingContext = createContext<LoadingContextType>({
    isLoading: true,
    setIsLoading: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(!hasLoaded());

    const handleSetLoading = (loading: boolean) => {
        setIsLoading(loading);
        if (!loading && typeof window !== "undefined") {
            (window as unknown as Record<string, unknown>)[LOADING_KEY] = true;
        }
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading: handleSetLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}
