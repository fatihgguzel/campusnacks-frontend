import React, { useState } from 'react'
import { IRowActions } from './types'
import { useLanguage, useRestaurantApi } from 'src/hooks'
import * as Enums from 'src/types/api/enums'
import { wrapperStyles } from './styles'
import { Button } from 'src/components/button'
import { Modal, MODAL_POSITION } from 'src/components/modal'
import { OrderDetails } from '../order-details'

export const RowActions: React.FC<IRowActions> = React.memo(({ orderId }) => {
  const { updateOrder } = useRestaurantApi()
  const { t } = useLanguage()
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleStatusChange = async (status: Enums.OrderStatusTypes) => {
    updateOrder({ orderId, status })
  }

  return (
    <div css={wrapperStyles}>
      <Button
        text={t('set_on_deliver')}
        className="row-button deliver-button"
        onClick={() => handleStatusChange(Enums.OrderStatusTypes.ONDELIVER)}
      />
      <Button
        text={t('set_complete')}
        className="row-button complete-button"
        onClick={() => handleStatusChange(Enums.OrderStatusTypes.COMPLETED)}
      />
      <Button
        text={t('cancel_order')}
        className="row-button cancel-button"
        onClick={() => handleStatusChange(Enums.OrderStatusTypes.CANCELLED)}
      />
      <Button
        text={t('show_details')}
        onClick={() => setIsDetailsModalOpen(true)}
      />

      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        position={MODAL_POSITION.CENTER}
        mobileVerticalAlign={true}
      >
        <OrderDetails
          orderId={orderId}
          onCloseclick={() => setIsDetailsModalOpen(false)}
        />
      </Modal>
    </div>
  )
})
