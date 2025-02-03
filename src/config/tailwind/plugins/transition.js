const plugin = require("tailwindcss/plugin");

module.exports = function () {
  return plugin(function ({ addUtilities, e }) {
    const defaultTransition = {
      [`.${e("default-transition")}`]: {
        transition: "all 200ms ease-in-out",
      },
    };
    addUtilities(defaultTransition, ["responsive", "hover"]);
  });
};
