const plugin = require("tailwindcss/plugin")

module.exports = function () {
  return plugin(function ({ theme, addUtilities, variants, e }) {
    const themeSpacings = theme("spacing")
    const spacingKeys = Object.keys(themeSpacings)
    const getSafeInsetValue = (dir, key) =>
      `calc(env(safe-area-inset-${dir}) + ${Number(themeSpacings[key]) ? `${themeSpacings[key]}px` : themeSpacings[key]})`


    const safeInsetUtils = spacingKeys.map((key) => ({
      [`.${e(`pt-safe-${key}`)}`]: {
        paddingTop: getSafeInsetValue("top", key),
      },
      [`.${e(`pr-safe-${key}`)}`]: {
        paddingRight: getSafeInsetValue("right", key),
      },
      [`.${e(`pb-safe-${key}`)}`]: {
        paddingBottom: getSafeInsetValue("bottom", key),
      },
      [`.${e(`pl-safe-${key}`)}`]: {
        paddingLeft: getSafeInsetValue("left", key),
      },
      [`.${e(`mt-safe-${key}`)}`]: {
        marginTop: getSafeInsetValue("top", key),
      },
      [`.${e(`mr-safe-${key}`)}`]: {
        marginRight: getSafeInsetValue("right", key),
      },
      [`.${e(`mb-safe-${key}`)}`]: {
        marginBottom: getSafeInsetValue("bottom", key),
      },
      [`.${e(`ml-safe-${key}`)}`]: {
        marginLeft: getSafeInsetValue("left", key),
      },
      [`.${e(`top-safe-${key}`)}`]: {
        top: getSafeInsetValue("top", key),
      },
      [`.${e(`right-safe-${key}`)}`]: {
        right: getSafeInsetValue("right", key),
      },
      [`.${e(`bottom-safe-${key}`)}`]: {
        bottom: getSafeInsetValue("bottom", key),
      },
      [`.${e(`left-safe-${key}`)}`]: {
        left: getSafeInsetValue("left", key),
      },
    }))

    addUtilities(safeInsetUtils, variants("safeInset"))
  })
}
