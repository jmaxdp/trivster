import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import _ from 'lodash';
import { selectAnswer } from '../actions/game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  box: {},
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

  componentDidMount() {
    this.loadNewQuestions();
  }

  componentDidUpdate(prevProps) {
    const { game: oldGameProps } = prevProps;
    const { game: newGameProps } = this.props;
    if (!_.isEqual(oldGameProps, newGameProps)) {
      this.loadNewQuestions();
    }
  }

  loadNewQuestions() {
    const {
      game: { questions, currentQuestionIndex },
    } = this.props;
    const amountOfQuestions = questions.length;
    const isLoading = amountOfQuestions < 1;
    const lastQuestion = currentQuestionIndex === amountOfQuestions - 1;
    const currentQuestion = questions[currentQuestionIndex];
    this.setState({
      currentQuestion,
      isLoading,
      lastQuestion,
      currentQuestionIndex,
    });
  }

  render() {
    const {
      isLoading, currentQuestion, lastQuestion, currentQuestionIndex,
    } = this.state;
    const { selectAnswerConnect } = this.props;
    const info = currentQuestion
      ? { category: currentQuestion.category, question: currentQuestion.question }
      : { category: null, question: null };
    return isLoading ? (
      <View>
        <Text>Loading</Text>
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
              selectAnswerConnect({ ...currentQuestion, selected_answer: 'True' });
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
              selectAnswerConnect({ ...currentQuestion, selected_answer: 'False' });
            }}
          />
          <Text style={{ textAlign: 'center' }}>{`${currentQuestionIndex + 1} of 10`}</Text>
        </Card>
      </View>
    );
  }
}

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
