import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Answer from '../components/Answer';
import { resetApp } from '../actions/game';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  score: {
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

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Check Out Your Results!',
    headerLeft: null,
  };

  render() {
    const {
      game: { answers },
      navigation: { navigate },
      resetAppConnect,
    } = this.props;
    let correctAnswersAmount = 0;
    // count the total amount of correct answers
    answers.forEach(answer => {
      if (answer.correct_answer === answer.selected_answer) {
        correctAnswersAmount += 1;
      }
    });

    return (
      <View style={styles.container}>
        <Text style={styles.score}>You Got</Text>
        <Text style={styles.score}>{`${correctAnswersAmount} / 10`}</Text>
        <ScrollView scrollEnabled style={{ alignSelf: 'center' }}>
          {answers.map((answer, i) => (
            <Answer details={answer} key={`A${i + 1}`} />
          ))}
        </ScrollView>
        <Button
          title="Play Again!"
          loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
            width: 300,
            height: 45,
            borderColor: 'transparent',
            borderWidth: 0,
            margin: 10,
            borderRadius: 5,
            alignSelf: 'center',
          }}
          containerStyle={{ marginTop: 20 }}
          onPress={() => {
            // navigate to the home page and reset the app information
            navigate('Home');
            resetAppConnect();
          }}
        />
      </View>
    );
  }
}

Results.propTypes = {
  game: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  resetAppConnect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = {
  resetAppConnect: resetApp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);
