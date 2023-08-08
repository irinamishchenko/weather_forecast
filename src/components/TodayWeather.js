import Timer from "./Timer";
import icons from "./../weather-icons";

function TodayWeather(props) {
  const { city, todayWeather, start } = props;

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

  function findTemp(hours) {
    const currentHour = getCurrentTime();
    const currentTemp = findCurrentTemp(hours, currentHour);
    return currentTemp;
  }

  function getCurrentTime() {
    let time = new Date().getHours();
    return time;
  }

  function findCurrentTemp(hours, currentHour) {
    const temp = hours.find(
      (hour) => hour.datetime.split(":")[0] == currentHour
    ).temp;
    return Math.round(temp);
  }

  if (todayWeather) {
    return (
      <div className="today-weather-container">
        <div className="today-weather">
          <p className="today-week-day">{findDate(todayWeather.datetime)}</p>
          <div className="today-temp-container">
            <img
              className="today-temp-icon"
              src={findIcon(todayWeather.icon)}
              alt={todayWeather.icon}
            />
            <p className="today-temp-degrees">
              {findTemp(todayWeather.hours)}
              <span className="today-temp-degrees-sign">°C</span>
            </p>
          </div>
          <p className="today-city">{city}</p>
        </div>
        <Timer start={start} />
      </div>
    );
  }
}

export default TodayWeather;
