import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { addToCart } from "../utils/cart";
import toast from "react-hot-toast";
import StarRating from "../components/starRating";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();

    const handleAddToCart = (product) => {
        addToCart(product, 1);
    };

    const handleRemove = (productID) => {
        removeFromWishlist(productID);
        toast("Removed from wishlist", { icon: "💔" });
    };

    if (wishlist.length === 0) {
        return (
            <div className="w-full min-h-[calc(100vh-68px)] bg-primary py-20 px-4">
                <div className="mx-auto max-w-lg">
                    <div className="text-center py-16 bg-white rounded-3xl border border-secondary/10 shadow-sm">
                        <FaHeart className="text-6xl text-secondary/20 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-secondary mb-3">Your Wishlist is Empty</h2>
                        <p className="text-secondary/60 mb-8">Save your favorite bedding products here!</p>
                        <Link
                            to="/products"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <FaShoppingCart /> Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-primary">

            {/* Hero Section */}
            <div className="relative w-full h-[250px] flex items-center justify-center bg-secondary overflow-hidden">
                <img
                    src="https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Wishlist"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary" />

                <div className="relative z-10 text-center px-4 mt-16 font-bold text-white drop-shadow-lg">
                    <div className="flex items-center justify-center gap-3 text-4xl mb-2">
                        <FaHeart className="text-red-500" />
                        <h1>My Wishlist</h1>
                    </div>
                    <p className="text-white/80 text-sm md:text-base font-normal">
                        Your personalized collection of favorites ({wishlist.length} items)
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {wishlist.map((product) => (
                        <div
                            key={product.productID}
                            className="group relative bg-white rounded-2xl border border-secondary/5 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            {/* Image */}
                            <Link to={"/overview/" + product.productID} className="block relative aspect-[4/5] bg-gray-50 overflow-hidden">
                                <img
                                    src={product.images?.[0] || ""}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                            </Link>

                            {/* Remove Button */}
                            <button
                                onClick={() => handleRemove(product.productID)}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-secondary/60 hover:text-red-500 hover:bg-white transition-all hover:scale-110 active:scale-95 z-10"
                            >
                                <FaTrash className="text-sm" />
                            </button>

                            {/* Content */}
                            <div className="p-4">
                                <div className="mb-2 flex justify-center">
                                    <StarRating value={product?.rating ?? 0} showValue={false} size={12} />
                                </div>

                                <Link to={"/overview/" + product.productID}>
                                    <h3 className="text-sm font-medium text-secondary line-clamp-2 mb-2 hover:text-accent transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="flex items-center justify-center gap-2 mb-3">
                                    {product.labelledPrice > product.price && (
                                        <span className="text-xs text-secondary/40 line-through">
                                            Rs. {product.labelledPrice?.toLocaleString()}
                                        </span>
                                    )}
                                    <span className="text-base font-bold text-accent">
                                        Rs. {product.price?.toLocaleString()}
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={!product.isAvailable}
                                    className="w-full py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <FaShoppingCart className="text-xs" />
                                    {product.isAvailable ? "Add to Cart" : "Out of Stock"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
