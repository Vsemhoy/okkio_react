import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './tasksSlice';
import optionsReducer from './optionsSlice';
import uiReducer from './uiSlice';
import projectsReducer from './projectsSlice';
import usersReducer from './usersSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  users: usersReducer,
  options: optionsReducer,
  ui: uiReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Отключите проверку сериализации
});

const persistor = persistStore(store);

export { store, persistor };