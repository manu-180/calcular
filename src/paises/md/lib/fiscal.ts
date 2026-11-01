// Salariul în Republica Moldova: din brut se reține prima de asigurare medicală (procent din salariu),
// iar impozitul pe venit se aplică pe brut minus prima și minus a douăsprezecea parte din scutirile
// anuale. Contribuția de asigurări sociale o plătește angajatorul, peste brut.
export const REQ_SALARIU = {
  "md.impozit-venit": "numero",
  "md.prima-medicala": "numero",
  "md.cas-angajator": "numero",
  "md.scutire-personala": "numero",
  "md.scutire-majorata": "numero",
  "md.scutire-intretinut": "numero",
  "md.scutire-intretinut-dizabilitate": "numero",
  "md.plafon-scutire": "numero",
} as const;

export interface ParametriSalariu {
  impozit: number;
  prima: number;
  cas: number;
  scutirePersonala: number;
  scutireMajorata: number;
  scutireIntretinut: number;
  scutireIntretinutDizabilitate: number;
  plafonScutire: number;
}

export function parametri(v: { readonly [K in keyof typeof REQ_SALARIU]: number }): ParametriSalariu {
  return {
    impozit: v["md.impozit-venit"],
    prima: v["md.prima-medicala"],
    cas: v["md.cas-angajator"],
    scutirePersonala: v["md.scutire-personala"],
    scutireMajorata: v["md.scutire-majorata"],
    scutireIntretinut: v["md.scutire-intretinut"],
    scutireIntretinutDizabilitate: v["md.scutire-intretinut-dizabilitate"],
    plafonScutire: v["md.plafon-scutire"],
  };
}

export type TipScutire = "personala" | "majorata" | "fara";

export const OPTIUNI_SCUTIRE = [
  { valor: "personala", etiqueta: "Scutirea personală" },
  { valor: "majorata", etiqueta: "Scutirea personală majorată" },
  { valor: "fara", etiqueta: "Fără scutire personală" },
] as const;

export interface OptiuniScutiri {
  scutire: TipScutire;
  intretinuti: number;
  intretinutiDizabilitate: number;
}

export function bani(x: number): number {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

// Scutirile pe an. Scutirea personală (simplă sau majorată) nu se acordă când venitul anual impozabil
// trece de plafon; cea pentru persoanele întreținute rămâne.
export function scutiriAnuale(venitAnual: number, o: OptiuniScutiri, p: ParametriSalariu): { personala: number; intretinuti: number; pestePlafon: boolean } {
  const pestePlafon = venitAnual > p.plafonScutire;
  const baza = o.scutire === "majorata" ? p.scutireMajorata : o.scutire === "personala" ? p.scutirePersonala : 0;
  const intretinuti = Math.max(0, Math.floor(o.intretinuti)) * p.scutireIntretinut + Math.max(0, Math.floor(o.intretinutiDizabilitate)) * p.scutireIntretinutDizabilitate;
  return { personala: pestePlafon ? 0 : baza, intretinuti, pestePlafon: pestePlafon && baza > 0 };
}

export interface Salariu {
  brut: number;
  prima: number;
  scutireLunara: number;
  bazaImpozit: number;
  impozit: number;
  net: number;
  cas: number;
  cost: number;
  pestePlafon: boolean;
}

export function salariu(brut: number, o: OptiuniScutiri, p: ParametriSalariu): Salariu {
  const s = scutiriAnuale(brut * 12, o, p);
  const prima = bani((brut * p.prima) / 100);
  const scutireLunara = bani((s.personala + s.intretinuti) / 12);
  const bazaImpozit = bani(Math.max(0, brut - prima - scutireLunara));
  const impozit = bani((bazaImpozit * p.impozit) / 100);
  const cas = bani((brut * p.cas) / 100);
  return { brut, prima, scutireLunara, bazaImpozit, impozit, net: bani(brut - prima - impozit), cas, cost: bani(brut + cas), pestePlafon: s.pestePlafon };
}

// Brutul cel mai mic, la ban, care dă cel puțin netul cerut. Netul crește cu brutul, cu o singură
// treaptă: la plafonul anual scutirea personală dispare și netul coboară. Se pornește de la formula
// fără rotunjiri și se corectează la ban.
export function brutDinNet(netDorit: number, o: OptiuniScutiri, p: ParametriSalariu): Salariu {
  const r = 1 - p.prima / 100;
  const t = p.impozit / 100;
  const estimare = (scutireAnuala: number): number => {
    const sl = scutireAnuala / 12;
    const b = netDorit > sl ? (netDorit - t * sl) / (r * (1 - t)) : netDorit / r;
    return Math.max(0, Math.floor(b * 100) / 100 - 0.05);
  };
  const corecteaza = (b: number): Salariu => {
    let f = salariu(bani(b), o, p);
    while (f.net < netDorit) f = salariu(bani(f.brut + 0.01), o, p);
    return f;
  };
  const cu = scutiriAnuale(0, o, p);
  const b1 = estimare(cu.personala + cu.intretinuti);
  if (cu.personala > 0 && (b1 + 0.1) * 12 <= p.plafonScutire) {
    const f = corecteaza(b1);
    if (f.brut * 12 <= p.plafonScutire) return f;
  }
  return corecteaza(Math.max(b1, estimare(cu.intretinuti)));
}
