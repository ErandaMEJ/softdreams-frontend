
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import AdminPage from './pages/adminPage';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPasswordPage';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { QuickViewProvider } from './context/QuickViewContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import QuickViewModal from './components/QuickViewModal';

// Page Imports
import HomeContent from './pages/homeContent';
import ProductPage from './pages/productPage';
import About from './pages/about';
import Contact from './pages/contact';
import ProductOverview from './pages/productOverview';
import CartPage from './pages/cart';
import WishlistPage from './pages/wishlistPage';
import CheckoutPage from './pages/checkOut';
import OrdersPage from './pages/ordersPage';

import FaqPage from './pages/extra/faqPage';
import ShippingPage from './pages/extra/shippingPage';
import CareGuidePage from './pages/extra/careGuidePage';
import PrivacyPolicyPage from './pages/extra/privacyPolicyPage';
import TermsPage from './pages/extra/termsPage';

function App() {

  return (
    <GoogleOAuthProvider clientId="309651160594-59496ucjsk3kehjlb3ti11v9olgqt3vu.apps.googleusercontent.com">
      <QuickViewProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <BrowserRouter>
              <Toaster position="top-right" />
              <div className="w-full h-screen bg-primary text-secondary ">
                <QuickViewModal />
                <Routes>
                  <Route path="/" element={<HomePage />}>
                    <Route index element={<HomeContent />} />
                    <Route path="products" element={<ProductPage />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="overview/:productID" element={<ProductOverview />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="faq" element={<FaqPage />} />
                    <Route path="shipping" element={<ShippingPage />} />
                    <Route path="care-guide" element={<CareGuidePage />} />
                    <Route path="privacy" element={<PrivacyPolicyPage />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="*" element={<h1>Page Not Found</h1>} />
                  </Route>

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/admin/*" element={<AdminPage />} />
                  <Route path="/forgot-password" element={<ForgetPasswordPage />} />
                  {/* Removing independent /faq route since it's now under layout or handled above. 
                      App.jsx had /faq -> FAQPage. homePage had /faq -> FaqPage(extra).
                      I'll use the one from HomePage as it was the main UI? 
                      Actually `FAQPage` (from pages) vs `FaqPage` (from extra).
                      I'll keep `FaqPageExtra` for `/faq` as in HomePage.
                  */}
                </Routes>
                <Analytics />
                <SpeedInsights />

              </div>
            </BrowserRouter>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </QuickViewProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
