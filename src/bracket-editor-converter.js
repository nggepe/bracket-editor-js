function bracketReplace(text, word, opentag, openlength, closelength, closetag) {
  return text.replace(word, opentag + word.substring(openlength, word.length - closelength) + closetag);
}

module.exports = {
  convertCallback: ({ bracket, callback, data, imageSupport = {
    btnclass: "btn-b-editor",
    btnstyle: "",
    innerHTML: `<svg fill="#f2f2f2" id="bold" enable-background="new 0 0 24 24" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m6.25 19.5c-1.601 0-3.025-1.025-3.542-2.551l-.035-.115c-.122-.404-.173-.744-.173-1.084v-6.818l-2.426 8.098c-.312 1.191.399 2.426 1.592 2.755l15.463 4.141c.193.05.386.074.576.074.996 0 1.906-.661 2.161-1.635l.901-2.865z"/></g><path d="m9 9c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2z"/></g><path d="m21.5 2h-15c-1.378 0-2.5 1.122-2.5 2.5v11c0 1.378 1.122 2.5 2.5 2.5h15c1.378 0 2.5-1.122 2.5-2.5v-11c0-1.378-1.122-2.5-2.5-2.5zm-15 2h15c.276 0 .5.224.5.5v7.099l-3.159-3.686c-.335-.393-.82-.603-1.341-.615-.518.003-1.004.233-1.336.631l-3.714 4.458-1.21-1.207c-.684-.684-1.797-.684-2.48 0l-2.76 2.759v-9.439c0-.276.224-.5.5-.5z"/></svg>`
  } }) => {
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
    if (imageSupport !== null && typeof imageSupport !== "undefined") {
      text = text.replace(/\[img[ ]((https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])[ ](\w*.)\]?/gi, "<img src='$1' width='$3'/>")
    }
    if (typeof callback !== 'undefined') callback(data, text)
  },
  convert: ({ bracket, data, imageSupport = {
    btnclass: "btn-b-editor",
    btnstyle: "",
    innerHTML: `<svg fill="#f2f2f2" id="bold" enable-background="new 0 0 24 24" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m6.25 19.5c-1.601 0-3.025-1.025-3.542-2.551l-.035-.115c-.122-.404-.173-.744-.173-1.084v-6.818l-2.426 8.098c-.312 1.191.399 2.426 1.592 2.755l15.463 4.141c.193.05.386.074.576.074.996 0 1.906-.661 2.161-1.635l.901-2.865z"/></g><path d="m9 9c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2z"/></g><path d="m21.5 2h-15c-1.378 0-2.5 1.122-2.5 2.5v11c0 1.378 1.122 2.5 2.5 2.5h15c1.378 0 2.5-1.122 2.5-2.5v-11c0-1.378-1.122-2.5-2.5-2.5zm-15 2h15c.276 0 .5.224.5.5v7.099l-3.159-3.686c-.335-.393-.82-.603-1.341-.615-.518.003-1.004.233-1.336.631l-3.714 4.458-1.21-1.207c-.684-.684-1.797-.684-2.48 0l-2.76 2.759v-9.439c0-.276.224-.5.5-.5z"/></svg>`
  } }) => {
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
    if (imageSupport !== null && typeof imageSupport !== "undefined") {
      text = text.replace(/\[img[ ]((https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])[ ](\w*.)\]?/gi, "<img src='$1' width='$3'/>")
    }
    return { data, text }
  }
}