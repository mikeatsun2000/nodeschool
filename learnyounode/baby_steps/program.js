//baby_steps/program.js23

const ps = require('process');

let total = 0
for (let i = 2; i < ps.argv.length; i++) {
    total += Number(ps.argv[i]);
}
console.log(total);
