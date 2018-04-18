// Actions:
function visiblePlacesAction(places) {
  return {
    type: 'visible',
    places: places
  };
}

function selectAction(placeName) {
  return {
    type: 'select',
    placeName: placeName
  };
}

export {
  visiblePlacesAction,
  selectAction
}