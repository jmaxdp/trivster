import { FETCH_QUESTIONS } from '../constants';

const initialState = {
  questions: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state };

    default:
      return state;
  }
};
