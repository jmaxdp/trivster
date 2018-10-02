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
import QuizView from './containers/Quiz';
import ResultsView from './containers/Results';
import game from './reducers/game';

const AppNavigator = createStackNavigator({
  Home: { screen: HomeView },
  Quiz: { screen: QuizView },
  Results: { screen: ResultsView },
});

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  game,
});

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, applyMiddleware(middleware, thunk));

class Trivster extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Trivster;
