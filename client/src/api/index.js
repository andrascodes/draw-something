import io from 'socket.io-client';
/**
* Socket methods for the palette on the phone to communicate with the canvas on tablet
*/
const createSocketAPI = (convert) => {
  const socket = io.connect('/palette');

  /**
  * Converts colour numbers to string and tells canvas to update spray color and darkness value
  * @param {number} rgb is the colour slider percent value   
  * @param {number} darkness is the darkness percent value
  */
  const emitSprayColor = (rgb, darkness) => {
    const color = convert.rgbAndDarknessToRGBA(
      convert.colorPercentToRGB(rgb),
      darkness
    );
    socket.emit('spray-color', { color });
    return `emitSpray(${color})`;
  }

  /**
  * Converts background colour numbers to string and tells canvas to update background colour
  * @param {number} rgb is the background colour slider percent value   
  * @param {number} darkness is the background darkness percent value
  */
  const emitBgColor = (rgb, darkness) => {
    const color = convert.rgbAndDarknessToRGBA(
      convert.colorPercentToRGB(rgb),
      darkness
    );
    socket.emit('bg-color', { color });
    return `emitBG(${color})`;
  }

  /**
  * Converts size percent to spray size to string and tells canvas to update spray size
  * @param {number} percent is the spray size slider percent value 
  */
  const emitSpraySize = (percent) => {
    const size = convert.percentToSpraySize(percent);
    socket.emit('spray-size', { size });
    return `emitSize(${size})`;
  }

  /**
  * Tells canvas to undo previous stroke
  */
  const emitUndo = () => {
    socket.emit('undo', {});
  }

  /**
  * Tells canvas to undo previous stroke
  */
  const emitRedo = () => {
    socket.emit('redo', {});
  }

  /**
  * Tells canvas to clear itself
  */
  const emitClear = () => {
    socket.emit('clear', {});
  }

  return ({
    emitSprayColor,
    emitBgColor,
    emitSpraySize,
    emitUndo,
    emitRedo,
    emitClear
  });
}

export default createSocketAPI;