---
title: "wrap"
type: "string -> * -> Object"
args: "(attr, value)"
---

Takes an attribute name an a value, then returns an object with that
attribute equal to the value.

```javascript
ku.wrap('success', response); // => {success: response}
```