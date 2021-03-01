const setting = require('./default-setting').deflt
var selectionStart;
var selectionEnd;
var el;

const converter = require('./converter')

module.exports = (props = setting) => {
  el = document.getElementById('gp-editor-text')

  el.addEventListener('keyup', function (e) {
    el.style.height = "1px"
    el.style.height = (25 + el.scrollHeight) + "px";
    converter({ ...props, text: el.value })
  })
  el.addEventListener('keydown', function (e) {
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

    if (e.code === 'Enter') {
      e.preventDefault();
      var data = el.value.split("\n")
      var counter = 0;
      var line = 0;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        counter += element.length
        line = i
        if (counter >= selectionStart) {
          break
        }
      }

      var newText = "\n"
      var matched = data[line].match(/\t/g) === null ? [] : data[line].match(/\t/g)
      matched.forEach(e => {
        newText += "\t"
      })
      el.value = el.value.substring(0, selectionStart) + newText + el.value.substring(selectionStart)
      el.setSelectionRange(selectionStart + 1 + matched.length, selectionEnd + 1 + matched.length)
    }

    converter({ ...props, text: el.value })
  })

    ;['change', 'focus', 'blur'].forEach(e => {
      el.addEventListener(e, function (event) {
        converter({ ...props, text: el.value })
      })
    })

  el.onmouseup = el.onchange = el.onkeyup = el.click = el.onselectionchange = function () {
    if (window.getSelection) {
      selectionStart = document.getElementById("gp-editor-text").selectionStart
      selectionEnd = document.getElementById("gp-editor-text").selectionEnd
    }
  }

  for (let i = 0; i < props.bracket.length; i++) {
    const data = props.bracket[i];
    if (data.btn.active === true)
      btnListener({ ...data, id: `gp-btn-editor-${i}`, index: i, setting: { ...props } })
  }
  otherListener(props)
}

function btnListener(params = { ...setting.bracket[0], id: "", index: 0, setting: {} }) {
  document.getElementById(params.id).addEventListener('click', function (e) {
    var text = el.value
    el.value = text.substring(0, selectionStart) + params.open.replace(/\\/g, '') + text.substring(selectionStart, selectionEnd) + params.close.replace(/\\/g, '') + text.substring(selectionEnd)
    selectionStart += params.open.length
    selectionEnd += params.open.length
    el.setSelectionRange(selectionStart, selectionEnd)
    el.focus()
    converter({ ...setting, text: el.value })
  })
}

function otherListener(params = { ...setting }) {
  if (params.others.codeBlock.support.btn.active === true) {
    document.getElementById("btn-code-block").addEventListener("click", function (e) {
      e.preventDefault();
      var text = el.value
      var open = params.others.codeBlock.support.open.replace("\\", "").replace("<br/>", "\n")
      var close = params.others.codeBlock.support.close.replace("\\", "").replace("<br/>", "\n")
      el.value = text.substring(0, selectionStart) + open + text.substring(selectionStart, selectionEnd) + close + text.substring(selectionEnd)
      selectionStart += open.length
      selectionEnd += open.length

      el.setSelectionRange(selectionStart, selectionEnd)
      el.focus()
    })
  }

  if (params.others.img.support.btn.active === true) {
    const element = document.getElementById("modal-upload")
    document.getElementById('btn-image').addEventListener(('click'), function (e) {
      e.preventDefault();
      element.classList.add('show')
    })
    dismissModal()

    document.getElementById("img-input").addEventListener("change", function (e) {
      const parent = document.getElementById("show-image")
      if (e.target.files[0] == null) {
        parent.innerHTML = ""
      }
      else {
        var fileURL = URL.createObjectURL(e.target.files[0]);
        parent.innerHTML = `<img src="${fileURL}" style="width: 250px"/>`
        document.getElementById("img-input-url").value = fileURL

        params.others.img.onImageInputChange(e.target.files[0])
      }
    })

    document.getElementById("bej-cancel-button").addEventListener("click", e => {
      element.classList.remove("show")
    })

    document.getElementById("bej-save-button").addEventListener("click", e => {

      el.value = el.value.substring(0, selectionStart) + "[img " + document.getElementById("img-input-url").value + " " + document.getElementById("img-input-width").value + " img]" + el.value.substring(selectionStart)
      element.classList.remove("show")
      el.setSelectionRange(selectionStart + 4, selectionStart + 5)
      el.focus()
      e.preventDefault();
    })
  }
}

function dismissModal() {
  const element = document.getElementById("modal-upload")
  element.onclick = function (e) {
    if (e.target === element)
      element.classList.remove("show")
  }
}