---
title: "curry"
type: "function -> number -> function"
args: "(func, [expected=func.length])"
---

Creates a wrapper function that performs automatic curry (keep returning
collector functions until it has collected enough arguments to call the
original function).

On a more technical level, Takes a function and returns a carrier function
that will keep returning itself (the function) until it has recieved a
number of arguments greater than or equal to the original function's arity.

When it has "collected" enough arguments it will apply those arguments to
the original function and then either return the result, or if the result
is a function and there are extra aguments, it will apply the extra
arguments to the result and return that.
