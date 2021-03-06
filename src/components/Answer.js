import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  question: {
    marginLeft: 10,
    maxWidth: 300,
  },
});

const Answer = (props) => {
  const {
    details: { selected_answer: selectedAnswer, correct_answer: correctAnswer, question },
  } = props;
  // check if the answer is correct
  const correct = selectedAnswer === correctAnswer;
  // choose which icon to render
  const icon = correct ? (
    <Icon name="check" color="green" style={styles.icon} />
  ) : (
    <Icon name="cancel" color="red" />
  );
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.question}>{_.unescape(question)}</Text>
    </View>
  );
};

Answer.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Answer;
