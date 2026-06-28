import { Link } from "react-router-dom";

export default function NourishCta() {
  return (
    <section className="bg-sage py-8 md:py-10 px-4 md:px-0">
      <div className="max-w-7xl mx-auto md:px-6 lg:px-10">
        <div
          className="relative rounded-xl overflow-hidden bg-cover bg-right"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(13,19,16,0.96) 0%, rgba(13,19,16,0.65) 55%, rgba(13,19,16,0) 100%), url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80')",
          }}
        >
          <div className="py-12 md:py-24 px-6 md:px-10 max-w-lg">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Nourish the mind, body, and spirit.
            </h2>
            <p className="text-white/85 mt-4 md:mt-6 leading-relaxed text-sm md:text-base">
              Many people find that the combination of being in a peaceful natural setting
              and engaging in activities that nourish the mind, body, and spirit leave them
              feeling rejuvenated and refreshed.
            </p>
            <Link
              to="/cabins"
              className="inline-block bg-gold text-navy font-medium px-6 py-3 rounded-md mt-6 md:mt-8 hover:bg-gold/90 transition-colors text-sm md:text-base"
            >
              Find available cabins
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
