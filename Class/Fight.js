class Fight{
  constructor({options = {}, init = () => {}}){
    this.A = _.cloneDeep(options.A)
    this.B = _.cloneDeep(options.B)
    init(this);
  }

  start(){
    // 启动初始buff;
    _.forEach(this.A.buffs, (buff) => {
      buff.event && buff.event(this.B, this.A);
    })

    _.forEach(this.B.buffs, (buff) => {
      buff.event && buff.event(this.A, this.B);
    })

    // this.B.AI && this.B.AI();
    // TODO: 不同的单位，进行智能战斗; (怪物战斗特性)

    setInterval(() => {
      new Action({origin: this.A, target: this.B, skill: this.A.skills[0]}).action();
    }, 1000)
  }
}