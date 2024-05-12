import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../../store/restaurant'
import { API_CONFIG } from '../../config'
import { RequestResponse, RequestService } from '../../services'
import { getRestaurantDetailsResponse } from '../../types/api/responseObjects'
import { putUpdateRestaurantBody } from '../../types/api/requestObjects'

interface IUseRestaurantApiReturn {
  getRestaurant: () => Promise<getRestaurantDetailsResponse['data']>
  updateRestaurant: (data: Partial<putUpdateRestaurantBody>) => Promise<void>
  isLoading: boolean
}

export const useRestaurantApi = (): IUseRestaurantApiReturn => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getRestaurant = async (): Promise<
    getRestaurantDetailsResponse['data']
  > => {
    setIsLoading(true)
    try {
      const res: RequestResponse<getRestaurantDetailsResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.RESTAURANT,
        })

      dispatch(setRestaurant(res.data.data))

      return res.data.data
    } finally {
      setIsLoading(false)
    }
  }

  const updateRestaurant = async (data: Partial<putUpdateRestaurantBody>) => {
    setIsLoading(true)
    try {
      await RequestService.callApi({
        method: 'PUT',
        url: API_CONFIG.RESTAURANT,
        data,
      })

      getRestaurant()
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getRestaurant,
    updateRestaurant,
    isLoading,
  }
}
