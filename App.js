import { createStackNavigator } from 'react-navigation';
import Home from './src/containers/Home';

const App = createStackNavigator({
  Home: { screen: Home },
});

export default App;
