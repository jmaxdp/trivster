import { FETCH_QUESTIONS, SELECTED_ANSWER } from '../constants';

const initialState = {
  questions: [],
  answers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, questions: action.payload };
    case SELECTED_ANSWER:
      return { ...state, answers: [...state.answers, action.payload] };
    default:
      return state;
  }
};
