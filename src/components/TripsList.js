import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ScrollButtons from "./ScrollButtons";
import EachDayWeather from "./EachDayWeather";
import TodayWeather from "./TodayWeather";
import Modal from "./Modal";
import { BASE_API } from "./../APIinfo";
import data from "./../trips";
import cities from "./../cities";
import plus from "./../images/icons/plus.png";
import sort from "./../images/icons/sort.png";

function TripsList(props) {
  console.log(process.env.REACT_APP_API_KEY);
  const search = props.search;

  const [trips, setTrips] = useState(data);
  const [city, setCity] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [eachDayWeather, setEachDayWeather] = useState([]);
  const [todayWeather, setTodayWeather] = useState(null);

  const listRef = useRef(null);

  async function fetchEachDayWeather(location, start, end) {
    if (start) {
      axios
        .get(
          BASE_API + location + "/" + start + "/" + end + "?contentType=json",
          {
            params: {
              key: process.env.REACT_APP_API_KEY,
              unitGroup: "metric",
              iconsSet: "icons2",
            },
          }
        )
        .then((response) => setEachDayWeather(response.data.days));
    }
  }

  async function fetchTodayWeather(city) {
    if (city) {
      axios
        .get(BASE_API + city + "/today?contentType=json", {
          params: {
            key: process.env.REACT_APP_API_KEY,
            unitGroup: "metric",
            iconsSet: "icons2",
          },
        })
        .then((response) => setTodayWeather(response.data.days[0]));
    }
  }

  function sortTrips() {
    const sortedTrips = [...trips];
    sortedTrips.sort(sortByField("startDate"));
    setTrips(sortedTrips);
  }

  function sortByField(field) {
    return (a, b) =>
      Date.parse(a[field].split(".").reverse().join("/")) >
      Date.parse(b[field].split(".").reverse().join("/"))
        ? 1
        : -1;
  }

  useEffect(() => {
    fetchEachDayWeather(city, start, end);
  }, [start]);

  useEffect(() => {
    fetchTodayWeather(city);
  }, [city]);

  function handleClick(e) {
    setCity(e.currentTarget.id);
    findDates(e.currentTarget.id);
  }

  function findDates(location) {
    const startDate = trips
      .find((trip) => trip.city === location)
      .startDate.split(".")
      .reverse()
      .join("-");
    const endDate = trips
      .find((trip) => trip.city === location)
      .endDate.split(".")
      .reverse()
      .join("-");
    setStart(startDate);
    setEnd(endDate);
  }

  function handleCloseModal() {
    setIsModalOpened(false);
  }

  function addTrip(location, start, end) {
    const img = cities.find((city) => city.city === location).img;
    const startDate = start.split("-").reverse().join(".");
    const endDate = end.split("-").reverse().join(".");
    const city = location;
    setTrips([...trips, { city, startDate, endDate, img }]);
  }

  let tripsList;

  if (!search) {
    tripsList = trips.map((trip) => (
      <li
        key={trip.city}
        id={trip.city}
        className="trips-list-item"
        onClick={handleClick}
      >
        <img
          className="trips-list-item-picture"
          src={trip.img}
          alt={trip.city}
        />
        <h2 className="trips-list-item-title">{trip.city}</h2>
        <p className="trips-list-item-dates">
          {trip.startDate} - {trip.endDate}
        </p>
      </li>
    ));
  } else {
    tripsList = trips
      .filter((trip) =>
        trip.city.toLowerCase().startsWith(search.toLowerCase())
      )
      .map((trip) => (
        <li
          key={trip.city}
          id={trip.city}
          className="trips-list-item"
          onClick={handleClick}
        >
          <img
            className="trips-list-item-picture"
            src={trip.img}
            alt={trip.city}
          />
          <h2 className="trips-list-item-title">{trip.city}</h2>
          <p className="trips-list-item-dates">
            {trip.startDate} - {trip.endDate}
          </p>
        </li>
      ));
  }

  const createBtn = (
    <button className="create-trip-btn" onClick={() => setIsModalOpened(true)}>
      <img className="create-trip-btn-icon" src={plus} alt="add" />
      <p className="create-trip-btn-text">Add trip</p>
    </button>
  );

  return (
    <>
      <button className="trips-list-sort-button" onClick={sortTrips}>
        <img className="trips-list-sort-button-icon" src={sort} alt="sort" />
      </button>
      <div className="trips-list-container">
        <ul className="trips-list" ref={listRef}>
          {tripsList}
        </ul>
        {createBtn}
      </div>
      <ScrollButtons trips={trips} listRef={listRef} />
      {eachDayWeather.length > 0 ? (
        <EachDayWeather weather={eachDayWeather} />
      ) : null}
      {todayWeather ? (
        <TodayWeather city={city} todayWeather={todayWeather} start={start} />
      ) : null}
      {isModalOpened ? (
        <Modal closeModal={handleCloseModal} addTrip={addTrip} />
      ) : null}
    </>
  );
}

export default TripsList;
