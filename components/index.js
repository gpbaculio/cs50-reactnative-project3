import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import {
  AuthLoadingScreen,
  LoginScreen,
  TodosScreen,
  AccountScreen
} from './screens';

const BottomTabs = createBottomTabNavigator(
  {
    Todos: {
      screen: TodosScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.routeName
      })
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.routeName
      })
    }
  },
  {
    initialRouteName: 'Todos',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Todos':
            iconName = 'assignment';
            break;
          case 'Account':
            iconName = 'account-circle';
            break;
        }
        return (
          <MaterialIcons
            name={iconName}
            size={28}
            color={focused ? '#f4511e' : '#ccc'}
          />
        );
      },
      tabBarOptions: {
        style: { backgroundColor: '#FFF' },
        activeTintColor: '#f4511e'
      }
    }),
    animationEnabled: true,
    swipeEnabled: true
  }
);

BottomTabs.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle
  };
};

const AppStack = createStackNavigator(
  {
    Home: {
      screen: BottomTabs
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

const AuthStack = createStackNavigator(
  { LogIn: LoginScreen },
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

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
