import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserOrdersResponse } from 'src/types/api/responseObjects'
import { LoaderState } from '../types'
import { getRestaurantOrdersQuery } from 'src/types/api/requestObjects'

interface IUserOrdersSliceState {
  totalCount: getUserOrdersResponse['data']['totalCount']
  orders: LoaderState<getUserOrdersResponse['data']['orders']>
  ordersQuery: getRestaurantOrdersQuery
  activePage: number
}

const initialState: IUserOrdersSliceState = {
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

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    setUserOrders: (
      state,
      action: PayloadAction<LoaderState<getUserOrdersResponse['data']>>,
    ) => {
      if (action.payload.data) {
        state.totalCount = action.payload.data.totalCount
        state.orders.data = action.payload.data.orders
      } else {
        state.orders.isLoading = !!action.payload.isLoading
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

export const { setUserOrders, setOrdersQuery, setActivePage } =
  userOrdersSlice.actions

export default userOrdersSlice.reducer
