import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaGift } from "react-icons/fa";
import toast from "react-hot-toast";

export default function NewsletterPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already seen or dismissed the popup
        const dismissed = localStorage.getItem("newsletter_dismissed");
        const subscribed = localStorage.getItem("newsletter_subscribed");

        if (!dismissed && !subscribed) {
            // Show popup after 5 seconds
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("newsletter_dismissed", "true");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        if (email) {
            localStorage.setItem("newsletter_subscribed", "true");
            localStorage.setItem("newsletter_email", email);
            setIsVisible(false);
            // TODO: Send email to backend
            toast.success("Thank you for subscribing! Check your email for the discount code.");
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] animate-fadeIn"
                onClick={handleClose}
            ></div>

            {/* Popup */}
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto animate-scaleIn"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-secondary/60 hover:text-secondary hover:bg-white transition-all hover:scale-110 active:scale-95"
                    >
                        <IoClose className="text-2xl" />
                    </button>

                    {/* Header with Gradient */}
                    <div className="gradient-premium p-8 text-center text-white">
                        <FaGift className="text-5xl mx-auto mb-4 animate-bounce" />
                        <h2 className="text-3xl font-bold mb-2">Get 10% OFF</h2>
                        <p className="text-white/90 text-sm">on your first order!</p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <p className="text-secondary/70 text-center mb-6">
                            Subscribe to our newsletter and receive exclusive bedding deals, sleep tips, and early access to new collections.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                                className="input-field w-full"
                            />

                            <button
                                type="submit"
                                className="w-full btn-primary py-4 text-base"
                            >
                                Get My 10% Discount
                            </button>
                        </form>

                        <p className="text-xs text-secondary/40 text-center mt-4">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
        </>
    );
}
