import { produce } from "immer";


export const AuthAction = (set, get) => {
  return {
    setUser: params => {
      set(
        produce(state => {
          state.user = params;
        }),
      );
    },
  };
};
