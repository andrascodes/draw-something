import React, { Component } from 'react';
import { actionButtons, orderActionButtons } from './utils/actionButtons';
import {
  faArrowsAltH,
  faChalkboard,
  faChevronLeft,
  faChevronRight,
  faEye,
  faFill,
  faFillDrip,
  faPalette,
  faRedoAlt,
  faSprayCan,
  faUndoAlt
} from '@fortawesome/free-solid-svg-icons';

import ActionCarousel from './components/ActionCarousel';
import AlphaSlider from './components/AlphaSlider';
import ColorPicker from './components/ColorPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SizeSlider from './components/SizeSlider';
import createConvert from './utils/convertFunctions';
import createSocketAPI from './api/';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  faSprayCan, faChevronLeft, faChevronRight,
  faFill, faPalette, faChalkboard,
  faEye, faFillDrip, faArrowsAltH,
  faUndoAlt, faRedoAlt
);

/**
* Main class for the palette to select spray can properties
*/
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tipBarLabelText: 'Shake to Reload',
      sprayColor: 0,
      sprayDarkness: 50,
      spraySize: 50,
      bgColor: 0,
      bgDarkness: 0,
      currentActionButtonIndex: 0,
      actionButtons,
    }

    this.convert = createConvert();
    this.socketAPI = createSocketAPI(this.convert);

    this.currentDeviceOrientationChangeListener = undefined;
  }
  
  /**
  * Informs the canvas to undo the last stroke action 
  */
  onUndoClicked = () => {
    this.socketAPI.emitUndo();
  }

  /**
  * Informs the canvas to redo the last undo stroke action 
  */
  onRedoClicked = () => {
    this.socketAPI.emitRedo();
  }

  /**
  * Informs the canvas to clear itself 
  */
  onClearClicked = () => {
    this.socketAPI.emitClear();
  }

  /**
  * Checks if the value is between 0 to 100 and sets spray colour with current alpha value
  * @param {number} newValue is the colour picker's slider position
  */
  onChangeSprayColor = (newValue) => {
    let intValue = Math.floor(newValue);
    if (newValue < 0) {
      intValue = 0;
    }
    else if (newValue > 100) {
      intValue = 100;
    }

    this.setState(() => ({
      sprayColor: intValue,
    }));

    this.socketAPI.emitSprayColor(intValue, this.state.sprayDarkness);

    // this.setState({
    //   tipBarLabelText: this.socketAPI.emitSprayColor(intValue, this.state.sprayDarkness),
    // })
  }

  /**
  * Checks if the value is between 0 to 100 and sets spray darkness or alpha value
  * @param {number} newValue is the hue picker's slider position
  */
  onChangeSprayDarkness = (newValue) => {
    let intValue = Math.floor(newValue);
    if (newValue < 0) {
      intValue = 0;
    }
    else if (newValue > 100) {
      intValue = 100;
    }

    this.setState(() => ({
      sprayDarkness: intValue,
    }));

    this.socketAPI.emitSprayColor(this.state.sprayColor, intValue);
    // this.setState({
    //   tipBarLabelText: this.socketAPI.emitSprayColor(this.state.sprayColor, intValue),
    // })
  }

  /**
  * Checks if the value is between 0 to 100 and informs canvas about background colour
  * @param {number} newValue is the background colour picker's slider position
  */
  onChangeBgColor = (newValue) => {
    let intValue = Math.floor(newValue);
    if (newValue < 0) {
      intValue = 0;
    }
    else if (newValue > 100) {
      intValue = 100;
    }

    this.setState(() => ({
      bgColor: intValue,
    }));

    this.socketAPI.emitBgColor(intValue, this.state.bgDarkness);
    // this.setState({
    //   tipBarLabelText: this.socketAPI.emitBgColor(intValue, this.state.bgDarkness),
    // })
  }

  /**
  * Checks if the value is between 0 to 100 and sets background darkness value
  * @param {number} newValue is the background hue picker's slider position
  */
  onChangeBgDarkness = (newValue) => {
    let intValue = Math.floor(newValue);
    if (newValue < 0) {
      intValue = 0;
    }
    else if (newValue > 100) {
      intValue = 100;
    }

    this.setState(() => ({
      bgDarkness: intValue,
    }));

    this.socketAPI.emitBgColor(this.state.bgColor, intValue);
    // this.setState({
    //   tipBarLabelText: this.socketAPI.emitBgColor(this.state.bgColor, intValue),
    // })
  }

  /**
  * Checks if the value is between 0 to 100 and sets spray size
  * @param {number} newValue is the spray size
  */
  onChangeSpraySize = (newValue) => {
    let intValue = Math.floor(newValue);
    if (newValue < 0) {
      intValue = 0;
    }
    else if (newValue > 100) {
      intValue = 100;
    }

    this.setState(() => ({
      spraySize: intValue,
    }));

    this.socketAPI.emitSpraySize(intValue);
    // this.setState({
    //   tipBarLabelText: this.socketAPI.emitSpraySize(intValue),
    // })
  }

  /**
  * When user clicks on spray or size or background icon in palette, the slider is updated
  * @param {Event} event is the touch or click event 
  */
  onSelectDashItem = (event) => {
    const targetElement = event.target;
    if (
      targetElement.tagName === 'svg' ||
      targetElement.tagName === 'path'
    ) {
      this.setState(orderActionButtons('spray', this.state.actionButtons));
    }
    else if (targetElement.className === 'Dash') {
      this.setState(orderActionButtons('bg', this.state.actionButtons));
    }
    else if (targetElement.className === 'BrushSize') {
      this.setState(orderActionButtons('size', this.state.actionButtons));
    }
  }

  /**
  * The left arrow in the bottom screen shows previous spray property
  * Nothing happens if there is no previous property to show
  */
  onPrevButtonClick = () => {
    if (this.state.currentActionButtonIndex <= 0) {
      return;
    }

    this.setState((prevState) => ({
      currentActionButtonIndex: prevState.currentActionButtonIndex - 1,
    }));
  }

  /**
  * The right arrow in the bottom screen shows next spray property
  * Nothing happens if it's the last property
  */
  onNextButtonClick = () => {
    if (this.state.currentActionButtonIndex >= this.state.actionButtons.length - 1) {
      return;
    }

    this.setState((prevState) => ({
      currentActionButtonIndex: prevState.currentActionButtonIndex + 1,
    }));
  }

  /**
  * Calls one of the spray property update method when phone is tilted up and down
  * @param {Event} event is the phone tilt event on beta axis
  * @param {string} keyword is the spray property that needs to be updated
  */
  onDeviceOrientationChange = (keyword) => (event) => {
    const percent = this.convert.tiltToPercent(event.beta);
    switch (keyword) {
      case 'spray-color':
        this.onChangeSprayColor(percent);
        break;
      case 'spray-darkness':
        this.onChangeSprayDarkness(percent);
        break;
      case 'spray-size':
        this.onChangeSpraySize(percent);
        break;
      case 'bg-color':
        this.onChangeBgColor(percent);
        break;
      case 'bg-darkness':
        this.onChangeBgDarkness(percent);
        break;
      default:
        break;
    }
  }

  /**
  * Creates the right slider in the middle based on the spray property selected
  * @param {string} sliderType is spray property selected
  * @param {object} { onChange, knobPosition, color } are references to the slider function and previous position
  */
  renderSlider = (sliderType, { onChange, knobPosition, color }) => {

    switch (sliderType) {
      case 'color':
        return (
          <ColorPicker
            onChange={onChange}
            knobPosition={knobPosition}
          />
        );
      case 'darkness':
        return (
          <AlphaSlider
            onChange={onChange}
            knobPosition={knobPosition}
            color={color}
          />
        );
      case 'size':
        return (
          <SizeSlider
            onChange={onChange}
            knobPosition={knobPosition}
          />
        );
      default:
        break;
    }
  }

  /**
  * Returns the html view for the palette
  */
  render() {

    const sprayColorRGB = this.convert.colorPercentToRGB(this.state.sprayColor);
    const bgColorRGB = this.convert.colorPercentToRGB(this.state.bgColor);
    const sprayColor = this.convert.rgbAndDarknessToRGBA(sprayColorRGB, this.state.sprayDarkness);
    const bgColor = this.convert.rgbAndDarknessToRGBA(bgColorRGB, this.state.bgDarkness);
    const { id, sliderType } = this.state.actionButtons[this.state.currentActionButtonIndex];

    const idToDataMap = {
      'spray-color': {
        onChange: this.onChangeSprayColor,
        knobPosition: this.state.sprayColor,
      },
      'spray-darkness': {
        onChange: this.onChangeSprayDarkness,
        knobPosition: this.state.sprayDarkness,
        color: this.convert.rgbAndDarknessToRGBA(sprayColorRGB, 50)
      },
      'spray-size': {
        onChange: this.onChangeSpraySize,
        knobPosition: this.state.spraySize,
      },
      'bg-color': {
        onChange: this.onChangeBgColor,
        knobPosition: this.state.bgColor,
      },
      'bg-darkness': {
        onChange: this.onChangeBgDarkness,
        knobPosition: this.state.bgDarkness,
        color: this.convert.rgbAndDarknessToRGBA(bgColorRGB, 50)
      },
    }

    return (
      <div className="App">
        <div className="Header TipBarContainer">
          <div className="ToolBar">
            <div className="Undo"
              onClick={this.onUndoClicked}
            >
              <FontAwesomeIcon icon="undo-alt" size="2x" />
            </div>

            <div className="Clear"
              onClick={this.onClearClicked}
            >
              <button className="PrimaryButton">Clear</button>
            </div>

            <div className="Redo"
              onClick={this.onRedoClicked}
            >
              <FontAwesomeIcon icon="redo-alt" size="2x" />
            </div>
          </div>
          {/* <div className="TipBar">
            <p>Draw-Something</p>
            <p>{this.state.tipBarLabelText}</p>
          </div> */}
        </div>

        <div className="Content">

          <div className="DashContainer">
            <div className="Dash"
              onClick={this.onSelectDashItem}
              style={{
                backgroundColor: bgColor,
              }}
            >
              <div className="Spray"
                style={{
                  color: sprayColor,
                }}
              >
                <FontAwesomeIcon icon={faSprayCan} size="10x" />
              </div>

              <div className="BrushSize" >
                <p>
                  {this.convert.percentToSpraySize(this.state.spraySize)}
                </p>
              </div>
            </div>
          </div>

          <div className="ToolSliderContainer">
            {
              this.renderSlider(sliderType, idToDataMap[id])
            }
          </div>

        </div>

        <div className="Footer ActionCarouselContainer">
          <ActionCarousel
            currentIndex={this.state.currentActionButtonIndex}
            onNext={this.onNextButtonClick}
            onPrev={this.onPrevButtonClick}
          >
            {
              this.state.actionButtons.map(
                ({ id, type, number, name, iconName }) => (
                  <div className="ActionButtonContainer"
                    key={`${type}-${number}-container`}
                    onTouchStart={() => {
                      this.currentDeviceOrientationChangeListener = this.onDeviceOrientationChange(id);
                      window.addEventListener('deviceorientation', this.currentDeviceOrientationChangeListener);
                    }}
                    onTouchEnd={() => {
                      window.removeEventListener('deviceorientation', this.currentDeviceOrientationChangeListener);
                    }}
                  >
                    <div id={id} key={`${type}-${number}`} className="ActionButton">
                      <p className="ActionButtonTitle">{name}</p>
                      <FontAwesomeIcon icon={iconName} size="5x" />
                    </div>
                  </div>
                )
              )
            }
          </ActionCarousel>
        </div>
      </div>
    );
  }
}

export default App;