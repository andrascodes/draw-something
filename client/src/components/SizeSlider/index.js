import React from 'react';

const SizeSlider = (props) => {

  const getSliderWidth = () => document.querySelector('.ToolSlide').clientWidth;

  return (
    <div
      className="ToolSlide SizeSlide"
      style={{
        height: "30px",
        background: "white",
      }}
    >
      <p>1</p>
      <p>25</p>
      <p>50</p>
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

export default SizeSlider;