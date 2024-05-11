import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserDetailsResponse } from '../../types/api/responseObjects'

interface IUserSliceState {
  data: getUserDetailsResponse['data']['user'] | null
  meta: getUserDetailsResponse['data']['meta'] | null
}

const initialState: IUserSliceState = {
  data: null,
  meta: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<getUserDetailsResponse['data']>) => {
      state.data = action.payload.user
      state.meta = action.payload.meta
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
