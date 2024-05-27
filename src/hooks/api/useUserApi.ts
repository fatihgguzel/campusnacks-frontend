import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setUser } from '../../store'
import { API_CONFIG } from '../../config'
import { RequestResponse, RequestService } from '../../services'
import {
  getOrderDetailsResponse,
  getUserDetailsResponse,
  getUserOrdersResponse,
} from '../../types/api/responseObjects'
import {
  orderIdParams,
  postCreateOrderBody,
  putUpdateUserbody,
} from 'src/types/api/requestObjects'
import { useNotification } from '../useNotification'
import { setUserOrders } from 'src/store/user-orders'

interface IUseUserApiReturn {
  getUser: () => Promise<getUserDetailsResponse['data']>
  giveOrder: (data: postCreateOrderBody) => Promise<void>
  updateUser: (data: putUpdateUserbody) => Promise<void>
  getOrders: () => Promise<getUserOrdersResponse['data']>
  getOrderDetails: (
    data: orderIdParams,
  ) => Promise<getOrderDetailsResponse['data']>
  isLoading: boolean
}

export const useUserApi = (): IUseUserApiReturn => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { success } = useNotification()
  const { userOrdersQuery } = useSelector(({ userOrders }: RootState) => ({
    userOrdersQuery: userOrders.ordersQuery,
  }))

  const getUser = async (): Promise<getUserDetailsResponse['data']> => {
    setIsLoading(true)
    try {
      const res: RequestResponse<getUserDetailsResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.USER,
        })

      dispatch(setUser(res.data.data))

      return res.data.data
    } finally {
      setIsLoading(false)
    }
  }

  const giveOrder = async (data: postCreateOrderBody) => {
    setIsLoading(true)
    try {
      await RequestService.callApi({
        method: 'POST',
        url: API_CONFIG.USER_CREATE_ORDER,
        data,
      })

      success('user_give_order')
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (data: putUpdateUserbody) => {
    setIsLoading(true)
    try {
      await RequestService.callApi({
        method: 'PUT',
        url: API_CONFIG.USER,
        data,
      })

      success('user_update')
    } finally {
      setIsLoading(false)
    }
  }

  const getOrders = async () => {
    setIsLoading(true)
    dispatch(setUserOrders({ isLoading: true }))
    try {
      const res: RequestResponse<getUserOrdersResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.USER_ORDERS,
          params: { ...userOrdersQuery },
        })

      dispatch(setUserOrders({ data: res.data.data }))

      return res.data.data
    } finally {
      setIsLoading(false)
      dispatch(setUserOrders({ isLoading: false }))
    }
  }

  const getOrderDetails = async (data: orderIdParams) => {
    setIsLoading(true)
    try {
      const res: RequestResponse<getOrderDetailsResponse, any> =
        await RequestService.callApi({
          method: 'GET',
          url: API_CONFIG.USER_ORDERS + `/${data.orderId}`,
        })

      return res.data.data
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getUser,
    giveOrder,
    getOrderDetails,
    isLoading,
    updateUser,
    getOrders,
  }
}
