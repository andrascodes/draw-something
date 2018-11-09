import React from 'react';

const ColorPicker = (props) => {

  const getSliderWidth = () => document.querySelector('.ToolSlide').clientWidth;

  return (
    <div
      className="ToolSlide"
      style={{
        height: "30px",
        background: "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)",
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

export default ColorPicker;