// TodoList.tsx

import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import {addTodo} from '../services/api';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {colors} from '../utils/Theme';
import {Controller, useForm} from 'react-hook-form';

const Required = () => {
  return (
    <View style={styles.required}>
      <Text style={{color: colors.red3}}>This is required.</Text>
    </View>
  );
};

const TodoAddScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      todo: '',
    },
  });

  const onSubmit = data => {
    addTodoMutation.mutate({todo: data.todo, completed: false, userId: 5});
  };

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: newdata => {
      console.log('newdata', newdata);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Data is added',
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

  return (
    <View style={styles.body}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.form}>
            <TextInput
              placeholder="Please write todo"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              multiline={true}
            />
          </View>
        )}
        name="todo"
      />
      {errors.todo && <Required />}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.button]}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoAddScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 100,
    width: '100%',
    backgroundColor: colors.white,
    textAlignVertical: 'top',
  },
  form: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  required: {alignSelf: 'flex-start', paddingVertical: 5},
  button: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
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
