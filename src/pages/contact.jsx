import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineChat } from "react-icons/hi";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const TO_EMAIL = "madumaleranda123@gmail.com";

  function buildEmailBody() {
    return (
      `Hi SoftDreams,\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `Message:\n${form.message}\n`
    );
  }



  function buildGmailLink() {
    const subject = `SoftDreams Inquiry - ${form.name || "Customer"}`;
    const body = buildEmailBody();

    // Works in browser without needing a mail app configured
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      TO_EMAIL
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function handleSubmit(e) {
    e.preventDefault();

    // ✅ Easy way: open Gmail compose with filled details
    window.open(buildGmailLink(), "_blank", "noopener,noreferrer");

    toast.success("Opening email compose…");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="w-full bg-primary text-secondary min-h-screen">
      {/* Hero/Header */}
      <section className="bg-secondary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          Have a question about our products or need help with an order? We'd love to hear from you.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 -mt-16 sm:-mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-secondary/5">
              <h3 className="text-xl font-bold text-secondary mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <HiOutlineLocationMarker className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Our Location</p>
                    <p className="text-sm text-secondary/70">Colombo, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <HiOutlinePhone className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Phone Support</p>
                    <p className="text-sm text-secondary/70 mb-1">Mon-Sat 9am-6pm</p>
                    <a href="tel:+9471123456" className="text-accent font-medium hover:underline">+94 71 123 456</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <HiOutlineMail className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Email Us</p>
                    <p className="text-sm text-secondary/70 mb-1">We'll reply within 24 hours</p>
                    <a href={`mailto:${TO_EMAIL}`} className="text-accent font-medium hover:underline break-all">{TO_EMAIL}</a>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-secondary/10" />

              <a
                href="https://wa.me/9471123456?text=Hello%20SoftDreams!%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
              >
                <HiOutlineChat className="text-xl" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary/5 h-full">
              <h2 className="text-2xl font-bold text-secondary mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Your Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field bg-primary/30"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Email Address</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field bg-primary/30"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Message</label>
                  <textarea
                    required
                    rows="6"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field bg-primary/30 min-h-[150px]"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition hover:-translate-y-1"
                >
                  Send Message
                </button>
                <p className="text-xs text-secondary/50 mt-4">
                  * Clicking send will open your default email client (Gmail) to send this message.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}