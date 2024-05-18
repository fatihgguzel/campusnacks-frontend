import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRestaurantsResponse } from '../../types/api/responseObjects'
import { LoaderState } from '../types'
import { getRestaurantsQuery } from '../../types/api/requestObjects'

interface IRestaurantsSliceState {
  totalCount: getRestaurantsResponse['data']['totalCount']
  restaurants: LoaderState<getRestaurantsResponse['data']['restaurants']>
  restaurantsQuery: getRestaurantsQuery
}

const initialState: IRestaurantsSliceState = {
  totalCount: 0,
  restaurants: {
    data: [],
    isLoading: false,
  },
  restaurantsQuery: {
    offset: 0,
    limit: 16,
  },
}

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (
      state,
      action: PayloadAction<LoaderState<getRestaurantsResponse['data']>>,
    ) => {
      if (action.payload.data) {
        state.totalCount = action.payload.data.totalCount
        if (state.restaurants.data) {
          state.restaurants.data = [
            ...state.restaurants.data,
            ...action.payload.data.restaurants,
          ]
        } else {
          state.restaurants.data = action.payload.data.restaurants
        }
      } else {
        state.restaurants.isLoading = !!action.payload.isLoading
      }
    },
    setRestaurantsQuery: (
      state,
      action: PayloadAction<getRestaurantsQuery>,
    ) => {
      if (
        initialState.restaurantsQuery === action.payload ||
        state.restaurantsQuery === action.payload
      ) {
        return
      }
      state.restaurantsQuery = {
        ...initialState.restaurantsQuery,
        ...action.payload,
      }
    },
  },
})

export const { setRestaurants, setRestaurantsQuery } = restaurantsSlice.actions

export default restaurantsSlice.reducer
