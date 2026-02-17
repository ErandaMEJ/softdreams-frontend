import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";

export default function OrderDeleteButton({ orderId, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete order #${orderId}? This action cannot be undone.`
        );

        if (!confirmDelete) return;

        setIsDeleting(true);
        const token = localStorage.getItem("token");

        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Order deleted successfully!");
            onDelete(orderId);
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error(error.response?.data?.message || "Failed to delete order");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`
        p-2 rounded-lg transition-all
        ${isDeleting
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-red-500 hover:bg-red-50 hover:text-red-600"
                }
      `}
            title="Delete Order"
        >
            <HiOutlineTrash className="text-lg" />
        </button>
    );
}
