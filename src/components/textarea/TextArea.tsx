import React, { useCallback, useState } from 'react'

import { ITextArea } from './types'
import { labelStyles, textAreaElementStyles, textAreaStyles } from './styles'

export const TextArea: React.FC<ITextArea> = React.memo(
  ({
    value,
    placeholder,
    rows,
    label,
    onChange,
    onBlur,
    onFocus,
    className,
    dataAttr,
    note,
    isValid = true,
  }) => {
    const [focused, setFocused] = useState(false)

    const onTextAreaFocus = useCallback(() => {
      setFocused(true)
      onFocus && onFocus()
    }, [value])

    const onTextAreaBlur = useCallback(() => {
      setFocused(false)

      onBlur && onBlur()
    }, [value])

    const handleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.currentTarget.value)
      },
      [onChange],
    )
    return (
      <div
        css={textAreaStyles(focused, isValid)}
        {...dataAttr}
        className={className}
      >
        {label && <div css={labelStyles}>{label}</div>}
        <textarea
          css={textAreaElementStyles(note)}
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
          rows={rows}
          onBlur={onTextAreaBlur}
          onFocus={onTextAreaFocus}
        />
      </div>
    )
  },
)
