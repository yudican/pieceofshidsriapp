import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import AuthSlice from './slice/AuthSlice';
import ReminderSlice from './slice/ReminderSlice';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const authpersist = persistReducer(persistConfig, AuthSlice);
const remindedpersist = persistReducer(persistConfig, ReminderSlice);

export const store = configureStore({
  reducer: {
    auth: authpersist,
    reminded: remindedpersist,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
