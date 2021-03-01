module.exports = (text) => {
  var newText = text
  newText = newText.replace(/(class|function|typeof|func|def)/g, "<span class='class-element'>$1</span>")

  newText = newText.replace(/(\W)([A-Z]\w+)/g, "$1<span class='class-code'>$2</span>")
  newText = newText.replace(/(\w+)\(/g, "<span class='function-code'>$1</span>(")
  newText = newText.replace(/(\[|\]|\{|\}|\(|\))/g, "<span class='bracket-code'>$1</span>")
  newText = newText.replace(/(private|\final|protected)/g, "<span class='private-code'>$1</span>")
  newText = newText.replace(/(const|private)/g, "<span class='private-code'>$1</span>")
  newText = newText.replace(/(".*?")/g, "<span class='word-code'>$1</span>")
  newText = newText.replace(/(var|let|const|\$\w+)/g, "<span class='jstype-code'>$1</span>")
  newText = newText.replace(/(return|while|(foreach|for)|switch|case|break)/gi, "<span class='general-code'>$1</span>")
  newText = newText.replace(/(int|boolean|bool|string|integer)/gi, "<span class='generaltype-code'>$1</span>")
  newText = newText.replace(/(\/\/.*?<br\/>|\/\/\/.*?\n|\/\*.*?\*\/|<!--.*?-->)/g, "<span class='comment-code'>$1</span>")


  return "<pre>" + newText + "</pre>"
}