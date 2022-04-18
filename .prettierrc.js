const prettierConfigStandard = require('prettier-config-standard')
const merge = require('lodash.merge')

const modifiedConfig = merge(
  {},
  prettierConfigStandard,
  {
    semi: true,
  }
)

module.exports = modifiedConfig
