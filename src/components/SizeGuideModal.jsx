import { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function SizeGuideModal({ isOpen, onClose }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div
                ref={modalRef}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-800">Bed Sheet Size Guide</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-x-auto">
                    <p className="text-gray-600 mb-6 text-sm">
                        Refer to the chart below to find the perfect fit for your bed. Measurements are in inches.
                    </p>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary/10 border-b border-primary/20">
                                <th className="px-4 py-3 font-semibold text-secondary">Size</th>
                                <th className="px-4 py-3 font-semibold text-secondary">Mattress Size (in)</th>
                                <th className="px-4 py-3 font-semibold text-secondary">Flat Sheet (in)</th>
                                <th className="px-4 py-3 font-semibold text-secondary">Fitted Sheet (in)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">Single / Twin</td>
                                <td className="px-4 py-3">39 x 75</td>
                                <td className="px-4 py-3">66 x 96</td>
                                <td className="px-4 py-3">39 x 75 x 12</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">Double / Full</td>
                                <td className="px-4 py-3">54 x 75</td>
                                <td className="px-4 py-3">81 x 96</td>
                                <td className="px-4 py-3">54 x 75 x 12</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">Queen</td>
                                <td className="px-4 py-3">60 x 80</td>
                                <td className="px-4 py-3">90 x 102</td>
                                <td className="px-4 py-3">60 x 80 x 12</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">King</td>
                                <td className="px-4 py-3">76 x 80</td>
                                <td className="px-4 py-3">108 x 102</td>
                                <td className="px-4 py-3">76 x 80 x 12</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">Super King</td>
                                <td className="px-4 py-3">72 x 84</td>
                                <td className="px-4 py-3">112 x 102</td>
                                <td className="px-4 py-3">72 x 84 x 12</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800 border border-yellow-200">
                        <strong>Note:</strong> Sizes may vary slightly depending on the brand. Please check the specific product description for exact measurements if available.
                    </div>
                </div>
            </div>
        </div>
    );
}
