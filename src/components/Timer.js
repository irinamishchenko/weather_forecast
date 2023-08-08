import { useState, useEffect } from "react";

function Timer(props) {
  const startDate = props.start;
  const [daysLeft, setDaysLeft] = useState(null);
  const [hoursLeft, setHoursLeft] = useState(null);
  const [minutesLeft, setMinutesLeft] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(null);

  useEffect(() => {
    let timeInterval = initializeClock(startDate);
    return () => clearInterval(timeInterval);
  }, [startDate]);

  function initializeClock(startDate) {
    let timeInterval = setInterval(function () {
      let timeLeft = getTimeRemaining(startDate);
      if (timeLeft.total <= 0) {
        clearInterval(timeInterval);
      }
      setDaysLeft(timeLeft.days);
      setHoursLeft(timeLeft.hours);
      setMinutesLeft(timeLeft.minutes);
      setSecondsLeft(timeLeft.seconds);
    }, 1000);
    return timeInterval;
  }

  function getTimeRemaining(endtime) {
    let timeLeft = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((timeLeft / 1000) % 60);
    let minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    return {
      total: timeLeft,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  return (
    <div className="timer">
      <div className="timer-item">
        <p className="timer-item-value">{daysLeft}</p>
        <p className="timer-item-description">days</p>
      </div>
      <div className="timer-item">
        <p className="timer-item-value">{hoursLeft}</p>
        <p className="timer-item-description">hours</p>
      </div>
      <div className="timer-item">
        <p className="timer-item-value">{minutesLeft}</p>
        <p className="timer-item-description">minutes</p>
      </div>
      <div className="timer-item">
        <p className="timer-item-value">{secondsLeft}</p>
        <p className="timer-item-description">seconds</p>
      </div>
    </div>
  );
}

export default Timer;
