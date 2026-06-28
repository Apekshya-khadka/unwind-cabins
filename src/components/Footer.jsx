import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { joinNewsletter } from "../api.js";

const slugify = (label) =>
  label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const aboutLinks = [
  { label: "Our story", to: "/about#story" },
  { label: "Why us", to: "/about#why-us" },
  { label: "How it works", to: "/about#how-it-works" },
  { label: "FAQ", to: "/#faq" },
];

const cabinGroups = [
  { heading: "North of London", links: ["Golden Hideaway", "Oak Treehouse", "Acacia Retreat", "Blue Lagoon"] },
  { heading: "South of London", links: ["Lavender Retreat", "Butterfly Treehouse", "Mahogany Hideaway"] },
];

const inspireGroups = [
  { heading: "Explore nature", links: ["Hiking trails", "Swimming", "Fishing", "Boating", "Cycling"] },
  { heading: "Rest, relax and re-set", links: ["Spa treatments", "Hot tubs", "Nature Trails"] },
  { heading: "Great food and drink", links: ["Pubs", "Restaurants", "Food markets", "Picnics"] },
];

const forYouLinks = [
  { label: "Solo or a couple", to: "/cabins?sleeps=2" },
  { label: "Pet friendly", to: "/cabins?petFriendly=true" },
  { label: "Accessible cabins", to: "/cabins?accessible=true" },
];

const supportLinks = [
  { label: "Help", to: "/info/help" },
  { label: "Contact us", to: "/contact" },
  { label: "Privacy Policy", to: "/info/privacy-policy" },
  { label: "Terms of Service", to: "/info/terms-of-service" },
  { label: "Complaints Policy", to: "/info/complaints-policy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await joinNewsletter(email);
      setStatus(res.message || "Subscribed!");
      setEmail("");
    } catch (err) {
      setStatus(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <footer className="bg-ink text-white pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          <div>
            <h4 className="text-mint font-semibold mb-3 md:mb-4 text-sm md:text-base">About us</h4>
            <ul className="space-y-2 text-white/80 text-xs md:text-sm">
              {aboutLinks.map((l) => (
                <li key={l.label}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-mint font-semibold mb-3 md:mb-4 text-sm md:text-base">Our cabins</h4>
            {cabinGroups.map((g) => (
              <div key={g.heading} className="mb-4 md:mb-6">
                <p className="font-semibold text-white/90 mb-1 md:mb-2 text-xs md:text-sm">{g.heading}</p>
                <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
                  {g.links.map((l) => (
                    <li key={l}>
                      <Link to={`/cabins?search=${encodeURIComponent(l)}`} className="hover:text-white">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-mint font-semibold mb-3 md:mb-4 text-sm md:text-base">Get inspired</h4>
            {inspireGroups.map((g) => (
              <div key={g.heading} className="mb-4 md:mb-6">
                <p className="font-semibold text-white/90 mb-1 md:mb-2 text-xs md:text-sm">{g.heading}</p>
                <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
                  {g.links.map((l) => (
                    <li key={l}>
                      <Link to={`/activities/${slugify(l)}`} className="hover:text-white">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-mint font-semibold mb-3 md:mb-4 text-sm md:text-base">For you</h4>
            <ul className="space-y-2 text-white/80 text-xs md:text-sm">
              {forYouLinks.map((l) => (
                <li key={l.label}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-mint font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h4>
            <ul className="space-y-2 text-white/80 text-xs md:text-sm">
              {supportLinks.map((l) => (
                <li key={l.label}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <h4 className="text-mint font-semibold text-base md:text-lg">Sign up to our Newsletter</h4>
          <p className="text-white/70 mt-2 max-w-xl text-sm md:text-base">
            For a weekly curated collection of 3 things you can watch, read or listen to
            switch off from the busy everyday.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-5 max-w-2xl">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-md px-4 py-3 text-navy outline-none text-sm"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-gold text-navy font-medium px-5 py-3 rounded-md hover:bg-gold/90 transition-colors disabled:opacity-60 text-sm whitespace-nowrap"
            >
              {status === "loading" ? "Joining…" : "Join the mailing list"}
            </button>
          </form>
          {status && status !== "loading" && (
            <p className="text-mint text-sm mt-3">{status}</p>
          )}
        </div>

        <hr className="border-white/10 mt-10 md:mt-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <Link to="/" className="font-display text-lg md:text-xl font-bold">
            <span className="text-white">UNWIND</span>
            <span className="text-mint">CABINS</span>
          </Link>
          <p className="text-white/60 text-xs md:text-sm">© 2026 UnwindCabins</p>
          <div className="flex items-center gap-4 text-white/70">
            <Linkedin size={16} />
            <Twitter size={16} />
            <Facebook size={16} />
            <Instagram size={16} />
            <Youtube size={16} />
          </div>
        </div>
      </div>
    </footer>
  );
}
