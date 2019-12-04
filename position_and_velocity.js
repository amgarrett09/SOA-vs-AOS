const Benchmark = require('benchmark');

const soa = {
  positions: [],
  velocities: [],
}

for (let i = 0; i <= 100000; i += 1) {
  soa.positions.push(i);
  soa.velocities.push(i);
}

const aos = [];

for (let i = 0; i <= 100000; i += 1) {
  aos.push({
    position: i,
    velocity: i,
  })
}

const suite = new Benchmark.Suite;

suite.add('AOS test', function() {
  for (let i = 0; i < aos.length; i += 1) {
      aos[i].position += aos[i].velocity;
  }
})
.add('SOA test', function() {
    let positions = soa.positions;
    let velocities = soa.velocities;
    for (let i = 0; i < positions.length; i += 1) {
      positions[i] += velocities[i];
    }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`);
})
.run()