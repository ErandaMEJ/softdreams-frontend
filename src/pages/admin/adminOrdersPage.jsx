import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderInfo";
import OrderDeleteButton from "../../components/orderDeleteButton";
import { HiOutlineSearch } from "react-icons/hi";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.error(err);
          setLoaded(true);
        });
    }
  }, [loaded]);

  const handleOrderDeleted = (deletedOrderId) => {
    setOrders(orders.filter(order => order.orderId !== deletedOrderId));
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(search.toLowerCase()) ||
    order.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col relative text-secondary">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-secondary">
          Order Management
        </h1>
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 text-lg" />
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 rounded-xl border border-secondary/20 bg-white/50 focus:bg-white focus:border-accent outline-none transition w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full overflow-hidden bg-white/60 backdrop-blur-md shadow-sm rounded-2xl border border-white/40">
        {loaded ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/5 text-secondary/70 text-xs uppercase tracking-wider border-b border-secondary/10">
                  <th className="py-4 px-6 font-semibold">Order ID</th>
                  <th className="py-4 px-6 font-semibold">Customer</th>
                  <th className="py-4 px-6 font-semibold">Date</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Total</th>
                  <th className="py-4 px-6 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/60 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-secondary">#{order.orderId}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-medium text-secondary">{order.name}</span>
                          <span className="text-xs text-secondary/50">{order.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-secondary/70">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                ${['delivered', 'completed'].includes(order.status) ? 'bg-green-100 text-green-700' :
                            ['pending', 'processing'].includes(order.status) ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'}
                            `}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-medium text-accent">LKR. {order.total.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <ViewOrderInfo order={order} />
                          <OrderDeleteButton orderId={order.orderId} onDelete={handleOrderDeleted} />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-secondary/50">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
