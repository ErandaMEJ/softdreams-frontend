import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";
import Logo from "../assets/softdreams-logo.svg";
// const Logo = "/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-primary border-t border-white/10 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">

          {/* Brand Column */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={Logo} alt="SoftDreams Logo" className="h-16 w-auto object-contain rounded-md group-hover:scale-105 transition-transform brightness-0 invert opacity-90 hover:opacity-100" />
              <span className="text-2xl font-bold text-accent tracking-tight">SoftDreams</span>
            </Link>
            <p className="text-sm text-primary/70 leading-relaxed">
              Experience the ultimate luxury in bedding. Premium materials, exquisite designs, and comfort that lasts a lifetime.
            </p>
            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaInstagram, FaTwitter, FaPinterest].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-primary/80 hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-primary/70 hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm text-primary/70 hover:text-accent transition-colors">Shop Bedding</Link></li>
              <li><Link to="/about" className="text-sm text-primary/70 hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-sm text-primary/70 hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Customer Care</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-sm text-primary/70 hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-primary/70 hover:text-accent transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/care-guide" className="text-sm text-primary/70 hover:text-accent transition-colors">Care Guide</Link></li>
              <li><Link to="/privacy" className="text-sm text-primary/70 hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Connected</h3>
            <p className="text-sm text-primary/70 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-primary/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent/90 hover:-translate-y-1 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Payment Icons & Trust Badges */}
        <div className="mb-12 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center gap-6">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-primary/50">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure Payments
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                Free Shipping
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Easy Returns
              </span>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <span className="text-xs text-primary/40 font-medium">We Accept:</span>
              <div className="flex gap-3">
                {/* Visa */}
                <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">VISA</span>
                </div>
                {/* Mastercard */}
                <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
                  <div className="flex">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-orange-400 -ml-1.5"></div>
                  </div>
                </div>
                {/* Amex */}
                <div className="h-8 w-12 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-[10px]">AMEX</span>
                </div>
                {/* PayPal */}
                <div className="h-8 px-3 bg-white rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary/40">
          <p>&copy; {new Date().getFullYear()} SoftDreams. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-primary/80 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-primary/80 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
