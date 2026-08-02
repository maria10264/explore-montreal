function Navbar() {
    const theme = document.documentElement.getAttribute("data-theme");
  
    return (
      <nav className="navbar">
        <div className="navbar-overlay">
          <div className="navbar-content">
            <h1>
              Explore Montreal
              <span className="season-emoji">
                {theme === "winter" && "❄️"}
                {theme === "spring" && "🌸"}
                {theme === "fall" && "🍂"}
                {(!theme || theme === "summer") && "☀️"}
              </span>
            </h1>
            <p className="navbar-subtitle">Discover festivals, shows & culture across the city</p>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;