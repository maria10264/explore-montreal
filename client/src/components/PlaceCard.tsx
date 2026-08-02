import type { Place } from "../types";
import { translateCategory, translateCost, getCategoryStyle } from "../utils";

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
}

function PlaceCard({ place, onClick }: PlaceCardProps) {
  const style = getCategoryStyle(place.category);

  return (
    <div
      className="place-card"
      style={{ borderTopColor: style.color }}
      onClick={onClick}
    >
      <span
        className="place-card-category"
        style={{ color: style.color, backgroundColor: style.bg }}
      >
        {style.icon} {translateCategory(place.category)}
      </span>
      <h3>{place.title}</h3>
      <p className="place-card-date">{place.first_date}</p>
      <p className="place-card-location">{place.arrondissement}</p>
      <span
        className={
          "place-card-cost " +
          (place.cost.toLowerCase().includes("gratuit") ? "free" : "paid")
        }
      >
        {translateCost(place.cost)}
      </span>
    </div>
  );
}

export default PlaceCard;