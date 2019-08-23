class StarRating extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });

    this._top = null;
    this._bottom = null;
    this._disabled = false;
  }

  connectedCallback() {
    // https://www.w3schools.com/charsets/ref_utf_symbols.asp
    this._root.innerHTML = `
            <style>
                :host {
                    width: 20em;
                    height: 1.3em;
                    display: inline-block;
                    overflow: hidden;
                    user-select: none;
                    vertical-align: center;
                    box-sizing: border-box;
                }

                .container {
                    color: #c5c5c5;
                    font-size: 2em;
                    line-height: 19px;
                    margin: 0 auto;
                    position: relative;
                    padding: 0;
                    cursor: pointer;
                }

                .container .top {
                    color: #e7bd06;
                    padding: 0;
                    position: absolute;
                    z-index: 1;
                    display: block;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                    width: 0;
                }
                
                span {
                    font-size: 1em;
                }

                .container:hover .top {
                    display: none;
                }

                .container .bottom {
                    padding: 0;
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    unicode-bidi: bidi-override;
                    direction: rtl;
                }

                .container .bottom > span:hover,
                .container .bottom > span:hover ~ span {
                    color: #e7bd06;
                }
            </style>
            <div class="container">
                <div class="top">
                    <span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span>
                </div>
                <div class="bottom">
                    <span data-value="5">&#9734;</span><span data-value="4">&#9734;</span><span data-value="3">&#9734;</span><span data-value="2">&#9734;</span><span data-value="1">&#9734;</span>
                <div>
            <div>
        `;
  }
}

window.customElements.define("star-rating", StarRating);
