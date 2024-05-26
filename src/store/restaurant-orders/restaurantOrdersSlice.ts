import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRestaurantOrdersResponse } from 'src/types/api/responseObjects'
import { LoaderState } from '../types'
import {
  getRestaurantOrdersQuery,
  putUpdateOrderBody,
} from 'src/types/api/requestObjects'

interface IRestaurantOrdersSliceState {
  totalCount: getRestaurantOrdersResponse['data']['totalCount']
  orders: LoaderState<getRestaurantOrdersResponse['data']['orders']>
  ordersQuery: getRestaurantOrdersQuery
  activePage: number
}

const initialState: IRestaurantOrdersSliceState = {
  totalCount: 0,
  orders: {
    data: [],
    isLoading: false,
  },
  ordersQuery: {
    offset: 0,
    limit: 20,
    active: true,
  },
  activePage: 1,
}

export const restaurantOrdersSlice = createSlice({
  name: 'restaurantOrders',
  initialState,
  reducers: {
    setRestaurantOrders: (
      state,
      action: PayloadAction<LoaderState<getRestaurantOrdersResponse['data']>>,
    ) => {
      if (action.payload.data) {
        state.totalCount = action.payload.data.totalCount
        state.orders.data = action.payload.data.orders
      } else {
        state.orders.isLoading = !!action.payload.isLoading
      }
    },
    updateOrder: (state, action: PayloadAction<putUpdateOrderBody>) => {
      if (state.orders.data) {
        const order = state.orders.data.find(
          (order) => order.id === action.payload.orderId,
        )

        if (order) {
          order.status = action.payload.status
        }
      }
    },
    setOrdersQuery: (
      state,
      action: PayloadAction<getRestaurantOrdersQuery>,
    ) => {
      if (initialState.ordersQuery === action.payload) {
        return
      }

      state.ordersQuery = {
        ...initialState.ordersQuery,
        ...action.payload,
      }
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload
    },
  },
})

export const {
  setRestaurantOrders,
  updateOrder,
  setOrdersQuery,
  setActivePage,
} = restaurantOrdersSlice.actions

export default restaurantOrdersSlice.reducer
