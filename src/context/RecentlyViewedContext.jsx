import { createContext, useContext, useState, useEffect } from "react";

const RecentlyViewedContext = createContext();

const MAX_RECENT_ITEMS = 8;

export function RecentlyViewedProvider({ children }) {
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const saved = localStorage.getItem("recently_viewed");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("recently_viewed", JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    const addToRecentlyViewed = (product) => {
        setRecentlyViewed((prev) => {
            // Remove if already exists
            const filtered = prev.filter((p) => p.productID !== product.productID);
            // Add to beginning
            const updated = [product, ...filtered];
            // Keep only MAX_RECENT_ITEMS
            return updated.slice(0, MAX_RECENT_ITEMS);
        });
    };

    return (
        <RecentlyViewedContext.Provider
            value={{
                recentlyViewed,
                addToRecentlyViewed,
            }}
        >
            {children}
        </RecentlyViewedContext.Provider>
    );
}

export function useRecentlyViewed() {
    const context = useContext(RecentlyViewedContext);
    if (!context) {
        throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
    }
    return context;
}
