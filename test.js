let originEl = document.querySelector('#origin');
let targetEl = document.querySelector('#target');

// setInterval(() => {
//   let str = "";

//   for(let key in hero){
//     str += `
//       <div class="item">
//         <div class="key">${key}</div> :
//         <div class="value">${JSON.stringify(hero[key])} (${JSON.stringify(hero[key.replace('$', '')] || "")})</div>
//       </div>
//     `
//   }
//   originEl.innerHTML = str

//   str = "";

//   for(let key in monster){
//     str += `
//       <div class="item">
//         <div class="key">${key}</div> :
//         <div class="value">${JSON.stringify(monster[key])} (${JSON.stringify(monster[key.replace('$', '')] || "")})</div>
//       </div>
//     `
//   }
//   targetEl.innerHTML = str;
// },1000)