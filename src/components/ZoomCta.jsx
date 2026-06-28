import { Link } from "react-router-dom";

export default function ZoomCta() {
  return (
    <section
      className="relative bg-cover bg-center min-h-[400px] md:h-[600px] flex items-center py-16 md:py-0"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(13,19,16,0.92) 0%, rgba(13,19,16,0.55) 55%, rgba(13,19,16,0.1) 100%), url('https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-lg">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Escape from endless Zoom calls
          </h2>
          <p className="text-white/85 mt-4 md:mt-6 leading-relaxed text-sm md:text-base">
            Discover the wonders of spending time offline and away from the office with
            our 3 day weekend getaway cabin retreats.
          </p>
          <Link
            to="/cabins"
            className="inline-block bg-sage text-navy font-medium px-6 py-3 rounded-md mt-6 md:mt-8 hover:bg-white transition-colors text-sm md:text-base"
          >
            Find the perfect getaway
          </Link>
        </div>
      </div>
    </section>
  );
}
