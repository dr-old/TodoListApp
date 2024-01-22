import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {TodoDetailScreen} from '../screens/TodoDetailScreen';
import TodoListScreen from '../screens/TodoListScreen';
import TodoAddScreen from '../screens/TodoAddScreen';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="TodoList">
      <Stack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{
          headerTitle: 'Todo List',
        }}
      />
      <Stack.Screen
        name="TodoDetail"
        component={TodoDetailScreen}
        options={{
          headerTitle: 'Todo Detail',
        }}
      />
      <Stack.Screen
        name="TodoAdd"
        component={TodoAddScreen}
        options={{
          headerTitle: 'Add Todo',
        }}
      />
    </Stack.Navigator>
  );
}
