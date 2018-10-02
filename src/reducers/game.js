import { FETCH_QUESTIONS, SELECTED_ANSWER, RESET_APP } from '../constants';

const initialState = {
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // set the questions after fetching
    case FETCH_QUESTIONS:
      return { ...state, questions: action.payload };
    // add the selected answer to the answer array
    case SELECTED_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.payload],
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    // reset state in the app
    case RESET_APP:
      return { ...initialState };
    default:
      return state;
  }
};
