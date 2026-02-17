import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart, getCart } from "../utils/cart";
import { HiChevronRight, HiOutlineTruck, HiOutlineShieldCheck, HiOutlineSparkles } from "react-icons/hi";
import ReviewsSection from "../components/reviewsSection";
import StarRating from "../components/starRating";
import ProductCard from "../components/productCard";
import { api } from "../utils/api";
import SocialShare from "../components/socialShare";

export default function ProductOverview() {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [relatedProducts, setRelatedProducts] = useState([]);

  const loadProduct = useCallback(async () => {
    try {
      setStatus("loading");
      const res = await api.get(`/products/${encodeURIComponent(params.productID)}`);
      setProduct(res.data);
      setStatus("success");
    } catch (err) {
      console.log("Product load error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Product Not Found");
      setStatus("error");
    }
  }, [params.productID]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    if (product?.category) {
      api.get(`/products?category=${encodeURIComponent(product.category)}`)
        .then((res) => {
          const related = res.data
            .filter((p) => p.productID !== product.productID)
            .slice(0, 4);
          setRelatedProducts(related);
        })
        .catch((err) => console.error("Failed to load related products", err));
    }
  }, [product]);

  if (status === "loading") return <Loader />;

  if (status === "error") {
    return (
      <main className="w-full min-h-[calc(100vh-68px)] bg-primary px-4 py-10 flex items-center justify-center">
        <div className="mx-auto max-w-lg rounded-3xl border border-secondary/10 bg-white p-12 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-secondary mb-4">Product Not Found</h1>
          <p className="text-secondary/60 mb-8">
            The product you’re looking for doesn’t exist or is unavailable.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={loadProduct}
              className="px-6 py-2 rounded-xl border border-secondary/20 hover:bg-secondary/5 transition font-semibold"
            >
              Retry
            </button>
            <Link
              to="/products"
              className="px-6 py-2 rounded-xl bg-accent text-white hover:bg-accent/90 transition font-semibold"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // status === "success"
  const safeImages = Array.isArray(product?.images) ? product.images : [];
  const primaryImage = safeImages?.[0];

  return (
    <main className="w-full min-h-screen bg-primary pb-8">

      {/* Hero Section */}
      <div className="relative w-full h-[250px] flex items-center justify-center bg-secondary overflow-hidden">
        <img
          src={primaryImage || "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1600"}
          alt={product?.name}
          className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-primary" />

        <div className="relative z-10 text-center px-4 mt-12 font-bold text-white drop-shadow-lg animate-fade-in-up">
          <p className="text-accent text-xs md:text-sm uppercase tracking-widest mb-1">
            {product?.category || "Premium Collection"}
          </p>
          <h1 className="text-2xl md:text-4xl line-clamp-2 max-w-4xl mx-auto">
            {product?.name}
          </h1>
        </div>
      </div>

      {/* Top area */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-secondary/50 mb-8">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <HiChevronRight />
          <Link to="/products" className="hover:text-accent transition">Shop</Link>
          <HiChevronRight />
          <span className="text-secondary font-medium">{product?.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Left: Images */}
          <div className="w-full">
            <div className="rounded-3xl border border-secondary/5 bg-white shadow-sm overflow-hidden h-[400px] sm:h-[500px] lg:h-[600px]">
              <ImageSlider images={safeImages} />
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-4xl font-bold text-secondary mb-2 tracking-tight">
              {product?.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <StarRating value={product?.rating ?? 0} size={18} />
              </div>
              <span className="text-secondary/40 text-sm">|</span>
              <span className="text-secondary/60 text-sm">{product?.numReviews ?? 0} Reviews</span>
              <span className="text-secondary/40 text-sm">|</span>
              <span className="text-accent font-medium text-sm">{product?.isAvailable ? "In Stock" : "Out of Stock"}</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl sm:text-4xl font-bold text-secondary">
                LKR. {Number(product?.price ?? 0).toLocaleString()}
              </span>
              {Number(product?.labelledPrice) > Number(product?.price) && (
                <span className="text-lg sm:text-xl text-secondary/40 line-through mb-1">
                  LKR. {Number(product.labelledPrice).toLocaleString()}
                </span>
              )}
            </div>

            <div className="prose prose-sm text-secondary/70 mb-8 leading-relaxed">
              <p>{product?.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Added to cart");
                }}
                className="flex-1 py-4 rounded-xl border border-secondary/10 bg-white text-secondary font-bold text-lg hover:bg-gray-50 hover:border-secondary/30 transition shadow-sm disabled:opacity-50"
                disabled={!product?.isAvailable}
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  if (!product?.isAvailable) {
                    toast.error("This product is unavailable");
                    return;
                  }
                  navigate("/checkout", {
                    state: [
                      {
                        productID: product.productID,
                        name: product.name,
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        quantity: 1,
                        image: primaryImage,
                      },
                    ],
                  });
                }}
                className="flex-1 py-4 rounded-xl bg-accent text-white font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/25 disabled:opacity-50"
                disabled={!product?.isAvailable}
              >
                Buy Now
              </button>
            </div>

            {/* Features/Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-secondary/10">
              <div className="flex items-center gap-3 text-secondary/70">
                <HiOutlineSparkles className="text-2xl text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3 text-secondary/70">
                <HiOutlineTruck className="text-2xl text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider">Island-Wide Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-secondary/70">
                <HiOutlineShieldCheck className="text-2xl text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 py-16 border-t border-secondary/5 mt-16">
        <h2 className="text-2xl font-bold text-secondary mb-8">Customer Reviews</h2>
        <ReviewsSection product={product} productID={params.productID} onRefresh={loadProduct} />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20">
          <h2 className="text-2xl font-bold text-secondary mb-8">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.productID} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}