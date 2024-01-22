import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {colors} from '../utils/Theme';
import {Divider} from '../components';
import {useMutation} from '@tanstack/react-query';
import {login} from '../services/api';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../stores/auth/authStore';

const Required = () => {
  return (
    <View style={styles.required}>
      <Text style={{color: colors.red3}}>This is required.</Text>
    </View>
  );
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const {setUser} = useAuthStore();
  const navigation = useNavigation();

  const onSubmit = data => {
    loginMutation.mutate(data);
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
      setUser(data);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login successfull',
      });
    },
    onError(error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Invalid',
        text2: 'User not found',
      });
    },
  });

  return (
    <View style={styles.body}>
      <Text style={styles.login}>Login</Text>
      <Divider height={5} />
      <Text style={styles.loginSmall}>Please login to continue</Text>
      <Divider height={50} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="username"
      />
      {errors.username && <Required />}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            style={styles.input}
          />
        )}
        name="password"
      />
      {errors.password && <Required />}

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  input: {
    height: 44,
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 20,
  },
  required: {alignSelf: 'flex-start', paddingVertical: 5},
  button: {
    backgroundColor: colors.blue,
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 30,
  },
  buttonText: {color: colors.white, fontSize: 16, fontWeight: '700'},
  login: {
    color: colors.darkBlue,
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  loginSmall: {
    color: colors.darkBlue,
    fontSize: 14,
    fontWeight: '200',
    alignSelf: 'flex-start',
  },
});
