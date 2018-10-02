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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const Answer = (props) => {
  const {
    details: { selected_answer: selectedAnswer, correct_answer: correctAnswer, question },
  } = props;
  const correct = selectedAnswer === correctAnswer;
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
