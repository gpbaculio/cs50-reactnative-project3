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
  ProfileScreen
} from './screens';

const AppStack = createStackNavigator(
  {
    Home: {
      screen: createBottomTabNavigator(
        {
          Home: {
            screen: TodosScreen,
            navigationOptions: ({ navigation }) => ({
              title: navigation.state.routeName
            })
          },
          Profile: {
            screen: ProfileScreen,
            navigationOptions: ({ navigation }) => ({
              title: navigation.state.routeName
            })
          }
        },
        {
          initialRouteName: 'Home',
          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
              console.log('focused = ', focused);
              const { routeName } = navigation.state;
              let iconName;
              switch (routeName) {
                case 'Home':
                  iconName = 'home';
                  break;
                case 'Profile':
                  iconName = 'account-circle';
                  break;
              }
              return (
                <MaterialIcons
                  name={iconName}
                  size={28}
                  color={focused ? '#2f95dc' : '#ccc'}
                />
              );
            }
          }),
          animationEnabled: true,
          swipeEnabled: true
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

AppStack.navigationOptions;

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
