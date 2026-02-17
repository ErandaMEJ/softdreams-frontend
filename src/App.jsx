
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

//309651160594-59496ucjsk3kehjlb3ti11v9olgqt3vu.apps.googleusercontent.com

import { Analytics } from '@vercel/analytics/react';
import { QuickViewProvider } from './context/QuickViewContext';
import QuickViewModal from './components/QuickViewModal';
import FAQPage from './pages/faqPage';

function App() {

  return (
    <GoogleOAuthProvider clientId="309651160594-59496ucjsk3kehjlb3ti11v9olgqt3vu.apps.googleusercontent.com">
      <QuickViewProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <div className="w-full h-screen bg-primary text-secondary ">
            <QuickViewModal />
            <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="/forgot-password" element={<ForgetPasswordPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
            <Analytics />
            <SpeedInsights />

          </div>
        </BrowserRouter>
      </QuickViewProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
