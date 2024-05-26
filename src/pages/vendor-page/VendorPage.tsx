import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { wrapperStyles } from './styles'
import { VendorContent } from 'src/components/vendor-content'

export const VendorPage: React.FC = React.memo(() => {
  const { restaurant } = useSelector(({ restaurant }: RootState) => ({
    restaurant: restaurant.data,
  }))

  return (
    <div css={wrapperStyles}>
      <VendorContent
        name={restaurant?.name}
        hasDelivery={restaurant?.hasDelivery}
        minimumPrice={restaurant?.minimumPrice}
        items={restaurant?.items}
        isOpen={restaurant?.isOpen}
      />
    </div>
  )
})
