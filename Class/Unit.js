class Unit{
  constructor(opt) {
    this.uid = 0;
    this.name = 1;
    this.tags = [];
    this.buffs = [];
    this.equipments = [];
    ///
    this.$attrType    = ""
    this.$staticUpAttr = ""
    this.$maxHp       = ""
    this.$maxMp       = ""
    this.$atk         = ""
    this.$def         = ""

    this.$str         = ""
    this.$dex         = ""
    this.$int         = ""

    this.$critical    = ""
    this.$dodge       = ""
    this.$coolTimePer = ""
    this.$critiDmg    = ""
    this.$dmgDown     = ""

    ///
    this.$hp          = 100;
    this.$mp          = 100;

    this.baseAttr = {
      maxHp       : [100,0,0,0],  // 血量最大值
      maxMp       : [100,0,0,0],  // 魔法最大值
      atk         : [5,0,0,0],    // 攻击
      def         : [0,0,0,0],   // 防御

      str         : [0,0,0,0],    // 力量
      dex         : [0,0,0,0],    // 敏捷
      int         : [0,0,0,0],    // 智力

      critical    : [0,0,0,0],    // 暴击几率    90 => 暴击率90%
      dodge       : [0,0,0,0],    // 闪避几率    90 => 闪避率90%
      coolTimePer : [0,0,0,0],    // 冷却时间减少 10 => 冷却时间减少10%
      critiDmg    : [0,0,0,0],    // 暴击伤害倍数 1.5 => 1.5倍
      dmgDown     : [0,0,0,0],    // 伤害减少 [5,10], 免伤 5 + 10%
    }


    Object.assign(this, opt);
  }

  hasTag(tagName){
    const index = this.tags.findIndex(i => i.tagName === tagName);
    const tag = this.tags[index];
    return [tag, index]
  }

  powerUp(key, value, target){
    target = target || this.baseAttr;
    for(let i = 0; i< target[key].length; i++){
      target[key][i] = (new BigNumber(target[key][i])).plus(value[i]).toNumber();
    }
  }

  get staticUpAttr(){
    const equipments = _.map(this.equipments, (id) => _.find(EquipList, {id: id}));
    const staticUpAttr = _.cloneDeep(this.baseAttr);
    _.forEach(equipments, (equipment) => {
      _.forEach(equipment.attr, (value, key) => {
        this.powerUp(key, value, staticUpAttr)
      })
    })
    return staticUpAttr;
    // TODO: 装备, 各种静态增幅
  }

  get powerAttr(){
    // 计算 基础 + 静态增幅后的属性
  }

  get attrType(){
    const [tag = {}] = this.hasTag('Main-Attr');
    return tag.value;
  }

  get maxHp(){
    const [base, per, _base, _Per] = this.staticUpAttr.maxHp;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get maxMp(){
    const [base, per, _base, _Per] = this.staticUpAttr.maxMp;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get str(){
    const [base, per, _base, _Per] = this.staticUpAttr.str;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get dex(){
    const [base, per, _base, _Per] = this.staticUpAttr.dex;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get int(){
    const [base, per, _base, _Per] = this.staticUpAttr.int;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get atk(){
    const [base, per, _base, _Per] = this.staticUpAttr.atk;
    return (((base + (this[this.attrType] || 0)) * (1 + per)) + _base) * (1 + _Per);
  }

  get def(){
    const [base, per, _base, _Per] = this.staticUpAttr.def;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get isDeath(){
    return this.staticUpAttr.hp <= 0;
  }

  actionUpdate(events = {}, origin, target){
    const { hp, buffs } = events;
    hp && (this.$hp += hp);
    if(buffs){
      // TODO:  ADD, REMOVE, MODIFY 3种状态;
      buffs.forEach(({buff, type}) => {
        console.log(buff, type)
        if(type === 'ADD'){
          buff.forEach((i) => {
            let newBuff = BuffList.find(j => j.id === i);
            let hasThisBuff = this.buffs.find(j => j.id === i);
            if(hasThisBuff){
              hasThisBuff.overlay && hasThisBuff.overlay()
            }else{
              newBuff.event && newBuff.event(origin, target);
              this.buffs.push(newBuff)
            }
          })
        }

        if(type === 'REMOVE'){
          buff.forEach((i) => {
            let hasThisBuffIndex = this.buffs.findIndex(j => j.id === i);
            if(~hasThisBuffIndex){
              let removeBuff = this.buffs[hasThisBuffIndex];
              removeBuff && removeBuff.remove && removeBuff.remove();
              this.buffs.splice(hasThisBuffIndex, 1);
            }
          })
        }
      });

    }
  }

}