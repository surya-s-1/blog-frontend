import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appReducer, { appSlice } from './slices/appSlice'

const rootReducer = combineReducers({
  [appSlice.name]: appReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [appSlice.name],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
  })

  const persistor = persistStore(store);
  (store as any).__persistor = persistor;

  return store
}



export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)