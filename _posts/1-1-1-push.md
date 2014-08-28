---
title: "push"
type: "* -> Array -> Array"
args: "(value, values)"
---

Takes a single value and an array of values and returns a concatened
array of values with the first value pushed to the end.

```javascript
someEventStream.map(ku.push(Bacon.noMore));
```