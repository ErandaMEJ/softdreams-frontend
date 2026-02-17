import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SocialShare({ product }) {
    const shareUrl = window.location.href;
    const shareText = `Check out ${product?.name || "this product"} at SoftDreams!`;

    const handleFacebookShare = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            "_blank",
            "width=600,height=400"
        );
    };

    const handleTwitterShare = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
            "_blank",
            "width=600,height=400"
        );
    };

    const handleWhatsAppShare = () => {
        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
            "_blank"
        );
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-secondary/60">Share:</span>
            <div className="flex gap-2">
                <button
                    onClick={handleFacebookShare}
                    className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    aria-label="Share on Facebook"
                >
                    <FaFacebookF className="text-sm" />
                </button>
                <button
                    onClick={handleTwitterShare}
                    className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    aria-label="Share on Twitter"
                >
                    <FaTwitter className="text-sm" />
                </button>
                <button
                    onClick={handleWhatsAppShare}
                    className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    aria-label="Share on WhatsApp"
                >
                    <FaWhatsapp className="text-sm" />
                </button>
                <button
                    onClick={handleCopyLink}
                    className="w-9 h-9 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                    aria-label="Copy link"
                >
                    <FaLink className="text-sm" />
                </button>
            </div>
        </div>
    );
}
