import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useValidation } from '../../hooks'
import { COLOR, colors } from '../../theme'
import { Icon, icons } from '../../lib'
import { Button, BUTTON_THEME, BUTTON_TYPE } from '../button'
import {
  IInput,
  INPUT_SIZE,
  INPUT_THEME,
  INPUT_VARIANT,
  INPUT_WIDTH,
} from './types'
import {
  errorStyles,
  iconStyles,
  inputAreaStyles,
  inputStyles,
  labelStyles,
  wrapperStyles,
} from './styles'

export const Input: React.FC<IInput> = React.memo(
  ({
    placeholder,
    label,
    icon,
    iconSize,
    disabled = false,
    theme = INPUT_THEME.LIGHT,
    variant = INPUT_VARIANT.DEFAULT,
    size = INPUT_SIZE.BIG,
    width = INPUT_WIDTH.FULL,
    type = 'text',
    clearButton = true,
    copyButton = false,
    value = '',
    numberValue = 0,
    numberMin = 0,
    numberMax = Infinity,
    errorText,
    errorAlignRight,
    solidError,
    name,
    validation,
    squeezed = false,
    onChange,
    onChangeNumber,
    onEnter,
    onBlur,
    onFocus,
    onValidation,
    className,
    dataAttr,
    labelTheme,
    disabledCheckOnBlur,
    constantValidation,
  }) => {
    const [isCopied, setIsCopied] = useState(false)
    const [focused, setFocused] = useState(false)

    const [isValid, validationError, checkValidation, resetValidation] =
      useValidation(
        validation
          ? {
              value: value,
              rules: validation,
            }
          : {},
      )

    const errorOverride = useMemo(
      () => errorText || validationError,
      [validationError, errorText],
    )

    useEffect(() => {
      if (numberMax < numberValue) {
        onChangeNumber?.(numberMax)
      }
    }, [numberMax])

    useEffect(() => {
      onValidation?.(isValid)
    }, [isValid, value])

    const onInputFocus = useCallback(() => {
      setFocused(true)
      if (!constantValidation) {
        resetValidation()
      }
      onFocus && onFocus()
    }, [value, constantValidation])

    const onInputBlur = useCallback(() => {
      setFocused(false)
      if (!disabledCheckOnBlur) {
        checkValidation()
      }
      if (type === 'number') {
        onChangeNumber?.(
          !numberValue
            ? numberMin
            : Math.min(Math.max(numberValue, numberMin), numberMax),
        )
      }
      onBlur && onBlur()
    }, [value, numberValue, type, onChangeNumber, numberMin, numberMax])

    const onChangeHandler = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        if (type === 'number') {
          onChangeNumber?.(parseInt(e.currentTarget.value))
        } else {
          onChange?.(e.currentTarget.value)
        }
      },
      [constantValidation, checkValidation, onChange, onChangeNumber],
    )

    useEffect(() => {
      if (constantValidation) {
        checkValidation()
      }
    }, [constantValidation, value])

    const onClearClick = () => {
      onChange && onChange('')
    }

    const onKeyDownHandler = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnter) {
          checkValidation()
          onEnter()
        }
      },
      [onEnter, value],
    )

    const buttonTheme = useMemo<BUTTON_THEME>(() => {
      return theme === INPUT_THEME.DARK ? BUTTON_THEME.WHITE : BUTTON_THEME.GRAY
    }, [theme])

    const iconColor = useMemo<COLOR>(() => {
      if (variant === INPUT_VARIANT.GHOST) {
        return focused ? colors.primary.DEFAULT : colors.text[2]
      }
      switch (theme) {
        case INPUT_THEME.DARK:
          return focused ? colors.white.DEFAULT : colors.elements.DEFAULT
        case INPUT_THEME.LIGHT:
          return focused ? colors.primary.DEFAULT : colors.text[2]
      }
    }, [theme, focused])

    const onCopyClick = async () => {
      if (value !== undefined) {
        await navigator.clipboard.writeText(value)
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      }
    }

    const handleNumberIncrease = useCallback(() => {
      onChangeNumber?.(Math.min(numberValue + 1, numberMax))
    }, [numberValue, onChangeNumber, numberMax])

    const handleNumberDecrease = useCallback(() => {
      onChangeNumber?.(Math.max(numberValue - 1, numberMin))
    }, [numberValue, onChangeNumber, numberMin])

    return (
      <div {...dataAttr} css={wrapperStyles({ width })} className={className}>
        {label && <div css={labelStyles({ size, labelTheme })}>{label}</div>}
        <div
          css={inputAreaStyles({
            icon,
            theme,
            variant,
            size,
            focused,
            squeezed,
            disabled,
            isError: !!errorOverride,
          })}
        >
          {icon && (
            <Icon
              css={iconStyles}
              icon={icon}
              color={iconColor}
              size={iconSize ?? 24}
            />
          )}
          <input
            css={inputStyles({ theme })}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            placeholder={placeholder}
            value={type === 'number' ? numberValue : value}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            type={type}
            autoComplete="on"
            name={name}
            disabled={disabled}
          />
          {type === 'number' && !disabled && (
            <div className="number-buttons">
              <Icon
                icon={icons.chevron_up}
                color={colors.white.DEFAULT}
                size={16}
                onClick={handleNumberIncrease}
              />
              <Icon
                icon={icons.chevron_down}
                color={colors.white.DEFAULT}
                size={16}
                onClick={handleNumberDecrease}
              />
            </div>
          )}
          {clearButton && value && !disabled && (
            <Button
              theme={buttonTheme}
              type={BUTTON_TYPE.GHOST}
              isLink
              icon={icons.close}
              onClick={onClearClick}
              preventFocus
            />
          )}
          {copyButton && !isCopied && (
            <Button
              theme={buttonTheme}
              type={BUTTON_TYPE.GHOST}
              isLink
              icon={icons.copy}
              onClick={onCopyClick}
              preventFocus
            />
          )}
          {isCopied && <div className="copy-text">Copied!</div>}
        </div>
        {errorOverride && (
          <div
            css={errorStyles({ size, errorAlignRight, solidError })}
            className="input-error"
          >
            {errorOverride}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
