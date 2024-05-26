import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store'
import { API_CONFIG } from '../../config'
import { RequestResponse, RequestService } from '../../services'
import { getUserDetailsResponse } from '../../types/api/responseObjects'
import { postCreateOrderBody } from 'src/types/api/requestObjects'
import { useNotification } from '../useNotification'

interface IUseUserApiReturn {
  getUser: () => Promise<getUserDetailsResponse['data']>
  giveOrder: (data: postCreateOrderBody) => Promise<void>
  isLoading: boolean
}

export const useUserApi = (): IUseUserApiReturn => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { success } = useNotification()

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

  return {
    getUser,
    giveOrder,
    isLoading,
  }
}
