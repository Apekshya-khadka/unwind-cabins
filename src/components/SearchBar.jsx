import { MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travellers, setTravellers] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(destination);
    } else {
      const params = new URLSearchParams();
      if (destination) params.set("search", destination);
      if (checkIn) params.set("checkIn", checkIn);
      if (checkOut) params.set("checkOut", checkOut);
      if (travellers) params.set("travellers", travellers);
      navigate(`/cabins?${params.toString()}`);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/10">
        <label className="flex items-center gap-3 px-4 py-4 flex-1 cursor-pointer">
          <span className="text-navy/60 shrink-0"><MapPin size={18} /></span>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs text-navy/50 font-medium">Destination</span>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-transparent outline-none text-sm text-navy placeholder:text-navy/50 w-full mt-0.5"
            />
          </div>
        </label>

        <label className="flex items-center gap-3 px-4 py-4 flex-1 cursor-pointer">
          <span className="text-navy/60 shrink-0"><Calendar size={18} /></span>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs text-navy/50 font-medium">Check in</span>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value > checkOut) setCheckOut("");
              }}
              className="bg-transparent outline-none text-sm text-navy w-full mt-0.5 cursor-pointer"
            />
          </div>
        </label>

        <label className="flex items-center gap-3 px-4 py-4 flex-1 cursor-pointer">
          <span className="text-navy/60 shrink-0"><Calendar size={18} /></span>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs text-navy/50 font-medium">Check out</span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent outline-none text-sm text-navy w-full mt-0.5 cursor-pointer"
            />
          </div>
        </label>

        <label className="flex items-center gap-3 px-4 py-4 flex-1 cursor-pointer">
          <span className="text-navy/60 shrink-0"><Users size={18} /></span>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs text-navy/50 font-medium">Travellers</span>
            <input
              type="number"
              placeholder="How many?"
              value={travellers}
              min="1"
              max="20"
              onChange={(e) => setTravellers(e.target.value)}
              className="bg-transparent outline-none text-sm text-navy placeholder:text-navy/50 w-full mt-0.5"
            />
          </div>
        </label>
      </div>

      <button
        type="submit"
        className="w-full md:hidden bg-forest hover:bg-forest/90 transition-colors text-white font-medium px-8 py-4"
      >
        Find available cabins
      </button>

      <div className="hidden md:flex border-t border-black/10">
        <div className="flex-1" />
        <button
          type="submit"
          className="bg-forest hover:bg-forest/90 transition-colors text-white font-medium px-8 py-4 whitespace-nowrap"
        >
          Find available cabins
        </button>
      </div>
    </form>
  );
}
