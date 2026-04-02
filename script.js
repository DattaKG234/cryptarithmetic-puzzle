function solve() {
  const eq = document.getElementById("input").value.replace(/\s+/g, '');
  const [lhs, rhs] = eq.split('=');
  const words = lhs.split('+');
  words.push(rhs);

  const letters = [...new Set(words.join(''))];
  if (letters.length > 10) {
    document.getElementById("output").innerText = "Too many letters!";
    return;
  }

  const digits = [...Array(10).keys()];

  function permute(arr) {
    if (arr.length === 1) return [arr];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      let rest = permute(arr.slice(0, i).concat(arr.slice(i + 1)));
      for (let r of rest) result.push([arr[i], ...r]);
    }
    return result;
  }

  const perms = permute(digits).slice(0, 100000); // limit brute force

  for (let p of perms) {
    let map = {};
    letters.forEach((l, i) => map[l] = p[i]);

    if (words.some(w => map[w[0]] === 0)) continue;

    function val(w) {
      return Number([...w].map(c => map[c]).join(''));
    }

    let sum = words.slice(0, -1).reduce((a, w) => a + val(w), 0);
    if (sum === val(rhs)) {
      document.getElementById("output").innerText =
        "Solution: " + JSON.stringify(map);
      return;
    }
  }

  document.getElementById("output").innerText = "No solution found";
}
