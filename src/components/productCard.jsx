import { Link } from "react-router-dom";
import StarRating from "./starRating";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

export default function ProductCard(props) {
  const product = props.product;
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.productID);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      toast.success("Added to wishlist! ❤️");
    } else {
      toast("Removed from wishlist", { icon: "💔" });
    }
  };

  return (
    <Link
      to={"/overview/" + product.productID}
      className="
        group relative w-full max-w-[300px] mx-auto block
        rounded-2xl bg-white
        border border-black/5
        overflow-hidden
        transition-all duration-500
        hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]
        hover:-translate-y-2
      "
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] bg-[#F5F5F7] overflow-hidden">
        {/* Secondary Image (revealed on hover) */}
        {product.images && product.images[1] && (
          <img
            src={product.images[1]}
            className="w-full h-full absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
            alt={product.name}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        {/* Primary Image */}
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/300?text=No+Image"}
          className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 ${product.images && product.images[1] ? 'group-hover:opacity-0' : ''}`}
          alt={product.name}
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`
            absolute top-3 right-3 z-20
            w-10 h-10 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${inWishlist
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : 'bg-white/90 backdrop-blur-sm text-secondary/60 hover:text-red-500 hover:bg-white'
            }
            hover:scale-110 active:scale-95
          `}
        >
          {inWishlist ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
        </button>

        {/* Overlay & Quick Action */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="
              transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
              transition-all duration-500 delay-75
              bg-white text-secondary px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2
              hover:bg-accent hover:text-white
            ">
            <FaEye /> View Details
          </span>
        </div>

        {/* Badges (e.g., Sale) */}
        {product.labelledPrice > product.price && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-lg">
            Sale
          </div>
        )}

        {/* New Badge - if product has 'isNew' flag */}
        {product.isNew && (
          <div className="absolute top-12 left-3 bg-gradient-to-r from-accent to-accent-dark text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-lg">
            New
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <div className="mb-2 flex justify-center items-center gap-2">
          <StarRating value={product?.rating ?? 0} showValue={false} size={14} />
          <span className="text-xs text-secondary/50">({product?.numReviews ?? 0})</span>
        </div>

        <h3 className="text-secondary font-medium text-base leading-tight mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-center gap-3">
          {product.labelledPrice > product.price && (
            <span className="text-sm text-secondary/40 line-through">
              Rs. {product.labelledPrice.toLocaleString()}
            </span>
          )}
          <span className="text-lg font-bold text-accent">
            Rs. {product.price.toLocaleString()}
          </span>
        </div>

        {/* Stock Status */}
        {!product.isAvailable && (
          <div className="mt-2 text-xs text-red-500 font-medium">Out of Stock</div>
        )}
      </div>
    </Link>
  );
}
