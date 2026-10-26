// Rotunjiri la leu. Codul fiscal, art. 66 și normele la art. 64: sumele și bazele de calcul se
// rotunjesc la leu, neglijând fracțiunile de până la 50 de bani inclusiv. Contribuțiile CAS, CASS și
// CAM se declară în lei întregi; statele de plată le rotunjesc la leu, cu 50 de bani în sus (așa iese
// netul oficial al salariului minim: 4.325 lei brut, 2.699 lei net).
function curat(x: number): number {
  return Number(Math.abs(x).toPrecision(12));
}

export function leu(x: number): number {
  const s = x < 0 ? -1 : 1;
  const a = curat(x);
  const intreg = Math.floor(a);
  return s * (a - intreg > 0.5 ? intreg + 1 : intreg);
}

export function leuSus(x: number): number {
  const s = x < 0 ? -1 : 1;
  return s * Math.floor(curat(x) + 0.5);
}

export interface ParametriSalariu {
  salariuMinim: number;
  cas: number;
  cass: number;
  impozit: number;
  deducereBaza: Readonly<Record<string, number>>;
  deducerePlafon: number;
  deducerePas: number;
  deducereScadere: number;
  deducereTineri: number;
  deducereCopil: number;
  facilitate: { suma: number; plafon: number };
}

export interface OptiuniSalariu {
  persoane: number;
  sub26: boolean;
  copiiScoala: number;
  laSalariulMinim: boolean;
}

export interface Fluturas {
  brut: number;
  sumaNeimpozabila: number;
  cas: number;
  cass: number;
  venitNet: number;
  procentDeducere: number;
  deducereBaza: number;
  deducereTineri: number;
  deducereCopii: number;
  deducere: number;
  bazaImpozit: number;
  impozit: number;
  net: number;
}

export function procentDeducereBaza(brut: number, persoane: number, p: ParametriSalariu): number {
  if (brut > p.salariuMinim + p.deducerePlafon) return 0;
  const cheie = String(Math.min(4, Math.max(0, Math.floor(persoane))));
  const baza = p.deducereBaza[cheie] ?? 0;
  const transe = brut > p.salariuMinim ? Math.ceil(curat(brut - p.salariuMinim) / p.deducerePas) : 0;
  return Math.max(0, Number((baza - transe * p.deducereScadere).toFixed(4)));
}

export function facilitateAplicabila(brut: number, o: OptiuniSalariu, p: ParametriSalariu): number {
  if (!o.laSalariulMinim || p.facilitate.suma <= 0) return 0;
  if (brut < p.salariuMinim || brut > p.facilitate.plafon) return 0;
  return p.facilitate.suma;
}

export function fluturas(brut: number, o: OptiuniSalariu, p: ParametriSalariu): Fluturas {
  const sumaNeimpozabila = facilitateAplicabila(brut, o, p);
  const bazaContributii = brut - sumaNeimpozabila;
  const cas = leuSus((bazaContributii * p.cas) / 100);
  const cass = leuSus((bazaContributii * p.cass) / 100);
  const venitNet = Math.max(0, bazaContributii - cas - cass);
  const procentDeducere = procentDeducereBaza(brut, o.persoane, p);
  const deducereBaza = leu((p.salariuMinim * procentDeducere) / 100);
  const deducereTineri = o.sub26 && brut <= p.salariuMinim + p.deducerePlafon ? leu((p.salariuMinim * p.deducereTineri) / 100) : 0;
  const deducereCopii = Math.max(0, Math.floor(o.copiiScoala)) * p.deducereCopil;
  const deducere = Math.min(venitNet, deducereBaza + deducereTineri + deducereCopii);
  const bazaImpozit = leu(Math.max(0, venitNet - deducere));
  const impozit = leu((bazaImpozit * p.impozit) / 100);
  const net = Number((brut - cas - cass - impozit).toFixed(2));
  return { brut, sumaNeimpozabila, cas, cass, venitNet, procentDeducere, deducereBaza, deducereTineri, deducereCopii, deducere, bazaImpozit, impozit, net };
}

// Cel mai mic brut în lei întregi care dă cel puțin netul cerut. Netul nu crește strict cu brutul: la
// fiecare tranșă de 50 de lei deducerea scade și netul coboară cu câțiva lei, iar la plafonul sumei
// neimpozabile coboară brusc. De aceea se caută leu cu leu, de la net (brutul nu e niciodată mai mic)
// până la primul brut suficient.
export function brutDinNet(netDorit: number, o: OptiuniSalariu, p: ParametriSalariu): Fluturas {
  let hi = Math.ceil(netDorit * 2) + 1000;
  while (fluturas(hi, o, p).net < netDorit) hi *= 2;
  for (let brut = Math.max(1, Math.floor(netDorit)); brut < hi; brut++) {
    const f = fluturas(brut, o, p);
    if (f.net >= netDorit) return f;
  }
  return fluturas(hi, o, p);
}

// CASS pentru veniturile din alte surse (chirii, dividende, dobânzi, drepturi de autor): baza este un
// număr fix de salarii minime, după treapta în care intră suma veniturilor (art. 170 alin. 3).
export function bazaCassTrepte(venit: number, salariuMinim: number, trepte: Readonly<Record<string, number>>): number {
  const t6 = (trepte.minim ?? 6) * salariuMinim;
  const t12 = (trepte.mediu ?? 12) * salariuMinim;
  const t24 = (trepte.maxim ?? 24) * salariuMinim;
  if (venit >= t24) return t24;
  if (venit >= t12) return t12;
  if (venit >= t6) return t6;
  return 0;
}
