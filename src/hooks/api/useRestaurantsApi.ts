import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRestaurants } from '../../store/restaurants/restaurantsSlice'
import { API_CONFIG } from '../../config'
import { RequestResponse, RequestService } from '../../services'
import {
  getRestaurantContentResponse,
  getRestaurantsResponse,
} from '../../types/api/responseObjects'
import { RootState } from '../../store'
import { setPublicRestaurant } from '../../store/public-restaurant/publicRestaurantSlice'
import { useNavigate } from 'react-router-dom'

interface IUseRestaurantsApiReturn {
  getRestaurants: (isInitialRender?: boolean) => Promise<void>
  getRestaurantContent: (restaurantId: string) => Promise<void>
  isLoading: boolean
}

export const useRestaurantsApi = (): IUseRestaurantsApiReturn => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { restaurantsQuery } = useSelector(({ restaurants }: RootState) => ({
    restaurantsQuery: restaurants.restaurantsQuery,
  }))

  const getRestaurants = async (isInitialRender?: boolean) => {
    setIsLoading(true)
    dispatch(setRestaurants({ isLoading: true }))
    try {
      const res: RequestResponse<getRestaurantsResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.RESTAURANTS,
          params: { ...restaurantsQuery },
        })

      dispatch(setRestaurants({ data: res.data.data, isInitialRender }))
    } finally {
      setIsLoading(false)
      dispatch(setRestaurants({ isLoading: false }))
    }
  }

  const getRestaurantContent = async (restaurantId: string) => {
    setIsLoading(true)
    dispatch(setPublicRestaurant({ isLoading: true }))
    try {
      const res: RequestResponse<getRestaurantContentResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.RESTAURANTS + `/${restaurantId}`,
        })

      dispatch(setPublicRestaurant({ data: res.data.data }))
    } catch (error: any) {
      if ([404].includes(error?.response?.status))
        navigate('/', { replace: true })
    } finally {
      setIsLoading(false)
      dispatch(setPublicRestaurant({ isLoading: false }))
    }
  }

  return {
    getRestaurants,
    isLoading,
    getRestaurantContent,
  }
}
