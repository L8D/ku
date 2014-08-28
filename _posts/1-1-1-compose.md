---
title: "compose"
type: "function -> function -> function"
args: "(func, func2)"
---

Takes two functions and returns a new function of those two functions
composed together.

```javascript
ku.compose(ku.add(1), ku.sub(2))(1) // => 1 - 2 + 1 = 0
```