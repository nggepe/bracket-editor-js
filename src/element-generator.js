const setting = require('./default-setting').deflt
const listener = require('./element-listener')
var el;


module.exports = (props = setting) => {
  el = document.getElementById(props.element)
  var box = `<div class='btn-editor-box'>`
  for (let i = 0; i < props.bracket.length; i++) {
    const e = props.bracket[i];

    box += generateButton({ ...e.btn, id: `gp-btn-editor-${i}` })
  }
  if (props.others.codeBlock.support.btn.active === true) {
    box += `<button type="button" id="btn-code-block" class='gp-btn-editor'>${props.others.codeBlock.support.btn.innerHTML}</button>`
  }
  if (props.others.img.support.btn.active === true) {
    box += `<button type="button" id="btn-image" class='gp-btn-editor'>${props.others.img.support.btn.innerHTML}</button>`
    box += `<div id="modal-upload" class='modal-upload'>
      <div class='modal-upload-inner' id="modal-upload-inner">
        <div class="md-title">${props.others.img.modal.title}</div>
        <div class="md-content" id="drop-image" style="display: block;">
          <input id="img-input-width" type="text" placeholder="width" value="50%" class="gp-btn-editor" style="cursor: auto !important; margin-top:1rem; margin-bottom: 1rem; color: #E7E7E7;display: block; padding: 10px 20px !important; width: 70%; height: auto; font-size:18px; align-items:center;">
          <input id="img-input-url" type="text" placeholder="url" class="gp-btn-editor" style="cursor: auto !important; margin-top:1rem; margin-bottom: 1rem; color: #E7E7E7;display: block; padding: 10px 20px !important; width: 70%; height: auto; font-size:18px; align-items:center;">
          <input accept="image/gif/png/jpg/jpeg/svg" type="file" id="img-input" style="display: none;" />
          <label for="img-input" class="gp-btn-editor" style="display: inline-block; padding: 10px 20px !important; width: auto!important; height: auto; font-size:18px; align-items:center;">${props.others.img.support.btn.innerHTML} Choose an image</label>
          
          <div style="max-width:500px;" id="show-image"></div>
        </div>
        <div class="md-footer" style="text-align: right;">
           <button id="bej-cancel-button" class="gp-btn-editor" style="width: auto; color: #e7e7e7;">Cancel</button>
           <button id="bej-save-button" class="gp-btn-editor" style="width: auto; color: #e7e7e7">Done</button>
        </div>
      </div>
    </div>`
  }
  box += `</div>`
  el.innerHTML = `${box} <textarea id='gp-editor-text' class="gp-editor-text"></textarea>`
  listener(props)
}

function generateButton(params = { ...setting.bracket[0].btn, id: "" }) {
  if (params.active === true)
    return `<button type="button" id="${params.id}" class="gp-btn-editor ${params.className}">${params.innerHTML}</button>`
  else return ``;
}