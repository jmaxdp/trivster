import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import { selectAnswer } from '../actions/game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: {},
      lastQuestion: false,
      isLoading: true,
      currentQuestionIndex: 0,
    };
    this.loadNewQuestions = this.loadNewQuestions.bind(this);
  }

  static navigationOptions = {
    title: 'Quiz Time!',
    headerLeft: null,
  };

  componentDidMount() {
    // load all new questions
    this.loadNewQuestions();
  }

  componentDidUpdate(prevProps) {
    const { game: oldGameProps } = prevProps;
    const { game: newGameProps } = this.props;
    // if props have been updated, replenish the componenet with new information
    if (!_.isEqual(oldGameProps, newGameProps)) {
      this.loadNewQuestions();
    }
  }

  loadNewQuestions() {
    const {
      game: { questions, currentQuestionIndex },
    } = this.props;
    // get total amount of questions
    const amountOfQuestions = questions.length;
    // make sure questions have been loaded
    const isLoading = amountOfQuestions < 1;
    // check if its the last question
    const lastQuestion = currentQuestionIndex === amountOfQuestions - 1;
    // get the current question to show
    const currentQuestion = questions[currentQuestionIndex];
    this.setState({
      currentQuestion,
      isLoading,
      lastQuestion,
      currentQuestionIndex,
    });
  }

  render() {
    const { isLoading, currentQuestion, lastQuestion, currentQuestionIndex } = this.state;
    const {
      selectAnswerConnect,
      navigation: { navigate },
    } = this.props;
    // safety check in case of null or undefined
    const info = currentQuestion
      ? { category: currentQuestion.category, question: currentQuestion.question }
      : { category: null, question: null };

    // if loading, show a loading spinner, else show the questions
    return isLoading ? (
      <View style={styles.container}>
        <Spinner visible={true} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
      </View>
    ) : (
      <View style={styles.container}>
        <Card title={info.category}>
          <Text style={{ marginBottom: 10, textAlign: 'center' }}>{_.unescape(info.question)}</Text>
          <Button
            backgroundColor="blue"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 20,
            }}
            title="True"
            onPress={() => {
              // choose true and add it to the current question object
              selectAnswerConnect({ ...currentQuestion, selected_answer: 'True' });
              if (lastQuestion) {
                // if its the last question, go to the results page
                navigate('Results');
              }
            }}
          />
          <Button
            backgroundColor="red"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 20,
            }}
            title="False"
            onPress={() => {
              // choose false and add it to the current question object
              selectAnswerConnect({ ...currentQuestion, selected_answer: 'False' });
              if (lastQuestion) {
                // if its the last question, go to the results page
                navigate('Results');
              }
            }}
          />
          <Text style={{ textAlign: 'center' }}>{`${currentQuestionIndex + 1} of 10`}</Text>
        </Card>
      </View>
    );
  }
}

Quiz.propTypes = {
  selectAnswerConnect: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  game: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = {
  selectAnswerConnect: selectAnswer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
