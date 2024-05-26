import React, { useState, useMemo, useCallback, useEffect } from 'react'

import { IPagination } from './types'
import {
  dashboardPaginationWrapperStyles,
  inputWrapperStyles,
  inputStyles,
  numberOfPagesStyles,
  paginationControllerStyles,
  pageInfoStyles,
  nextIconStyles,
  backIconStyles,
  firstClickStyles,
  lastClickStyles,
  seperatorStyles,
} from './styles'
import { RootState } from 'src/store'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon, icons } from 'src/lib'
import { useLanguage } from 'src/hooks'
import { theme } from 'src/theme'
import { setActivePage } from 'src/store/restaurant-orders'

const ORDER_COUNT_PER_PAGE = 20

export const Pagination: React.FC<IPagination> = React.memo(
  ({ className, dataAttr }) => {
    const { ordersCount, activePage } = useSelector(
      ({ restaurantOrders }: RootState) => ({
        ordersCount: restaurantOrders.totalCount,
        activePage: restaurantOrders.activePage,
      }),
    )
    const { t } = useLanguage()
    const dispatch = useDispatch()
    const [isInputFocus, setIsInputFocus] = useState(false)
    const [isUserAction, setIsUserAction] = useState(false)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const numberOfPages = useMemo(() => {
      if (!ordersCount) {
        return 1
      } else {
        return Math.ceil(ordersCount / ORDER_COUNT_PER_PAGE)
      }
    }, [ordersCount])

    const submitPageChange = useCallback(() => {
      setIsInputFocus(false)
      setIsUserAction(false)
      const pageNumberParameter = (
        activePage <= 0 || !activePage ? 1 : activePage
      ).toString()

      setSearchParams((params) => {
        params.set('page', pageNumberParameter)
        return params
      })
      navigate({ search: searchParams.toString() })
    }, [activePage])
    const handleBackClick = useCallback(() => {
      if (!isBackActive) {
        return
      }
      setIsUserAction(true)
      dispatch(setActivePage(activePage - 1))
    }, [activePage])

    const handleNextClick = useCallback(() => {
      if (!isNextActive) {
        return
      }
      setIsUserAction(true)
      dispatch(setActivePage(activePage + 1))
    }, [activePage, numberOfPages])

    const handleFirstClick = useCallback(() => {
      if (!isBackActive) {
        return
      }
      setIsUserAction(true)
      dispatch(setActivePage(1))
    }, [activePage])

    const handleLastClick = useCallback(() => {
      if (!isNextActive) {
        return
      }
      setIsUserAction(true)
      dispatch(setActivePage(numberOfPages))
    }, [activePage, numberOfPages])

    useEffect(() => {
      if (!isInputFocus && isUserAction) {
        submitPageChange()
      }
    }, [activePage, isUserAction])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          submitPageChange()
        }
      },
      [submitPageChange],
    )

    const isBackActive = useMemo(() => {
      return activePage !== 1
    }, [activePage])

    const isNextActive = useMemo(() => {
      return numberOfPages !== activePage
    }, [activePage, numberOfPages])

    const handlePageChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setIsInputFocus(true)
        if (value) {
          dispatch(setActivePage(parseInt(value, 10)))
        } else {
          dispatch(setActivePage(0))
        }
      },
      [],
    )

    return (
      <div
        css={dashboardPaginationWrapperStyles}
        className={className}
        {...dataAttr}
      >
        <div css={paginationControllerStyles(isBackActive && !isInputFocus)}>
          <div
            css={firstClickStyles(isBackActive && !isInputFocus)}
            onClick={handleFirstClick}
          >
            {t('first')}
          </div>
          <div css={backIconStyles(isBackActive && !isInputFocus)}>
            <Icon
              icon={icons.chevron_left}
              color={
                isBackActive && !isInputFocus
                  ? theme.colors.primary.DEFAULT
                  : theme.colors.black[20]
              }
              onClick={handleBackClick}
            />
          </div>
        </div>
        <div css={pageInfoStyles}>
          <div css={inputWrapperStyles}>
            <input
              css={inputStyles(isInputFocus)}
              value={activePage}
              onChange={handlePageChange}
              onBlur={submitPageChange}
              onKeyDown={handleKeyDown}
              type="text"
              pattern="\d*"
              maxLength={3}
            />
          </div>
          <div css={seperatorStyles}>/</div>
          <div css={numberOfPagesStyles}>{numberOfPages}</div>
        </div>
        <div css={paginationControllerStyles(isNextActive && !isInputFocus)}>
          <div css={nextIconStyles(isNextActive && !isInputFocus)}>
            <Icon
              icon={icons.chevron_right}
              color={
                isNextActive && !isInputFocus
                  ? theme.colors.primary.DEFAULT
                  : theme.colors.black[20]
              }
              onClick={handleNextClick}
            />
          </div>

          <div
            css={lastClickStyles(isNextActive && !isInputFocus)}
            onClick={handleLastClick}
          >
            {t('last')}
          </div>
        </div>
      </div>
    )
  },
)

Pagination.displayName = 'Pagination'
