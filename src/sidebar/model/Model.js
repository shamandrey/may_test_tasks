function placeSelector(state, action) {
  if (typeof state === 'undefined') {
    state = {places: [], selected: null};
  }
  switch(action.type){
    case 'visible':
      return {places: action.places, selected: state.selected};
    case 'select':
      return {places: state.places, selected: action.placeName};
    default:
      return state;
  }
}
export {
  placeSelector
}