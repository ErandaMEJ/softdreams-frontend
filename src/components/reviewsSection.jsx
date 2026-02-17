import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../utils/api";
import StarRating from "./starRating";
import { fetchMe, getCachedMe } from "../utils/me";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function emailToDisplayName(email) {
  if (!email) return "";
  const localPart = String(email).split("@")[0] || "";
  const cleaned = localPart
    .replace(/[._-]+/g, " ")
    .replace(/\d+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return localPart;
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function pickDisplayName(me) {
  return (
    me?.name ||
    me?.fullName ||
    me?.username ||
    emailToDisplayName(me?.email) ||
    me?.email ||
    ""
  );
}

export default function ReviewsSection({ product, productID, onRefresh }) {
  const approvedReviews = useMemo(() => {
    const list = product?.reviews ?? [];
    return list.filter((r) => r?.isApproved);
  }, [product]);

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    approvedReviews.forEach((r) => {
      const v = Math.round(r.rating);
      if (counts[v] !== undefined) counts[v]++;
    });
    return counts;
  }, [approvedReviews]);

  const [me, setMe] = useState(() => getCachedMe());
  const [nameLocked, setNameLocked] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [accountDefaultName, setAccountDefaultName] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNameLocked(false);
      setIsEditingName(true);
      return;
    }
    const cached = getCachedMe();
    if (cached) updateMe(cached);
    fetchMe().then(updateMe).catch(() => {
      setNameLocked(false);
      setIsEditingName(true);
    });

    function updateMe(u) {
      setMe(u);
      const dn = pickDisplayName(u);
      if (dn) {
        setName(dn);
        setAccountDefaultName(dn);
        setNameLocked(true);
        setIsEditingName(false);
      }
    }
  }, []);

  async function submitReview(e) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error("Name and comment are required");
      return;
    }
    const r = Number(rating);
    if (Number.isNaN(r) || r < 1 || r > 5) {
      toast.error("Rating 1 to 5 ");
      return;
    }
    setSubmitting(true);
    try {
      await api.post(`/products/${encodeURIComponent(productID)}/reviews`, {
        name: name.trim(),
        rating: r,
        comment: comment.trim(),
      });
      toast.success("Review added! Waiting for admin approval.");
      setComment("");
      setRating(5);
      if (!nameLocked) setName("");
      if (onRefresh) await onRefresh();
    } catch (err) {
      console.log("Add review error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Error adding review");
    } finally {
      setSubmitting(false);
    }
  }

  const emailValue = me?.email || "";
  const canToggleNameEdit = Boolean(localStorage.getItem("token"));

  return (
    <div className="w-full mt-4">
      <h2 className="text-2xl font-bold text-secondary mb-6">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: Summary + Form (Sticky on Desktop) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Rating Summary Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-secondary/5">
            <div className="flex items-end gap-3 mb-4">
              <span className="text-5xl font-bold text-secondary leading-none">
                {product?.rating?.toFixed(1) || "0.0"}
              </span>
              <div className="pb-1">
                <StarRating value={product?.rating ?? 0} size={18} />
                <p className="text-xs text-secondary/60 mt-1">{product?.numReviews ?? 0} Reviews</p>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star];
                const total = approvedReviews.length || 1;
                const pct = (count / total) * 100;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 font-medium text-secondary/70">{star}</span>
                    <div className="flex-1 h-2 bg-secondary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-6 text-right text-secondary/50">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write Review Form */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-secondary/5 sticky top-24">
            <h3 className="text-lg font-bold text-secondary mb-1">Write a Review</h3>
            <p className="text-xs text-secondary/60 mb-4">Share your thoughts with other customers.</p>

            <form onSubmit={submitReview} className="space-y-4">
              {/* Name */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-semibold text-secondary/70">Name</label>
                  {canToggleNameEdit && (
                    <button type="button" onClick={() => setIsEditingName(!isEditingName)} className="text-[10px] text-accent hover:underline">
                      {isEditingName ? "Done" : "Edit"}
                    </button>
                  )}
                </div>
                <input
                  className="w-full rounded-xl border border-secondary/10 bg-white px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={canToggleNameEdit && !isEditingName}
                />
                {/* Email if logged in */}
                {emailValue && (
                  <div className="mt-1 text-[10px] text-secondary/40 px-1">
                    Posting as {emailValue}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div>
                <label className="text-xs font-semibold text-secondary/70 block mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="text-xs font-semibold text-secondary/70 block mb-1">Review</label>
                <textarea
                  className="w-full rounded-xl border border-secondary/10 bg-white px-3 py-2 text-sm outline-none focus:border-accent transition-colors min-h-[100px]"
                  placeholder="How was the product? Comfort, quality, fit?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button
                disabled={submitting}
                className="w-full bg-secondary text-white py-3 rounded-xl font-medium text-sm hover:bg-secondary/90 disabled:opacity-70 transition-all shadow-lg shadow-secondary/10"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Reviews List */}
        <div className="lg:col-span-8">
          <h3 className="text-lg font-bold text-secondary mb-4">
            Latest Reviews ({approvedReviews.length})
          </h3>

          <div className="space-y-4">
            {approvedReviews.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-gray-50 border border-secondary/5 border-dashed">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/5 text-secondary/40 mb-3">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-secondary font-medium">No reviews yet</p>
                <p className="text-sm text-secondary/60 mt-1">Be the first to share your experience!</p>
              </div>
            ) : (
              approvedReviews
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((r) => (
                  <div key={r._id} className="group bg-white rounded-2xl p-6 border border-secondary/5 hover:border-secondary/10 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-secondary text-sm">{r.name}</p>
                          <div className="flex items-center gap-2">
                            <StarRating value={r.rating} size={12} showValue={false} />
                            <span className="text-[10px] text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded-full">
                              Verified
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-secondary/40">{formatDate(r.createdAt)}</span>
                    </div>
                    <div className="mt-4 pl-[52px]">
                      <p className="text-secondary/80 text-sm leading-relaxed">{r.comment}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}