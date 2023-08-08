import { useState } from "react";
import TripsList from "./TripsList";
import searchIcon from "./../images/icons/search.png";

function Main() {
  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="main-container">
      <h1 className="main-title">
        Weather <span>Forecast</span>
      </h1>
      <div className="main-search-wrapper">
        <img src={searchIcon} alt="search" className="main-search-icon" />
        <input
          className="main-search"
          placeholder="Search your trip"
          type="text"
          onChange={handleChange}
        />
      </div>
      <TripsList search={search} />
    </div>
  );
}

export default Main;
