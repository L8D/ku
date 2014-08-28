---
title: "flip"
type: "function -> function"
args: "(func)"
---

Takes a function and returns a new function with its first two arguments
reversed.

```javascript
ku.add('foo', ' bar'); // => ' barfoo'
ku.flip(ku.add)('foo', ' bar') // => 'foo bar'
```