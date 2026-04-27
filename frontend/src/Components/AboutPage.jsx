import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* FULLSCREEN HERO (SpaceX style) */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest mb-6">
            Explore Beyond Earth
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
            A mission-driven platform designed to bring the universe closer
            through immersive storytelling and cutting-edge technology.
          </p>
          <button className="border border-white px-8 py-3 uppercase text-sm tracking-wider hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </motion.div>
      </section>

      {/* SECTION BLOCK (SpaceX style alternating full-width) */}
      <section className="relative h-[80vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-5xl px-10">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 tracking-wide">
            Our Mission
          </h2>
          <p className="text-gray-300 max-w-lg leading-relaxed">
            To push the boundaries of digital exploration by creating visually
            stunning and meaningful experiences inspired by space technology and
            discovery.
          </p>
        </div>
      </section>

      {/* SECTION BLOCK */}
      <section className="relative h-[80vh] flex items-center justify-end text-right">
        <img
          src="https://plus.unsplash.com/premium_photo-1722018576685-45a415a4ff67?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-5xl px-10">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 tracking-wide">
            Our Vision
          </h2>
          <p className="text-gray-300 max-w-lg ml-auto leading-relaxed">
            To create a digital universe where users don’t just read about space
            — they experience it.
          </p>
        </div>
      </section>

      {/* METRICS (minimal SpaceX style) */}
      <section className="bg-black py-20 text-center border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {[
            { value: "10K+", label: "Users" },
            { value: "500+", label: "Stories" },
            { value: "1M+", label: "Reach" },
            { value: "20+", label: "Topics" },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-3xl md:text-4xl font-bold">
                {item.value}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-widest mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-24">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-6">
          Join The Journey
        </h2>
        <button className="border border-white px-10 py-4 uppercase tracking-wider hover:bg-white hover:text-black transition">
          Get Started
        </button>
      </section>
    </div>
  );
}
