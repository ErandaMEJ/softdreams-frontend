import { useState } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
    {
        name: "Amaya Perera",
        location: "Colombo",
        rating: 5,
        text: "Best bedding I've ever purchased! The quality is exceptional and I sleep so much better now. Highly recommend SoftDreams!",
        image: "AP",
    },
    {
        name: "Kasun Silva",
        location: "Kandy",
        rating: 5,
        text: "Absolutely love the luxury bedsheets! Soft, breathable, and the perfect addition to my bedroom. Worth every rupee.",
        image: "KS",
    },
    {
        name: "Nethmi Fernando",
        location: "Galle",
        rating: 5,
        text: "The pillows are incredibly comfortable and the duvets are so cozy. Fast delivery too! Will definitely order again.",
        image: "NF",
    },
    {
        name: "Ruwan Jayawardena",
        location: "Negombo",
        rating: 5,
        text: "Premium quality at reasonable prices. Customer service was excellent and helped me choose the perfect set for my room.",
        image: "RJ",
    },
];

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12">
                {/* Quote Icon */}
                <FaQuoteLeft className="absolute top-8 left-8 text-6xl text-accent/10" />

                {/* Content */}
                <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                        {[...Array(current.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400 text-xl" />
                        ))}
                    </div>

                    {/* Text */}
                    <p className="text-secondary/80 text-lg md:text-xl text-center leading-relaxed mb-8 italic">
                        "{current.text}"
                    </p>

                    {/* Author */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-xl">
                            {current.image}
                        </div>
                        <div className="text-center">
                            <h4 className="font-bold text-secondary text-lg">{current.name}</h4>
                            <p className="text-secondary/50 text-sm">{current.location}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-secondary/10 flex items-center justify-center text-secondary/60 hover:text-accent hover:border-accent transition-all hover:scale-110 shadow-md"
                    aria-label="Previous testimonial"
                >
                    <FaChevronLeft />
                </button>

                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-secondary/10 flex items-center justify-center text-secondary/60 hover:text-accent hover:border-accent transition-all hover:scale-110 shadow-md"
                    aria-label="Next testimonial"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                ? "bg-accent w-8"
                                : "bg-secondary/20 hover:bg-secondary/40"
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
