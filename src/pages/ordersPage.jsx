import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";
import { HiOutlineCube, HiOutlineCalendar, HiOutlineCurrencyDollar } from "react-icons/hi";

function getStatusBadgeClass(statusRaw) {
  const s = String(statusRaw || "").toLowerCase().trim();

  let cls = "bg-gray-100 text-gray-700 border-gray-200";

  if (["pending", "awaiting", "unpaid"].includes(s)) {
    cls = "bg-yellow-50 text-yellow-700 border-yellow-200";
  } else if (["processing", "confirmed"].includes(s)) {
    cls = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (["cancel_requested", "cancel-requested", "cancel request"].includes(s)) {
    cls = "bg-orange-50 text-orange-700 border-orange-200";
  } else if (["delivered", "completed", "complete"].includes(s)) {
    cls = "bg-green-50 text-green-700 border-green-200";
  } else if (["cancelled", "canceled", "rejected", "failed"].includes(s)) {
    cls = "bg-red-50 text-red-700 border-red-200";
  }

  return cls;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-primary">

      {/* Hero Section */}
      <div className="relative w-full h-[250px] flex items-center justify-center bg-secondary overflow-hidden">
        <img
          src="https://images.pexels.com/photos/4473388/pexels-photo-4473388.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Orders"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary" />

        <div className="relative z-10 text-center px-4 mt-16 font-bold text-white drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl mb-2">My Orders</h1>
          <p className="text-white/80 text-sm md:text-base font-normal">
            Track and manage your recent purchases
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">

        {/* Stats Bar */}
        <div className="flex justify-end mb-6">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-sm font-medium text-white shadow-sm flex items-center gap-2">
            Total Orders: <span className="font-bold text-accent bg-white/10 px-2 rounded">{orders.length}</span>
          </div>
        </div>

        {/* Loading State */}
        {!loaded && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {/* Empty State */}
        {loaded && orders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-secondary/20">
            <HiOutlineCube className="text-4xl text-secondary/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary">No orders found</h3>
            <p className="text-secondary/60 mt-2">You haven't placed any orders yet.</p>
          </div>
        )}

        {/* Orders List */}
        {loaded && orders.length > 0 && (
          <div className="space-y-6">

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-hidden rounded-2xl border border-secondary/10 bg-white shadow-sm">
              <table className="w-full text-left text-sm text-secondary/80">
                <thead className="bg-gray-50 text-secondary/70 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Total</th>
                    <th className="px-6 py-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 font-medium text-secondary">#{order.orderId}</td>
                      <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-secondary">LKR. {order.total.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <ViewOrderInfoCustomer order={order} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
              {orders.map((order) => (
                <div key={order.orderId} className="bg-white rounded-2xl p-5 border border-secondary/10 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs text-secondary/50 font-medium">Order ID</span>
                      <h3 className="text-base font-bold text-secondary">#{order.orderId}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-xs text-secondary/50 mb-1">
                        <HiOutlineCalendar /> Date
                      </span>
                      <span className="text-secondary">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-xs text-secondary/50 mb-1">
                        <HiOutlineCurrencyDollar /> Total
                      </span>
                      <span className="text-accent font-bold">LKR. {order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <ViewOrderInfoCustomer order={order} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}