const style = `
.progress{
  position: relative;
  display: inline-block;
  width: 200px;
  border: 1px solid #eee;
  height: 50px;
}
.inner-progress{
  position: absolute;
  height: 50px;
  background: red;
}
.number{
  position: absolute;
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-weight: 800;
  font-size: 20px;
}
`

class ProgressInfo extends HTMLElement{
  static get observedAttributes() {
    return ['value', 'max'];
  }

  attributeChangedCallback(name, oldValue, newValue){
    this[name] = newValue;
    this.update$innerProgress();
    this.update$number();
  }

  constructor() {
    super();
    this.view = this.attachShadow({ mode: "open" });

    this.value = this.getAttribute('value');
    this.max = this.getAttribute('max');

    this.$progress = document.createElement('div');
    this.$progress.className = "progress";

    this.$innerProgress = document.createElement('div');
    this.$innerProgress.className = "inner-progress";

    this.$number = document.createElement('div');
    this.$number.className = "number";

    this.$style = document.createElement('style');

    this.$style.textContent = style;
    this.update$innerProgress();
    this.update$number();

    this.$progress.appendChild(this.$innerProgress);
    this.$progress.appendChild(this.$number);

    this.view.appendChild(this.$style);
    this.view.appendChild(this.$progress);
  }

  update$innerProgress(){
    this.$innerProgress.style.width = `${Math.max(parseInt(this.value / this.max * 100), 0)}%`;
  }

  update$number(){
    this.$number.innerText = `${this.value}/${this.max}`;
  }
}