import React from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import projectReducer from './ProjectReducer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as platform from './Platform';
import LoginScreen from './LoginScreen';
import AddScreen from './AddScreen';
import ListScreen from './ListScreen';
import TimeScreen from './TimeScreen';

import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

const store = createStore(projectReducer);

const AddStack = createStackNavigator({
  Time: { screen: TimeScreen, navigationOptions: () => navOpts.project_header },
  Add: { screen: AddScreen, navigationOptions: () => navOpts.project_header },
})

const ListStack = createStackNavigator({
  History: { screen: ListScreen, navigationOptions: () => navOpts.project_header }
})

const HoursTabNav = createBottomTabNavigator(
  {
    'Hours': AddStack,
    'List': ListStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Hours') {
          iconName = platform.icons.timer;
        } else if (routeName === 'List') {
          iconName = platform.icons.list;
        }

        return <Ionicons name={iconName} size={25} color={ tintColor } />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1E8DBB',
      inactiveTintColor: 'gray',
      showIcon: true,
    },
  }
);

const AppNavigator = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: () => ({ header: null }) },
  Hours: { screen: HoursTabNav, navigationOptions: () => ({ header: null }) },
});

const navOpts = {
  project_header: {
    headerTintColor: 'gray'
  }
};

class App extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Provider store={ store }>
        <AppNavigator navigation={ navigation }/>
      </Provider>
    );
  }
}

export default App;