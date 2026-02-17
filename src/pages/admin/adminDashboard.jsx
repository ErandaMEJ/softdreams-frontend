import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { HiOutlineShoppingCart, HiOutlineCube, HiOutlineUsers, HiOutlineCash, HiOutlineTrendingUp, HiOutlineClipboardList } from "react-icons/hi";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!loaded) {
            Promise.all([
                axios.get(import.meta.env.VITE_BACKEND_URL + "/products"),
                axios.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]).then(([productsRes, ordersRes, usersRes]) => {
                const products = productsRes.data;
                const orders = ordersRes.data;
                const users = usersRes.data;

                const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
                const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "processing").length;
                const completedOrders = orders.filter(o => o.status === "delivered" || o.status === "completed").length;

                setStats({
                    totalProducts: products.length,
                    availableProducts: products.filter(p => p.isAvailable).length,
                    outOfStock: products.filter(p => !p.isAvailable || p.stock === 0).length,
                    totalOrders: orders.length,
                    pendingOrders,
                    completedOrders,
                    totalRevenue,
                    totalUsers: users.length,
                    customers: users.filter(u => u.role === "customer").length,
                    admins: users.filter(u => u.role === "admin").length,
                });

                setRecentOrders(orders.slice(0, 5));
                setLoaded(true);
            }).catch((err) => {
                console.error(err);
                setLoaded(true);
            });
        }
    }, [loaded]);

    if (!loaded) {
        return (
            <div className="flex justify-center py-20">
                <Loader />
            </div>
        );
    }

    const statCards = [
        { label: "Total Orders", value: stats?.totalOrders || 0, icon: HiOutlineShoppingCart, color: "bg-blue-500", lightColor: "bg-blue-50 text-blue-600" },
        { label: "Total Revenue", value: `LKR ${(stats?.totalRevenue || 0).toLocaleString()}`, icon: HiOutlineCash, color: "bg-green-500", lightColor: "bg-green-50 text-green-600" },
        { label: "Products", value: stats?.totalProducts || 0, icon: HiOutlineCube, color: "bg-purple-500", lightColor: "bg-purple-50 text-purple-600" },
        { label: "Customers", value: stats?.customers || 0, icon: HiOutlineUsers, color: "bg-amber-500", lightColor: "bg-amber-50 text-amber-600" },
    ];

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-secondary mb-8">Dashboard Overview</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-secondary/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-11 h-11 rounded-xl ${card.lightColor} flex items-center justify-center`}>
                                <card.icon className="text-xl" />
                            </div>
                            <HiOutlineTrendingUp className="text-green-500 text-lg" />
                        </div>
                        <p className="text-2xl font-bold text-secondary">{card.value}</p>
                        <p className="text-sm text-secondary/50 mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 border border-secondary/5">
                    <h3 className="text-sm font-semibold text-secondary/70 mb-4 flex items-center gap-2">
                        <HiOutlineClipboardList className="text-lg" /> Order Status
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-secondary/70">Pending</span>
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">{stats?.pendingOrders || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-secondary/70">Completed</span>
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">{stats?.completedOrders || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-secondary/5">
                    <h3 className="text-sm font-semibold text-secondary/70 mb-4 flex items-center gap-2">
                        <HiOutlineCube className="text-lg" /> Product Status
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-secondary/70">Available</span>
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">{stats?.availableProducts || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-secondary/70">Out of Stock</span>
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">{stats?.outOfStock || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-secondary/5">
                    <h3 className="text-sm font-semibold text-secondary/70 mb-4 flex items-center gap-2">
                        <HiOutlineUsers className="text-lg" /> User Overview
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-secondary/70">Customers</span>
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">{stats?.customers || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-secondary/70">Admins</span>
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-700">{stats?.admins || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-secondary/5 overflow-hidden">
                <div className="p-5 border-b border-secondary/5">
                    <h3 className="text-sm font-semibold text-secondary/70 flex items-center gap-2">
                        <HiOutlineShoppingCart className="text-lg" /> Recent Orders
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs text-secondary/50 uppercase tracking-wider">
                                <th className="py-3 px-5">Order ID</th>
                                <th className="py-3 px-5">Customer</th>
                                <th className="py-3 px-5">Status</th>
                                <th className="py-3 px-5 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/5">
                            {recentOrders.map((order, i) => (
                                <tr key={i} className="hover:bg-secondary/2 transition-colors">
                                    <td className="py-3 px-5 font-medium text-sm">#{order.orderId}</td>
                                    <td className="py-3 px-5 text-sm text-secondary/70">{order.name}</td>
                                    <td className="py-3 px-5">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full
                                            ${['delivered', 'completed'].includes(order.status) ? 'bg-green-100 text-green-700' :
                                                ['pending', 'processing'].includes(order.status) ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-5 text-right text-sm font-medium text-accent">LKR {order.total?.toFixed(2)}</td>
                                </tr>
                            ))}
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-secondary/40 text-sm">No orders yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
