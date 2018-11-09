const actionButtons = [
  {
    id: 'spray-color',
    type: 'spray',
    sliderType: 'color',
    number: 1,
    name: 'Spray Color',
    iconName: 'palette',
  },
  {
    id: 'spray-darkness',
    type: 'spray',
    sliderType: 'darkness',
    number: 2,
    name: 'Spray Darkness',
    iconName: 'eye',
  },
  {
    id: 'spray-size',
    type: 'size',
    sliderType: 'size',
    number: 1,
    name: 'Spray Size',
    iconName: 'arrows-alt-h',
  },
  {
    id: 'bg-color',
    type: 'bg',
    sliderType: 'color',
    number: 1,
    name: 'Wall Color',
    iconName: 'fill-drip',
  },
  {
    id: 'bg-darkness',
    type: 'bg',
    sliderType: 'darkness',
    number: 2,
    name: 'Wall Darkness',
    iconName: 'chalkboard',
  },

]

const orderActionButtons = (keyword, actionButtons) => {
  const orderingFunc = (a, b) => {
    if (a.number < b.number) {
      return -1;
    }
    else if (a.number > b.number) {
      return 1;
    }
    else {
      return 0;
    }
  }
  const sprayActions = actionButtons.filter(btn => btn.type === 'spray').sort(orderingFunc);
  const bgActions = actionButtons.filter(btn => btn.type === 'bg').sort(orderingFunc);
  const sizeAction = actionButtons.find(btn => btn.type === 'size');

  switch (keyword) {
    case 'spray':
      return ({
        currentActionButtonIndex: 0,
        actionButtons: [...sprayActions, sizeAction, ...bgActions]
      });
    case 'bg':
      return ({
        currentActionButtonIndex: 0,
        actionButtons: [...bgActions, ...sprayActions, sizeAction]
      });
    case 'size':
      return ({
        currentActionButtonIndex: 0,
        actionButtons: [sizeAction, ...sprayActions, ...bgActions]
      });
    default:
      return false;
  }
}

export { actionButtons, orderActionButtons };