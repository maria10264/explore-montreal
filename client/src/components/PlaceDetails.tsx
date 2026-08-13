import type { Place } from "../types";
import { translateCategory, translateCost, translatePublic, getCategoryStyle} from "../utils";

interface PlaceDetailsProps {
  place: Place;
  onClose: () => void;
}

function PlaceDetails({ place, onClose }: PlaceDetailsProps) {
  const categoryStyle = getCategoryStyle(place.category);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <span
          className="place-card-category"
          style={{ color: categoryStyle.color, backgroundColor: categoryStyle.bg }}
        >
          {categoryStyle.icon} {translateCategory(place.category)}
        </span>
        <h2>{place.title}</h2>

        <div className="modal-detail-row">
          <strong>Dates:</strong> {place.dates}
        </div>
        <div className="modal-detail-row">
          <strong>Location:</strong> {place.arrondissement}
        </div>
        <div className="modal-detail-row">
          <strong>Audience:</strong> {translatePublic(place.public)}
        </div>
        <div className="modal-detail-row">
          <strong>Cost:</strong> {translateCost(place.cost)}
        </div>

        <p className="modal-description">
          {place.description.startsWith("http") ? (
            <a href={place.description} target="_blank" rel="noopener noreferrer">
              More info / tickets →
            </a>
          ) : (
            place.description
          )}
        </p>
      </div>
    </div>
  );
}

export default PlaceDetails;