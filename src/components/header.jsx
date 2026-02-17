import { useState, useEffect } from "react";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import UserData from "./userData";
import { useWishlist } from "../context/WishlistContext";
// import Logo from "../assets/softdreams-logo.svg";
const Logo = "/logo.png";

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
            className="h-10 sm:h-12 w-auto object-contain rounded-md"
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
            <UserData />
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