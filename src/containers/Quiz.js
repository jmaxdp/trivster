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
    };
    this.loadNewQuestions = this.loadNewQuestions.bind(this);
  }

  componentDidMount() {
    this.loadNewQuestions();
  }

  componentDidUpdate(prevProps) {
    console.log('some update', prevProps);
    const { game: oldGameProps } = prevProps;
    const { game: newGameProps } = this.props;
    if (!_.isEqual(oldGameProps, newGameProps)) {
      this.loadNewQuestions();
    }
  }

  loadNewQuestions() {
    console.log('called');
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
    });
  }

  render() {
    const { isLoading, currentQuestion, lastQuestion } = this.state;

    return isLoading ? (
      <View>
        <Text>Loading</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <Card title="Entertainment: Video Games">
          <Text style={{ marginBottom: 10 }}>Unturned originally started as a Roblox game.</Text>
          <Button
            backgroundColor="blue"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 20,
            }}
            title="True"
          />
          <Button
            backgroundColor="red"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="false"
          />
          <Text>1 of 10</Text>
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
