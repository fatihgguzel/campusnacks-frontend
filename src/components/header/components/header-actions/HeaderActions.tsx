import React, { useCallback, useLayoutEffect, useState } from 'react'
import { RootState, selectRestaurant, selectUser } from '../../../../store'
import { dropdownStyles, headerActionsStyles } from './styles'
import { IHeaderActions, Languages } from './types'
import {
  useAuthApi,
  useLanguage,
  useNotification,
  usePageRefresh,
  useRestaurantApi,
  useUserApi,
} from '../../../../hooks'
import { useSelector } from 'react-redux'
import { Button, BUTTON_TYPE } from '../../../button'
import { Modal, MODAL_POSITION } from '../../../modal'
import { SignCard } from '../../../sign-card'
import { UserDropdownMenu } from '../../../user-dropdown-menu/UserDropdownMenu'
import {
  Dropdown,
  DROPDOWN_WIDTH,
  IDropdownItem,
  IDropdownValue,
} from '../../../dropdown'
import { icons } from '../../../../lib'
import { useAuthProvider } from '../../../../provider'
import { mapLanguages } from '../../../../helpers'
import { DateTimeService, RequestService } from '../../../../services'
import { jwtDecode } from 'jwt-decode'
import { JWTPayload } from '../../../../config'

export const HeaderActions: React.FC<IHeaderActions> = React.memo(
  ({ dataAttr, className }) => {
    const { getUser } = useUserApi()
    const { getRestaurant } = useRestaurantApi()
    const { token } = useAuthProvider()
    const { t, changeLanguage, fallbackLanguage } = useLanguage()
    const [isSignModalOpen, setSignModalOpen] = useState(false)
    const { clearToken } = useAuthProvider()
    const defaultLanguage = Object.keys(Languages)[0]
    const selectedLanguage = localStorage.getItem('currentLanguage')
    const localTokenCreatedAt = localStorage.getItem('tokenCreatedAt') || ''
    const { error } = useNotification()
    const isTokenExpired = DateTimeService.isTokenExpired(localTokenCreatedAt)

    const user = useSelector(selectUser).data
    const restaurant = useSelector(selectRestaurant).data

    const handleLogout = () => {
      clearToken()
    }

    useLayoutEffect(() => {
      if (token) {
        RequestService.setAuthHeader(token)
        const payload = jwtDecode<JWTPayload>(token)

        if (payload.isUser) {
          getUser()
        } else {
          getRestaurant()
        }
      }
    }, [token])

    const onLanguageChangeHandler = useCallback((value?: IDropdownItem) => {
      const lang = value?.value as IDropdownValue as string
      if (!lang) {
        return
      }

      try {
        changeLanguage(lang)

        localStorage.setItem('currentLanguage', lang)
      } catch {
        error(t('something_wrong'))
        changeLanguage(fallbackLanguage)
      }
    }, [])

    return (
      <>
        {user || restaurant || (!isTokenExpired && token) ? (
          <>
            <UserDropdownMenu
              items={[
                {
                  name: t('logout'),
                  value: t('logout'),
                  icon: icons.logout,
                  onItemClick: () => usePageRefresh(handleLogout),
                },
              ]}
              name={user ? user.fullName : restaurant?.name}
            />
          </>
        ) : (
          <>
            <div css={headerActionsStyles} className={className} {...dataAttr}>
              <Button
                text={t('login')}
                type={BUTTON_TYPE.REVERSE}
                height={35}
                onClick={() => setSignModalOpen(true)}
              />
              <Button
                text={t('signup')}
                className="signupButtonStyles"
                height={35}
                onClick={() => setSignModalOpen(true)}
              />
            </div>
            <Modal
              isOpen={isSignModalOpen}
              onClose={() => setSignModalOpen(false)}
              position={MODAL_POSITION.CENTER}
              mobileVerticalAlign={true}
            >
              <SignCard
                onCloseclick={() => setSignModalOpen(false)}
                isOpen={isSignModalOpen}
              />
            </Modal>
          </>
        )}
        <div css={dropdownStyles(!!user)}>
          <Dropdown
            selected={selectedLanguage ? selectedLanguage : defaultLanguage}
            items={mapLanguages()}
            icon={icons.earth}
            width={DROPDOWN_WIDTH.FULL}
            downIcon={icons.chevron_down}
            onChange={onLanguageChangeHandler}
          />
        </div>
      </>
    )
  },
)
