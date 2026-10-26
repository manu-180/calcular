// Nettó bér havonta, a kedvezmények Szja tv. 29/H. § szerinti sorrendjében: anyák kedvezményei,
// 25 év alattiak, személyi kedvezmény, első házasok, végül a családi kedvezmény. A családi
// kedvezmény fel nem használt részének 15 százaléka a TB-járulékot csökkenti (családi
// járulékkedvezmény, 29/B. §), legfeljebb a járulék összegéig.

export interface Kedvezmenyek {
  anyak: boolean;
  alatt25: boolean;
  szemelyi: boolean;
  elsoHazasok: boolean;
  // Kedvezményezett eltartottak (akik után családi pótlék jár) és az összes eltartott.
  gyerekek: number;
  eltartottak: number;
  tartosanBeteg: number;
}

export const NINCS_KEDVEZMENY: Kedvezmenyek = {
  anyak: false,
  alatt25: false,
  szemelyi: false,
  elsoHazasok: false,
  gyerekek: 0,
  eltartottak: 0,
  tartosanBeteg: 0,
};

export interface Parameterek {
  szja: number;
  tb: number;
  hatar25: number;
  csaladi: Readonly<Record<string, number>>;
  csaladiBeteg: number;
  elsoHazasok: number;
  minimalber: number;
}

export interface Berszamfejtes {
  brutto: number;
  tb: number;
  szjaAlap: number;
  szja: number;
  kedvezmeny25: number;
  anyakKedvezmeny: number;
  szemelyiKedvezmeny: number;
  elsoHazasokKedvezmeny: number;
  csaladiKedvezmeny: number;
  csaladiFelhasznalt: number;
  jarulekKedvezmeny: number;
  netto: number;
}

export function csaladiKedvezmenyHavi(gyerekek: number, eltartottak: number, tartosanBeteg: number, p: Pick<Parameterek, "csaladi" | "csaladiBeteg">): number {
  if (gyerekek <= 0) return 0;
  const osszes = Math.max(gyerekek, eltartottak);
  const kulcs = osszes >= 3 ? "3" : String(osszes);
  const egy = p.csaladi[kulcs] ?? 0;
  return egy * gyerekek + p.csaladiBeteg * Math.min(tartosanBeteg, gyerekek);
}

// A személyi kedvezmény havonta a minimálbér egyharmada, száz forintra kerekítve (Szja tv. 29/E. §).
export function szemelyiKedvezmenyHavi(minimalber: number): number {
  return Math.round(minimalber / 3 / 100) * 100;
}

export function nettoBer(brutto: number, k: Kedvezmenyek, p: Parameterek, redondear: (n: number) => number): Berszamfejtes {
  const tb = redondear((brutto * p.tb) / 100);
  let alap = brutto;
  const anyakKedvezmeny = k.anyak ? alap : 0;
  alap -= anyakKedvezmeny;
  const kedvezmeny25 = k.alatt25 ? Math.min(alap, p.hatar25) : 0;
  alap -= kedvezmeny25;
  const szemelyiKedvezmeny = k.szemelyi ? Math.min(alap, szemelyiKedvezmenyHavi(p.minimalber)) : 0;
  alap -= szemelyiKedvezmeny;
  const elsoHazasokKedvezmeny = k.elsoHazasok ? Math.min(alap, p.elsoHazasok) : 0;
  alap -= elsoHazasokKedvezmeny;
  const csaladiKedvezmeny = csaladiKedvezmenyHavi(k.gyerekek, k.eltartottak, k.tartosanBeteg, p);
  const csaladiFelhasznalt = Math.min(alap, csaladiKedvezmeny);
  alap -= csaladiFelhasznalt;
  const jarulekKedvezmeny = Math.min(tb, redondear(((csaladiKedvezmeny - csaladiFelhasznalt) * p.szja) / 100));
  const szja = redondear((alap * p.szja) / 100);
  return {
    brutto,
    tb,
    szjaAlap: alap,
    szja,
    kedvezmeny25,
    anyakKedvezmeny,
    szemelyiKedvezmeny,
    elsoHazasokKedvezmeny,
    csaladiKedvezmeny,
    csaladiFelhasznalt,
    jarulekKedvezmeny,
    netto: redondear(brutto - tb + jarulekKedvezmeny - szja),
  };
}

// A legkisebb bruttó, amelyből legalább a kért nettó marad (a nettó nem csökken, ha a bruttó nő).
export function bruttoNettobol(cel: number, k: Kedvezmenyek, p: Parameterek, redondear: (n: number) => number): Berszamfejtes {
  let also = 0;
  let felso = Math.max(1000, Math.ceil(cel * 2));
  while (nettoBer(felso, k, p, redondear).netto < cel) felso *= 2;
  while (felso - also > 1) {
    const kozep = Math.floor((also + felso) / 2);
    if (nettoBer(kozep, k, p, redondear).netto >= cel) felso = kozep;
    else also = kozep;
  }
  return nettoBer(felso, k, p, redondear);
}
