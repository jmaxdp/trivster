import { combineReducers } from 'redux';
import trivia from './trivia';

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    trivia,
  });
}
