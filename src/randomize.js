export function repeatArray(arr, count) {     
  var ln = arr.length;
  var b = [];
  for(let i=0; i<count; i++) {      
    b.push(arr[i%ln]);      
  }
      
  return b;      
}

/* random int between min and max inclusive. */
export const randomInt = (min, max) => 
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomElement = (arr) => arr[randomInt(0, arr.length-1)];

export const randomElements = (arr, n) => {
    const randomSplit = (arr, chosen, i) => {
        const k = randomInt(0, arr.length-1);
        chosen.push(arr[k]);
        if (i === 1) {
            return;
        }
        randomSplit(arr.filter((_, l) => l !== k), chosen, i-1);
    };

    const chosen = [];
    randomSplit([...arr], chosen, n);
    return chosen;
};

export const shuffleArray = (arr) => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);

export const randomSequence = (items, length) => shuffleArray(repeatArray(items, length));

export const counterbalance = (n, prev_vals, exclude=null) => {
    const counts = Array(n).fill(0);
    for (const v of prev_vals) {
        if (counts[v]) {
            counts[v] += 1;
        }
        else {
            counts[v] = 1;
        }
    }

    let min_idxs = [];
    let min_count = null;
    
    for (let i=0; i<n; i++) {
        if (exclude && exclude.includes(i)) {
            continue;
        }
        
        if (min_count === null || counts[i] < min_count) {
            min_count = counts[i];
            min_idxs = [i];
        }
        else if (counts[i] === min_count) {
            min_idxs.push(i);
        }
    }
 
    return randomElement(min_idxs);
};

const find_first_idx = (k, n) => {
    if (n === 1)
        return {i: 0, k: k};

    n -= 1;
    
    let first_idx = 0;
    let n_partial_fact = n;

    while (k >= n_partial_fact && n > 1) {
        n_partial_fact = n_partial_fact * (n - 1);
        n -= 1;
    }

    first_idx = Math.floor(k / n_partial_fact);
    k = k % n_partial_fact;
    return {i: first_idx, k: k};
};

export const perm_to_seq = (n, k) => {
    const seq = [];
    let s = new Set();

    for (let i=0; i<n; i++)
        s.add(i);
    
    for (let i=0; i<n; i++) {
        const itr = Array.from(s);
        const ffi = find_first_idx(k, n-i);
        const idx = ffi.i;
        k = ffi.k;
        
        seq.push(itr[idx]);
        itr.splice(idx, 1);
        s = new Set(itr);
    }

    return seq;
};
