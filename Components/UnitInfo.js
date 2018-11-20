class UnitInfo extends HTMLElement{
  static get observedAttributes() {
    return ['type'];
  }

  constructor() {
    super();
    this.unit = window.game[this.getAttribute('type') || 'A'];
    this.view = this.attachShadow({ mode: "open" });
    this.$hp = document.createElement('progress-info');
    this.view.appendChild(this.$hp);

    this.update();

    // 改变更新视图的时机, 减少不必要的渲染;
    setInterval(() => this.update(), 1000);
  }

  update(){
    let { $hp } = this;
    $hp.setAttribute('value', this.unit.$hp);
    $hp.setAttribute('max', this.unit.maxHp);
  }
}