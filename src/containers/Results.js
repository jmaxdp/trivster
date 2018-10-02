import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

export class Results extends Component {
  render() {
    return (
      <View>
        <Text>This is the results page.</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);
