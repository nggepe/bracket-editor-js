function bracketReplace(text, word, opentag, openlength, closelength, closetag) {
  return text.replace(word, opentag + word.substring(openlength, word.length - closelength) + closetag);
}

module.exports = {
  convertCallback: ({ bracket, callback, data }) => {
    var text = data.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    text = text.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    text = text.replace(/\n/g, "<br/>");

    for (let i = 0; i < bracket.length; i++) {
      const openbracket = bracket[i]['open'];
      const closebracket = bracket[i]['close'];
      const opentag = bracket[i]['opentag'];
      const closetag = bracket[i]['closetag'];

      const openlength = openbracket.replace(/\\/g, "").length;
      const closelength = closebracket.replace(/\\/g, "").length;

      var replace = `${openbracket}[^\\s](.*?)[^\\s]${closebracket}`;
      var regex = new RegExp(replace, "g");
      const newMatch = text.match(regex);
      if (newMatch != null)
        for (let i = 0; i < newMatch.length; i++) {
          text = text = bracketReplace(text, newMatch[i], opentag, openlength, closelength, closetag);
        }
    }
    if (typeof callback !== 'undefined') callback(data, text)
  },
  convert: ({ bracket, data }) => {
    console.log(bracket)
    var text = data.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    text = text.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    text = text.replace(/\n/g, "<br/>");

    for (let i = 0; i < bracket.length; i++) {
      const openbracket = bracket[i]['open'];
      const closebracket = bracket[i]['close'];
      const opentag = bracket[i]['opentag'];
      const closetag = bracket[i]['closetag'];

      const openlength = openbracket.replace(/\\/g, "").length;
      const closelength = closebracket.replace(/\\/g, "").length;

      var replace = `${openbracket}[^\\s](.*?)[^\\s]${closebracket}`;
      var regex = new RegExp(replace, "g");
      const newMatch = text.match(regex);
      if (newMatch != null)
        for (let i = 0; i < newMatch.length; i++) {
          text = text = bracketReplace(text, newMatch[i], opentag, openlength, closelength, closetag);
        }
    }
    return { data, text }
  }
}