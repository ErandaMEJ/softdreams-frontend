import { useEffect, useState } from 'react';
import { useQuickView } from '../context/QuickViewContext';
import { IoClose } from 'react-icons/io5';
import { FacartPlus, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StarRating from './starRating';

export default function QuickViewModal() {
    const { selectedProduct, isOpen, closeQuickView } = useQuickView();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const product = selectedProduct;
    if (!product) return null;

    return (
        <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeQuickView}
            />

            {/* Modal Content */}
            <div className={`
        relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl 
        transform transition-all duration-300 flex flex-col md:flex-row
        ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
      `}>

                {/* Close Button */}
                <button
                    onClick={closeQuickView}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors"
                >
                    <IoClose size={24} />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-gray-50 p-6 flex items-center justify-center">
                    <img
                        src={product.images?.[0] || "https://via.placeholder.com/400"}
                        alt={product.name}
                        className="max-h-[400px] w-full object-contain rounded-lg shadow-sm"
                    />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                    <div className="mb-4">
                        <span className="text-sm font-medium text-accent tracking-wide uppercase">{product.category}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1 mb-2">{product.name}</h2>

                        <div className="flex items-center gap-2 mb-4">
                            <StarRating value={product.rating || 0} size={16} />
                            <span className="text-sm text-gray-500">({product.numReviews} reviews)</span>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            {product.labelledPrice > product.price && (
                                <span className="text-lg text-gray-400 line-through">Rs. {product.labelledPrice.toLocaleString()}</span>
                            )}
                            <span className="text-3xl font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                            {product.description}
                        </p>

                        <div className="flex flex-col gap-3 mt-auto">
                            <Link
                                to={`/overview/${product.productID}`}
                                onClick={closeQuickView}
                                className="w-full py-3 rounded-xl bg-secondary text-white font-semibold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                            >
                                View Full Details
                            </Link>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex gap-4">
                            <span>Stock: {product.stock > 0 ? <span className="text-green-600 font-bold">In Stock</span> : <span className="text-red-500 font-bold">Out of Stock</span>}</span>
                            <span>Brand: {product.brand}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
