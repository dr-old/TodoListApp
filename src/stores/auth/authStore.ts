import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import MMKVStoragePersistHelper from '../../helpers/MMKVHelper';
import { AuthAction } from './authAction';

const initialState = {
  user:{},
  token:{},
  loading: false,
};

export const useAuthStore = create(
  persist(
    (set, get, store) => ({
      ...initialState,
      ...AuthAction(set, get),
    }),
    {
      name: 'auth-store',
      version: 1,
      storage: createJSONStorage(
        () => new MMKVStoragePersistHelper('auth-store'),
      ),
    },
  ),
);
