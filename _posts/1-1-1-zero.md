---
title: "zero"
type: "* -> boolean"
args: "(value)"
---

Takes any value and returns a boolean of the double-negated value.

```javascript
// filter out events that have no items in their array
someEventStream.filter(ku(ku.zero, ku.attr('length')))
  .map(template)
  .assign($('#some-element'), 'html');
```