import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRestaurant } from '../../store/restaurant'
import { API_CONFIG } from '../../config'
import { RequestResponse, RequestService } from '../../services'
import {
  getOrderDetailsResponse,
  getRestaurantDetailsResponse,
  getRestaurantOrdersResponse,
} from '../../types/api/responseObjects'
import {
  orderIdParams,
  putUpdateOrderBody,
  putUpdateRestaurantBody,
} from '../../types/api/requestObjects'
import { setRestaurantOrders } from 'src/store/restaurant-orders'
import { RootState } from 'src/store'

interface IUseRestaurantApiReturn {
  getRestaurant: () => Promise<getRestaurantDetailsResponse['data']>
  updateRestaurant: (data: Partial<putUpdateRestaurantBody>) => Promise<void>
  getOrders: () => Promise<getRestaurantOrdersResponse['data']>
  updateOrder: (data: putUpdateOrderBody) => Promise<void>
  getOrderDetails: (
    data: orderIdParams,
  ) => Promise<getOrderDetailsResponse['data']>
  isLoading: boolean
}

export const useRestaurantApi = (): IUseRestaurantApiReturn => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { restaurantOrdersQuery } = useSelector(
    ({ restaurantOrders }: RootState) => ({
      restaurantOrdersQuery: restaurantOrders.ordersQuery,
    }),
  )

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

  const getOrders = async () => {
    setIsLoading(true)
    dispatch(setRestaurantOrders({ isLoading: true }))
    try {
      const res: RequestResponse<getRestaurantOrdersResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.RESTAURANT_ORDERS,
          params: { ...restaurantOrdersQuery },
        })

      dispatch(setRestaurantOrders({ data: res.data.data }))

      return res.data.data
    } finally {
      setIsLoading(false)
      dispatch(setRestaurantOrders({ isLoading: false }))
    }
  }

  const updateOrder = async (data: putUpdateOrderBody) => {
    setIsLoading(true)
    try {
      await RequestService.callApi({
        method: 'PUT',
        url: API_CONFIG.RESTAURANT_ORDERS,
        data,
      })

      getOrders()
    } finally {
      setIsLoading(false)
    }
  }

  const getOrderDetails = async (data: orderIdParams) => {
    setIsLoading(true)
    try {
      const res: RequestResponse<getOrderDetailsResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.RESTAURANT_ORDERS + `/${data.orderId}`,
        })

      return res.data.data
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getRestaurant,
    updateRestaurant,
    isLoading,
    getOrders,
    updateOrder,
    getOrderDetails,
  }
}
