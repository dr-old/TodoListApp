import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainStack';
import {useAuthStore} from '../stores/auth/authStore';
import {LoginStack} from './LoginStack';

export function Routes() {
  const {user} = useAuthStore();
  console.log('login', user);

  return (
    <NavigationContainer>
      {user?.token ? <MainStack /> : <LoginStack />}
    </NavigationContainer>
  );
}
