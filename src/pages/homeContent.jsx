import { Link } from "react-router-dom";
import RevealOnScroll from "../components/RevealOnScroll";

import TestimonialsCarousel from "../components/testimonialsCarousel";

export default function Home() {


  return (
    <main className="w-full">
      {/* HERO */}


      {/* RE-DOING HERO SECTION TO BE SIMPLE RELATIVE FOR NOW TO FIX THE ISSUE. 
         The user said "split into two". The previous height calculation might be the cause.
         I will use h-screen and a nice gradient overlap.
      */}

      <section
        className="
          relative w-full
          min-h-screen
          flex text-center items-center justify-center
          overflow-hidden
        "
      >
        <div
          className="
            absolute inset-0 
            bg-[url('https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=2000')] 
            bg-cover bg-center 
            animate-subtle-zoom
          "
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-primary/90" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8 z-10 text-center pt-24">
          {/* Badge */}
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md animate-fade-in-up shadow-lg">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Premium Bedding Collection
          </div>

          {/* Title */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-8xl animate-fade-in-up delay-100 drop-shadow-lg mb-6">
            SoftDreams
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-white/90 font-light animate-fade-in-up delay-200 mb-8 leading-relaxed drop-shadow-md">
            Experience the ultimate luxury of our 100% Egyptian Cotton bedding.
            <span className="block mt-2 font-medium opacity-90">Sleep better. Live better.</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-in-up delay-300">
            <Link
              to="/products"
              className="
                inline-flex items-center justify-center rounded-full
                bg-white px-8 py-4 text-base font-bold text-secondary
                shadow-xl shadow-white/20
                transition hover:bg-gray-100 hover:-translate-y-1 active:scale-[0.99]
              "
            >
              Shop Now
            </Link>

            <Link
              to="/contact"
              className="
                inline-flex items-center justify-center rounded-full
                border border-white/40 bg-black/20 px-8 py-4 text-base font-bold text-white
                backdrop-blur-sm transition
                hover:bg-black/40 hover:border-white hover:-translate-y-1 active:scale-[0.99]
              "
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="bg-primary relative z-10 -mt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Quick stats floating cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-16 transform -translate-y-8">
            {[
              { k: "100% Organic", v: "Certified Cotton", i: "🌿" },
              { k: "Island-wide", v: "Fast Delivery", i: "🚚" },
              { k: "5-Star Comfort", v: "Guaranteed", i: "⭐" },
            ].map((s) => (
              <div
                key={s.k}
                className="flex flex-col items-center text-center gap-2 rounded-2xl border border-secondary/5 bg-white p-6 shadow-xl shadow-secondary/5 hover:-translate-y-1 transition duration-300"
              >
                <span className="text-3xl mb-2">{s.i}</span>
                <p className="text-lg font-bold text-secondary">{s.k}</p>
                <p className="text-sm text-secondary/60">{s.v}</p>
              </div>
            ))}
          </div>

          {/* Category cards */}
          <RevealOnScroll>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Luxury Bedsheets",
                  desc: "300-1000 Thread Count",
                  img: "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=800",
                  link: "/products?category=Bedsheets"
                },
                {
                  title: "Plush Pillows",
                  desc: "Memory Foam & Down",
                  img: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800",
                  link: "/products?category=Pillows"
                },
                {
                  title: "Duvets & Sets",
                  desc: "Complete Bedding Sets",
                  img: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800",
                  link: "/products?category=Duvets"
                },
              ].map((c) => (
                <Link
                  key={c.title}
                  to={c.link}
                  className="
                    group relative overflow-hidden rounded-3xl h-80 shadow-lg bg-gradient-to-br from-accent/20 to-secondary/30
                  "
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                  <img
                    src={c.img}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />

                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md translate-y-0 transition-transform duration-300 group-hover:-translate-y-2">{c.title}</h3>
                    <p className="text-white/90 font-medium translate-y-0 transition-transform duration-300 group-hover:-translate-y-2">{c.desc}</p>

                    <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-bold text-secondary">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>

          {/* NEW: Services list (more details) */}
          <RevealOnScroll>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-secondary/10 bg-white p-6 hover:shadow-md transition duration-300">
                <h3 className="text-lg font-semibold text-secondary">Why Choose SoftDreams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-secondary/70">
                  <li>• Premium Materials (100% Cotton, Satin, Linen)</li>
                  <li>• Custom Sizes Available</li>
                  <li>• Fade-Resistant Colors</li>
                  <li>• Easy Care & Long Lasting</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-secondary/10 bg-white p-6 hover:shadow-md transition duration-300">
                <h3 className="text-lg font-semibold text-secondary">Ordering Process</h3>
                <ol className="mt-3 space-y-2 text-sm text-secondary/70">
                  <li>1) Browse our collection</li>
                  <li>2) Select your size and color</li>
                  <li>3) Secure checkout</li>
                  <li>4) Fast delivery to your doorstep</li>
                </ol>
              </div>
            </div>
          </RevealOnScroll>

          {/* CTA strip */}
          <RevealOnScroll>
            <div className="mt-8 rounded-2xl border border-secondary/10 bg-gradient-to-r from-accent/10 via-white/5 to-secondary/10 p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-secondary">
                    Looking for something specific?
                  </h3>
                  <p className="mt-1 text-sm text-secondary/70">
                    We offer custom sizes and bulk orders for hotels and businesses.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/products"
                    className="
                      inline-flex items-center justify-center rounded-xl
                      bg-white px-5 py-3 text-sm font-semibold text-zinc-950
                      transition hover:bg-white/90 hover:-translate-y-1 hover:shadow-md
                    "
                  >
                    Browse Products
                  </Link>
                  <Link
                    to="/contact"
                    className="
                      inline-flex items-center justify-center rounded-xl
                      border border-secondary/20 bg-white/5 px-5 py-3 text-sm font-semibold text-secondary
                      transition hover:bg-secondary/10
                    "
                  >
                    Talk to an Expert
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); filter: blur(2px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
        `}
      </style>

      {/* Testimonials Section */}
      <RevealOnScroll>
        <section className="w-full py-20 bg-gradient-soft">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                What Our Customers Say
              </h2>
              <p className="text-secondary/60 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our happy customers
              </p>
            </div>
            <TestimonialsCarousel />
          </div>
        </section>
      </RevealOnScroll>


    </main>
  );
}