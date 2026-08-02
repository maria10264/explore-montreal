import type { Place } from "../types";
import PlaceCard from "./PlaceCard";

interface PlaceListProps {
  places: Place[];
  onSelect: (place: Place) => void;
}

function PlaceList({ places, onSelect }: PlaceListProps) {
  return (
    <div className="place-list">
      {places.map((place, index) => (
        <PlaceCard key={index} place={place} onClick={() => onSelect(place)} />
      ))}
    </div>
  );
}

export default PlaceList;