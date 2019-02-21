import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';

import { LoginScreen, TodosScreen } from './components';

const todosScreen = {
  screen: TodosScreen,
  navigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName
  })
};

const AppStack = createStackNavigator(
  {
    Home: {
      screen: createBottomTabNavigator(
        {
          All: todosScreen,
          Active: todosScreen,
          Complete: todosScreen
        },
        {
          initialRouteName: 'All'
        }
      ),
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.routeName
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
      }
    }
  }
);
const AuthStack = createStackNavigator({ LogIn: LogInScreen });

export default createAppContainer(AppNavigator);
