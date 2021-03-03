# bracket-editor-js

<p align="center">
  <img src="https://raw.githubusercontent.com/nggepe/bracket-editor-js/dev/docs/logo.png" height="200" alt="Bracket Editor Js" />
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple.svg" alt="License: MIT"></a>
  <a href="https://github.com/nggepe/bracket-editor-js"><img src="https://img.shields.io/github/stars/nggepe/bracket-editor-js.svg?style=flat&logo=github&colorB=deeppink&label=stars" alt="Star on Github"></a>
  <a href="https://github.com/nggepe/bracket-editor-js"><img src="https://img.shields.io/github/forks/nggepe/bracket-editor-js.svg?style=flat&logo=github&colorB=blue&label=forks" alt="Fork on Github"></a>
</p>

# What is this?

This is a text editor with bracket that you can use to format your text to be an html and css styling.

<p align="center">
  <img src="https://raw.githubusercontent.com/nggepe/bracket-editor-js/main/docs/demo.gif" height="200" alt="A demo for you" />
</p>

## features

  <ul>
    <li>
      normal brackets
    </li>
    <li>
      single code
    </li>
    <li>
      code block
    </li>
    <li>
      simple code highlight
    </li>
  </ul>

## Installing

For now, this package only support on nodejs we have to update more feature untill this package is ready to compile in javascript browser natively, so just follow it to see what we will do and release soon.

<ul>
  <li>
    Install: <code>npm install gp-bracket-editor-js</code>
  </li>
  <li>
    import: <code>const editor = require('gp-bracket-editor-js')</code>
  </li>
  <li>
    If you are using react js. You can use <code>useEffect</code> to reduce the render.
  </li>
</ul>


```javascript
const bracketEditor = require('../../utils/libs/bracket-editor-js')
const settingEditor = bracketEditor.defaultSetting
useEffect(() => {
  bracketEditor.editor({
    ...settingEditor, callback(defaultText, generatedText) {
      document.getElementById('gp-editor-output').innerHTML = generatedText
    }, others: {
      ...settingEditor.others, img: {
        ...settingEditor.others.img, onImageInputChange: (file) => {
          console.log(file)
        }
      }
    }
  })
})
```
<ul>
  <li>
    This package will create a textarea inside the element id named "gp-editor", so you have to provide some html element which have `gp-editor` id
  </li>
</ul>

## Properties

<table>
  <tr>
    <th>Prop Name</th>
    <th>Description</th>
    <th>Default Setting</th>
  </tr>
  <tr>
    <td>element</td>
    <td>It is the id to nested the <code>textarea</code> </td>
    <td>"gp-editor"</td>
  </tr>
  <tr>
    <td>bracket</td>
    <td>List of BracketData </td>
    <td>
    
    ```javascript
    {
        /**open bracket */
        open: "=b ",
        /**close bracket */
        close: " b=",
        /**open tag, you can use your `html` tag*/
        openTag: "<b>",
        /**close tag, you can use your `html` tag */
        closeTag: "</b>",
        /**btn configuration, it's an `object that have properties: `active` bool, `id` string, `style` string, `className` string, `innerHTML` string */
        btn: {
          /**this is show or hide button, `true` is show, `false` is hide */
          active: true,
          /**element id */
          id: "btn-bold",
          /**element style */
          style: "",
          /**element class */
          className: "",
          /**elment children */
          innerHTML: icons.bold,
        }
      },
      {
        open: "=i ",
        close: " i=",
        openTag: "<i>",
        closeTag: "</i>",
        btn: {
          active: true,
          id: "btn-italic",
          style: "",
          className: "",
          innerHTML: icons.italic,
        }
      }, {
        open: "=u ",
        close: " u=",
        openTag: "<u>",
        closeTag: "</u>",
        btn: {
          active: true,
          id: "btn-underline",
          style: "",
          className: "",
          innerHTML: icons.underline,
        }
      },
      {
        open: "=s ",
        close: " s=",
        openTag: "<del>",
        closeTag: "</del>",
        btn: {
          active: true,
          id: "btn-stroke",
          style: "",
          className: "",
          innerHTML: icons.strike,
        }
      },
      {
        open: "=h1 ",
        close: " h1=",
        openTag: "<h1>",
        closeTag: "</h1>",
        btn: {
          active: true,
          id: "btn-h1",
          style: "",
          className: "",
          innerHTML: icons.h1,
        }
      },
      {
        open: "=h1 ",
        close: " h1=",
        openTag: "<h1>",
        closeTag: "</h1>",
        btn: {
          active: true,
          id: "btn-h1",
          style: "",
          className: "",
          innerHTML: icons.h2,
        }
      },
      {
        open: "=l ",
        close: " l=",
        openTag: "<p style='text-align: left;'>",
        closeTag: "</p>",
        btn: {
          active: true,
          id: "btn-underline",
          style: "",
          className: "",
          innerHTML: icons.left,
        }
      },
      {
        open: "=c ",
        close: " c=",
        openTag: "<center>",
        closeTag: "</center>",
        btn: {
          active: true,
          id: "btn-center",
          style: "",
          className: "",
          innerHTML: icons.center,
        }
      },
      {
        open: "=r ",
        close: " r=",
        openTag: "<p style='text-align: right;'>",
        closeTag: "</p>",
        btn: {
          active: true,
          id: "btn-right",
          style: "",
          className: "",
          innerHTML: icons.right,
        }
      },
      {
        open: "\\[code ",
        close: " code\\]",
        openTag: "<code>",
        closeTag: "</code>",
        btn: {
          active: true,
          id: "btn-right",
          style: "",
          className: "",
          innerHTML: icons.code,
        }
      },
    ```
    
    </td>
  </tr>
</table>
