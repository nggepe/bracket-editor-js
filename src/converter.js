const setting = require('./default-setting').deflt
const highlight = require('./code-highlight')
module.exports = (props = { ...setting, text: "" }) => {
  var text = props.text;

  text = text.replace(/</g, "&lt;");
  text = text.replace(/>/g, "&gt;");
  text = text.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
  text = text.replace(/\n/g, "<br/>");

  for (let i = 0; i < props.bracket.length; i++) {
    const element = props.bracket[i];
    var regx = new RegExp(`${element.open}(.*?)${element.close}`, "g")
    text = text.replace(regx, element.openTag + "$1" + element.closeTag)
  }
  if (props.others.codeBlock.support.active === true) {
    var rgx = new RegExp(`${props.others.codeBlock.support.open}(.*?)${props.others.codeBlock.support.close}`, "g")
    text = text.replace(rgx, function (x) {
      var ropen = new RegExp(props.others.codeBlock.support.open, "g")
      var rclose = new RegExp(props.others.codeBlock.support.close, "")
      var newx = x.replace(ropen, "")
      newx = newx.replace(rclose, "")
      return highlight(newx);
    })
  }
  if (props.others.img.support.active === true) {
    text = text.replace(/\[img (.*?) (.*?) img\]/g, "<img src='$1' width='$2'>");
  }



  props.callback(props.text, text)
}