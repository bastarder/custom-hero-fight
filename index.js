let hero = new Unit({
  $tags: [
    new Tag('hero'),
    new Tag('Main-Attr', { value: 'str' }),
  ],
  $equipments: ['1'],
  $skills: ['1', '2'],
  $buffs: [],
})

let monster = new Unit({
  $tags: [ new Tag('monster'), ]
})

game = new Fight({
  options: {
    A: hero,
    B: monster,
  }
});

game.start();

customElements.define('unit-info', UnitInfo);
customElements.define('progress-info', ProgressInfo);

function a(id){
  return new Action({origin: hero, target: monster, skill: id}).action();
}

function b(id){
  return new Action({origin: monster, target: hero, skill: id}).action();
}

