import { useEffect, useState, useMemo } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PlaceList from "./components/PlaceList";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SeasonFilter from "./components/SeasonFilter";
import SortToggle from "./components/SortToggle";
import PlaceDetails from "./components/PlaceDetails";
import { getSeason } from "./utils";
import type { Place } from "./types";

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/places")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Place[]) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const theme = selectedSeason || "summer";
    document.documentElement.setAttribute("data-theme", theme);
  }, [selectedSeason]);

  const categories = useMemo(() => {
    const unique = new Set(places.map((p) => p.category));
    return Array.from(unique).sort();
  }, [places]);

  const filteredPlaces = useMemo(() => {
    const filtered = places.filter((place) => {
      const matchesSearch = place.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || place.category === selectedCategory;
      const matchesSeason =
        selectedSeason === "" || getSeason(place.first_date) === selectedSeason;
      return matchesSearch && matchesCategory && matchesSeason;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.first_date.localeCompare(b.first_date);
      } else {
        return b.first_date.localeCompare(a.first_date);
      }
    });

    return sorted;
  }, [places, searchTerm, selectedCategory, selectedSeason, sortOrder]);

  return (
    <div>
      <Navbar />
      {loading && <p className="status-message">Loading Montreal events...</p>}
      {error && <p className="status-message error">Error: {error}</p>}
      {!loading && !error && (
        <div className="app-content">
          <div className="controls">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
            <SeasonFilter selected={selectedSeason} onChange={setSelectedSeason} />
            <SortToggle
              sortOrder={sortOrder}
              onToggle={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            />
          </div>
          <p className="results-count">
            {filteredPlaces.length} of {places.length} events
          </p>
          <PlaceList places={filteredPlaces.slice(0, 50)} onSelect={setSelectedPlace} />
        </div>
      )}

      {selectedPlace && (
        <PlaceDetails place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </div>
  );
}

export default App;