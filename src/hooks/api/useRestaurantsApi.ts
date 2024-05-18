import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRestaurants } from '../../store/restaurants/restaurantsSlice'
import { API_CONFIG } from '../../config'
import { RequestResponse, RequestService } from '../../services'
import { getRestaurantsResponse } from '../../types/api/responseObjects'
import { RootState } from '../../store'

interface IUseRestaurantsApiReturn {
  getRestaurants: () => Promise<void>
  isLoading: boolean
}

export const useRestaurantsApi = (): IUseRestaurantsApiReturn => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const { restaurantsQuery } = useSelector(({ restaurants }: RootState) => ({
    restaurantsQuery: restaurants.restaurantsQuery,
  }))

  const getRestaurants = async () => {
    setIsLoading(true)
    dispatch(setRestaurants({ isLoading: true }))
    try {
      const res: RequestResponse<getRestaurantsResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.RESTAURANTS,
          params: { ...restaurantsQuery },
        })

      dispatch(setRestaurants({ data: res.data.data }))
    } finally {
      setIsLoading(false)
      dispatch(setRestaurants({ isLoading: false }))
    }
  }

  return {
    getRestaurants,
    isLoading,
  }
}
