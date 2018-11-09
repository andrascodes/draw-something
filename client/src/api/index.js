import io from 'socket.io-client';

const createSocketAPI = (convert) => {
  const socket = io.connect('/palette');

  const emitSprayColor = (rgb, darkness) => {
    const color = convert.rgbAndDarknessToRGBA(
      convert.colorPercentToRGB(rgb),
      darkness
    );
    socket.emit('spray-color', { color });
    return `emitSpray(${color})`;
  }

  const emitBgColor = (rgb, darkness) => {
    const color = convert.rgbAndDarknessToRGBA(
      convert.colorPercentToRGB(rgb),
      darkness
    );
    socket.emit('bg-color', { color });
    return `emitBG(${color})`;
  }

  const emitSpraySize = (percent) => {
    const size = convert.percentToSpraySize(percent);
    socket.emit('spray-size', { size });
    return `emitSize(${size})`;
  }

  const emitUndo = () => {
    socket.emit('undo', {});
  }

  const emitRedo = () => {
    socket.emit('redo', {});
  }

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