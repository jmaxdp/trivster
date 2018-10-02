import { combineReducers } from 'redux';
import game from './game';

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    game,
  });
}
