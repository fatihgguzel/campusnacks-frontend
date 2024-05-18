import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import restaurantReducer from './restaurant/restaurantSlice'
import restaurantsReducer from './restaurants/restaurantsSlice'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

export const store = configureStore({
  reducer: {
    user: userReducer,
    restaurant: restaurantReducer,
    restaurants: restaurantsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
