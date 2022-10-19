'use strict';

const text = `Решение задачи:\n
- для узлов вида: "td", был добавлен css: "word-break: break-word;".\n
- для класса blog установлен "max-width: 990px" вместо "width: 990px и max-width:95%".`
window.addEventListener('DOMContentLoaded', () => {
    alert(text)
})

// let company = {
//     sales: [{
//       name: 'John',
//       salary: 1000
//     }, {
//       name: 'Alice',
//       salary: 600
//     }],
  
//     development: {
//       sites: [{
//         name: 'Peter',
//         salary: 2000
//       }, {
//         name: 'Alex',
//         salary: 1800
//       }],
  
//       internals: [{
//         name: 'Jack',
//         salary: 1300
//       }]
//     }
//   };

//   function getTotalScore (data) {
//     let total = 0,
//         students;
//     for (let key of Object.values(data)) {
//         console.log(key)
//         if (Array.isArray(key)){
//             students +=key.length;
//             for (let i in key) {
//                 total += key[i].salary;
//             }
//         } else {
            
//         }
//     }
    
//     // return total / studens;
//   }

// console.log(getTotalScore(company))