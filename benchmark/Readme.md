# esotope benchmark

This benchmark compares esotope and [escodegen](https://github.com/Constellation/escodegen) performance.

## Usage
```
$ cd benchmark/
$ npm install && npm test
```

## Results
**Machine used:** Intel Core i7-2700K @ 3.50GHz, 8 GB RAM, Windows 8 64-bit, node 64-bit

With node v0.10.32:
 ```
 esotope x 13.93 ops/sec ±3.45% (40 runs sampled)
 escodegen x 6.61 ops/sec ±0.83% (21 runs sampled)
 Fastest is esotope
 esotope is x2.11 times faster vs escodegen.
 ```

With node v0.11.14 (with newer v8 version):
```
esotope x 17.57 ops/sec ±0.60% (48 runs sampled)
escodegen x 3.81 ops/sec ±3.94% (14 runs sampled)
Fastest is esotope
esotope is x4.61 times faster vs escodegen.
```