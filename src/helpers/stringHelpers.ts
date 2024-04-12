export const capitalizeFirstLetter = (text: string): string =>
  text?.length ? text[0].toUpperCase() + text.slice(1) : text
