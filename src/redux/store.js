// src/app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './service/apiSlice';
import { authSlice } from './slices/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const createStore=(options)=>configureStore({
    reducer:persistedReducer,
   middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ignore persist action
            },
        }).concat(apiSlice.middleware),
    ...options,
})
export const store = createStore();
export const persistor = persistStore(store);

