import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import axios from "axios";
import { HiOutlineRefresh, HiOutlineChatAlt2 } from "react-icons/hi";

export default function AdminReviewsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  async function load() {
    setStatus("loading");
    try {
      // Fetch all products to calculate review stats
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
      setProducts(res.data || []);
      setStatus("success");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load products");
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const rows = useMemo(() => {
    return (products || []).map((p) => {
      const reviews = p.reviews || [];
      const pending = reviews.filter((r) => !r.isApproved).length;
      const approved = reviews.filter((r) => r.isApproved).length;
      return {
        productID: p.productID,
        name: p.name,
        image: p.images?.[0],
        pending,
        approved,
        total: reviews.length,
      };
    }).sort((a, b) => b.pending - a.pending); // Sort by pending count desc
  }, [products]);

  if (status === "loading") return (
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  );

  if (status === "error") {
    return (
      <div className="p-6 text-center">
        <p className="text-secondary mb-4">Error loading review dashboard.</p>
        <button onClick={load} className="px-4 py-2 bg-accent text-white rounded-xl">Retry</button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col relative text-secondary">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary flex items-center gap-3">
            Review Management
          </h1>
          <p className="text-secondary/60 text-sm mt-1">
            Manage reviews by product. Pending reviews are highlighted.
          </p>
        </div>

        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-secondary/10 shadow-sm rounded-xl text-secondary hover:bg-secondary/5 transition"
        >
          <HiOutlineRefresh className="text-lg" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="w-full overflow-hidden bg-white/60 backdrop-blur-md shadow-sm rounded-2xl border border-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/5 text-secondary/70 text-xs uppercase tracking-wider border-b border-secondary/10">
                <th className="py-4 px-6 font-semibold">Product</th>
                <th className="py-4 px-6 font-semibold text-center">Pending</th>
                <th className="py-4 px-6 font-semibold text-center">Approved</th>
                <th className="py-4 px-6 font-semibold text-center">Total</th>
                <th className="py-4 px-6 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/5">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-secondary/50">
                    No products found.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    key={r.productID}
                    className={`hover:bg-white/60 transition-colors ${r.pending > 0 ? 'bg-accent/5' : ''}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={r.image}
                          className="w-12 h-12 rounded-lg object-cover border border-secondary/10 shadow-sm"
                        />
                        <div>
                          <p className="font-semibold text-secondary">{r.name}</p>
                          <p className="text-xs text-secondary/50">#{r.productID}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {r.pending > 0 ? (
                        <span className="inline-flex items-center justify-center px-3 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-lg shadow-accent/20 animate-pulse">
                          {r.pending}
                        </span>
                      ) : (
                        <span className="text-secondary/40 font-medium">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-green-600 font-medium">
                      {r.approved}
                    </td>
                    <td className="py-4 px-6 text-center text-secondary/70 font-medium">
                      {r.total}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        to={`/admin/reviews/${r.productID}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-secondary/10 shadow-sm text-secondary hover:text-accent hover:border-accent/30 transition text-sm font-medium"
                      >
                        <HiOutlineChatAlt2 className="text-lg" />
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
