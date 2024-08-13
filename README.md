# Hash Map Implementation: An Intermediate JavaScript Project

## Introduction

This is a mini project forming part of the [JavaScript course](https://www.theodinproject.com/lessons/javascript-hashmap) hosted by [The Odin Project](https://www.theodinproject.com/). It provides an opportunity for students to practice implementing a _hash map_ (and optionally a _hash set_)data structure from scratch.

## Scope

The goal of the project is to implement the following:

- [x] A `HashMap` class or factory function.
- The following methods into the class:
  - [x] `hash(key)` - Tkes a key and produces a hash code with it.
  - [x] `set(key, value)` - If the key already exists in the hash map, then it overwrites the existing `value` with the new input `value`. If the key doesn't exist, adds the key-value pair to the hash map.
    - [x] Handle collisions
  - [x] `get(key)` - Returns the value assigned to the key. If the key is not found, returns `null`.
  - [x] `has(key)` - Returns `true` or `false` depending on whether the key exists in the hash map.
  - [x] `remove(key)` - If the key exists in the hashmap, removes the key-value pair and returns `true`. If the key isn't in the hash map, returns `false`.
  - [x] `length` - Returnes the number of stored key-value pairs in the hash map.
  - [x] `clear` - Removes all entries in the hash map.
  - [x] `keys` - Returns an array containing all of the keys inside the hash map.
  - [x] `values` - Returns an array containing all of the values inside the hash map.
  - [x] `entries` - Returns an array that contains each key-value pair as sub-arrays.
- [x] EXTRA CREDIT: Create a `HashSet` class or factory function that behaves the same as a `HashMap` but only contains `keys` with no `values`.

## Notes

### Collisions

To handle collisions, I've opted to make the `HashMap` into an array of arrays, where each sub-array represents a bucket. This allows multiple key-value pairs to be stored in a single bucket.

I opted to use arrays for simplicities sake, but could have equally opted to use a linked list instead by utilising the code from the [previous project](https://github.com/JE-Richards/odin-linked-lists).

Whether to use Arrays or Linked Lists would depend on the circumstances the hash map will be used for. Linked Lists would be preferrable if:

- You are dealing with frequent insertions and deletions
- You're dealing with very large datasets
  - Especially if you will _also_ be making lots of insertions and deletions.

Otherwise Arrays will likely be better given the built in methods and performance they provide within JavaScript.

### Hash Set

It should be possible to extend the existing `HashMap` class rather than define a new `HashSet` class from scratch.

However, when initially writing the `HashMap` class and methods, I hadn't planned it with an eye towards extension. The inclusion of pricate variables and methods, in addition to the direct reference to key-valu pairs in many methods, makes direct extension more difficult.

Therefore, for the purposes of this project I opted to copy-paste the `HashMap` code and modify it in a separate file rather than refactor the existing code to make extension easier. In future projects, it would be worth modifying the `HashMap` code to make direct extension more viable.

Additionally, I removed the following methods from the `HashSet` class:

- `keys` and `values` - As the hash set will only contain keys, `keys`, `values`, and `entries` would all perform the same task. Given that `entries` is called within other methods of the class, I opted to keep that one and remove the other two.
- `get` - In `HashMap`, `get` takes a key as an input, searches for it inside the hash map, and returns the corresponding value if the key exists. For `HashSet`, there is no corresponding value to return, so the function would be pointless as you already need the key to use it. Given that `has` also exists, `get` wouldn't even serve a purpose as a way to check if the key exists in the set. Hence, it's been removed.
