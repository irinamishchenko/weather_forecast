import { useState } from "react";
import cities from "./../cities";
import close from "./../images/icons/close.png";

function Modal(props) {
  const { closeModal, addTrip } = props;
  const sortedCities = sortCities(cities);

  const [city, setCity] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function sortCities(cities) {
    const citiesArray = [];
    cities.map((city) => citiesArray.push(city.city));
    return citiesArray.sort();
  }

  function checkStartDate(date) {
    const parsedDate = Date.parse(date);
    const today = Date.parse(new Date());
    const allowedDays = 1296000000;
    let message;
    if (parsedDate < today) {
      message = "Choose a date in the future!";
    } else if (parsedDate > today + allowedDays) {
      message = "Choose a date earlier";
    } else {
      setStartDate(date);
      return;
    }
    alert(message);
  }

  function checkEndDate(date) {
    const parsedDate = Date.parse(date);
    const today = Date.parse(new Date());
    const allowedDays = 1296000000;
    let message;
    if (parsedDate < today) {
      message = "Choose a date in the future!";
    } else if (parsedDate > today + allowedDays) {
      message = "Choose a date earlier";
    } else {
      setEndDate(date);
      return;
    }
    alert(message);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTrip(city, startDate, endDate);
    closeModal();
  }

  const citiesItems = sortedCities.map((city) => (
    <option value={city} key={city}>
      {city}
    </option>
  ));

  return (
    <div className="modal">
      <div className="modal-header">
        <h3 className="modal-title">Create trip</h3>
        <button className="modal-close-btn" onClick={() => closeModal()}>
          <img className="modal-close-icon" src={close} alt="close" />
        </button>
      </div>
      <form className="create-form" onSubmit={(e) => handleSubmit(e)}>
        <label className="create-form-label">
          <span className="create-form-star">*</span>City
          <select
            className="create-form-input"
            name="city"
            onChange={(e) => setCity(e.target.value)}
            required
          >
            {citiesItems}
          </select>
        </label>
        <label className="create-form-label">
          <span className="create-form-star">*</span>Start date
          <input
            className="create-form-input"
            type="date"
            onChange={(e) => checkStartDate(e.target.value)}
          />
        </label>
        <label className="create-form-label">
          <span className="create-form-star">*</span>End date
          <input
            className="create-form-input"
            type="date"
            onChange={(e) => checkEndDate(e.target.value)}
          />
        </label>
        <div className="form-buttons">
          <input
            type="reset"
            className="form-cancel-btn"
            value="Cancel"
            onClick={() => closeModal()}
          />
          <input type="submit" className="form-cancel-btn" value="Save" />
        </div>
      </form>
    </div>
  );
}

export default Modal;
