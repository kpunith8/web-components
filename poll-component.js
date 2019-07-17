class Poll extends HTMLElement {
  constructor() {
    super();
    this._attached = false;
    this._data = {
      question: "Is this a static question?",
      answers: ["Yes of course!", "No it isn't!"]
    };
    this._selected = null;

    this._question = null;
    this._answers = null;

    // attach shadow-DOM
    this._root = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this._attached = true;
    // otherwise, this.innerHTML, if no shadow-DOM is used
    this._root.innerHTML = `
        <style>
        .poll-container {
            width: 500px;
            margin: auto;
            border: dotted 1px #999;
            padding: 20px;
        }

        .poll-container h3 {
            font-size: 20px;
            margin: 0;
        }

        li.selected {
            background-color: yellow;
        }
        
        </style>
        <div class="poll-container">
            <h3 id="question"></h3>
            <ul id="answers"></ul>
        </div>
        `;

    // without shadow-DOM
    // this._question = this.querySelector("#question");
    // this._answers = this.querySelector("#answers");

    // With shadow-DOM attached
    this._question = this._root.querySelector("#question");
    this._answers = this._root.querySelector("#answers");

    this._answers.addEventListener("click", event => {
      this._answers.querySelectorAll("li").forEach((li, index) => {
        if (li === event.target) {
          this.selected = index;
        }
      });
    });

    this._render();
  }

  _render() {
    if (this._attached && this._data !== null) {
      this._answers.innerHTML = "";
      this._question.innerHTML = this._data.question;
      this._data.answers.forEach(answer => {
        const li = document.createElement("li");
        li.innerHTML = answer;
        this._answers.appendChild(li);
      });
    }
  }

  set data(data) {
    if (this._data === data) return;
    this._data = data;

    this._render();
  }

  get data() {
    return this._data;
  }

  set selected(index) {
    const answer = this._answers.querySelector(`li:nth-child(${index + 1})`);

    if (answer !== null) {
      this._answers.querySelectorAll("li").forEach(li => {
        li.classList.remove("selected");
      });

      answer.classList.add("selected");
      this._selected = index;
    }
  }

  get selected() {
    return this._selected;
  }
}

window.customElements.define("poll-component", Poll);
