import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData({ scrolled }) {
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

  if (!user) {
    return (
      <div className="flex items-center gap-2">
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
    );
  }

  return (
    <>
      {/* ✅ Mobile version (only) */}
      <div className="sm:hidden w-full">
        <div className="flex items-center gap-3">
          <img
            src={user.image}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-black/10 bg-white"
            alt="avatar"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-secondary truncate">
              {user.firstName}
            </p>
            <p className="text-xs text-secondary/60 truncate" title={user.email}>
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {user.role === "admin" && (
            <button
              type="button"
              onClick={() => (window.location.href = "/admin")}
              className="col-span-2 h-10 rounded-xl border border-secondary/15 bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition mb-2"
            >
              Admin Panel
            </button>
          )}

          <button
            type="button"
            onClick={() => (window.location.href = "/orders")}
            className="h-10 rounded-xl border border-secondary/15 bg-white/5 text-secondary font-semibold hover:bg-black/5 transition"
          >
            My Orders
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="h-10 rounded-xl border border-red-500/20 bg-red-500/10 text-red-700 font-semibold hover:bg-red-500/15 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Desktop version (same as before) */}
      <div className="hidden sm:block">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`
              inline-flex items-center gap-3
              rounded-full border px-3 py-2 transition select-none
              ${scrolled
                ? "border-secondary/10 bg-secondary/5 text-secondary hover:bg-secondary/10"
                : "border-white/15 bg-white/10 text-white hover:bg-white/15"
              }
            `}
          >
            <img
              src={user.image}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-white/20 bg-white/10"
              alt="avatar"
            />
            <span className="font-semibold max-w-[110px] truncate">
              {user.firstName}
            </span>
            <span
              className={[
                "transition-transform opacity-80",
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
      </div>
    </>
  );
}