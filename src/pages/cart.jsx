import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { Link } from "react-router-dom";
import { FaTrash, FaArrowRight } from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  const updateQuantity = (item, qty) => {
    addToCart(item, qty);
    setCart(getCart());
  };

  return (
    <div className="w-full min-h-screen bg-primary">

      {/* Hero Section */}
      <div className="relative w-full h-[250px] flex items-center justify-center bg-secondary overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6431897/pexels-photo-6431897.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Cart"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary" />

        <div className="relative z-10 text-center px-4 mt-16 font-bold text-white drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl mb-2">Shopping Cart</h1>
          <p className="text-white/80 text-sm md:text-base font-normal">
            Review your premium bedding selection
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">

        {/* Header (Removed old header since title is in hero) */}
        <div className="flex items-center justify-between mb-8">
          {/* Keeping the item count but styling it nicely */}
          <div className="hidden"></div>
          <span className="text-white/80 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-medium ml-auto">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
          </span>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 rounded-3xl bg-white/5 border border-secondary/10 dashed-border">
            <h2 className="text-2xl font-semibold text-secondary mb-2">Your cart is empty</h2>
            <p className="text-secondary/60 mb-8">Looks like you haven't added anything yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-6 p-5 rounded-2xl bg-white border border-secondary/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-lg font-semibold text-secondary line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold text-accent shrink-0">
                          Rs. {item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-secondary/50 mt-1">ID: {item.productID}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1 border border-gray-100">
                        <button
                          onClick={() => updateQuantity(item, -1)}
                          className="w-8 h-8 flex items-center justify-center text-secondary hover:bg-white rounded-full transition shadow-sm"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item, 1)}
                          className="w-8 h-8 flex items-center justify-center text-secondary hover:bg-white rounded-full transition shadow-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-secondary/40 block">Subtotal</span>
                        <span className="font-semibold text-secondary">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-secondary/5 shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-secondary mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-secondary/70">
                    <span>Subtotal</span>
                    <span>Rs. {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-secondary/70">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-secondary/10 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-secondary">Total</span>
                    <span className="text-2xl font-bold text-accent">
                      Rs. {getCartTotal().toLocaleString()}
                    </span>
                  </div>

                </div>

                <Link
                  to="/checkout"
                  className="w-full py-4 rounded-xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Checkout <FaArrowRight className="text-sm" />
                </Link>

                <div className="mt-4 text-center">
                  <Link to="/products" className="text-sm text-secondary/50 hover:text-accent font-medium">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}