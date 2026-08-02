interface SeasonFilterProps {
    selected: string;
    onChange: (value: string) => void;
  }
  
  function SeasonFilter({ selected, onChange }: SeasonFilterProps) {
    return (
      <select
        className="season-filter"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All seasons</option>
        <option value="winter">❄️ Winter</option>
        <option value="spring">🌱 Spring</option>
        <option value="summer">☀️ Summer</option>
        <option value="fall">🍂 Fall</option>
      </select>
    );
  }
  
  export default SeasonFilter;