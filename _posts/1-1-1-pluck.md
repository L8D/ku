---
title: "pluck"
type: "string -> Array.<Object> -> Array"
args: "(attr, values)"
---

Takes an attribute and array of values, then maps over each value and
returns the value of that value's attribute. This is the same as
`ku(ku.map, ku.attr)`.

```javascript
var getUsernames = ku.pluck('username');
getUsernames([
  {username: 'L8D', password: 'somepassword', id: 123},
  {username: 'D8I', password: 'otherpassword', id: 234},
  {username: 'tj', password: 'whoknows', id: 345}
]);
// => ['L8D', 'D8I', 'tj']
```