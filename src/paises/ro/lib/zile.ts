// Aritmetică de calendar fără Date (calculul trebuie să fie pur): numărul zilei din calendarul
// gregorian proleptic și înapoi, după algoritmul „days from civil”.
function zileDinData(an: number, luna: number, zi: number): number {
  const a = luna <= 2 ? an - 1 : an;
  const era = Math.floor(a / 400);
  const ya = a - era * 400;
  const m = luna + (luna > 2 ? -3 : 9);
  const yd = Math.floor((153 * m + 2) / 5) + zi - 1;
  const ye = ya * 365 + Math.floor(ya / 4) - Math.floor(ya / 100) + yd;
  return era * 146097 + ye - 719468;
}

function dataDinZile(n: number): string {
  const z = n + 719468;
  const era = Math.floor(z / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const zi = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const luna = mp + (mp < 10 ? 3 : -9);
  const an = yoe + era * 400 + (luna <= 2 ? 1 : 0);
  return `${an}-${String(luna).padStart(2, "0")}-${String(zi).padStart(2, "0")}`;
}

// 0 = luni ... 6 = duminică (1 ianuarie 1970 a fost joi).
function ziSaptamana(n: number): number {
  return (((n + 3) % 7) + 7) % 7;
}

// Ultima zi a unui termen de „zile lucrătoare” care începe a doua zi după data dată, fără sâmbete și
// duminici. Sărbătorile legale nu se scad.
export function dupaZileLucratoare(fecha: string, zile: number): string {
  let n = zileDinData(Number(fecha.slice(0, 4)), Number(fecha.slice(5, 7)), Number(fecha.slice(8, 10)));
  let ramase = zile;
  while (ramase > 0) {
    n += 1;
    if (ziSaptamana(n) < 5) ramase -= 1;
  }
  return dataDinZile(n);
}
