import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRestaurantDetailsResponse } from '../../types/api/responseObjects'

interface IRestaurantSliceState {
  data: getRestaurantDetailsResponse['data']['restaurant'] | null
}

const initialState: IRestaurantSliceState = {
  data: null,
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (
      state,
      action: PayloadAction<getRestaurantDetailsResponse['data']>,
    ) => {
      state.data = action.payload.restaurant
    },
  },
})

export const { setRestaurant } = restaurantSlice.actions

export default restaurantSlice.reducer
