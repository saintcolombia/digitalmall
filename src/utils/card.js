export function luhnCheck(value) {
  const s = value.replace(/\s+/g, "");
  let nCheck = 0, bEven = false;
  for (let n = s.length - 1; n >= 0; n--) {
    let cDigit = s.charAt(n);
    if (cDigit < "0" || cDigit > "9") return false;
    let nDigit = parseInt(cDigit, 10);
    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }
    nCheck += nDigit;
    bEven = !bEven;
  }
  return (nCheck % 10) === 0;
}

export function expiryValid(exp) {
  const m = exp.match(/^(\d{2})\/(\d{4})$/);
  if (!m) return false;
  const mm = parseInt(m[1], 10);
  const yyyy = parseInt(m[2], 10);
  if (!mm || mm < 1 || mm > 12) return false;
  const now = new Date();
  if (yyyy < now.getFullYear()) return false;
  if (yyyy === now.getFullYear() && mm < now.getMonth() + 1) return false;
  return true;
}
