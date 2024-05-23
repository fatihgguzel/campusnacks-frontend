import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItem } from './types'

interface IOrderCartSliceState {
  restaurantId: number | null
  cartItems: ICartItem[]
  totalCount: number
}

const initialState: IOrderCartSliceState = {
  restaurantId: null,
  cartItems: [],
  totalCount: 0,
}

export const orderCartSlice = createSlice({
  name: 'orderCart',
  initialState,
  reducers: {
    setRestaurantId: (
      state,
      action: PayloadAction<{ restaurantId: number | null }>,
    ) => {
      state.restaurantId = action.payload.restaurantId
    },
    addCartItem: (state, action: PayloadAction<ICartItem>) => {
      if (
        state.cartItems.some((cartItem) => cartItem.id === action.payload.id)
      ) {
        const addCartItem = state.cartItems.find(
          (cartItem) => cartItem.id === action.payload.id,
        )

        if (addCartItem) {
          addCartItem.count++
        }
      } else {
        state.cartItems.push(action.payload)
      }

      state.totalCount++
    },
    removeCartItem: (state, action: PayloadAction<ICartItem>) => {
      if (
        state.cartItems.some((cartItem) => cartItem.id === action.payload.id)
      ) {
        const removeCartItem = state.cartItems.find(
          (cartItem) => cartItem.id === action.payload.id,
        )

        if (removeCartItem) {
          if (removeCartItem.count > 1) {
            removeCartItem.count--
          } else if (removeCartItem.count === 1) {
            state.cartItems = state.cartItems.filter(
              (cartItem) => cartItem.id !== action.payload.id,
            )
          }

          state.totalCount--
        }
      }
    },
    clearCart: (state) => {
      state.restaurantId = null
      state.cartItems = []
      state.totalCount = 0
    },
  },
})

export const { setRestaurantId, addCartItem, removeCartItem, clearCart } =
  orderCartSlice.actions

export default orderCartSlice.reducer
