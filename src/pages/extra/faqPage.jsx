
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function FaqPage() {
    const faqs = [
        {
            question: "What materials do you use for your bedding?",
            answer: "We use only the finest, sustainably sourced materials including 100% Egyptian Cotton, Tencel™, and organic bamboo fibers to ensure maximum comfort and durability."
        },
        {
            question: "How do I care for my SoftDreams bedding?",
            answer: "We recommend washing in cold water on a gentle cycle and tumble drying on low heat. Avoid bleach and fabric softeners to maintain the integrity of the fibers."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to select countries worldwide. Shipping costs and delivery times vary by location."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day improved sleep guarantee. If you're not completely satisfied, you can return your unwashed items for a full refund."
        },
        {
            question: "How do I choose the right thread count?",
            answer: "Thread count isn't everything! While higher counts can be softer, the quality of the fiber matters more. Our 400-600 thread count range offers the perfect balance of softness and breathability."
        }
    ];

    return (
        <div className="w-full min-h-screen bg-primary pt-24 pb-12 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-secondary mb-2 text-center">Frequently Asked Questions</h1>
                <p className="text-secondary/60 text-center mb-12">Find answers to common questions about our products and services.</p>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FaqItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-secondary/10 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className="font-semibold text-lg text-secondary">{question}</span>
                {isOpen ? <HiChevronUp className="text-accent text-xl" /> : <HiChevronDown className="text-secondary/40 text-xl" />}
            </button>
            <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <p className="text-secondary/70 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
}
