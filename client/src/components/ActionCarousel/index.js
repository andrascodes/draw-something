import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/**
* Carousel in the bottom half of the palette which displays spray properties and navigation buttons
* @param {object} props is the reference to methods for navigation buttons
*/
const ActionCarousel = (props) => {
  return (
    <div className="ActionCarousel">

      <div className="PrevButton"
        onClick={props.onPrev}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </div>

      {props.children[props.currentIndex]}

      <div className="NextButton"
        onClick={props.onNext}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </div>

    </div>
  );
};

export default ActionCarousel;