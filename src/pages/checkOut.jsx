import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineShieldCheck, HiOutlineTruck } from "react-icons/hi";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cart] = useState(location.state);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (location.state == null) {
      navigate("/products");
    }
  }, [location.state, navigate]);

  const isEmptyCart = !cart || cart.length === 0;



  if (isEmptyCart) {
    return (
      <div className="w-full min-h-[calc(100vh-68px)] bg-primary py-16 px-4">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-bold text-secondary mb-4">Your cart is empty</h1>
          <p className="text-secondary/60 mb-8">Add top-quality bedding to your cart to proceed.</p>
          <Link
            to="/products"
            className="btn-primary"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function submitOrder() {
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    if (!name || !address || !phone) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    setLoading(true);

    const orderItems = cart.map(item => ({
      productID: item.productID,
      quantity: item.quantity,
    }));

    axios.post(
      import.meta.env.VITE_BACKEND_URL + "/orders",
      {
        name: name,
        address: address,
        phone: phone,
        items: orderItems,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        toast.success("Order placed successfully!");
        navigate("/orders");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error placing order. Please try again.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="w-full min-h-screen bg-primary">

      {/* Hero Section with Shaded Gradient */}
      <div className="relative w-full h-[250px] flex items-center justify-center bg-secondary overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Checkout"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary" />

        <div className="relative z-10 text-center px-4 mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            Secure Checkout
          </h1>
          <p className="text-white/80 text-sm md:text-base flex items-center justify-center gap-2">
            <HiOutlineLockClosed className="text-accent" /> Encrypted & Safe Transaction
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Shipping Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Shipping Form */}
            <div className="glass-panel p-6 sm:p-8 bg-white shadow-sm border border-secondary/5 rounded-2xl">
              <h2 className="text-xl font-semibold text-secondary mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-sm">1</span>
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    placeholder="+94 7X XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">City</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Colombo"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary mb-1">Shipping Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="House no, Street name, Area"
                  />
                </div>
              </div>
            </div>

            {/* Review Items */}
            <div className="glass-panel p-6 sm:p-8 bg-white shadow-sm border border-secondary/5 rounded-2xl">
              <h2 className="text-xl font-semibold text-secondary mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white text-sm">2</span>
                Review Items
              </h2>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center py-4 border-b border-dashed border-secondary/10 last:border-0 last:pb-0">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-50 border border-secondary/10" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-secondary">{item.name}</h3>
                      <p className="text-xs text-secondary/60">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-secondary">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-secondary/5 shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-secondary mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-secondary/70">
                  <span>Subtotal</span>
                  <span>Rs. {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-secondary/70">
                  <span>Delivery</span>
                  <span>Calculated later</span>
                </div>
              </div>

              <div className="border-t border-dashed border-secondary/10 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-secondary">Total</span>
                  <span className="text-2xl font-bold text-accent">Rs. {getCartTotal().toLocaleString()}</span>
                </div>
                <p className="text-xs text-secondary/40 mt-1 text-right">Includes applicable taxes</p>
              </div>

              <button
                onClick={submitOrder}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>

              <div className="mt-6 flex flex-col gap-3 text-xs text-secondary/50">
                <div className="flex items-center gap-2">
                  <HiOutlineShieldCheck className="text-lg text-accent" />
                  <span>Secure encrypted payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineTruck className="text-lg text-accent" />
                  <span>Fast island-wide delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}