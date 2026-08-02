interface SortToggleProps {
    sortOrder: "asc" | "desc";
    onToggle: () => void;
  }
  
  function SortToggle({ sortOrder, onToggle }: SortToggleProps) {
    return (
      <button className="sort-toggle" onClick={onToggle}>
        {sortOrder === "asc" ? "⬆ Soonest first" : "⬇ Latest first"}
      </button>
    );
  }
  
  export default SortToggle;