---
title: "cmod"
type: "number -> number -> number"
args: "(x, y)"
---

Same as [ku.mod](#ku-mod) but return accurate modulo operation
in the form of `((x % y) + y) % y` to support operation on negative
numbers
