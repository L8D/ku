---
title: "attr"
type: "string -> Object -> *"
args: "(attr, value)"
---

Takes an attribute name and an object and returns that attribute of the
object.

```javascript
var getBanlist = ku(ku.map(ku.attr('username'),
                    ku.filter(ku.attr('banned'));

getBanlist([
  {username: 'L8D', banned: false, id: 123},
  {username: 'D8I', banned: true, id: 234},
  {username: 'tj', banned: true, id: 345}
]);
// => ['D8I', 'tj']
```