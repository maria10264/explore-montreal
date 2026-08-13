interface NavbarProps {
  season: string;
}

function Navbar({ season }: NavbarProps) {
  const emoji =
    season === "winter" ? "❄️" :
    season === "spring" ? "🌸" :
    season === "fall"   ? "🍂" : "☀️";

  return (
    <nav className="navbar">
      <div className="navbar-overlay">
        <div className="navbar-content">
          <h1>
            Explore Montreal
            <span className="season-emoji">{emoji}</span>
          </h1>
          <p className="navbar-subtitle">Discover festivals, shows & culture across the city</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;