var selectionStart = 0;
var selectionEnd = 0;

/**
 * you can check the param is here
 * 
 */
function bracketEditor({
  elEditor,
  elOutput,
  bracket,
  button,
  textareaClass,
  textareaStyle,
  callbackValue,
}) {
  if (bracketEditorChecker(elEditor, elOutput, bracket) === true) {
    generateElement(button, elEditor, bracket, elOutput, textareaClass, textareaStyle, callbackValue);
    const el = document.getElementById('gpeditor');
    el.addEventListener("keyup", function (e) {
      bracketEditorConverter(bracket, elOutput, (defaults, generated) => {
        callbackValue(defaults, generated)
      });
    });
    el.addEventListener("keydown", function (e) {

      if (e.code === 'Tab') { // tab was pressed
        e.preventDefault();
        if (selectionStart === selectionEnd) {
          el.value = el.value.substring(0, selectionStart) + "\t" + el.value.substring(selectionEnd);
          el.setSelectionRange(selectionStart + 1, selectionEnd + 1);
        }
        else {
          var sentences = el.value.substring(0, selectionStart);
          var sentencesArr = el.value.substring(selectionStart, selectionEnd).split("\n");
          var sentencecount = 0;
          sentencesArr.forEach(sentence => {
            if (sentencecount < sentencesArr.length) sentences += "\t" + sentence + "\n";
            else sentences += "\t" + sentences;
            sentencecount += 1;
          });
          el.value = sentences;
          el.setSelectionRange(selectionStart + 1, selectionEnd + sentencesArr.length);

        }
      }

      bracketEditorConverter(bracket, elOutput, (defaults, generated) => {
        callbackValue(defaults, generated)
      });
    });
    el.addEventListener("onchange", function () {
      bracketEditorConverter(bracket, elOutput, (defaults, generated) => {
        callbackValue(defaults, generated)
      });
    });
  }
}

function bracketEditorChecker(elEditor, elOutput, bracket) {
  var checker = "";
  if (elEditor == null) checker += "This package need an ID to nested textarea\n";
  if (elOutput == null) checker += "This package need an ID to nested the output";
  if (bracket == null) checker += "What do you need? we can not understand why you install it! If you really need this package, please! set your bracket!";

  if (checker === "") return true;
  else return false;
}

function generateElement(button, elEditor, bracket, elOutput, textareaClass, textAreaStyle, callback) {
  const el = document.getElementById(elEditor);
  var html = "";
  for (let i = 0; i < button.length; i++) {
    html += `<button style="${button[i]['style']}" class="${button[i]['class']}" id="gp-btn-editor-${i}">${button[i]['innerhtml']}</button>`;
  }
  html += `<textarea id="gpeditor" class="${textareaClass}" style="${typeof textareaStyle !== 'undefined' ? textAreaStyle : 'width: 100 %'} "></textarea>`;
  el.innerHTML = html;
  eventsHandler(button.length, bracket, elOutput, callback)
}

function eventsHandler(length, bracket, elOutput, callback) {
  const elContent = document.getElementById("gpeditor");
  elContent.onmouseup = elContent.onkeyup = elContent.onselectionchange = function () {
    if (window.getSelection) {
      selectionStart = document.getElementById("gpeditor").selectionStart
      selectionEnd = document.getElementById("gpeditor").selectionEnd
    }
  }

  for (let i = 0; i < length; i++) {
    const openbracket = bracket[i]['open'];
    const closebracket = bracket[i]['close'];
    const openlength = openbracket.replace(/\\/g, "").length;

    refactor(elContent, openbracket, closebracket, openlength, bracket, elOutput, i, callback)
  }
}

function refactor(elContent, openbracket, closebracket, openlength, bracket, elOutput, i, callback) {
  document.getElementById("gp-btn-editor-" + i).addEventListener("click", (e) => {

    var text = document.getElementById("gpeditor").value;
    elContent.value = text.substring(0, selectionStart) + "" +
      openbracket.replace(/\\/g, "") + text.substring(selectionStart, selectionEnd) + closebracket.replace(/\\/g, "") + "" +
      text.substring(selectionEnd);
    elContent.focus();
    var ready = selectionStart + openlength;
    var stop = selectionEnd + openlength;


    elContent.setSelectionRange(ready, stop);
    bracketEditorConverter(bracket, elOutput, callback);

    selectionStart += openlength;
    selectionEnd += openlength;
  })
}

function bracketEditorConverter(bracket, elOutput, callback) {
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
  document.getElementById(elOutput).innerHTML = text;
  if (typeof callback !== 'undefined') callback(data, text)
}

function bracketReplace(text, word, opentag, openlength, closelength, closetag) {
  return text.replace(word, opentag + word.substring(openlength, word.length - closelength) + closetag);
}

module.exports = {
  bracketEditorConverter: ({ bracket, callback, data }) => {
    require('./bracket-editor-converter').convert({ bracket: bracket, callback: callback, data: data })
  },
  bracketEditor: ({ elEditor,
    elOutput,
    bracket,
    button,
    textareaClass,
    textareaStyle,
    callbackValue, }) => {
    bracketEditor({
      elEditor: elEditor,
      elOutput: elOutput,
      bracket: bracket,
      button: button,
      textareaClass: textareaClass,
      textareaStyle: textareaStyle,
      callbackValue: callbackValue
    })
  },
};