import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store'
import { API_CONFIG } from '../../config'
import { RequestResponse, RequestService } from '../../services'
import { getUserDetailsResponse } from '../../types/api/responseObjects'

interface IUseUserApiReturn {
  getUser: () => Promise<getUserDetailsResponse['data']>
  isLoading: boolean
}

export const useUserApi = (): IUseUserApiReturn => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  return {
    getUser,
    isLoading,
  }
}
