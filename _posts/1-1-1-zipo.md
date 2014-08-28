---
title: "zipo"
type: "Array.<string> -> Array -> Object"
args: "(keys, values)"
---

Takes an array of keys and an array of values then returns an object
with properties equal to each key and value pair.

```javascript
ku.zipo(['foo', 'bar', 'baz', 'quux'], [1, 2, 3, 4]);
// => {foo: 1, bar: 2, baz: 3, quux: 4}
```