import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExperiences } from "../api.js";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80";

const categories = [
  { value: "", label: "All experiences" },
  { value: "Nature", label: "Explore nature" },
  { value: "Wellness", label: "Rest & re-set" },
  { value: "Pet friendly", label: "Pet friendly" },
  { value: "Food & drink", label: "Food & drink" },
  { value: "Adventure", label: "For you and yours" },
];

export default function ExperiencesPage() {
  const [allExperiences, setAllExperiences] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getExperiences({})
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllExperiences(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = category
    ? allExperiences.filter(
        (e) => (e.category || "").toLowerCase() === category.toLowerCase()
      )
    : allExperiences;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="text-4xl font-bold">Inspiration for your next getaway</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-8" />

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              category === c.value
                ? "bg-forest text-white border-forest"
                : "border-black/15 text-navy hover:bg-sage"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-slate mt-10">Loading experiences…</p>}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filtered.length === 0 && (
            <p className="text-slate col-span-full">
              No experiences found for this category.
            </p>
          )}
          {filtered.map((exp) => {
            const imgSrc =
              (Array.isArray(exp.images) && exp.images[0]) ||
              exp.image ||
              FALLBACK_IMG;

            return (
              <div
                key={exp._id}
                onClick={() => navigate(`/experiences/${exp._id}`)}
                className="rounded-xl overflow-hidden group block shadow-md cursor-pointer"
              >
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={imgSrc}
                    alt={exp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                  />
                </div>
                <div className="bg-[#4d5760] text-white p-6">
                  <p className="text-xs uppercase tracking-wide text-mint">
                    {exp.category}
                  </p>
                  <h3 className="text-xl font-semibold mt-1">{exp.title}</h3>
                  <p className="text-white/80 text-sm mt-3 leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
