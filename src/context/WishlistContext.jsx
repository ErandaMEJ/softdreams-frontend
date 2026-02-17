import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const isInWishlist = (productID) => {
        return wishlist.some((item) => item.productID === productID);
    };

    const addToWishlist = (product) => {
        if (!isInWishlist(product.productID)) {
            setWishlist([...wishlist, product]);
            return true;
        }
        return false;
    };

    const removeFromWishlist = (productID) => {
        setWishlist(wishlist.filter((item) => item.productID !== productID));
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.productID)) {
            removeFromWishlist(product.productID);
            return false;
        } else {
            addToWishlist(product);
            return true;
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                isInWishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return context;
}
