import axios from 'axios';
import { FETCH_QUESTIONS, SELECTED_ANSWER } from '../constants';

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

export const selectAnswer = questionWithAnswer => ({
  type: SELECTED_ANSWER,
  payload: questionWithAnswer,
});
