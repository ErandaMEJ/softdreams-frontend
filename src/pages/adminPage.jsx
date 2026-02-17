import { Link, Route, Routes, useLocation } from "react-router-dom";
import { HiClipboardList, HiOutlineLogout, HiOutlineViewGrid, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaBoxes, FaUserFriends } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminDashboard from "./admin/adminDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminProductReviews from "./admin/adminProductReviews";
import AdminReviewsPage from "./admin/adminReviewsPage";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) { window.location.href = "/"; return; }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response.data.role == "admin") setUser(response.data);
        else window.location.href = "/";
      })
      .catch(() => { window.location.href = "/login"; });
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: HiOutlineViewGrid },
    { path: "/admin/orders", label: "Orders", icon: HiClipboardList },
    { path: "/admin/products", label: "Products", icon: FaBoxes },
    { path: "/admin/users", label: "Users", icon: FaUserFriends },
    { path: "/admin/reviews", label: "Reviews", icon: MdRateReview },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-primary text-secondary font-sans selection:bg-accent selection:text-white">
      {user ? (
        <>
          {/* Mobile Top Bar */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary/10 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold">
                  SD
                </div>
                <h1 className="text-lg font-bold text-secondary">SoftDreams</h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-secondary/5 transition text-secondary"
              >
                {mobileMenuOpen ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="border-t border-secondary/5 bg-white pb-3">
                <nav className="px-3 pt-2 space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`
                          flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm
                          ${isActive
                            ? "bg-accent text-white shadow-md shadow-accent/20"
                            : "text-secondary/70 hover:bg-secondary/5"
                          }
                        `}
                      >
                        <item.icon className="text-lg" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="px-3 pt-2 mt-2 border-t border-secondary/5">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/login";
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition text-sm"
                  >
                    <HiOutlineLogout className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <aside className="w-72 fixed h-full p-4 hidden lg:flex flex-col z-20">
            {/* Brand */}
            <div className="h-16 flex items-center gap-3 px-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-accent/20">
                SD
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-secondary">SoftDreams</h1>
                <p className="text-xs text-secondary/50 font-medium">Admin Panel</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                           group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                           ${isActive
                        ? "bg-accent text-white shadow-lg shadow-accent/25"
                        : "text-secondary/70 hover:bg-white hover:text-accent hover:shadow-sm"
                      }
                        `}
                  >
                    <item.icon className="text-xl" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Profile / Logout */}
            <div className="mt-auto pt-6 border-t border-secondary/5">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 border border-secondary/5 mb-2">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary/70 font-bold">
                  {user.firstName ? user.firstName[0] : "A"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-secondary truncate">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-secondary/50 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
              >
                <HiOutlineLogout className="text-xl" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 lg:ml-72 min-h-screen relative mt-14 lg:mt-0">
            {/* Premium Dark Header */}
            <div className="relative w-full h-52 bg-secondary overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1920&q=80"
                alt="Admin Dashboard"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
              <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-2xl">
                    Admin Dashboard
                  </h1>
                  <p className="text-white/90 text-lg drop-shadow-lg">
                    Manage your SoftDreams store efficiently
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative -mt-20 max-w-7xl mx-auto p-4 sm:p-8">
              <div className="bg-white rounded-3xl shadow-2xl shadow-secondary/10 border border-white/60 p-6 sm:p-8 min-h-[calc(100vh-280px)]">
                <Routes path="/">
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/orders" element={<AdminOrdersPage />} />
                  <Route path="/products" element={<AdminProductPage />} />
                  <Route path="/add-product" element={<AdminAddProductPage />} />
                  <Route path="/update-product" element={<AdminUpdateProductPage />} />
                  <Route path="/users" element={<AdminUsersPage />} />
                  <Route path="/reviews" element={<AdminReviewsPage />} />
                  <Route path="/reviews/:productID" element={<AdminProductReviews />} />
                </Routes>
              </div>
            </div>
          </main>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}