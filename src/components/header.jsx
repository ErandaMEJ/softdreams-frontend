import { useState, useEffect } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import UserData from "./userData";
import { useWishlist } from "../context/WishlistContext";
import Logo from "../assets/softdreams-logo.svg";
// const Logo = "/logo.png";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { wishlist } = useWishlist();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search Logic
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products for search
    axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then(res => {
      setAllProducts(res.data);
    }).catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5));
    } else {
      setFilteredProducts([]);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md h-[60px] sm:h-[70px]"
          : "bg-gradient-to-b from-black/30 to-transparent h-[70px] sm:h-[80px]"
        }
      `}
    >
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSideBarOpen(true)}
          className={`lg:hidden p-2 rounded-full transition ${scrolled ? "text-secondary hover:bg-secondary/10" : "text-white hover:bg-white/10"}`}
        >
          <TiThMenu className="text-2xl" />
        </button>

        {/* Logo */}
        {/* Logo and Text */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="SoftDreams Logo"
            className="h-10 sm:h-12 w-auto object-contain rounded-md transition-all"
            style={{
              filter: scrolled ? "none" : "brightness(0) invert(1)"
            }}
            style={{
              filter: scrolled
                ? 'sepia(1) saturate(5) hue-rotate(5deg) brightness(0.9) contrast(1.2)'
                : 'brightness(0) invert(1)'
            }}
          />
          <span className={`text-xl sm:text-2xl font-semibold tracking-tight transition-colors ${scrolled ? "text-accent" : "text-white"}`}>
            SoftDreams
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`
                relative text-sm font-medium transition-colors duration-300
                ${location.pathname === link.to
                  ? "text-accent"
                  : scrolled ? "text-secondary hover:text-accent" : "text-white/90 hover:text-white"
                }
                after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
                after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300
                hover:after:w-full
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block relative mr-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className={`
                        w-40 lg:w-48 pl-3 pr-8 py-1.5 rounded-full text-sm focus:outline-none transition-all border
                        ${scrolled
                    ? "bg-gray-50 border-gray-200 text-gray-800 focus:ring-1 focus:ring-accent focus:border-accent"
                    : "bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20"
                  }
                    `}
              />
              <FaSearch className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${scrolled ? "text-gray-400" : "text-white/60"}`} />
            </div>

            {/* Search Dropdown */}
            {searchQuery && (
              <div className="absolute top-full right-0 w-72 bg-white rounded-xl shadow-xl mt-3 overflow-hidden border border-gray-100 py-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(p => (
                    <Link
                      to={`/overview/${p.productID}`}
                      key={p.productID}
                      onClick={() => setSearchQuery("")}
                      className="block px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                      <img src={p.images?.[0]} alt={p.name} className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{p.name}</p>
                        <p className="text-xs text-accent font-semibold">Rs. {p.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">No products found</div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className={`
              relative p-2 rounded-full transition-all duration-300 group
              ${scrolled ? "hover:bg-red-50 text-secondary" : "hover:bg-white/10 text-white"}
            `}
          >
            <FaHeart className={`text-xl group-hover:scale-110 transition-transform ${scrolled ? "group-hover:text-red-500" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold ring-2 ring-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={`
              relative p-2 rounded-full transition-all duration-300 group
              ${scrolled ? "hover:bg-accent/10 text-secondary" : "hover:bg-white/10 text-white"}
            `}
          >
            <FaCartShopping className="text-xl group-hover:scale-110 transition-transform" />
            {/* Optional badge placeholder if you have cart count */}
            {/* <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" /> */}
          </Link>

          {/* User Data (Desktop) */}
          <div className="hidden lg:block">
            <UserData scrolled={scrolled} />
          </div>
        </div>
      </div>

      {/* --------------- Sidebar Overlay ---------------- */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden transition-opacity duration-300
          ${sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setSideBarOpen(false)}
      />

      {/* ---------------- Animated Sidebar ---------------- */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 h-screen w-[280px] bg-white z-[100] shadow-2xl transform transition-transform duration-300 ease-out
          ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <span className="text-xl font-bold text-accent">SoftDreams</span>
            <button
              onClick={() => setSideBarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-secondary transition"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSideBarOpen(false)}
                  className={`
                    px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${location.pathname === link.to
                      ? "bg-accent/10 text-accent"
                      : "text-secondary hover:bg-gray-50"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="px-4">
                <UserData />
              </div>
            </div>
          </div>

          <div className="p-4 text-center text-xs text-gray-400">
            © 2026 SoftDreams
          </div>
        </div>
      </div>
    </header>
  );
}