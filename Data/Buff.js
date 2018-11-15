const BuffList = [
  {
    id: '1',
    name: '剧毒',
    status: {},
    times: 0,
    event: function(origin, target){
      this.timer = setInterval(() => {
        this.times += 1;
        // TODO: if(/狂怒/){ ....}
        new Action({origin, target, skill: { id: '100000_1', events: ['4_1']} }).action()
      }, 1000)
    },
    overlay: function(){
      console.log('overlay')
    },
    remove: function(){
      console.log('剧毒 被移除!')
      clearInterval(this.timer);
    }
  }
]
