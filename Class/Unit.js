class Unit{
  constructor(opt) {
    this.uid = 0;
    this.name = 1;
    this.tags = [...opt.tags];
    this.buffs = [];
    this.$attrType    = "str";        // TODO: 修改为TAG
    this.$hp          = 100;
    this.$mp          = 100;
    this.$maxHp       = [100,0,0,0];  // 血量最大值
    this.$maxMp       = [100,0,0,0];  // 魔法最大值
    this.$atk         = [5,0,0,0];    // 攻击
    this.$def         = [0,0,0,0];    // 防御

    this.$str         = [0,0,0,0];    // 力量
    this.$dex         = [0,0,0,0];    // 敏捷
    this.$int         = [0,0,0,0];    // 智力

    this.$critical    = [0,0,0,0];    // 暴击几率    90 => 暴击率90%
    this.$dodge       = [0,0,0,0];    // 闪避几率    90 => 闪避率90%
    this.$coolTimePer = [0,0,0,0];    // 冷却时间减少 10 => 冷却时间减少10%
    this.$critiDmg    = [0,0,0,0];    // 暴击伤害倍数 1.5 => 1.5倍
    this.$dmgDown     = [0,0,0,0];    // 伤害减少 [5,10], 免伤 5 + 10%
  }

  powerUp(key, value){
    // TODO: BigNumber.js
    // 原因： 假设 伤害增加30%，连续增加3次 , 0.3 + 0.3 + 0.3 "=" 0.8999999999999999, 数据将无法回归;
    for(let i = 0; i< this[key].length; i++){
      this[key][i] = this[key][i] + value[i];
    }
  }

  get maxHp(){
    const [base, per, _base, _Per] = this.$maxHp;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get maxMp(){
    const [base, per, _base, _Per] = this.$maxMp;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get str(){
    const [base, per, _base, _Per] = this.$str;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get dex(){
    const [base, per, _base, _Per] = this.$dex;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get int(){
    const [base, per, _base, _Per] = this.$int;
    return ((base * (1 + per)) + _base) * (1 + _Per);
  }

  get atk(){
    const [base, per, _base, _Per] = this.$atk;
    return (((base + this[this.$attrType]) * (1 + per)) + _base) * (1 + _Per);
  }

  get isDeath(){
    return this.$hp <= 0;
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