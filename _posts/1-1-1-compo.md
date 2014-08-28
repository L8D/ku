---
title: "compo"
type: "Object -> Object -> boolean"
args: "(props, object)"
---

Takes an object of properties and an object then returns a boolean of
wether or not all properties of the properties object are equal to the
same set of properties on the given object.

```javascript
var firstTwoCorrect = ku.compo({foo: 1, bar: 2});

firstTwoCorrect({foo: 1, bar: 2, baz: 3, quux: 4}); // => true
firstTwoCorrect({foo: 0, bar: 2}) // => false
firstTwoCorrect({bax: 3, quux: 4}) // => false
```