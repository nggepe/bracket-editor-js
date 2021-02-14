function bracketEditorConverter(bracket, elOutput, callback, { imageSupport, tag = {
  hashTag: { active: true, class: "gp-editor-tag", style: "", ontap: () => { } },
  atTag: { active: true, class: "gp-editor-tag", style: "", ontap: () => { } },
} }) {
  var data = document.getElementById("gpeditor").value;

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
  if (tag.atTag.active === true) {
    text = text.replace(/(@\w+)/g, `<span class="at-tag-event ${tag.atTag.class}" data-name="$1" style="${tag.atTag.style}">$1</span>`)
  }
  if (tag.hashTag.active === true) {
    text = text.replace(/(#\w+)/g, `<span class="${tag.hashTag.class}" style="${tag.hashTag.style}">$1</span>`)
    if (typeof tag.hashTag.ontap !== 'undefined') { }
  }

  var hashTag = text.match(/(#\w+)/g)
  var atTag = text.match(/(@\w+)/g)

  document.getElementById(elOutput).innerHTML = text;

  if (typeof callback !== 'undefined') callback(data, text, hashTag, atTag)

  if (typeof tag.atTag.ontap !== 'undefined') {
    const tagEl = document.getElementsByClassName("at-tag-event")
    for (let i = 0; i < tagEl.length; i++) {
      // console.log(tagEl[i].textContent)
      let tagtext = tagEl[i].textContent
      tagEl[i].addEventListener('click', tag.atTag.ontap(tagtext))
    }
  }

  if (typeof tag.hashTag.ontap !== 'undefined') {
    const tagEl = document.getElementsByClassName("at-tag-event")
    for (let i = 0; i < tagEl.length; i++) {
      // console.log(tagEl[i].textContent)
      let tagtext = tagEl[i].textContent
      tagEl[i].addEventListener('click', tag.hashTag.ontap(tagtext))
    }
  }

  // return { data, text }
}


function bracketReplace(text, word, opentag, openlength, closelength, closetag) {
  return text.replace(word, opentag + word.substring(openlength, word.length - closelength) + closetag);
}

module.exports = bracketEditorConverter