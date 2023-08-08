import icons from "./../weather-icons";

function EachDayWeather(props) {
  const { weather } = props;

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function findDate(apiDate) {
    let day = weekDays[new Date(apiDate).getDay()];
    return day;
  }

  function findIcon(apiIcon) {
    let icon = icons.find((icon) => icon.name === apiIcon).icon;
    return icon;
  }

  const weatherList = weather.map((weatherItem) => (
    <li key={weatherItem.datetime} className="each-day-weather-list-item">
      <h4 className="each-day-weather-list-item-title">
        {findDate(weatherItem.datetime)}
      </h4>
      <img
        src={findIcon(weatherItem.icon)}
        className="each-day-weather-list-item-icon"
        alt={weatherItem.icon}
      />
      <p className="each-day-weather-list-item-degrees">
        {Math.round(weatherItem.tempmax)}°/{Math.round(weatherItem.tempmin)}°
      </p>
    </li>
  ));

  return (
    <div className="each-day-weather-container">
      <h2 className="each-day-weather-title">Week</h2>
      <ul className="each-day-weather-list">{weatherList}</ul>
    </div>
  );
}

export default EachDayWeather;
