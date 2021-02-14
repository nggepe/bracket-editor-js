const bracketEditor = require('./src/bracket-editor')

module.exports = {
  bracketEditor: ({
    elEditor = "gp-textarea",
    elOutput = "gp-text-output",
    bracket = [
      {
        open: "\\*\\*",
        close: "\\*\\*",
        opentag: "<b>",
        closetag: "</b>"
      },
      {
        open: "\\*",
        close: "\\*",
        opentag: "<i>",
        closetag: "</i>"
      },
      {
        open: "```",
        close: "```",
        opentag: "<pre style='background: rgba(255,255,255,0.4);'><code>",
        closetag: "</code></pre>",
      },
      {
        open: "`",
        close: "`",
        opentag: "<code>",
        closetag: "</code>"
      },
      {
        open: "--",
        close: "--",
        opentag: "<center>",
        closetag: "</center>"
      }
    ],
    button = [
      {
        innerhtml: "<b>B</b>",
        class: "btn-b-editor",
      },
      {
        innerhtml: "I",
        class: "btn-b-editor",
      },
      {
        innerhtml: "{<>}",
        class: "btn-b-editor",
      },
      {
        innerhtml: "<>",
        class: "btn-b-editor",
      },
      {
        innerhtml: `<svg version="1.1" fill="#F2F2F2" width="12px" height="12px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 426.667 426.667" style="enable-background:new 0 0 426.667 426.667;" xml:space="preserve">	<g>		<rect x="85.333" y="320" width="256" height="42.667"/>	</g>	<g>		<rect x="64" y="149.333" width="298.667" height="42.667"/>	</g>	<g>		<rect y="64" width="426.667" height="42.667"/>	</g>	<g>		<rect x="21.333" y="234.667" width="384" height="42.667"/>	</g></svg>`,
        class: "btn-b-editor",
      },
    ],
    textareaClass = "gp-text-editor",
    textareaStyle = "width: calc(99%); margin-right: 20px;",
    callbackValue = function (defaults, generated) { },
    imageSupport = {
      showButton: true,
      btnclass: "btn-b-editor",
      btnstyle: "",
      innerHTML: `<svg fill="#f2f2f2" id="bold" enable-background="new 0 0 24 24" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m6.25 19.5c-1.601 0-3.025-1.025-3.542-2.551l-.035-.115c-.122-.404-.173-.744-.173-1.084v-6.818l-2.426 8.098c-.312 1.191.399 2.426 1.592 2.755l15.463 4.141c.193.05.386.074.576.074.996 0 1.906-.661 2.161-1.635l.901-2.865z"/></g><path d="m9 9c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2z"/></g><path d="m21.5 2h-15c-1.378 0-2.5 1.122-2.5 2.5v11c0 1.378 1.122 2.5 2.5 2.5h15c1.378 0 2.5-1.122 2.5-2.5v-11c0-1.378-1.122-2.5-2.5-2.5zm-15 2h15c.276 0 .5.224.5.5v7.099l-3.159-3.686c-.335-.393-.82-.603-1.341-.615-.518.003-1.004.233-1.336.631l-3.714 4.458-1.21-1.207c-.684-.684-1.797-.684-2.48 0l-2.76 2.759v-9.439c0-.276.224-.5.5-.5z"/></svg>`,
      fileHandler: (file) => console.log(file)
    },
    tag = {
      hashTag: { active: true, class: "gp-editor-tag", style: "", ontap: () => { } },
      atTag: { active: true, class: "gp-editor-tag", style: "", ontap: () => { } },
    }
  }) => {
    bracketEditor({
      elEditor: elEditor,
      elOutput: elOutput,
      bracket: bracket,
      button: button,
      textareaClass: textareaClass,
      textareaStyle: textareaStyle,
      callbackValue: callbackValue,
      imageSupport: {
        showButton: typeof imageSupport.showButton === "undefined" ? true : imageSupport.showButton,
        btnclass: typeof imageSupport.btnclass === "undefined" ? "btn-b-editor" : imageSupport.btnclass,
        btnstyle: typeof imageSupport.btnstyle === "undefined" ? "" : imageSupport.btnstyle,
        innerHTML: typeof imageSupport.innerHTML === "undefined" ? `<svg fill="#f2f2f2" id="bold" enable-background="new 0 0 24 24" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m6.25 19.5c-1.601 0-3.025-1.025-3.542-2.551l-.035-.115c-.122-.404-.173-.744-.173-1.084v-6.818l-2.426 8.098c-.312 1.191.399 2.426 1.592 2.755l15.463 4.141c.193.05.386.074.576.074.996 0 1.906-.661 2.161-1.635l.901-2.865z"/></g><path d="m9 9c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2z"/></g><path d="m21.5 2h-15c-1.378 0-2.5 1.122-2.5 2.5v11c0 1.378 1.122 2.5 2.5 2.5h15c1.378 0 2.5-1.122 2.5-2.5v-11c0-1.378-1.122-2.5-2.5-2.5zm-15 2h15c.276 0 .5.224.5.5v7.099l-3.159-3.686c-.335-.393-.82-.603-1.341-.615-.518.003-1.004.233-1.336.631l-3.714 4.458-1.21-1.207c-.684-.684-1.797-.684-2.48 0l-2.76 2.759v-9.439c0-.276.224-.5.5-.5z"/></svg>` : imageSupport.innerHTML,
        fileHandler: typeof imageSupport.fileHandler === "undefined" ? file => console.log(file, "ini default") : imageSupport.fileHandler
      },
      tag: {
        hashTag: typeof tag.hashTag === 'undefined' ? { class: "gp-editor-tag", style: "", ontap: () => { } } : tag.hashTag,
        atTag: typeof tag.atTag === 'undefined' ? { class: "gp-editor-tag", style: "", ontap: () => { } } : tag.atTag,
      }
    })
  },
  seturl: (url) => { require('./src/bracket-editor-image-send')(url) },
  plainConvert: ({
    elOutput = "gp-text-output",
    bracket = [
      {
        open: "\\*\\*",
        close: "\\*\\*",
        opentag: "<b>",
        closetag: "</b>"
      },
      {
        open: "\\*",
        close: "\\*",
        opentag: "<i>",
        closetag: "</i>"
      },
      {
        open: "```",
        close: "```",
        opentag: "<pre style='background: rgba(255,255,255,0.4);'><code>",
        closetag: "</code></pre>",
      },
      {
        open: "`",
        close: "`",
        opentag: "<code>",
        closetag: "</code>"
      },
      {
        open: "--",
        close: "--",
        opentag: "<center>",
        closetag: "</center>"
      }
    ],
    imageSupport = {
      showButton: true,
      btnclass: "btn-b-editor",
      btnstyle: "",
      innerHTML: `<svg fill="#f2f2f2" id="bold" enable-background="new 0 0 24 24" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m6.25 19.5c-1.601 0-3.025-1.025-3.542-2.551l-.035-.115c-.122-.404-.173-.744-.173-1.084v-6.818l-2.426 8.098c-.312 1.191.399 2.426 1.592 2.755l15.463 4.141c.193.05.386.074.576.074.996 0 1.906-.661 2.161-1.635l.901-2.865z"/></g><path d="m9 9c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2z"/></g><path d="m21.5 2h-15c-1.378 0-2.5 1.122-2.5 2.5v11c0 1.378 1.122 2.5 2.5 2.5h15c1.378 0 2.5-1.122 2.5-2.5v-11c0-1.378-1.122-2.5-2.5-2.5zm-15 2h15c.276 0 .5.224.5.5v7.099l-3.159-3.686c-.335-.393-.82-.603-1.341-.615-.518.003-1.004.233-1.336.631l-3.714 4.458-1.21-1.207c-.684-.684-1.797-.684-2.48 0l-2.76 2.759v-9.439c0-.276.224-.5.5-.5z"/></svg>`,
      fileHandler: (file) => console.log(file)
    },
    tag = {
      hashTag: { active: true, class: "gp-editor-tag", style: "", ontap: () => { } },
      atTag: { active: true, class: "gp-editor-tag", style: "", ontap: () => { } },
    },
    callback = (defaults, generated, hashTag, atTag) => { }
  }) => {
    require('./src/original-converter')(bracket, elOutput, callback, {
      imageSupport, tag
    })
  }

};