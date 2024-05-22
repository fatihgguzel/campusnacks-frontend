import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRestaurantContentResponse } from '../../types/api/responseObjects'
import { LoaderState } from '../types'

interface IPublicRestaurantSliceState {
  info: getRestaurantContentResponse['data']['restaurantInfo'] | null
  items: LoaderState<getRestaurantContentResponse['data']['items']>
}

const initialState: IPublicRestaurantSliceState = {
  info: null,
  items: {
    data: [],
    isLoading: false,
  },
}

export const publicRestaurantSlice = createSlice({
  name: 'publicRestaurant',
  initialState,
  reducers: {
    setPublicRestaurant: (
      state,
      action: PayloadAction<LoaderState<getRestaurantContentResponse['data']>>,
    ) => {
      if (action.payload.data) {
        state.info = action.payload.data.restaurantInfo
        state.items.data = [...action.payload.data.items]
      } else {
        state.items.isLoading = !!action.payload.isLoading
      }
    },
  },
})

export const { setPublicRestaurant } = publicRestaurantSlice.actions

export default publicRestaurantSlice.reducer
