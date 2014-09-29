ku [![Build Status](http://img.shields.io/travis/L8D/ku.svg?style=flat)](https://travis-ci.org/L8D/ku) [![NPM Version](http://img.shields.io/npm/v/ku.svg?style=flat)](https://npmjs.org/package/ku) [![License](http://img.shields.io/npm/l/ku.svg?style=flat)](https://github.com/L8D/ku/blob/master/LICENSE)
==

A lightweight alternative to [Ramda](https://github.com/CrossEye/ramda).

## Purpose

- All data-oriented functions take data as their last argument. This allows us
  to just curry functions and compose them from there without having to wrap
  every operation in an anonymous function.

- Native JavaScript data constructs. There are no custom class or instances
  for a 'ku' object. All function in ku operate on native JavaScript data
  structures including arrays, strings, objects and numbers(of course they're
  all already objects though).

- All multi-argument functions have automatic currying built-in. This means you
  can partially apply almost all ku methods for smooth and concise composition.

- Entire implementation will be under 4K. To do this the project uses several
  metaprogramming techniques and relies on ECMAScript 5 methods to keep the
  code clean and small.

# Documentation

Find the API documentation on GitHub pages site, [here](https://l8d.github.io/ku).
