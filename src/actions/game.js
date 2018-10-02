import axios from 'axios';
import { FETCH_QUESTIONS, SELECTED_ANSWER, RESET_APP } from '../constants';

// function to fetch data and save in redux state
export const fetchQuestions = () => async (dispatch) => {
  try {
    const {
      data: { results },
    } = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
    console.log('got them ', results);
    dispatch({
      type: FETCH_QUESTIONS,
      payload: results,
    });
  } catch (err) {
    console.log('there was an error ', err);
  }
};

// function to save question with answer in redux state
export const selectAnswer = questionWithAnswer => ({
  type: SELECTED_ANSWER,
  payload: questionWithAnswer,
});

// function to reset the app
export const resetApp = () => ({
  type: RESET_APP,
});
