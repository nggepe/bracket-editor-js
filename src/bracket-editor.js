const bracketEditorConverter = require('./original-converter')

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
  imageSupport,
}) {
  const validator = bracketEditorChecker(elEditor, elOutput, bracket)
  if (validator === true) {
    generateElement(button, elEditor, bracket, elOutput, textareaClass, textareaStyle, callbackValue, imageSupport);
    const el = document.getElementById('gpeditor');
    el.addEventListener("keyup", function (e) {
      bracketEditorConverter(bracket, elOutput, (defaults, generated) => {
        callbackValue(defaults, generated)
      }, { imageSupport: imageSupport });
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
      }, { imageSupport: imageSupport });
    });
    el.addEventListener("onchange", function () {
      bracketEditorConverter(bracket, elOutput, (defaults, generated) => {
        callbackValue(defaults, generated)
      }, { imageSupport: imageSupport });
    });
  }
  else {
    console.log(validator)
    alert(validator)
  }
}

function bracketEditorChecker(elEditor, elOutput, bracket) {
  var checker = "";
  if (elEditor == null) checker += "This package need an ID to nested textarea\n";
  if (elOutput == null) checker += "This package need an ID to nested the output";
  if (bracket == null) checker += "What do you need? we can not understand why you install it! If you really need this package, please! set your bracket!";

  if (checker === "") return true;
  else return checker;
}

function generateElement(button, elEditor, bracket, elOutput, textareaClass, textAreaStyle, callback, imageSupport) {
  const el = document.getElementById(elEditor);
  var html = "";
  for (let i = 0; i < button.length; i++) {
    html += `<button style="${button[i]['style']}" class="${button[i]['class']}" id="gp-btn-editor-${i}">${button[i]['innerhtml']}</button>`;
  }
  if (imageSupport !== null && typeof imageSupport !== 'undefined') {

    html += `<button id="gp-btn-image" class="${imageSupport.btnclass}" style="${imageSupport.btnstyle}">${imageSupport.innerHTML}</button>`;
    html += `<div id="gpbeij-image-form" class="gpbeij-image-form">
    <input type="file" id="gpbejs-input-file" class="custom-file-input" style="width: 100px;"/>
    <input type="text" id="gpbejs-input-url" class="btn-b-editor" placeholder="URL"/>
    <input type="text" id="gpbejs-input-width" value="50%" class="btn-b-editor" placeholder="width" style="width: 50px"/>
    <button type="button" id="gpbejs-btn-done" class="btn-b-editor">Done</button>
    </div>`
  }
  html += `<textarea id="gpeditor" class="${textareaClass}" style="${textAreaStyle} "></textarea>`;

  el.innerHTML = html;
  eventsHandler(button.length, bracket, elOutput, callback, imageSupport)
}

function eventsHandler(length, bracket, elOutput, callback, imageSupport) {
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

    refactor(elContent, openbracket, closebracket, openlength, bracket, elOutput, i, callback, imageSupport)
  }
  document.getElementById('gp-btn-image').addEventListener("click", () => {
    console.log(selectionStart, selectionEnd)
    var imageForm = document.getElementById("gpbeij-image-form").classList;
    var show = true;
    for (let i = 0; i < imageForm.length; i++) {
      if (imageForm[i] === 'show') { show = false; }
    }
    if (show === true) { imageForm.add("show") }
    else imageForm.remove("show")
    // var imgIndex = imageForm.findIndex((e) => e === 'show')
  })

  document.getElementById('gpbejs-input-file').addEventListener('change', () => {
    imageSupport.fileHandler(document.getElementById('gpbejs-input-file').files[0])
  })

  document.getElementById('gpbejs-btn-done').addEventListener('click', () => {
    var url = document.getElementById("gpbejs-input-url").value
    var width = document.getElementById("gpbejs-input-width").value
    var elText = document.getElementById("gpeditor")
    var text = elText.value.substring(0, selectionStart) + "[img " + url + " " + width + "]" + elText.value.substring(selectionStart)
    elText.value = text
    elText.setSelectionRange(selectionStart, selectionStart)
    bracketEditorConverter(bracket, elOutput, callback, { imageSupport: imageSupport })

    document.getElementById("gpbejs-input-url").value = ""
    document.getElementById("gpbeij-image-form").classList.remove("show")
  })
}

function refactor(elContent, openbracket, closebracket, openlength, bracket, elOutput, i, callback, imageSupport) {
  document.getElementById("gp-btn-editor-" + i).addEventListener("click", (e) => {

    var text = document.getElementById("gpeditor").value;
    elContent.value = text.substring(0, selectionStart) + "" +
      openbracket.replace(/\\/g, "") + text.substring(selectionStart, selectionEnd) + closebracket.replace(/\\/g, "") + "" +
      text.substring(selectionEnd);
    elContent.focus();
    var ready = selectionStart + openlength;
    var stop = selectionEnd + openlength;

    elContent.setSelectionRange(ready, stop);

    bracketEditorConverter(bracket, elOutput, callback, { imageSupport: imageSupport });

    selectionStart += openlength;
    selectionEnd += openlength;
  })
}

module.exports = bracketEditor