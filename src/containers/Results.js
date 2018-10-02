import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import Answer from '../components/Answer';

export class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const {
      game: { answers },
    } = this.props;
    let correctAnswersAmount = 0;
    answers.forEach((answer) => {
      if (answer.correct_answer === answer.selected_answer) {
        correctAnswersAmount += 1;
      }
    });
    this.setState({
      correctAnswersAmount,
      answers,
    });
  }

  render() {
    const { correctAnswersAmount, answers } = this.state;
    return (
      <View>
        <Text>You Got</Text>
        <Text>{`${correctAnswersAmount} / 10`}</Text>
        <ScrollView>
          {answers.map(answer => (
            <Answer details={answer} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

Results.propTypes = {
  game: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);
