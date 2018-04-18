
import {createStore} from 'redux';
import {placeSelector} from "./Model"


var store = createStore(placeSelector);

export {
  store
}