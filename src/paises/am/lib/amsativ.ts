// Calendario gregoriano sin Date: calcular() tiene que ser pura.
function orerSkzbits(a: number, m: number, o: number): number {
  const y = m <= 2 ? a - 1 : a;
  const era = Math.floor(y / 400);
  const yoe = y - era * 400;
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + o - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe;
}

function amsativOrerits(n: number): string {
  const era = Math.floor(n / 146097);
  const doe = n - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const o = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp < 10 ? mp + 3 : mp - 9;
  const a = yoe + era * 400 + (m <= 2 ? 1 : 0);
  return `${a}-${String(m).padStart(2, "0")}-${String(o).padStart(2, "0")}`;
}

function masi(f: string): [number, number, number] {
  return [Number(f.slice(0, 4)), Number(f.slice(5, 7)), Number(f.slice(8, 10))];
}

export function avelatsnelOrer(f: string, orer: number): string {
  const [a, m, o] = masi(f);
  return amsativOrerits(orerSkzbits(a, m, o) + orer);
}

export function avelatsnelAmis(f: string, amis: number): string {
  const [a, m, o] = masi(f);
  const t = m - 1 + amis;
  const a2 = a + Math.floor(t / 12);
  const m2 = (t % 12) + 1;
  const verj = amsativOrerits(orerSkzbits(m2 === 12 ? a2 + 1 : a2, m2 === 12 ? 1 : m2 + 1, 1) - 1);
  const o2 = Math.min(o, Number(verj.slice(8, 10)));
  return `${a2}-${String(m2).padStart(2, "0")}-${String(o2).padStart(2, "0")}`;
}

export function orerMijev(a: string, b: string): number {
  const [a1, m1, o1] = masi(a);
  const [a2, m2, o2] = masi(b);
  return orerSkzbits(a2, m2, o2) - orerSkzbits(a1, m1, o1);
}
