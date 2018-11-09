import React from 'react';

import {
  Carousel, CarouselSlide
} from './components/Carousel';
import ColorPicker from './components/ColorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSprayCan, faChevronLeft, faChevronRight,
  faPalette, faFill
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  faSprayCan, faChevronLeft, faChevronRight,
  faFill
);

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      colorValue: 66,
    }
  }

  render() {
    return (
      <div className="App">

        <div className="TipBar">
          Shake to Reload!
        </div>

        <div className="Content">

          <div className="Dash">
            <div className="BrushSize" >
              <div className="Number">18</div>
            </div>
            <div className="Spray">
              <FontAwesomeIcon icon={faSprayCan} size="10x" />
            </div>

          </div>

          <ColorPicker
            knobPosition={this.state.colorValue}
            onChange={(newColorValue) => this.setState({ colorValue: newColorValue })}
          />

        </div>

        <Carousel
          changeTipBar={(e) => {
            document.querySelector('.TipBar').innerHTML = e;
          }}
          renderNextButtonIcon={() => (
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          )}
          renderPreviousButtonIcon={() => (
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          )}
        >
          <CarouselSlide key="spray-1" text={"Spray Color"}
            renderIcon={() => (
              <FontAwesomeIcon icon={faPalette} size="5x" />
            )}
          />
          <CarouselSlide key="wall-1" text={"Wall Color"} renderIcon={() => (
            <FontAwesomeIcon icon={faFill} size="5x" />
          )} />
          {/* <CarouselSlide key="spray-2" text={"Spray Opacity"} renderIcon={() => (
            <FontAwesomeIcon icon={faFill} size="lg" />
          )} />
          <CarouselSlide key="4" text={"Wall Color"} renderIcon={() => (
            <FontAwesomeIcon icon={faFill} size="lg" />
          )} /> */}
        </Carousel>

      </div>
    );
  }
}

export default App;