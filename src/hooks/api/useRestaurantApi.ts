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
  postRestaurantAddItemBody,
  putEditItemBody,
  putUpdateOrderBody,
  putUpdateRestaurantBody,
} from '../../types/api/requestObjects'
import { setRestaurantOrders } from 'src/store/restaurant-orders'
import { RootState } from 'src/store'
import { useNotification } from '../useNotification'

interface IUseRestaurantApiReturn {
  getRestaurant: () => Promise<getRestaurantDetailsResponse['data']>
  updateRestaurant: (data: Partial<putUpdateRestaurantBody>) => Promise<void>
  getOrders: () => Promise<getRestaurantOrdersResponse['data']>
  updateOrder: (data: putUpdateOrderBody) => Promise<void>
  getOrderDetails: (
    data: orderIdParams,
  ) => Promise<getOrderDetailsResponse['data']>
  editItem: (data: putEditItemBody, itemId: number) => Promise<void>
  deleteItem: (itemId: number) => Promise<void>
  addItem: (data: postRestaurantAddItemBody) => Promise<void>
  isLoading: boolean
}

export const useRestaurantApi = (): IUseRestaurantApiReturn => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { error, success } = useNotification()
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

      success('user_update')

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

  const editItem = async (data: putEditItemBody, itemId: number) => {
    setIsLoading(true)
    try {
      await RequestService.callApi({
        method: 'PUT',
        url: API_CONFIG.RESTAURANT_ITEM + `/${itemId}`,
        data,
      })

      success('item_update')

      getRestaurant()
    } catch {
      error('something_wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteItem = async (itemId: number) => {
    setIsLoading(true)
    try {
      await RequestService.callApi({
        method: 'DELETE',
        url: API_CONFIG.RESTAURANT_ITEM + `/${itemId}`,
      })

      success('item_delete')

      getRestaurant()
    } finally {
      setIsLoading(false)
    }
  }

  const addItem = async (data: postRestaurantAddItemBody) => {
    setIsLoading(true)
    try {
      await RequestService.callApi({
        method: 'POST',
        url: API_CONFIG.RESTAURANT_ITEM,
        data,
      })

      success('item_add')

      getRestaurant()
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
    editItem,
    deleteItem,
    addItem,
  }
}
