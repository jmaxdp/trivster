import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Quiz extends Component {
  render() {
    return <View>This is the quiz page</View>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
