import * as React from 'react';
import {AppStateStatus, Platform} from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';

import {useAppState} from './src/hooks/useAppState';
import {useOnlineManager} from './src/hooks/useOnlineManager';
import Toast from 'react-native-toast-message';
import {Routes} from './src/routes';

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

export default function App() {
  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
      <Toast />
    </>
  );
}
