import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import restaurantReducer from './restaurant/restaurantSlice'
import restaurantsReducer from './restaurants/restaurantsSlice'
import publicRestaurantReducer from './public-restaurant/publicRestaurantSlice'
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
    publicRestaurant: publicRestaurantReducer,
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
