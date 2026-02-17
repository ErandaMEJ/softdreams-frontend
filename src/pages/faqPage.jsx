import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function FAQPage() {
    const faqs = [
        {
            category: "Orders & Shipping",
            items: [
                {
                    q: "How long does shipping take?",
                    a: "Standard shipping typically takes 3-5 business days within Colombo and suburbs. Outstation deliveries may take 5-7 business days."
                },
                {
                    q: "Is cash on delivery available?",
                    a: "Yes! We support Cash on Delivery (COD) for all orders islandwide."
                },
                {
                    q: "How can I track my order?",
                    a: "Once your order is dispatched, you can view its status in the 'My Orders' section of your account. We will also send you an SMS/Email update."
                }
            ]
        },
        {
            category: "Product Care",
            items: [
                {
                    q: "How should I wash my bed sheets?",
                    a: "We recommend machine washing in cold or warm water with a mild detergent. Tumble dry on low heat or line dry. Avoid bleach to maintain color vibrancy."
                },
                {
                    q: "Do the colors fade after washing?",
                    a: "Our premium bed sheets are made with high-quality dyes that are fade-resistant. Following proper washing instructions ensures they stay vibrant for a long time."
                }
            ]
        },
        {
            category: "Returns & Exchanges",
            items: [
                {
                    q: "What is your return policy?",
                    a: "We accept returns within 7 days of purchase for unused, unwashed items in their original packaging. Please contact our support team to initiate a return."
                },
                {
                    q: "Can I exchange an item if the size is wrong?",
                    a: "Yes, exchanges are possible for size issues, provided the item is in original condition. Shipping costs for exchanges may apply."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Frequently Asked Questions</h1>
                <p className="text-center text-gray-600 mb-10">Find answers to common questions about our products and services.</p>

                <div className="space-y-8">
                    {faqs.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-accent mb-4 border-b border-gray-100 pb-2">{section.category}</h2>
                            <div className="space-y-4">
                                {section.items.map((item, i) => (
                                    <FAQItem key={i} question={item.q} answer={item.a} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600">Still have questions?</p>
                    <a href="/contact" className="text-accent font-semibold hover:underline">Contact our Support Team</a>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-100 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors text-left"
            >
                <span className="font-medium text-gray-900">{question}</span>
                <span className="text-secondary/60">
                    {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-4 text-gray-600 text-sm bg-white border-t border-gray-100">
                    {answer}
                </div>
            </div>
        </div>
    );
}
