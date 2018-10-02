import { FETCH_QUESTIONS, SELECTED_ANSWER } from '../constants';

const initialState = {
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, questions: action.payload };
    case SELECTED_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.payload],
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    default:
      return state;
  }
};
