---
title: "func"
type: "iterator -> function"
args: "(iterator)"
---

Takes an iterator and returns the corresponding iterator callback. This
is used by methods like `find`, `map` and `filter` to generate their
iterator.

If a string is supplied, then it uses [ku.attr](#ku-attr). Known as the
`_.pluck` notation in LoDash.

If an object is supplied, then it uses [ku.combo](#ku-combo). Known as the
`_.where` notation in Lodash.

If a function is supplied, then it just uses that.
