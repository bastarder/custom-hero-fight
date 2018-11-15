class Unit{
  constructor(opt) {
    this.uid = 0;
    this.name = 1;
    this.tags = [...opt.tags];
    this.buffs = [];
    this.$attrType    = "str",
    this.$hp = 0;
    this.$mp = 0;
    this.$maxHp       = [0,0,0,0];    // 血量最大值
    this.$maxMp       = [0,0,0,0];    // 魔法最大值
    this.$atk         = [0,0,0,0];    // 攻击
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

}