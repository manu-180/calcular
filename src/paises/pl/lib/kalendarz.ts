// Dni wolne od pracy według ustawy z 18 stycznia 1951 r. (tekst jednolity Dz.U. 2025 poz. 296).
// Wigilia (24 grudnia) jest dniem wolnym od 1 lutego 2025 r., więc liczy się od roku 2025.

const MS_DNIA = 86_400_000;

function utc(rok: number, miesiac: number, dzien: number): number {
  return Date.UTC(rok, miesiac - 1, dzien);
}

function iso(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

// Algorytm Meeusa, Jonesa i Butchera dla kalendarza gregoriańskiego.
export function wielkanoc(rok: number): string {
  const a = rok % 19;
  const b = Math.floor(rok / 100);
  const c = rok % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const miesiac = Math.floor((h + l - 7 * m + 114) / 31);
  const dzien = ((h + l - 7 * m + 114) % 31) + 1;
  return iso(utc(rok, miesiac, dzien));
}

export function swieta(rok: number): ReadonlySet<string> {
  const wn = Date.parse(`${wielkanoc(rok)}T00:00:00Z`);
  const daty = [
    utc(rok, 1, 1),
    utc(rok, 1, 6),
    wn,
    wn + MS_DNIA,
    utc(rok, 5, 1),
    utc(rok, 5, 3),
    wn + 49 * MS_DNIA,
    wn + 60 * MS_DNIA,
    utc(rok, 8, 15),
    utc(rok, 11, 1),
    utc(rok, 11, 11),
    utc(rok, 12, 25),
    utc(rok, 12, 26),
  ];
  if (rok >= 2025) daty.push(utc(rok, 12, 24));
  return new Set(daty.map(iso));
}

export interface Wymiar {
  dniRobocze: number;
  godziny: number;
  swietaWDniPowszedni: number;
  swietaWSobote: number;
}

// Art. 130 k.p.: 40 godzin razy tygodnie plus 8 godzin za pozostałe dni od poniedziałku do piątku, minus
// 8 godzin za każde święto przypadające w innym dniu niż niedziela. To samo daje 8 godzin razy dni
// od poniedziałku do piątku, pomniejszone o święta od poniedziałku do soboty.
export function wymiarCzasuPracy(od: string, do_: string): Wymiar {
  let dniPowszednie = 0;
  let swietaWDniPowszedni = 0;
  let swietaWSobote = 0;
  const lata = new Map<number, ReadonlySet<string>>();
  for (let ms = Date.parse(`${od}T00:00:00Z`), koniec = Date.parse(`${do_}T00:00:00Z`); ms <= koniec; ms += MS_DNIA) {
    const data = iso(ms);
    const rok = Number(data.slice(0, 4));
    if (!lata.has(rok)) lata.set(rok, swieta(rok));
    const swieto = lata.get(rok)!.has(data);
    const dzien = new Date(ms).getUTCDay();
    if (dzien >= 1 && dzien <= 5) {
      dniPowszednie++;
      if (swieto) swietaWDniPowszedni++;
    } else if (dzien === 6 && swieto) swietaWSobote++;
  }
  const dniRobocze = dniPowszednie - swietaWDniPowszedni - swietaWSobote;
  return { dniRobocze, godziny: dniRobocze * 8, swietaWDniPowszedni, swietaWSobote };
}

export function ostatniDzienMiesiaca(rok: number, miesiac: number): string {
  return iso(utc(rok, miesiac + 1, 1) - MS_DNIA);
}

export function wymiarMiesiaca(rok: number, miesiac: number): Wymiar {
  return wymiarCzasuPracy(`${rok}-${String(miesiac).padStart(2, "0")}-01`, ostatniDzienMiesiaca(rok, miesiac));
}

// § 19 rozporządzenia z 8 stycznia 1997 r. (Dz.U. 1997 nr 2 poz. 14): dni w roku minus niedziele, święta
// i dni wolne z pięciodniowego tygodnia pracy, podzielone przez 12. Liczba dni pracy w roku to wymiar
// z art. 130 k.p. w dniach.
export function wspolczynnikUrlopowy(rok: number): number {
  return wymiarCzasuPracy(`${rok}-01-01`, `${rok}-12-31`).dniRobocze / 12;
}

const MIESIACE = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

export function nazwaMiesiaca(miesiac: number): string {
  return MIESIACE[miesiac - 1];
}
