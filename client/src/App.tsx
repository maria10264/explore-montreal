import Highlights from "./components/Highlights";
import { useEffect, useState, useMemo } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PlaceList from "./components/PlaceList";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SeasonFilter from "./components/SeasonFilter";
import SortToggle from "./components/SortToggle";
import PlaceDetails from "./components/PlaceDetails";
import Map from "./components/Map";
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

  // Apply seasonal theme to <html> whenever the season filter changes
  useEffect(() => {
    const root = document.documentElement;
    if (selectedSeason) {
      root.setAttribute("data-theme", selectedSeason);
    } else {
      root.removeAttribute("data-theme");
    }
  }, [selectedSeason]);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    fetch(`${apiBase}/api/places`)
      .then((res) => res.json())
      .then((data: Place[]) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(places.map((p) => p.category))).sort();
  }, [places]);

  const filteredPlaces = useMemo(() => {
    return places
      .filter((place) => {
        const matchesSearch = place.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "" || place.category === selectedCategory;

        const matchesSeason =
          selectedSeason === "" ||
          getSeason(place.first_date) === selectedSeason;

        return matchesSearch && matchesCategory && matchesSeason;
      })
      .sort((a, b) =>
        sortOrder === "asc"
          ? a.first_date.localeCompare(b.first_date)
          : b.first_date.localeCompare(a.first_date)
      );
  }, [places, searchTerm, selectedCategory, selectedSeason, sortOrder]);

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "" || selectedSeason !== "";

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSeason("");
    setSortOrder("asc");
  }

  return (
    <div>
      <Navbar season={selectedSeason} />

      {loading && <p className="status-message">Loading Montreal events...</p>}
      {error && <p className="status-message error">{error}</p>}

      {!loading && !error && (
        <div className="app-content">

          <div className="controls">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />

            <SeasonFilter
              selected={selectedSeason}
              onChange={setSelectedSeason}
            />

            <SortToggle
              sortOrder={sortOrder}
              onToggle={() =>
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }
            />

            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                ✕ Clear filters
              </button>
            )}
          </div>

          <p className="results-count">
            {filteredPlaces.length} of {places.length} events
          </p>

          <div className="explore-layout">

  <div className="map-container">
    <Map places={filteredPlaces} />
  </div>

  <Highlights />

</div>

          <PlaceList
            places={filteredPlaces.slice(0, 50)}
            onSelect={setSelectedPlace}
          />

        </div>
      )}

      {selectedPlace && (
        <PlaceDetails
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}

    </div>
  );
}

export default App;
