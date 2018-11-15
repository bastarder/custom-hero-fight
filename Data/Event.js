const EventList = [
  {
    id: '2',
    weight: 1,
    event: function(origin, target){
      origin.powerUp('$atk', [0, 0.3, 0, 0]);
      setTimeout(() => {
        origin.powerUp('$atk', [0, -0.3, 0, 0]);
      }, 5000)
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
          hp: parseInt((origin.maxHp - origin.$hp) * 0.1),
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
          hp: -parseInt(origin.atk * 0.5),
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
