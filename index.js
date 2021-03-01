const bracketEditor = require('./src/bracket-editor')
const data = require('./src/default-setting')

module.exports = {
  editor: (props = data.deflt) => { bracketEditor(props) },
  setImageUrl: "",
  defaultSetting: data.deflt
}