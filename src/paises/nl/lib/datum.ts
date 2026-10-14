export interface Duur {
  jaren: number;
  maanden: number;
  dagen: number;
}

function delen(iso: string): [number, number, number] {
  return [Number(iso.slice(0, 4)), Number(iso.slice(5, 7)), Number(iso.slice(8, 10))];
}

export function dagenInMaand(jaar: number, maand: number): number {
  return [31, jaar % 4 === 0 && (jaar % 100 !== 0 || jaar % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][maand - 1];
}

// Duur van een contract van begin tot en met de laatste dag: 1 januari tot en met 31 december is
// precies één jaar. Daarom telt de einddatum als dag erbij.
export function duurTotEnMet(begin: string, eind: string): Duur {
  const [bj, bm, bd] = delen(begin);
  let [ej, em, ed] = delen(eind);
  ed += 1;
  if (ed > dagenInMaand(ej, em)) {
    ed = 1;
    em += 1;
    if (em > 12) {
      em = 1;
      ej += 1;
    }
  }
  let jaren = ej - bj;
  let maanden = em - bm;
  let dagen = ed - bd;
  if (dagen < 0) {
    maanden -= 1;
    const vorige = em === 1 ? 12 : em - 1;
    dagen += dagenInMaand(em === 1 ? ej - 1 : ej, vorige);
  }
  if (maanden < 0) {
    jaren -= 1;
    maanden += 12;
  }
  return { jaren, maanden, dagen };
}

export function plusMaanden(iso: string, maanden: number): string {
  const [j, m, d] = delen(iso);
  const totaal = j * 12 + (m - 1) + maanden;
  const nj = Math.floor(totaal / 12);
  const nm = (totaal % 12) + 1;
  const nd = Math.min(d, dagenInMaand(nj, nm));
  return `${nj}-${String(nm).padStart(2, "0")}-${String(nd).padStart(2, "0")}`;
}

const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

export function datumTekst(iso: string): string {
  const [j, m, d] = delen(iso);
  return `${d} ${MAANDEN[m - 1]} ${j}`;
}

export function maandTekst(iso: string): string {
  const [j, m] = delen(iso);
  return `${MAANDEN[m - 1]} ${j}`;
}
