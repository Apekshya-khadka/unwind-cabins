import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Our cabins", to: "/cabins" },
  { label: "Get inspired", to: "/experiences" },
  { label: "Gift a stay", to: "/gift-a-stay" },
  { label: "About us", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full bg-white border-b border-black/5 relative z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-display text-xl md:text-2xl font-bold tracking-tight"
        >
          <span className="text-forest">UNWIND</span>
          <span className="text-navy">CABINS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9 text-[15px] text-navy/90">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`hover:text-forest transition-colors ${
                location.pathname === l.to ? "text-forest font-semibold" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/login"
            aria-label="Admin login"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-navy/20 flex items-center justify-center text-navy/80 hover:bg-sage transition-colors"
          >
            <User size={17} />
          </Link>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-sage transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-black/5 px-6 py-4 flex flex-col shadow-lg">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`py-3 text-base border-b border-black/5 last:border-0 transition-colors ${
                location.pathname === l.to
                  ? "text-forest font-semibold"
                  : "text-navy hover:text-forest"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin/login"
            onClick={() => setOpen(false)}
            className="py-3 text-base text-navy hover:text-forest transition-colors"
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
