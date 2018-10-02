import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { selectAnswer } from '../actions/trivia';

export class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>This is the quiz page</Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  selectAnswerConnect: selectAnswer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
