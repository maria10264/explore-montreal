export function getSeason(dateStr: string): string {
    const month = parseInt(dateStr.split("-")[1], 10);
  
    if (month === 12 || month === 1 || month === 2) return "winter";
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    return "fall"; // 9, 10, 11
  }

  const categoryTranslations: Record<string, string> = {
    "Musique": "Music",
    "Cirque": "Circus",
    "Théâtre": "Theatre",
    "Danse": "Dance",
    "Cinéma": "Film",
    "Fête et marché": "Festival & Market",
    "Humour": "Comedy",
    "Jeux": "Games",
    "Exposition": "Exhibition",
    "Art de la parole": "Reading & Poetry",
    "Musique / Concert aux chandelles": "Music / Candlelight Concert",
    "Festival / Musique": "Festival / Music",
    "Festival / Musique électronique hiver": "Festival / Winter Electronic Music",
    "Festival / Musique électronique": "Festival / Electronic Music",
    "Festival / Gastronomie": "Festival / Food",
    "Festival / Gastronomie et arts": "Festival / Food & Arts",
    "Festival / Musique et arts": "Festival / Music & Arts",
    "Festival / Art urbain et musique": "Festival / Street Art & Music",
    "Convention / Culture populaire": "Convention / Pop Culture",
    "Festival / Humour": "Festival / Comedy",
    "Festival / Gastronomie / Musique": "Festival / Food & Music",
    "Festival / Musique et culture": "Festival / Music & Culture",
    "Festival / Musique country": "Festival / Country Music",
  };
  
  export function translateCategory(category: string): string {
    return categoryTranslations[category] || category;
  }
  
  const publicTranslations: Record<string, string> = {
    "Pour tous": "Everyone",
    "Enfants": "Kids",
    "Famille": "Family",
    "Adultes": "Adults",
    "Adolescents": "Teens",
    "Personnes aînées": "Seniors",
    "Enfants d'âge préscolaire": "Preschoolers",
  };
  
  export function translatePublic(pub: string): string {
    return publicTranslations[pub] || pub;
  }
  
  export function translateCost(cost: string): string {
    let result = cost;
    const replacements: [RegExp, string][] = [
      [/Gratuit et payant/gi, "Free & Paid"],
      [/Gratuit/gi, "Free"],
      [/Payant/gi, "Paid"],
      [/prix restaurant/gi, "restaurant price"],
      [/ans et moins/gi, "and under"],
      [/ans et plus/gi, "and up"],
      [/estimé/gi, "estimated"],
    ];
    for (const [pattern, replacement] of replacements) {
      result = result.replace(pattern, replacement);
    }
    return result;
  }

  interface CategoryStyle {
    color: string;
    bg: string;
    icon: string;
  }
  
  const categoryStyles: Record<string, CategoryStyle> = {
    "Musique": { color: "#6d28d9", bg: "#f3e8ff", icon: "🎵" },
    "Cirque": { color: "#be123c", bg: "#ffe4e6", icon: "🎪" },
    "Théâtre": { color: "#b45309", bg: "#fef3c7", icon: "🎭" },
    "Danse": { color: "#0e7490", bg: "#cffafe", icon: "💃" },
    "Cinéma": { color: "#374151", bg: "#e5e7eb", icon: "🎬" },
    "Fête et marché": { color: "#15803d", bg: "#dcfce7", icon: "🎡" },
    "Humour": { color: "#a16207", bg: "#fef9c3", icon: "😂" },
    "Jeux": { color: "#1d4ed8", bg: "#dbeafe", icon: "🎮" },
    "Exposition": { color: "#7c3aed", bg: "#ede9fe", icon: "🖼️" },
    "Art de la parole": { color: "#c2410c", bg: "#ffedd5", icon: "📖" },
  };
  
  const defaultStyle: CategoryStyle = { color: "#4a5fd1", bg: "#eef0fb", icon: "✨" };
  
  function baseCategory(category: string): string {
    // Strip "Festival / X" or "Convention / X" prefixes to find a base match
    if (category.includes("/")) {
      return category.split("/")[0].trim();
    }
    return category;
  }
  
  export function getCategoryStyle(category: string): CategoryStyle {
    if (categoryStyles[category]) return categoryStyles[category];
    const base = baseCategory(category);
    if (base === "Festival") return { color: "#dc2626", bg: "#fee2e2", icon: "🎉" };
    if (base === "Convention") return { color: "#0369a1", bg: "#e0f2fe", icon: "🦸" };
    return defaultStyle;
  }
  
  export function isFeatured(category: string): boolean {
    return category.startsWith("Festival") || category.startsWith("Convention");
  }