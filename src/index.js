import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import thunk from 'redux-thunk';
import HomeView from './containers/Home';
import trivia from './reducers/trivia';

const AppNavigator = createStackNavigator({
  Home: { screen: HomeView },
});

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  trivia,
});

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, applyMiddleware(middleware, thunk));

class Trivster extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Trivster;
