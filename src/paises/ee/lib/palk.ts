import { ErrorEntrada, porcentaje } from "@/motor/calculo";

export interface MaaradPalk {
  tulumaks: number;
  tootuskindlustus: number;
  kogumispension: number;
  maksuvaba: number;
}

export interface Palk {
  bruto: number;
  tootuskindlustus: number;
  kogumispension: number;
  maksuvaba: number;
  maksustatav: number;
  tulumaks: number;
  neto: number;
}

// TuMS § 42: enne tulumaksu arvutamist arvatakse väljamaksest maha töötuskindlustusmakse, II samba
// makse ja maksuvaba tulu, viimane ainult väljamakse ulatuses.
export function brutoNetoks(bruto: number, m: MaaradPalk, redondear: (x: number) => number): Palk {
  const tk = redondear(porcentaje(bruto, m.tootuskindlustus));
  const ii = redondear(porcentaje(bruto, m.kogumispension));
  const parast = redondear(bruto - tk - ii);
  const maksuvaba = Math.min(m.maksuvaba, Math.max(0, parast));
  const maksustatav = redondear(parast - maksuvaba);
  const tulumaks = redondear(porcentaje(maksustatav, m.tulumaks));
  return { bruto, tootuskindlustus: tk, kogumispension: ii, maksuvaba, maksustatav, tulumaks, neto: redondear(parast - tulumaks) };
}

export function netoBrutoks(neto: number, m: MaaradPalk, redondear: (x: number) => number): Palk {
  const a = 1 - (m.tootuskindlustus + m.kogumispension) / 100;
  const t = m.tulumaks / 100;
  let b = neto <= m.maksuvaba ? neto / a : (neto - t * m.maksuvaba) / (a * (1 - t));
  b = redondear(b);
  for (let i = 0; i < 8; i++) {
    const vahe = redondear(neto - brutoNetoks(b, m, redondear).neto);
    if (vahe === 0) break;
    b = redondear(b + (vahe > 0 ? 0.01 : -0.01));
  }
  return brutoNetoks(b, m, redondear);
}

export interface TooandjaKulu {
  sotsiaalmaks: number;
  tootuskindlustus: number;
  kulu: number;
  miinimumRakendus: boolean;
}

export function tooandjaKulu(bruto: number, sotsiaalmaks: number, tootuskindlustus: number, miinimum: number | null, redondear: (x: number) => number): TooandjaKulu {
  const arvutatud = redondear(porcentaje(bruto, sotsiaalmaks));
  const miinimumRakendus = miinimum !== null && arvutatud < miinimum;
  const sm = miinimumRakendus ? (miinimum as number) : arvutatud;
  const tk = redondear(porcentaje(bruto, tootuskindlustus));
  return { sotsiaalmaks: sm, tootuskindlustus: tk, kulu: redondear(bruto + sm + tk), miinimumRakendus };
}

export function suuremNullist(x: number, valja: string, tekst = "Sisesta summa, mis on suurem kui null."): void {
  if (x <= 0) throw new ErrorEntrada(tekst, valja);
}
