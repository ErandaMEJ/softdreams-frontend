import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { GrGoogle } from "react-icons/gr"; // Added for consistency if needed, though not used in original logic yet

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function register() {
    if (firstName.trim() == "") return toast.error("First name is required.");
    if (lastName.trim() == "") return toast.error("Last name is required.");
    if (email.trim() == "") return toast.error("Email is required.");
    if (password.trim() == "") return toast.error("Password is required.");
    if (password !== confirmPassword) return toast.error("Passwords do not match.");

    setIsLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", {
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      navigate("/login");
      toast.success("Registration successful! Welcome to SoftDreams.");
      setIsLoading(false);
    } catch (err) {
      toast.error("Registration failed! Please check your data and try again.");
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Image Board (Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-accent relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop"
          alt="Luxury Bedding Interior"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative z-10 w-full h-full flex flex-col justify-end p-16 text-white">
          <h1 className="text-5xl font-bold mb-4">Join SoftDreams</h1>
          <p className="text-xl text-white/90 max-w-md">
            Create an account to access exclusive collections and personalize your sleep experience.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-primary flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-secondary mb-2">Create Account</h2>
            <p className="text-secondary/60">Join us today for a better night's sleep.</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!isLoading) register();
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">First Name</label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="John"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Last Name</label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Doe"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="john@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create a password"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
                className="input-field"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Register Now"}
            </button>

            <p className="pt-4 text-center text-sm text-secondary/60">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-accent hover:text-accent/80 transition"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}