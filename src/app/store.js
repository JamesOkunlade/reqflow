import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from '../features/auth/authSlice';
import requestsReducer from '../features/requests/requestsSlice';
import approvalsReducer from '../features/approvals/approvalsSlice';

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  requests: requestsReducer,
  approvals: approvalsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedReducer = rootReducer;


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;
