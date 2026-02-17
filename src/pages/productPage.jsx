import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import ProductCard from "../components/productCard";
import ProductSkeleton from "../components/productSkeleton";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const categories = ["All", "Bedsheets", "Pillows", "Duvets", "Comforters", "Accessories"];

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("featured"); // featured, price-low, price-high, rating, name
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // NOTE: We DON'T filter out unavailable products - they show as "Out of Stock"

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - no sorting
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch all products initially, client-side filtering will handle search/category
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary">
      {/* Premium Hero Header with Dark Overlay */}
      <div className="relative w-full h-[350px] flex items-center justify-center bg-secondary overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="SoftDreams Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 text-center px-4 pt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Premium Bedding Collection
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
            Discover luxury comfort for your perfect sleep sanctuary
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for bedding products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-secondary/10 bg-white text-secondary placeholder:text-secondary/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 text-xl" />
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-secondary/10 rounded-xl text-secondary font-medium shadow-sm"
          >
            <span className="flex items-center gap-2"><FaFilter /> Filters & Sort</span>
            <span className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>▼</span>
          </button>
        </div>

        {/* Filters Row */}
        <div className={`flex flex-col lg:flex-row gap-6 mb-8 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
          {/* Categories */}
          <div className="flex-1">
            <label className="text-sm font-semibold text-secondary/70 mb-2 flex items-center gap-2">
              <FaFilter /> Categories
            </label>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${selectedCategory === cat
                      ? "bg-accent text-white shadow-lg shadow-accent/30"
                      : "bg-white text-secondary border border-secondary/10 hover:border-accent hover:text-accent"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="lg:w-64 mt-4 lg:mt-0">
            <label className="text-sm font-semibold text-secondary/70 mb-2 flex items-center gap-2">
              <FaSortAmountDown /> Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-secondary/10 bg-white text-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-8 p-6 bg-white rounded-2xl border border-secondary/5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-secondary/70">
              Price Range
            </label>
            <span className="text-sm font-medium text-accent">
              Rs. {priceRange[0].toLocaleString()} - Rs. {priceRange[1].toLocaleString()}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="flex-1 h-2 bg-secondary/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <button
              onClick={() => setPriceRange([0, 50000])}
              className="text-xs text-secondary/50 hover:text-accent transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-secondary/60 text-sm">
          {!loading && `Showing ${filteredProducts.length} products`}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-secondary/60 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.productID} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}