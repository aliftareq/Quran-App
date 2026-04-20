"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function SurahDropdown({ surahs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter surahs based on search input
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.chapter.toString().includes(searchQuery),
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#1C253D] hover:bg-[#252f4d] text-white px-4 py-2 rounded-lg border border-[#1f3352] text-sm transition-all duration-150"
      >
        Select surah{" "}
        <ChevronDown
          className={`w-4 h-4 opacity-70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#0a0d1a] border border-[#1f3352] rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col">
          {/* Search Input */}
          <div className="p-3 border-b border-[#1f3352]/50">
            <input
              type="text"
              placeholder="Surah"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1C253D]/50 text-white border border-[#1f3352] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500 transition-all"
              autoFocus
            />
          </div>

          {/* Scrollable List */}
          <div
            className="max-h-64 overflow-y-auto py-2 pr-1 m-1 
                          [&::-webkit-scrollbar]:w-1.5 
                          [&::-webkit-scrollbar-track]:bg-transparent 
                          [&::-webkit-scrollbar-thumb]:bg-[#C72D3C] 
                          [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {filteredSurahs.length > 0 ? (
              filteredSurahs.map((surah) => (
                <Link
                  key={surah.chapter}
                  href={`/surah/${surah.chapter}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-sm text-white/90 hover:bg-[#1C253D] hover:text-white rounded-md transition-colors"
                >
                  {surah.chapter}. {surah.name}
                </Link>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
