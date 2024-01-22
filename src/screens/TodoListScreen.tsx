// TodoList.tsx

import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {fetchTodos} from '../services/api';
import {Divider, ErrorMessage, ListItem, LoadingIndicator} from '../components';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../utils/Theme';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {useAuthStore} from '../stores/auth/authStore';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const TodoListScreen = () => {
  const {setUser} = useAuthStore();
  const getData = useAsyncStorage('users');
  const {isPending, error, data, refetch} = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const navigation = useNavigation();
  const [isData, setData] = useState(null);

  const handleAddTodo = () => {
    navigation.push('TodoAdd', {todo: null});
  };

  const handleLogout = () => {
    setUser(null);
  };

  const onListItemPress = React.useCallback(
    (todo: any) =>
      navigation.navigate('TodoDetail', {
        todo,
      }),
    [navigation],
  );

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <View style={styles.body}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Divider height={20} />
        {(data?.todos || []).map((item, index) => (
          <ListItem
            key={index?.toString()}
            item={item}
            onPress={onListItemPress}
          />
        ))}
      </ScrollView>
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        <TouchableOpacity onPress={handleAddTodo} style={[styles.button]}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
        <Divider height={5} />
        <TouchableOpacity onPress={handleLogout} style={[styles.logout]}>
          <Text style={styles.buttonTextBlue}>Logout</Text>
        </TouchableOpacity>
        <Divider height={5} />
      </View>
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  input: {
    height: 100,
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 14,
  },
  required: {alignSelf: 'flex-start', paddingVertical: 5},
  button: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.blue,
  },
  logout: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {color: colors.white, fontSize: 16, fontWeight: '700'},
  buttonTextBlue: {color: colors.blue, fontSize: 16, fontWeight: '700'},
  red: {
    backgroundColor: colors.red1,
  },
  green: {
    backgroundColor: colors.green1,
  },
});
