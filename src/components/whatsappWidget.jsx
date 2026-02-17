import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppWidget() {
    const phoneNumber = "94771234567"; // Replace with actual number
    const message = "Hi! I'm interested in your premium bedding products.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <button
            onClick={handleClick}
            className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-green-500 hover:bg-green-600
        text-white
        flex items-center justify-center
        shadow-2xl shadow-green-500/50
        hover:scale-110 active:scale-95
        transition-all duration-300
        group
      "
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="text-3xl group-hover:scale-110 transition-transform" />

            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
        </button>
    );
}
