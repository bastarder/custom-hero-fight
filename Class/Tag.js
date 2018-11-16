class Tag{
  constructor(tagName, opts) {
    this.tagName = tagName;
    Object.assign(this,opts);
  }

  toString(){
    return this.tagName;
  }
}
