import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getExperiences } from "../api.js";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80";

export default function Inspiration() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getExperiences()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="inspiration" className="bg-sage py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold">Inspiration for your next getaway</h2>
            <div className="w-14 h-1 bg-gold mt-2 mb-4" />
            <p className="text-slate">We've curated some amazing experiences to help you find your next getaway.</p>
          </div>
          <Link to="/experiences" className="text-navy underline font-medium whitespace-nowrap">
            View all experiences
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white/50 animate-pulse">
                <div className="h-72 bg-gray-200" />
                <div className="p-6 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && experiences.length === 0 && (
          <p className="text-slate mt-10">No experiences found. Try running the seed script.</p>
        )}

        {!loading && experiences.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {experiences.map((exp) => {
              const imgSrc =
                (Array.isArray(exp.images) && exp.images[0]) ||
                exp.image ||
                FALLBACK_IMG;

              // Use _id for MongoDB records, but also support slug as fallback
              const href = `/experiences/${exp._id}`;

              return (
                <div
                  key={exp._id}
                  onClick={() => navigate(href)}
                  className="rounded-xl overflow-hidden group block shadow-md cursor-pointer"
                >
                  <div className="h-72 overflow-hidden bg-gray-100">
                    <img
                      src={imgSrc}
                      alt={exp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                    />
                  </div>
                  <div className="bg-[#4d5760] text-white p-6">
                    <p className="text-xs uppercase tracking-wide text-mint">{exp.category}</p>
                    <h3 className="text-xl font-semibold mt-1">{exp.title}</h3>
                    <p className="text-white/80 text-sm mt-3 leading-relaxed line-clamp-3">{exp.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
