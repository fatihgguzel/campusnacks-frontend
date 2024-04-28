import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { IHeaderLogo } from './types'
import {
  headerLogoStyles,
  campusnacksLogoStyles,
  campusnacksStyles,
} from './styles'
import campusnacks from '../../../../assets/images/campusnacks.svg'
import campusnacksLogo from '../../../../assets/images/campusnacks-logo.svg'

export const HeaderLogo: React.FC<IHeaderLogo> = React.memo(
  ({ className, dataAttr }) => {
    const navigate = useNavigate()
    const handleOnClick = useCallback(() => {
      navigate('/', { replace: true })
    }, [])

    return (
      <div
        css={headerLogoStyles}
        onClick={handleOnClick}
        className={className}
        {...dataAttr}
      >
        <img src={campusnacks} css={campusnacksStyles} />
        <img src={campusnacksLogo} css={campusnacksLogoStyles} />
      </div>
    )
  },
)
