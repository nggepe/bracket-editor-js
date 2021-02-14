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
  tag,
}) {
  const validator = bracketEditorChecker(elEditor, elOutput, bracket)
  if (validator === true) {
    generateElement(button, elEditor, bracket, elOutput, textareaClass, textareaStyle, callbackValue, imageSupport, tag);
    const el = document.getElementById('gpeditor');
    el.addEventListener("keyup", function (e) {
      bracketEditorConverter(bracket, elOutput, (defaults, generated, hashTag, atTag) => {
        callbackValue(defaults, generated, hashTag, atTag)
      }, { imageSupport: imageSupport, tag: tag });
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

      bracketEditorConverter(bracket, elOutput, (defaults, generated, hashTag, atTag) => {
        callbackValue(defaults, generated, hashTag, atTag)
      }, { imageSupport: imageSupport, tag: tag });
    });
    el.addEventListener("onchange", function () {
      bracketEditorConverter(bracket, elOutput, (defaults, generated, hashTag, atTag) => {
        callbackValue(defaults, generated, hashTag, atTag)
      }, { imageSupport: imageSupport, tag: tag });
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

function generateElement(button, elEditor, bracket, elOutput, textareaClass, textAreaStyle, callback, imageSupport, tag) {
  const el = document.getElementById(elEditor);
  var html = "";
  for (let i = 0; i < button.length; i++) {
    html += `<button style="${button[i]['style']}" class="${button[i]['class']}" id="gp-btn-editor-${i}">${button[i]['innerhtml']}</button>`;
  }
  if (imageSupport !== null && typeof imageSupport !== 'undefined' && imageSupport.showButton === true) {
    html += `<button id="gp-btn-image" class="${imageSupport.btnclass}" style="${imageSupport.btnstyle}">${imageSupport.innerHTML}</button>`;
    html += `<div id="gpbeij-image-form" class="gpbeij-image-form">
    <label for="gpbejs-input-file" class="btn-b-editor"><svg version="1.1" height="12px" width="12px" id="Capa_1" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 419.2 419.2" style="enable-background:new 0 0 419.2 419.2;" xml:space="preserve"> <circle cx="158" cy="144.4" r="28.8"/><path d="M394.4,250.4c-13.6-12.8-30.8-21.2-49.6-23.6V80.4c0-15.6-6.4-29.6-16.4-40C318,30,304,24,288.4,24h-232	c-15.6,0-29.6,6.4-40,16.4C6,50.8,0,64.8,0,80.4v184.4V282v37.2c0,15.6,6.4,29.6,16.4,40c10.4,10.4,24.4,16.4,40,16.4h224.4 c14.8,12,33.2,19.6,53.6,19.6c23.6,0,44.8-9.6,60-24.8c15.2-15.2,24.8-36.4,24.8-60C419.2,286.8,409.6,265.6,394.4,250.4z M21.2,80.4c0-9.6,4-18.4,10.4-24.4c6.4-6.4,15.2-10.4,24.8-10.4h232c9.6,0,18.4,4,24.8,10.4c6.4,6.4,10.4,15.2,10.4,24.8v124.8 l-59.2-59.2c-4-4-10.8-4.4-15.2,0L160,236l-60.4-60.8c-4-4-10.8-4.4-15.2,0l-63.2,64V80.4z M56,355.2v-0.8				c-9.6,0-18.4-4-24.8-10.4c-6-6.4-10-15.2-10-24.8V282v-12.4L92,198.4l60.4,60.4c4,4,10.8,4,15.2,0l89.2-89.6l58.4,58.8				c-1.2,0.4-2.4,0.8-3.6,1.2c-1.6,0.4-3.2,0.8-5.2,1.6c-1.6,0.4-3.2,1.2-4.8,1.6c-1.2,0.4-2,0.8-3.2,1.6c-1.6,0.8-2.8,1.2-4,2				c-2,1.2-4,2.4-6,3.6c-1.2,0.8-2,1.2-3.2,2c-0.8,0.4-1.2,0.8-2,1.2c-3.6,2.4-6.8,5.2-9.6,8.4c-15.2,15.2-24.8,36.4-24.8,60				c0,6,0.8,11.6,2,17.6c0.4,1.6,0.8,2.8,1.2,4.4c1.2,4,2.4,8,4,12v0.4c1.6,3.2,3.2,6.8,5.2,9.6H56z M378.8,355.2				c-11.6,11.6-27.2,18.4-44.8,18.4c-16.8,0-32.4-6.8-43.6-17.6c-1.6-1.6-3.2-3.6-4.8-5.2c-1.2-1.2-2.4-2.8-3.6-4				c-1.6-2-2.8-4.4-4-6.8c-0.8-1.6-1.6-2.8-2.4-4.4c-0.8-2-1.6-4.4-2-6.8c-0.4-1.6-1.2-3.6-1.6-5.2c-0.8-4-1.2-8.4-1.2-12.8				c0-17.6,7.2-33.2,18.4-44.8c11.2-11.6,27.2-18.4,44.8-18.4s33.2,7.2,44.8,18.4c11.6,11.6,18.4,27.2,18.4,44.8				C397.2,328,390,343.6,378.8,355.2z"/>			<path d="M341.6,267.6c-0.8-0.8-2-1.6-3.6-2.4c-1.2-0.4-2.4-0.8-3.6-0.8c-0.4,0-0.4,0-0.4,0c-0.4,0-0.4,0-0.4,0				c-1.2,0-2.4,0.4-3.6,0.8c-1.2,0.4-2.4,1.2-3.6,2.4l-24.8,24.8c-4,4-4,10.8,0,15.2c4,4,10.8,4,15.2,0l6.4-6.4v44				c0,6,4.8,10.8,10.8,10.8s10.8-4.8,10.8-10.8v-44l6.4,6.4c4,4,10.8,4,15.2,0c4-4,4-10.8,0-15.2L341.6,267.6z"/></svg></label>
    <input type="file" id="gpbejs-input-file" class="custom-file-input" style="display:none;"/>
    <input type="text" id="gpbejs-input-url" class="" placeholder="URL"/>
    <input type="text" id="gpbejs-input-width" value="50%" class="" placeholder="width" style="width: 50px"/>
    <button type="button" id="gpbejs-btn-done" class="btn-b-editor">Done</button>
    </div>`
  }
  html += `<textarea id="gpeditor" class="${textareaClass}" style="${textAreaStyle} "></textarea>`;

  el.innerHTML = html;
  eventsHandler(button.length, bracket, elOutput, callback, imageSupport, tag)
}

function eventsHandler(length, bracket, elOutput, callback, imageSupport, tag) {
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
    bracketEditorConverter(bracket, elOutput, callback, { imageSupport: imageSupport, tag: tag })

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