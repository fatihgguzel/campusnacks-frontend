import { css } from '@emotion/react'
import { IIcon } from './icon-types'

type IWrapperStyles = Pick<IIcon, 'onClick'>
export const wrapperStyles = ({ onClick }: IWrapperStyles) => css`
  ${onClick ? 'cursor: pointer;' : ''}
`
