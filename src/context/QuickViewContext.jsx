import { createContext, useContext, useState } from 'react';

const QuickViewContext = createContext();

export function QuickViewProvider({ children }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openQuickView = (product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const closeQuickView = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedProduct(null), 300); // Clear after animation
    };

    return (
        <QuickViewContext.Provider value={{ selectedProduct, isOpen, openQuickView, closeQuickView }}>
            {children}
        </QuickViewContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useQuickView() {
    return useContext(QuickViewContext);
}
