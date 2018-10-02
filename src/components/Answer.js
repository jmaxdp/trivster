import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const Answer = (props) => {
  const {
    details: { selected_answer: selectedAnswer, correct_answer: correctAnswer, question },
  } = props;
  const correct = selectedAnswer === correctAnswer;
  const icon = correct ? <Icon name="check" color="green" /> : <Icon name="cancel" color="red" />;
  return (
    <View>
      {icon}
      <Text>{_.unescaped(question)}</Text>
    </View>
  );
};

Answer.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Answer;
