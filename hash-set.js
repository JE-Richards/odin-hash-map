class HashSet {
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
    entries.forEach((item) => {
      this.set(item);
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

  set(key) {
    // does number of buckets need to grow?
    let growthCheck = this.#checkGrowNeed();
    // Check if the key already exists
    let keyExists = this.has(key);

    const bucket = this.#findBucket(key);

    // if key exists, overwrite value
    // if key doesn't exist AND doesn't need to grow, then push new pair
    // else grow hash then push new pair
    if (keyExists) {
      return;
    } else if (!keyExists && !growthCheck) {
      bucket.push(key);
      this.#length += 1;
    } else {
      this.#growBuckets;
      const newBucket = this.#findBucket(key);
      newBucket.push(key);
      this.#length += 1;
    }
  }

  has(key) {
    const bucket = this.#findBucket(key);
    return bucket.some((item) => item === key);
  }

  remove(key) {
    // check if key exists
    let keyExists = this.has(key);

    if (!keyExists) {
      return false;
    } else {
      const bucket = this.#findBucket(key);
      const index = bucket.findIndex((item) => item === key);
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

  get entries() {
    return this.#map.flatMap((innerArr) => innerArr.map((item) => item));
  }
}

// testing
const setTest = new HashSet(); // or HashMap() if using a factory
setTest.set('apple');
setTest.set('banana');
setTest.set('carrot');
setTest.set('dog');
setTest.set('elephant');
setTest.set('frog');
setTest.set('grape');
setTest.set('hat');
setTest.set('ice cream');
setTest.set('jacket');
setTest.set('kite');
setTest.set('lion');

// confirm all keys in hashmap
console.log(setTest.entries);

// test buckets grow when over capacity
setTest.set('goldfish');
console.log(setTest);
