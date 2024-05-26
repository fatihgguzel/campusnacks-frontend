import React, { useState } from 'react'
import { IRestaurantContentCard } from './types'
import itemPlaceholder from '../../../../assets/images/item-placeholder.svg'
import {
  cardThumbnailStyles,
  wrapperStyles,
  cardContentStyles,
  addToCartStyles,
} from './styles'
import { Icon, icons } from '../../../../lib'
import { colors } from '../../../../theme'
import { useDispatch } from 'react-redux'
import { Modal, MODAL_POSITION } from 'src/components/modal'
import { EditItem } from '../edit-item'

export const RestaurantContentCard: React.FC<IRestaurantContentCard> =
  React.memo(({ id, name, description, price, imageUrl }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isEditHovered, setIsEditHovered] = useState(false)
    const [editModalOpened, setEditModalOpened] = useState(false)
    const dispatch = useDispatch()

    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        css={wrapperStyles(isHovered)}
      >
        <div css={cardContentStyles}>
          <h3 className="content-name">{name}</h3>
          <div className="content-price">{price} TL</div>
          <div className="content-description">{description}</div>
        </div>
        <div css={cardThumbnailStyles(isHovered)}>
          <img
            className="placeholder-img"
            src={imageUrl ? imageUrl : itemPlaceholder}
          />
          <div
            css={addToCartStyles(isEditHovered)}
            onMouseEnter={() => setIsEditHovered(true)}
            onMouseLeave={() => setIsEditHovered(false)}
            onClick={() => {
              setEditModalOpened(true)
            }}
          >
            <Icon
              icon={icons.pencil}
              size={20}
              color={colors.primary.DEFAULT}
            />
          </div>
        </div>

        <Modal
          isOpen={editModalOpened}
          onClose={() => setEditModalOpened(false)}
          position={MODAL_POSITION.CENTER}
          mobileVerticalAlign={true}
        >
          <EditItem
            itemId={id}
            onCloseClick={() => setEditModalOpened(false)}
            isOpen={editModalOpened}
          />
        </Modal>
      </div>
    )
  })
