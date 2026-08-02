import { translateCategory } from "../utils";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
}

function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <select
      className="category-filter"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {translateCategory(cat)}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;