# SOA vs AOS

This repository is a set of demonstrations of exactly how bit of a deal data locality is. Each of the benchmark scripts runs a task, like a linear search or an update loop, on two data sets. Both sets are exactly the same, except that one is organized as a "Structure of Arrays (SOA)" and the other is arranged as an "Array of Structures."

In every case, the SOA format is significantly faster, but don't take my word for it. See for yourself!

There are a few reasons why SOA is faster:

1. CPUs are designed under the assumption that if you read from a location in memory, you're likely to also read from nearby locations. So, that nearby data gets pulled into really fast caches. If your data is compact, you will get a lot more cache hits, and keep your application fast. However, if data is spread out in memory (as it is in the more "object-oriented" AOS style), most reads are going to be cache misses, each one leading to a couple hundred stalled CPU cycles.

2. Modern CPUs have SIMD registers (Single Instruction Multiple Data) which allow them to do operations on a bunch of values at once. SIMD is much more effectively if data is stored close to other data of the same type, as it is in the SOA approach.

3. In the SOA style, because data is kept close together to other data of the same type, you also don't pollute your cache with a bunch of data you're not using, so cache reads are also more efficient.