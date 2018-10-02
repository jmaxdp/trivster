import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStackNavigator, addNavigationHelpers } from 'react-navigation';
import HomeView from './containers/Home';
import getStore from './store';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeView },
  },
  {
    navigationOptions: {
      title: ({ state }) => {
        if (state.params) {
          return `${state.params.title}`;
        }
      },
    },
  },
);

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}

const ConnectedApp = connect(
  state => ({
    nav: state.nav,
  }),
  {},
)(AppWithNavigationState);
const store = getStore(navReducer);

export default () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);
