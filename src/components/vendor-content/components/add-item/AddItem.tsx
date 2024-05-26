import React, { useEffect, useState } from 'react'
import { IAddItem } from './types'
import {
  Button,
  BUTTON_SIZE,
  BUTTON_THEME,
  BUTTON_TYPE,
  BUTTON_WIDTH,
} from 'src/components/button'
import { icons } from 'src/lib'
import { COLOR } from 'src/theme'
import { wrapperStyles } from './styles'
import { Input, INPUT_SIZE, INPUT_WIDTH } from 'src/components/input'
import { useLanguage, useRestaurantApi, VALIDATION_RULE_TYPES } from 'src/hooks'
import * as Enums from 'src/types/api/enums'
import _ from 'lodash'

export const AddItem: React.FC<IAddItem> = React.memo(
  ({ onCloseClick, isOpen }) => {
    const { addItem } = useRestaurantApi()
    const { t } = useLanguage()

    const [itemName, setItemName] = useState('')
    const [itemNameValid, setIsItemNameValid] = useState(false)
    const [itemDescription, setItemDescription] = useState('')
    const [itemDescriptionValid, setIsItemDescriptionValid] = useState(false)
    const [itemPrice, setItemPrice] = useState('')
    const [itemPriceValid, setIsItemPriceValid] = useState(true)
    const [isFormValid, setIsFormValid] = useState(false)

    const submitHandler = () => {
      addItem({
        name: itemName,
        description: itemDescription,
        price: Number(itemPrice),
        itemType: Enums.ItemTypes.MENU,
      })

      onCloseClick?.()
    }

    useEffect(() => {
      setItemName('')
      setItemDescription('')
      setItemPrice('')
    }, [isOpen])

    useEffect(() => {
      setIsFormValid(
        itemNameValid &&
          itemDescriptionValid &&
          itemPriceValid &&
          _.isFinite(Number(itemPrice)),
      )
    }, [itemNameValid, itemDescriptionValid, itemPriceValid, itemPrice])

    return (
      <div css={wrapperStyles}>
        <div className="close-button-area">
          <Button
            icon={icons.close}
            iColor={COLOR.primary_100}
            size={BUTTON_SIZE.AUTO}
            type={BUTTON_TYPE.GHOST}
            theme={BUTTON_THEME.ELEMENTS}
            iconSize={20}
            onClick={onCloseClick}
          />
        </div>
        <div className="content">
          <div className="edit-item-name">
            <Input
              value={itemName}
              onChange={setItemName}
              size={INPUT_SIZE.SMALL}
              width={INPUT_WIDTH.FULL}
              label={t('item_name')}
              validation={{
                [VALIDATION_RULE_TYPES.REQUIRED]: {
                  text: t('validation.error.required', {
                    name: t('item_name'),
                  }),
                },
              }}
              onValidation={setIsItemNameValid}
              errorAlignRight
            />
          </div>
          <div className="edit-description-">
            <Input
              value={itemDescription}
              onChange={setItemDescription}
              size={INPUT_SIZE.SMALL}
              width={INPUT_WIDTH.FULL}
              label={t('item_description')}
              validation={{
                [VALIDATION_RULE_TYPES.REQUIRED]: {
                  text: t('validation.error.required', {
                    name: t('item_description'),
                  }),
                },
              }}
              onValidation={setIsItemDescriptionValid}
              errorAlignRight
            />
          </div>
          <div className="edit-item-price">
            <Input
              value={itemPrice}
              onChange={setItemPrice}
              type="string"
              size={INPUT_SIZE.SMALL}
              width={INPUT_WIDTH.FULL}
              label={t('cost')}
              validation={{
                [VALIDATION_RULE_TYPES.REQUIRED]: {
                  text: t('validation.error.required', {
                    name: t('cost'),
                  }),
                },
              }}
              onValidation={setIsItemPriceValid}
              errorAlignRight
            />
          </div>

          <div className="submit-action">
            <Button
              size={BUTTON_SIZE.SMALL}
              text={t('save')}
              theme={BUTTON_THEME.PRIMARY}
              width={BUTTON_WIDTH.FULL}
              onClick={() => submitHandler()}
              disabled={!isFormValid}
            />
          </div>
        </div>
      </div>
    )
  },
)
