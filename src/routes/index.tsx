import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {LoginStack} from './LoginStack';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {MainStack} from './MainStack';

export function Routes() {
  const {data} = useAsyncStorage('users');

  console.log(data);

  return (
    <NavigationContainer>
      {data?.token ? <MainStack /> : <LoginStack />}
    </NavigationContainer>
  );
}
