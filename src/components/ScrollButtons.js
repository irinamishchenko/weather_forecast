import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import arrow from "./../images/icons/arrow.png";

function ScrollButtons(props) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { trips, listRef } = props;
  function checkPosition() {
    const { current } = listRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) !== scrollWidth - clientWidth);
    }
  }

  const debounceCheckForScrollPosition = debounce(checkPosition, 200);

  const scrollContainerBy = (distance) =>
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = listRef;
    checkPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, [trips]);
  return (
    <div className="trips-list-buttons">
      <button
        className="trips-list-button"
        type="button"
        disabled={!canScrollLeft}
        onClick={() => scrollContainerBy(-262)}
      >
        <img className="trips-list-button-icon-prev" src={arrow} alt="prev" />
      </button>
      <button
        className="trips-list-button"
        type="button"
        disabled={!canScrollRight}
        onClick={() => scrollContainerBy(262)}
      >
        <img className="trips-list-button-icon-next" src={arrow} alt="next" />
      </button>
    </div>
  );
}

export default ScrollButtons;
