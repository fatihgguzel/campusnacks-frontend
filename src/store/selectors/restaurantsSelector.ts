import { RootState } from '../store'

export const selectRestaurants = (state: RootState) => {
  state.restaurants
}
