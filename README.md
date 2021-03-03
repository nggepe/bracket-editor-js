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

<table width="100%">
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
    <td>see <a href="https://github.com/nggepe/bracket-editor-js/blob/ed13b9eee930d140e34802f22166082b4edce386/src/default-setting.js#L7">here</a></td>
  </tr>
  
  <tr>
  <td>
    others
  </td>
  </tr>
</table>
