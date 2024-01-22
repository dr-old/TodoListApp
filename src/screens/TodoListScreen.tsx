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

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const TodoListScreen = () => {
  const {isPending, error, data, refetch} = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const navigation = useNavigation();
  const [isData, setData] = useState(null);

  const handleAddTodo = () => {
    navigation.push('TodoAdd', {todo: null});
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
      <TouchableOpacity onPress={handleAddTodo} style={[styles.button]}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
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
    margin: 20,
    backgroundColor: colors.blue,
  },
  buttonText: {color: colors.white, fontSize: 16, fontWeight: '700'},
  red: {
    backgroundColor: colors.red1,
  },
  green: {
    backgroundColor: colors.green1,
  },
});
