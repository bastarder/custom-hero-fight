let hero = new Unit({
  tags: [
    new Tag('hero'),
    new Tag('Main-Attr', { value: 'str' }),
  ],
  equipments: [
    '1', '2'
  ]
})

let monster = new Unit({
  tags: [ new Tag('monster'), ]
})



function a(id){
  return new Action({origin: hero, target: monster, skill: id}).action();
}


function b(id){
  return new Action({origin: monster, target: hero, skill: id}).action();
}

