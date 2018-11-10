import React from 'react';
/**
* Alpha slider is the colour slider in the middle of the palette which changes background or spray darkness
* @param {object} props is the reference to previous slider position, colour and methods for onchange events
*/
const AlphaSlider = (props) => {

  const getSliderWidth = () => document.querySelector('.ToolSlide').clientWidth;

  return (
    <div
      className="ToolSlide"
      style={{
        height: "30px",
        background: `linear-gradient(to right, rgba(255, 255, 255, 0.0) 0%, ${props.color} 50%, rgba(0, 0, 0, 1.0) 100%)`,
      }}
    >
      <div className="Slider"
        style={{
          position: "absolute",
          left: `${(props.knobPosition / 100) * 91}%`
        }}
      >
        <div className="SliderKnob"
          style={{
            width: "30px",
            height: "30px",
          }}
          onTouchMove={(event) => {
            const touchX = event.touches[0].clientX;
            const fullWidth = getSliderWidth();
            if (touchX < 0 || touchX > fullWidth) {
              return;
            }

            props.onChange((touchX / fullWidth) * 100);
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default AlphaSlider;