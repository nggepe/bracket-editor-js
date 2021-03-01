const setting = require('./default-setting').deflt
const elGenerator = require('./element-generator')

module.exports = (props = setting) => {
  elGenerator(props)
}