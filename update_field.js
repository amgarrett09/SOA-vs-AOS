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
    vector_aos[i].x += 1;
  }
})
.add('SOA test', function() {
    let xs = vector_soa.x;
    for (let i = 0; i < xs.length; i += 1) {
      xs[i] += 1;
    }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`);
})
.run()