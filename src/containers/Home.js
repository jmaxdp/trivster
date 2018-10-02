import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { fetchQuestions } from '../actions/game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    top: 0,
    backgroundColor: 'yellow',
    paddingRight: 50,
    paddingLeft: 50,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 150,
    marginTop: 50,
    fontWeight: 'bold',
    color: 'rgba(111, 202, 186, 1)',
  },
  instructions: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333333',
    marginBottom: 100,
  },
  score: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333333',
    marginBottom: 60,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = {
    title: 'Trivster!',
    headerLeft: null,
  };

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
        <Text style={styles.score}>Can you score 100%?</Text>
        <Button
          title="Begin"
          loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
            width: 300,
            height: 45,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
          }}
          containerStyle={{ marginTop: 20 }}
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
