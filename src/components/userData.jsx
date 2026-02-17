import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function UserData({ scrolled, isSidebar = false }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  // 1. Not Logged In
  if (!user) {
    if (isSidebar) {
      // Mobile Sidebar: Buttons
      return (
        <div className="flex items-center gap-2">
          <Link to="/login" className="px-4 py-2 rounded-full border border-secondary/10 bg-secondary/5 text-secondary font-semibold hover:bg-secondary/10 transition">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded-full border border-accent bg-accent text-white font-semibold hover:bg-accent-dark transition">Register</Link>
        </div>
      );
    }
    // Header: Buttons on Desktop, Icon on Mobile
    return (
      <div className="flex items-center">
        {/* Mobile Icon */}
        <Link
          to="/login"
          className={`lg:hidden p-2 rounded-full transition ${scrolled ? "text-secondary hover:bg-secondary/10" : "text-white hover:bg-white/10"}`}
        >
          <FaUser className="text-xl" />
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-full border font-semibold transition
                ${scrolled
                ? "border-secondary/10 bg-secondary/5 text-secondary hover:bg-secondary/10"
                : "border-white/10 bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 rounded-full border font-semibold transition
                ${scrolled
                ? "border-accent bg-accent text-white hover:bg-accent-dark"
                : "border-white/10 bg-white/20 text-white hover:bg-white/30"
              }`}
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  // 2. Logged In

  // If Sidebar Mode -> Show Full Details Panel
  if (isSidebar) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3">
          <img src={user.image} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover border border-black/10 bg-white" alt="avatar" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-secondary truncate">{user.firstName}</p>
            <p className="text-xs text-secondary/60 truncate" title={user.email}>{user.email}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {user.role === "admin" && (
            <button type="button" onClick={() => (window.location.href = "/admin")} className="col-span-2 h-10 rounded-xl border border-secondary/15 bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition mb-2">Admin Panel</button>
          )}
          <button type="button" onClick={() => (window.location.href = "/orders")} className="h-10 rounded-xl border border-secondary/15 bg-white/5 text-secondary font-semibold hover:bg-black/5 transition">My Orders</button>
          <button type="button" onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }} className="h-10 rounded-xl border border-red-500/20 bg-red-500/10 text-red-700 font-semibold hover:bg-red-500/15 transition">Logout</button>
        </div>
      </div>
    );
  }

  // Header Mode -> Dropdown (Responsive)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`
          inline-flex items-center gap-3
          rounded-full border px-0 lg:px-3 py-0 lg:py-2 border-transparent lg:border transition select-none
          ${scrolled
            ? "lg:border-secondary/10 lg:bg-secondary/5 text-secondary hover:bg-secondary/10"
            : "lg:border-white/15 lg:bg-white/10 text-white hover:bg-white/15"
          }
        `}
      >
        <img
          src={user.image}
          referrerPolicy="no-referrer"
          className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border ${scrolled ? "border-secondary/20" : "border-white/20"} bg-white/10`}
          alt="avatar"
        />
        {/* Name: Hidden on Mobile, Visible on Desktop */}
        <span className="hidden lg:block font-semibold max-w-[110px] truncate">
          {user.firstName}
        </span>
        <span
          className={[
            "transition-transform opacity-80 hidden lg:block", // Hide arrow on mobile to be compact
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}

      <div
        className={[
          "absolute right-0 top-full mt-2 w-60 z-50",
          "rounded-2xl border border-secondary/10 bg-white/95 backdrop-blur",
          "shadow-xl shadow-black/15 overflow-hidden",
          "transition duration-150 transform origin-top-right",
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none",
        ].join(" ")}
      >
        <div className="px-4 py-3">
          <p className="text-xs text-secondary/60">Signed in as</p>
          <p
            className="text-sm font-semibold text-secondary truncate"
            title={user.email || user.firstName}
          >
            {user.email || user.firstName}
          </p>
        </div>

        <div className="h-px bg-secondary/10" />

        {user.role === "admin" && (
          <>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                window.location.href = "/admin";
              }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-accent hover:bg-accent/5 transition"
            >
              Admin Panel
            </button>
            <div className="h-px bg-secondary/10" />
          </>
        )}

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            window.location.href = "/orders";
          }}
          className="w-full text-left px-4 py-3 text-sm font-semibold text-secondary hover:bg-black/5 transition"
        >
          My Orders
        </button>

        <div className="h-px bg-secondary/10" />

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-500/10 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}