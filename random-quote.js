class RandomQuote extends HTMLElement {
  constructor() {
    super();
    this._quotes = [
      "All we have to decide is what to do with the time  that is given us.",
      "Two things are infinite; the universe and human stupidity.",
      "Try not to become a man of success, but rather try to become a man of value"
    ];

    this._quote = null;
    this._interval = null;
  }

  connectedCallback() {
    this.innerHTML = `
            <style>
                .quote-container {
                    width: 500px;
                    margin: auto;
                    border: dotted 1px #999;
                    padding: 20px;
                }

                .quote-container h1 {
                    font-size: 20px;
                    margin: 0;
                }
            </style>
            
            <div class="quote-container">
                <h1>Random Quote</h1>
                <p>"<span id="quote"></span>"</p>
            </div>
        `;

    this._quote = document.querySelector("#quote");
    this._setInverval(parseInt(this.getAttribute("interval")));

    this._render();
  }

  disconnectedCallback() {
    clearInterval(this._interval);
  }

  _setInverval(value) {
    if (this._interval !== null) {
      clearInterval(this._interval);
    }

    if (value > 0) {
      this._interval = setInterval(() => {
        this._render();
      }, value);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
      this._setInverval(newValue);
  }

  // To observe the attibute changes 
  static get observedAttributes() {
      return ["interval"];
  }

  _render() {
    const index = Math.floor(Math.random() * this._quotes.length);
    this.setAttribute('quote-index', index);

    if (this._quote !== null) {
      this._quote.innerHTML = this._quotes[index];
    }
  }
}

window.customElements.define("random-quote", RandomQuote);
