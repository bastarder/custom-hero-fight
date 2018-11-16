class Action{
  constructor(props){
    this.origin = props.origin;
    this.target = props.target;
    this.skill = _.find(SkillList, {id: props.skill});
  }

  /** Action */
  action(){
    let EventResult = {};

    this.skill.events.forEach(event => {
      EventResult = EventList.find(i => i.id === event).event(this.origin, this.target) || {};
    });

    // console.log('[EventResult] ', EventResult)

    this.origin.actionUpdate(EventResult.origin, this.origin, this.target);
    this.target.actionUpdate(EventResult.target, this.origin, this.target);
  } /** Action */


}