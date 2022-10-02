const { spawnSync } = require('child_process');
const packageName = 'micromatch';
const whyBuffer = spawnSync('yarn', ['why', packageName]);
const grepBuffer = spawnSync('grep', ['Found'], { input: whyBuffer.stdout });
const outputArray = grepBuffer.stdout.toString().split('\n');
console.log(outputArray); // ['info \r=> Found "micromatch@3.1.10"',    'info \r=> Found "fast-glob#micromatch@4.0.2"', ''  ]
const parsedOutputArray = outputArray.filter(output => output.length > 0).map(output => output.split('@')[1].replace('"', ''));
console.log(parsedOutputArray); // [ '3.1.10', '4.0.2' ]
