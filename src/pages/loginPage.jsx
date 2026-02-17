import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const goAfterLogin = (role) => navigate(role === "admin" ? "/admin" : "/");

  async function handleGoogleLogin(credential) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/google-login",
        { token: credential }
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      goAfterLogin(res.data.role);
    } catch (err) {
      console.log(err);
      toast.error("Google login failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function login() {
    setIsLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back to SoftDreams.");
      goAfterLogin(res.data.role);
    } catch (err) {
      console.log(err);
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Image Board (Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-accent relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1974&auto=format&fit=crop"
          alt="Luxury Bedroom"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative z-10 w-full h-full flex flex-col justify-end p-16 text-white">
          <h1 className="text-5xl font-bold mb-4">SoftDreams</h1>
          <p className="text-xl text-white/90 max-w-md">
            Experience the comfort of cloud-like bedding. Your perfect night's sleep begins here.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-primary flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-secondary mb-2">Welcome Back</h2>
            <p className="text-secondary/60">Please enter your details to sign in.</p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!isLoading) login();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-accent hover:text-accent/80 transition"
              >
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-primary text-secondary/50">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleGoogleLogin(credentialResponse.credential);
                }}
                onError={() => toast.error("Google login failed")}
                theme="outline"
                size="large"
                width="100%"
                text="continue_with"
              />
            </div>

            <p className="pt-4 text-center text-sm text-secondary/60">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-accent hover:text-accent/80 transition"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}