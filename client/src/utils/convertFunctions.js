const tiltToPercent = (tilt) => {
  if (tilt < 25) {
    return 0;
  }
  else if (tilt > 75) {
    return 100;
  }
  else {
    return (tilt - 25) * 2;
  }
}

const percentToSpraySize = (percent) => {
  return Math.floor(1 + percent / 100 * 49);
}

const colorPercentToRGB = (percent) => {
  if (percent < 0 || percent > 100) {
    return { r: 255, g: 0, b: 0 };
  }

  let colorPercent = percent;
  if (0 <= percent && percent <= 17) {
    return { r: 255, g: (colorPercent / 17) * 255, b: 0 };
  }
  else if (17 < percent && percent <= 33) {
    // y = x * a + b
    // 255 = 17 * a + b
    // 0 = 33 * a + b
    // b = -33 * a, 255 = 17a - 33a = -16a, 
    // a = -255/16
    // b = (-33 * -255)/16 = 525.9375
    return { r: (percent * (-255 / 16)) + 525.9375, g: 255, b: 0 };
  }
  else if (33 < percent && percent <= 50) {
    // y = x * a + b
    // 0 = 33 * a + b
    // 255 = 50 * a + b
    // b = -33 * a, 255 = 50a - 33a = 17a, 
    // a = 255/17
    // b = (-33 * 255)/17 = -495
    return { r: 0, g: 255, b: (percent * (255 / 17)) - 495 };
  }
  else if (50 < percent && percent <= 67) {
    // y = x * a + b
    // 0 = 67 * a + b
    // 255 = 50 * a + b
    // b = -67 * a, 255 = 50a - 67a = -17a, 
    // a = -255/17
    // b = (-67 * -255)/17 = + 1005
    return { r: 0, g: (percent * (-255 / 17)) + 1005, b: 255 };
  }
  else if (67 < percent && percent <= 83) {
    // y = x * a + b
    // 0 = 67 * a + b
    // 255 = 83 * a + b
    // b = -67 * a, 255 = 83a - 67a = 16a, 
    // a = 255/16
    // b = (-67 * 255)/16 = -1067.8125
    return { r: (percent * (255 / 16)) - 1067.8125, g: 0, b: 255 };
  }
  else if (83 < percent && percent <= 100) {
    // y = x * a + b
    // 0 = 100 * a + b
    // 255 = 83 * a + b
    // b = -100 * a, 255 = 83a - 100a = -17a, 
    // a = -255/17
    // b = (-100 * -255)/17 = 1500
    return { r: 255, g: 0, b: (percent * (-255 / 17)) + 1500 };
  }
}

const rgbAndDarknessToRGBA = ({ r, g, b }, darkness) => {
  if (darkness < 0) {
    return `rgba(255, 255, 255, 1.0)`;
  }
  else if (darkness > 100) {
    return `rgba(0, 0, 0, 1.0)`;
  }
  else if (darkness >= 50) {
    // y = x * a + b
    // r/g/b = 50 * a + b
    // 0 = 100 * a + b
    // b = -100 * a, r/g/b = 50a - 100a = -50a, 
    // a = - (r/g/b) /50
    // b = 100 * (r/g/b) /50 = 50 * (r/g/b)
    // newR = alpha * - (r/50) + (-100 * -r/50)
    const red = darkness * (-r / 50) + (2 * r);
    const green = darkness * (-g / 50) + (2 * g);
    const blue = darkness * (-b / 50) + (2 * b);
    return `rgba(${Math.floor(red)}, ${Math.floor(green)}, ${Math.floor(blue)}, 1.0)`;
  }
  else /* 0..50 */ {
    // y = x * a + b
    // 255 = 0 * a +b
    // r/g/b = 50 * a + b
    // b = 255
    // r/g/b = 50 * a + 255
    // a = (r + 255)/50
    // y = x * (r - 255)/50 + 255
    const red = darkness * ((r - 255) / 50) + 255;
    const green = darkness * ((g - 255) / 50) + 255;
    const blue = darkness * ((b - 255) / 50) + 255;
    return `rgba(${Math.floor(red)}, ${Math.floor(green)}, ${Math.floor(blue)}, 1.0)`;
  }
}

const createConvert = () => ({
  tiltToPercent,
  percentToSpraySize,
  colorPercentToRGB,
  rgbAndDarknessToRGBA
});

export default createConvert;