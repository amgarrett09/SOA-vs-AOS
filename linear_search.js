const Benchmark = require('benchmark');

const vector_soa = {
  x: [],
  y: [],
  z: [],
}

for (let i = 0; i <= 100000; i += 1) {
    vector_soa.x.push(i);
    vector_soa.y.push(i);
    vector_soa.z.push(i);
}

const vector_aos = [];

for (let i = 0; i <= 100000; i += 1) {
    vector_aos.push({
      x: i,
      y: i,
      z: i,
    });
}

const suite = new Benchmark.Suite;

suite.add('AOS test', function() {
  for (let i = 0; i < vector_aos.length; i += 1) {
    if (vector_aos[i].y == 100000) break;
  }
})
.add('SOA test', function() {
    let ys = vector_soa.y;
    for (let i = 0; i < ys.length; i += 1) {
      if (ys[i] == 100000) break;
    }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`);
})
.run()