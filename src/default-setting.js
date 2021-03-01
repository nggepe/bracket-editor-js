const icons = require('./icons')
module.exports = {
  deflt: {
    /**element id `#gp-editor` to nested your text editor */
    element: "gp-editor",
    /** array of bracket that contain `open` bracket, `close` bracket `openTag`, `closeTag`, and `btn` (s) btn contain `active`: bool, element id `id`, you can also styling your button with `style`, and storing class with `className` */
    bracket: [
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
    ],
    /**there are another features that cannot be dynamic bracket, these are `img`, `codeBlock`, `hashTag` and `atTag`, so we place it here */
    others: {
      /**this is the configuration img features */
      img: {
        support: {
          active: true,
          btn: {
            active: true,
            innerHTML: icons.img
          }
        },
        modal: {
          title: "Upload an Image",
        },
        /** this property active when input file changed. IT WILL NOT RETURN EMPTY VALUE */
        onImageInputChange: (file) => { },
        /** when input file image has changed */
        onClickedUpload: (file) => { },
      },
      /**this will be a code styling */
      codeBlock: {
        support: {
          active: true,
          open: "\\[lcode<br/>",
          close: "<br/>lcode\\]",
          highlight: true,
          btn: {
            active: true,
            innerHTML: icons.codeBlock,
          },
        },
      },
      hashTag: true,
      atTag: true,
    },
    /** you can use `callback` function for your preview */
    callback: (defaultText, generatedText) => { },

  },
}