import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import Home from "./homeContent";
import About from "./about";
import Contact from "./contact";
import Footer from "../components/footer";
import FaqPage from "./extra/faqPage";
import ShippingPage from "./extra/shippingPage";
import CareGuidePage from "./extra/careGuidePage";
import PrivacyPolicyPage from "./extra/privacyPolicyPage";
import TermsPage from "./extra/termsPage";
import WishlistPage from "./wishlistPage";
import WhatsAppWidget from "../components/whatsappWidget";



export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/overview/:productID" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/care-guide" element={<CareGuidePage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </div>
            <Footer />
            <WhatsAppWidget />
        </div>
    )
}