import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import { fetchQuestions } from '../actions/game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      fetchQuestionsConnect,
      navigation: { navigate },
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to the Trivia Challenge!</Text>
        <Text style={styles.instructions}>
          You Will Be Presented With 10 True or False Questions!
        </Text>
        <Text style={styles.instructions}>Can you score 100%?</Text>
        <Button
          title="Begin"
          onPress={() => {
            fetchQuestionsConnect();
            navigate('Quiz');
          }}
        />
      </View>
    );
  }
}

Home.propTypes = {
  fetchQuestionsConnect: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { fetchQuestionsConnect: fetchQuestions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
