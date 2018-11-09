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

  onUndoClicked = () => {
    this.socketAPI.emitUndo();
  }

  onRedoClicked = () => {
    this.socketAPI.emitRedo();
  }

  onClearClicked = () => {
    this.socketAPI.emitClear();
  }

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

  onPrevButtonClick = () => {
    if (this.state.currentActionButtonIndex <= 0) {
      return;
    }

    this.setState((prevState) => ({
      currentActionButtonIndex: prevState.currentActionButtonIndex - 1,
    }));
  }

  onNextButtonClick = () => {
    if (this.state.currentActionButtonIndex >= this.state.actionButtons.length - 1) {
      return;
    }

    this.setState((prevState) => ({
      currentActionButtonIndex: prevState.currentActionButtonIndex + 1,
    }));
  }

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