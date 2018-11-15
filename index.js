let hero = new Unit({
  tags: [ new Tag('hero'), ]
})

let monster = new Unit({
  tags: [ new Tag('monster'), ]
})

const SkillList = [
  {
    name: '普通攻击',
    dsc: `对敌人造成100%的伤害`,
    events: ['1'],
  },
  {
    name: '狂热',
    dsc: `狂怒下,造成伤害增加30%`,
    events: ['2'],
  },
  {
    name: '圣光术',
    dsc: `恢复10%损失的生命值`,
    events: ['3'],
  },
  {
    id: '100000',
    name: '剧毒喷雾',
    dsc: `每秒对敌人造成15%毒属性的伤害，如果对方处于狂热状态, 造成的伤害翻倍`,
    events: ['4'],
  },
  {
    id: '100000_1',
    events: ['4_1'],
  },
  {
    id: '100000_2',
    events: ['4_2'],
  },
]

const Event = [
  {
    id: '2',
    weight: 1,
    event: function(origin, target){
      this.origin.powerUp('atk', [0, 0.3, 0, 0]);
    }
  },

  {
    id: '1',
    weight: 100,
    event: function(origin, target){
      return {
        origin: {},
        target: {
          hp: -origin.atk,
        }
      }
    }
  },

  {
    id: '3',
    weight: 100,
    event: function(origin, target){
      return {
        origin: {
          hp: parseInt((origin.maxHp - origin.hp) * 0.1),
        },
        target: {}
      }
    }
  },

  {
    id: '4',
    weight: 100,
    event: function(origin, target){
      return {
        origin: {},
        target: {
          buffs: [{
            type: 'ADD',
            buff: ['1'],
          }]
        }
      }
    }
  },

  {
    id: '4_1',
    weight: 100,
    event: function(origin, target){
      return {
        origin: {},
        target: {
          hp: -parseInt(origin.atk * 0.15),
        }
      }
    }
  },

  {
    id: '4_2',
    weight: 100,
    event: function(origin, target){
      return {
        origin: {},
        target: {
          hp: -parseInt(origin.atk * 0.30),
        }
      }
    }
  },

]

const Buff = [
  {
    id: '1',
    name: '剧毒',
    status: {},
    event: function(origin, target){
      setInterval(() => {
        if(target.buff.indexOf('100001')){
          action(origin, target, '100003')
        }else{
          action(origin, target, '100004')
        }
      })
    }
  }
]


// console.log(hero, monster)

// class Action{
//   constructor(props){
//     this.origin = props.origin;
//     this.target = props.target;
//     this.skill = props.skill;
//   }

//   /** Action */
//   action(){
//     let skill = {
//       status: {},
//       origin_status: {},
//       initStatus: function(){},
//       init: function(origin, target){
//         return {
//           origin: {},
//           target: {
//             attack: origin.$attack
//           },
//         }
//       }
//     }

//     let EventResult = skill.init(this.origin, this.target);

//     [
//       this.origin.buffs.filter((i) => i.isInitiative),
//       this.target.buffs.filter((i) => !i.isInitiative),
//     ].forEach((buff) => {
//       buff.event(EventResult, this, buff);
//     })

//     this.origin.actionUpdate(this.origin);
//     this.target.actionUpdate(this.target);

//   } /** Action */


// }

// new Action(origin, target, '10000').action();


// function action(origin, target, skill){

//   let skill = {
//     status: {},
//     origin_status: {},
//     initStatus: function(){},
//     init: function(origin, target){
//       return {
//         origin: Event,
//         target: Event,
//       }
//     }
//   }

//   let EventResult = skill.init.call(this)


// }

// action(origin, target, '10000')







// // 
//   '10000' InitEvent(origin, target) => {
//     attack: 100;
//   } as event

// // Buff
//   Filter origin => Tag => tags(event, origin, target) => ({
//     origin : {
//       attack: 120,
//     },
//     target : {
//       attack: 120,
//     }
//   })

//   Filter target => Tag => tags(event, origin, target) => ({
//     origin : {
//       attack: 111,
//     },
//     target : {
//       attack: 111,
//     }
//   })

//   // Tags;
//   [
//     {
//       $type: 'origin' | 'target',
//       icon: '毒',
//       description: '中毒了',
//       //////////////////////////////////
//       weight: 0,
//       status: {},
//       origin: function(event, origin, target){},
//       target: function(event, origin, target){},
//       remove: function(event, origin, target){},
//       add: function(event, origin, target){},
//       change: function(){},
//     }
//   ]

//   // Skill:
//   ({
//     status: {},
//     origin_status: {},
//     initStatus: function(){},
//     init: function(origin, target){
//       return {
//         origin: Event,
//         target: Event,
//       }
//     }
//   })

//   //Event
//   ({
//     attacks: [
//       {attack: 100, attack_type: 'physics'},
//     ],
//     tags: [
//       {
//         type: 'ADD',
//         id: '1000001',
//         status: {level: 3},
//       },
//       {
//         type: 'REMOVE',
//         id: '1000001',
//       },
//       {
//         type: 'CHANGE',
//         id: '1000001',
//         change: function(tag){ return tag},
//       }
//     ],
//     consume: [function(origin, target){
//       origin.gold -= 100;
//     }],
//   })
