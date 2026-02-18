import { HiOutlineSparkles, HiOutlineHeart, HiOutlineShieldCheck } from "react-icons/hi";

export default function About() {
  return (
    <main className="w-full bg-primary text-secondary">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-secondary">
        <img
          src="/home.jpg"
          alt="SoftDreams Luxury Bedding"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-4 backdrop-blur-md">
            Premium Comfort since 2024
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Redefining Your <span className="text-accent italic">Sleep Experience</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            At SoftDreams, we believe that luxury isn't just about price—it's about the feeling of waking up refreshed in bedding that touches your soul.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">

        {/* Statistics / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
          {[
            { icon: HiOutlineSparkles, title: "Exquisite Materials", desc: "Sourced from the finest cotton and sustainable fabrics." },
            { icon: HiOutlineShieldCheck, title: "Quality Guarantee", desc: "Every stitch is inspected to ensure lasting durability." },
            { icon: HiOutlineHeart, title: "Crafted with Love", desc: "Designed to bring warmth and elegance to your sanctuary." },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-8 bg-white/95 backdrop-blur-xl shadow-xl rounded-3xl border border-white/20 flex flex-col items-center text-center transform hover:-translate-y-1 transition duration-300">
              <item.icon className="text-5xl text-accent mb-4" />
              <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
              <p className="text-secondary/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Our Mission</h2>
              <p className="text-lg text-secondary/70 leading-relaxed">
                To democratize luxury sleep by providing hotel-quality bedding that is accessible to everyone in Sri Lanka, without compromising on style or sustainability.
              </p>
            </div>
            <div className="w-full h-px bg-secondary/10" />
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">Our Vision</h2>
              <p className="text-lg text-secondary/70 leading-relaxed">
                To be the island's most trusted name in home textiles, setting a new standard for comfort, innovation, and customer care.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl skew-x-1 group">
            <img
              src="/bg.jpg"
              alt="Cozy Bed"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition duration-500" />
          </div>
        </div>

        {/* Collection Grid */}


        {/* Replacement for the grid above with a safer, text-icon based layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Luxury Sheets", icon: "✨" },
            { title: "Plush Pillows", icon: "☁️" },
            { title: "Duvet Covers", icon: "🛌" },
            { title: "Protectors", icon: "🛡️" }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-secondary/10 hover:border-accent/50 hover:shadow-lg transition group text-left">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left">{item.icon}</div>
              <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
              <p className="text-xs text-secondary/60 uppercase tracking-widest font-semibold">Explore Collection &rarr;</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 rounded-3xl bg-secondary overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Sleep?</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">Join thousands of happy customers who wake up refreshed everyday with SoftDreams.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/products" className="btn-primary bg-white text-secondary hover:bg-gray-100 hover:text-accent border-none text-lg px-8">Shop Now</a>
            <a href="/contact" className="px-8 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition">Contact Us</a>
          </div>
        </div>
      </div>

    </div>
    </main >
  );
}