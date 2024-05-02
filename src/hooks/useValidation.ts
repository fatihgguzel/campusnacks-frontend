import { useCallback, useEffect, useState } from 'react'

interface BaseRule {
  text?: string
}

interface RuleRequired extends BaseRule {}

interface RuleMin extends BaseRule {
  value: number
}

interface RuleMax extends BaseRule {
  value: number
}
interface RuleValidMail extends BaseRule {}

interface RuleValidURL extends BaseRule {}

interface RuleRegex extends BaseRule {
  regex: RegExp[]
}

interface RuleExists extends BaseRule {
  value: boolean
}

export enum VALIDATION_RULE_TYPES {
  REQUIRED = 'required',
  MIN = 'min',
  MAX = 'max',
  VALIDMAIL = 'validMail',
  VALIDURL = 'validURL',
  EXISTS = 'exists',
  REGEX = 'regex',
}

export interface ValidationRules {
  [VALIDATION_RULE_TYPES.REQUIRED]?: RuleRequired
  [VALIDATION_RULE_TYPES.MIN]?: RuleMin
  [VALIDATION_RULE_TYPES.MAX]?: RuleMax
  [VALIDATION_RULE_TYPES.VALIDMAIL]?: RuleValidMail
  [VALIDATION_RULE_TYPES.VALIDURL]?: RuleValidURL
  [VALIDATION_RULE_TYPES.REGEX]?: RuleRegex
  [VALIDATION_RULE_TYPES.EXISTS]?: RuleExists
}

interface IUseValidation {
  value?: string
  rules?: ValidationRules
}

type IUseValidationReturn = [boolean, string, () => void, () => void]

export const useValidation = ({
  value,
  rules,
}: IUseValidation): IUseValidationReturn => {
  if (!rules) {
    return [true, '', () => {}, () => {}]
  }
  const [isValid, setIsValid] = useState(false)
  const [errorText, setErrorText] = useState('')
  const emailRegex = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const urlRegex = /^(http|https):\/\/[^ "]+$/

  const validate = (currentValue?: string) =>
    Object.entries(rules)
      .map(([ruleName, rule]: [any, any]) => {
        const minCondition =
          ruleName === VALIDATION_RULE_TYPES.MIN &&
          !((currentValue?.length || 0) >= rule.value)

        const maxCondition =
          ruleName === VALIDATION_RULE_TYPES.MAX &&
          !((currentValue?.length || 0) <= rule.value)

        const requiredCondition =
          ruleName === VALIDATION_RULE_TYPES.REQUIRED && !currentValue?.length

        const emailCondition =
          ruleName === VALIDATION_RULE_TYPES.VALIDMAIL &&
          !(
            (currentValue || currentValue === '') &&
            emailRegex.test(currentValue)
          )

        const urlCondition =
          ruleName === VALIDATION_RULE_TYPES.VALIDURL &&
          !(currentValue && urlRegex.test(currentValue))

        const existCondition =
          ruleName === VALIDATION_RULE_TYPES.EXISTS &&
          !((currentValue || currentValue === '') && rule.value)

        const regexCondition =
          ruleName === VALIDATION_RULE_TYPES.REGEX &&
          !(
            currentValue &&
            rule.regex.some((reg: RegExp) => reg.test(currentValue))
          )

        if (
          minCondition ||
          maxCondition ||
          requiredCondition ||
          emailCondition ||
          urlCondition ||
          existCondition ||
          regexCondition
        ) {
          return rule.text || true
        }
      })
      .filter((v) => v)[0]

  useEffect(() => {
    setIsValid(!validate(value))
  }, [value])

  const checkValidation = useCallback(() => {
    setErrorText(validate(value))
  }, [value])

  const resetValidation = () => {
    setErrorText('')
  }

  return [isValid, errorText, checkValidation, resetValidation]
}
