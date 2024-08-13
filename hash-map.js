class HashMap {
  #capacity;
  #loadFactor;
  #length;
  #map;

  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#length = 0;

    // let map = [];
    // for (let i = 0; i < this.#capacity; i += 1) {
    //   map[i] = [];
    // }

    // equivalent to the above for loop
    this.#map = new Array(this.#capacity).fill().map(() => []);
  }

  hash(key) {
    const primeNumber = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  get #growBuckets() {
    // double capacity
    this.#capacity *= 2;

    // move existing key-value pairs into new table with correct hash allocation
    let entries = this.entries;
    this.#map = new Array(this.#capacity).fill().map(() => []);
    entries.forEach((pair) => {
      this.set(pair[0], pair[1]);
    });
  }

  #findBucket(key) {
    let hash = this.hash(key);
    return this.#map[hash];
  }

  #checkGrowNeed() {
    // check if hashmap current max capacity
    let maxCapacity = Math.floor(this.#capacity * this.#loadFactor);

    return this.length + 1 > maxCapacity;
  }

  set(key, value) {
    // does number of buckets need to grow?
    let growthCheck = this.#checkGrowNeed();
    // Check if the key already exists
    let keyExists = this.has(key);

    const bucket = this.#findBucket(key);

    // if key exists, overwrite value
    // if key doesn't exist AND doesn't need to grow, then push new pair
    // else grow hash then push new pair
    if (keyExists) {
      let index = bucket.findIndex((obj) => obj.key === key);
      bucket[index].value = value;
    } else if (!keyExists && !growthCheck) {
      bucket.push({ key, value });
      this.#length += 1;
    } else {
      this.#growBuckets;
      const newBucket = this.#findBucket(key);
      newBucket.push({ key, value });
      this.#length += 1;
    }
  }

  get(key) {
    // check if key exists
    let keyExists = this.has(key);

    if (!keyExists) {
      return null;
    } else {
      const bucket = this.#findBucket(key);
      let index = bucket.findIndex((obj) => obj.key === key);
      return bucket[index].value;
    }
  }

  has(key) {
    const bucket = this.#findBucket(key);
    return bucket.some((obj) => obj.key === key);
  }

  remove(key) {
    // check if key exists
    let keyExists = this.has(key);

    if (!keyExists) {
      return false;
    } else {
      const bucket = this.#findBucket(key);
      const index = bucket.findIndex((obj) => obj.key === key);
      bucket.splice(index, 1);
      this.#length -= 1;
      return true;
    }
  }

  get length() {
    return this.#length;
  }

  get clear() {
    this.#map = new Array(this.#capacity).fill().map(() => []);
    this.#length = 0;
  }

  get keys() {
    // use flatMap to flatten the outer array of the hashmap
    // use map to extract keys from the remaining objects
    return this.#map.flatMap((innerArr) => innerArr.map((obj) => obj.key));
  }

  get values() {
    return this.#map.flatMap((innerArr) => innerArr.map((obj) => obj.value));
  }

  get entries() {
    return this.#map.flatMap((innerArr) =>
      innerArr.map((obj) => [obj.key, obj.value])
    );
  }
}

// testing
const test = new HashMap(); // or HashMap() if using a factory
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// confirm all keys in hashmap
console.log(test.keys);

// test buckets grow when over capacity
test.set('goldfish', 'orange');
console.log(test);
