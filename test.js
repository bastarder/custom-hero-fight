let originEl = document.querySelector('#origin');
let targetEl = document.querySelector('#target');

setInterval(() => {
  let str = "";

  for(let key in hero){
    str += `
      <div class="item">
        <div class="key">${key}</div> :
        <div class="value">${JSON.stringify(hero[key])}</div>
      </div>
    `
  }
  originEl.innerHTML = str

  str = "";

  for(let key in monster){
    str += `
      <div class="item">
        <div class="key">${key}</div> :
        <div class="value">${JSON.stringify(monster[key])}</div>
      </div>
    `
  }
  targetEl.innerHTML = str;
},100)