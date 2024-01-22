import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {useMutation, useQuery} from '@tanstack/react-query';

import {LoadingIndicator} from '../components/LoadingIndicator';
import {ErrorMessage} from '../components/ErrorMessage';

import {deleteTodo, fetchTodo, updateTodo} from '../services/api';
import {colors} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import {Divider} from '../components';
import Toast from 'react-native-toast-message';

type Props = {
  route: any;
};

export function TodoDetailScreen({route}: Props) {
  const navigation = useNavigation();
  const {isPending, error, data} = useQuery({
    queryKey: ['todo', route.params.todo.id],
    queryFn: () => fetchTodo(route.params.todo.id),
    // initialData: route.params.todo as MovieDetails,
  });

  const onEdit = () => {
    editTodoMutation.mutate(data?.id, {completed: !data?.completed});
  };

  const editTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: newdata => {
      console.log('newdata', newdata);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Data is updated',
      });
      navigation.pop();
    },
    onError(error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Invalid',
        text2: error?.message,
      });
    },
  });

  const onDelete = () => {
    deleteTodoMutation.mutate(data?.id);
  };

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: newdata => {
      console.log('newdata', newdata);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Data is deleted',
      });
      navigation.pop();
    },
    onError(error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Invalid',
        text2: error?.message,
      });
    },
  });

  if (isPending) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }
  if (!data) {
    return null;
  }

  return (
    <View style={styles.body}>
      <View style={styles.detail}>
        <Text>Todo: </Text>
        <Divider height={5} />
        <Text style={{fontSize: 16, fontWeight: '700'}}>{data?.todo}</Text>
        <Divider height={20} />
        <Text>Status: </Text>
        <Divider height={5} />
        <Text
          style={
            data?.completed ? styles.buttonTextGreen : styles.buttonTextRed
          }>
          {data?.completed ? 'Done' : 'Not Yet'}
        </Text>
      </View>
      <View style={styles.form}>
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.button, data?.completed ? styles.blue : styles.green]}>
          <Text style={styles.buttonText}>
            {data?.completed ? 'Un-Finish' : 'Finish'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.button, styles.red]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
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
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 30,
  },
  buttonText: {color: colors.white, fontSize: 16, fontWeight: '700'},
  buttonTextGreen: {color: colors.green1, fontSize: 16, fontWeight: '700'},
  buttonTextRed: {color: colors.red1, fontSize: 16, fontWeight: '700'},
  red: {
    backgroundColor: colors.red1,
  },
  green: {
    backgroundColor: colors.green1,
  },
  blue: {
    backgroundColor: colors.blue,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  detail: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
  },
});
