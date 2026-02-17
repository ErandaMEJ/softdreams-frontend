
import { HiOutlineTruck, HiOutlineGlobe, HiOutlineClock } from "react-icons/hi";

export default function ShippingPage() {
    return (
        <div className="w-full min-h-screen bg-primary pt-24 pb-12 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-secondary mb-2 text-center">Shipping & Returns</h1>
                <p className="text-secondary/60 text-center mb-12">Everything you need to know about our delivery and return policies.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-2xl border border-secondary/10 text-center">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent text-2xl mx-auto mb-4">
                            <HiOutlineTruck />
                        </div>
                        <h3 className="font-bold text-secondary mb-2">Free Shipping</h3>
                        <p className="text-sm text-secondary/60">On all domestic orders over $150.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-secondary/10 text-center">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent text-2xl mx-auto mb-4">
                            <HiOutlineClock />
                        </div>
                        <h3 className="font-bold text-secondary mb-2">Fast Delivery</h3>
                        <p className="text-sm text-secondary/60">Orders processed within 24 hours.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-secondary/10 text-center">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent text-2xl mx-auto mb-4">
                            <HiOutlineGlobe />
                        </div>
                        <h3 className="font-bold text-secondary mb-2">Global Shipping</h3>
                        <p className="text-sm text-secondary/60">We ship to over 50 countries worldwide.</p>
                    </div>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-secondary mb-4">Shipping Policy</h2>
                        <div className="bg-white p-8 rounded-2xl border border-secondary/10 space-y-4 text-secondary/70">
                            <p>
                                We strive to deliver your order as quickly as possible. All orders are processed within 1-2 business days.
                                Orders are not shipped or delivered on weekends or holidays.
                            </p>
                            <p>
                                If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                                Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order,
                                we will contact you via email or telephone.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-secondary mb-4">Return Policy</h2>
                        <div className="bg-white p-8 rounded-2xl border border-secondary/10 space-y-4 text-secondary/70">
                            <p>
                                Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
                            </p>
                            <p>
                                To be eligible for a return, your item must be unused and in the same condition that you received it.
                                It must also be in the original packaging.
                            </p>
                            <p>
                                To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
