---
title: "filter"
type: "iterator -> Array -> Array"
args: "(iterator, values)"
---

Takes an iterator and an array of values, then returns a subset of the
array containing elements where the iterator returned a truthy value.

```javascript
var isOdd = ku(ku.eq(1), ku.mod(2));

ku.filter(isOdd, [1, 2, 3, 4, 5]) // => [1, 3, 5]
```