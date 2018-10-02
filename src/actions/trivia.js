import axios from 'axios';
import { FETCH_QUESTIONS } from '../constants';

export const fetchQuestions = () => async (dispatch) => {
  try {
    const fetchedQuestions = await axios.get(
      'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
    );
    console.log('got them ', fetchedQuestions);
    return {
      FETCH_QUESTIONS,
      payload: fetchedQuestions,
    };
  } catch (err) {
    console.log('there was an error ', err);
  }
};

export const selectAnswer = param => ({
  type,
  payload: param,
});
