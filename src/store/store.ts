import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import restaurantReducer from './restaurant/restaurantSlice'
import restaurantsReducer from './restaurants/restaurantsSlice'
import publicRestaurantReducer from './public-restaurant/publicRestaurantSlice'
import orderCartReducer from './order-cart/orderCartSlice'
import restaurantOrdersReducer from './restaurant-orders/restaurantOrdersSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistedOrderCart = persistReducer(
  {
    key: 'orderCart',
    version: 1,
    storage,
  },
  orderCartReducer,
)

export const store = configureStore({
  reducer: {
    user: userReducer,
    restaurant: restaurantReducer,
    restaurants: restaurantsReducer,
    publicRestaurant: publicRestaurantReducer,
    orderCart: persistedOrderCart,
    restaurantOrders: restaurantOrdersReducer,
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
