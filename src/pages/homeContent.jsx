import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RevealOnScroll from "../components/RevealOnScroll";
import TestimonialsCarousel from "../components/testimonialsCarousel";
import ProductCard from "../components/productCard";
import { api } from "../utils/api";

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const sorted = res.data
          .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating
          .slice(0, 4); // Take top 4
        setBestSellers(sorted);
      })
      .catch((err) => console.error("Error fetching best sellers:", err));
  }, []);

  return (
    <main className="w-full">
      {/* HERO SECTION */}
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
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md animate-fade-in-up shadow-lg">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Premium Bedding Collection
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-8xl animate-fade-in-up delay-100 drop-shadow-lg mb-6">
            SoftDreams
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-white/90 font-light animate-fade-in-up delay-200 mb-8 leading-relaxed drop-shadow-md">
            Experience the ultimate luxury of our 100% Egyptian Cotton bedding.
            <span className="block mt-2 font-medium opacity-90">Sleep better. Live better.</span>
          </p>

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

          {/* SHOP BY SIZE SECTION (NEW) */}
          <RevealOnScroll>
            <div className="mb-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-secondary mb-2">Shop by Size</h2>
                <p className="text-secondary/60">Find the perfect fit for your bed</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { size: "King", img: "https://images.pexels.com/photos/6434623/pexels-photo-6434623.jpeg?auto=compress&cs=tinysrgb&w=800" },
                  { size: "Queen", img: "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=800" },
                  { size: "Single", img: "https://images.pexels.com/photos/3773577/pexels-photo-3773577.png?auto=compress&cs=tinysrgb&w=800" }
                ].map((item) => (
                  <Link
                    key={item.size}
                    to={`/products?search=${item.size}`}
                    className="group relative h-48 rounded-2xl overflow-hidden shadow-md"
                  >
                    <img src={item.img} alt={item.size} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white tracking-widest uppercase border-2 border-white/80 px-6 py-2 rounded-sm backdrop-blur-sm">
                        {item.size}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* CATEGORIES SECTION */}
          <RevealOnScroll>
            <div className="mb-20">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-secondary">Collections</h2>
                  <p className="text-secondary/60 mt-2">Browse our curated categories</p>
                </div>
                <Link to="/products" className="hidden md:inline-flex items-center text-accent font-semibold hover:text-accent-dark transition">
                  View All <span className="ml-2">→</span>
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Luxury Bedsheets",
                    desc: "300-1000 Thread Count",
                    img: "https://images.pexels.com/photos/17491219/pexels-photo-17491219/free-photo-of-bed-in-bedroom.jpeg?auto=compress&cs=tinysrgb&w=800",
                    link: "/products?category=Bedsheets"
                  },
                  {
                    title: "Plush Pillows",
                    desc: "Memory Foam & Down",
                    img: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800",
                    link: "/products?category=Pillows"
                  },
                  {
                    title: "Duvet Covers",
                    desc: "Soft & Breathable",
                    img: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800",
                    link: "/products?category=Duvets"
                  },
                ].map((c) => (
                  <Link
                    key={c.title}
                    to={c.link}
                    className="
                    group relative overflow-hidden rounded-3xl h-80 shadow-lg bg-gray-100
                  "
                  >
                    <img
                      src={c.img}
                      alt={c.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

                    <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white drop-shadow-md translate-y-0 transition-transform duration-300 group-hover:-translate-y-2">{c.title}</h3>
                      <p className="text-white/90 font-medium translate-y-0 transition-transform duration-300 group-hover:-translate-y-2">{c.desc}</p>
                      <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-bold text-secondary shadow-lg">
                          Explore
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* BEST SELLERS SECTION (NEW) */}
          <RevealOnScroll>
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-secondary">Best Sellers</h2>
                <Link to="/products?sort=rating" className="text-sm font-semibold text-accent hover:underline">View All</Link>
              </div>
              {bestSellers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.map(p => (
                    <ProductCard key={p.productID} product={p} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-secondary/50 italic">Loading best sellers...</div>
              )}
            </div>
          </RevealOnScroll>

          {/* FABRIC GUIDE (NEW) */}
          <RevealOnScroll>
            <div className="mb-20 rounded-3xl bg-secondary overflow-hidden relative">
              <div className="absolute inset-0">
                <img src="https://images.pexels.com/photos/6620956/pexels-photo-6620956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full object-cover opacity-30" alt="Fabric" />
              </div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-16 items-center">
                <div className="text-white space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wide">
                    Quality First
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">Why 100% Cotton?</h2>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Natural fibers allow your skin to breathe, keeping you cool in summer and warm in winter. Our cotton gets softer with every wash, ensuring your investment lasts for years.
                  </p>
                  <ul className="space-y-3 pt-2">
                    {[
                      "Hypoallergenic & Skin Friendly",
                      "High Thread Count (300+)",
                      "Ethically Sourced",
                      "Fade Resistant Dyes"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/90">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/about" className="inline-block mt-4 text-white font-semibold underline decoration-accent hover:text-accent transition">
                    Learn more about our materials
                  </Link>
                </div>
                <div className="hidden md:block relative h-[400px]">
                  <img
                    src="https://images.pexels.com/photos/5713437/pexels-photo-5713437.jpeg?auto=compress&cs=tinysrgb&w=800"
                    className="absolute top-0 right-0 w-4/5 h-4/5 object-cover rounded-2xl shadow-2xl border-4 border-white/10 rotate-3 hover:rotate-0 transition duration-700"
                    alt="Cotton Bedding"
                  />
                  <img
                    src="https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=800"
                    className="absolute bottom-0 left-0 w-3/5 h-3/5 object-cover rounded-2xl shadow-2xl border-4 border-white/10 -rotate-3 hover:rotate-0 transition duration-700 z-10"
                    alt="Quality Fabric"
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Testimonials */}
          <RevealOnScroll>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-secondary mb-4">What Our Customers Say</h2>
                <p className="text-secondary/60 max-w-2xl mx-auto">Don't just take our word for it - hear from our happy customers across the island.</p>
              </div>
              <TestimonialsCarousel />
            </div>
          </RevealOnScroll>

          {/* Final CTA */}
          <RevealOnScroll>
            <div className="rounded-3xl bg-gradient-to-r from-accent to-secondary p-12 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Upgrade Your Sleep?</h2>
                <p className="text-white/90 text-lg">Join 1000+ happy customers sleeping on SoftDreams bedding tonight.</p>
                <div className="flex justify-center gap-4 pt-4">
                  <Link to="/products" className="px-8 py-4 bg-white text-secondary font-bold rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition">
                    Shop Collection
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
    </main>
  );
}