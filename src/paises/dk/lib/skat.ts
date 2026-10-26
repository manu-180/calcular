import { porcentaje } from "@/motor/calculo";

export interface SatserSkat {
  am: number;
  bund: number;
  personfradrag: number;
  mellemSats: number;
  mellemGraense: number;
  topSats: number;
  topGraense: number;
  toptopSats: number;
  toptopGraense: number;
  skatteloft: number;
  beskSats: number;
  beskMax: number;
  jobSats: number;
  jobGraense: number;
  jobMax: number;
}

export interface Aarsskat {
  amGrundlag: number;
  am: number;
  personlig: number;
  besk: number;
  job: number;
  skattepligtig: number;
  kommuneskat: number;
  kirkeskat: number;
  bundskat: number;
  mellemskat: number;
  topskat: number;
  toptopskat: number;
  skatteloftsnedslag: number;
  skat: number;
  netto: number;
  marginal: number;
}

export const REQ_SKAT = {
  "dk.am-bidrag": "numero",
  "dk.bundskat": "numero",
  "dk.personfradrag": "numero",
  "dk.mellemskat-sats": "numero",
  "dk.mellemskat-graense": "numero",
  "dk.topskat-sats": "numero",
  "dk.topskat-graense": "numero",
  "dk.toptopskat-sats": "numero",
  "dk.toptopskat-graense": "numero",
  "dk.skatteloft": "numero",
  "dk.beskaeftigelsesfradrag-sats": "numero",
  "dk.beskaeftigelsesfradrag-max": "numero",
  "dk.jobfradrag-sats": "numero",
  "dk.jobfradrag-graense": "numero",
  "dk.jobfradrag-max": "numero",
} as const;

type ValoresSkat = { readonly [K in keyof typeof REQ_SKAT]: number };

export function satser(v: ValoresSkat): SatserSkat {
  return {
    am: v["dk.am-bidrag"],
    bund: v["dk.bundskat"],
    personfradrag: v["dk.personfradrag"],
    mellemSats: v["dk.mellemskat-sats"],
    mellemGraense: v["dk.mellemskat-graense"],
    topSats: v["dk.topskat-sats"],
    topGraense: v["dk.topskat-graense"],
    toptopSats: v["dk.toptopskat-sats"],
    toptopGraense: v["dk.toptopskat-graense"],
    skatteloft: v["dk.skatteloft"],
    beskSats: v["dk.beskaeftigelsesfradrag-sats"],
    beskMax: v["dk.beskaeftigelsesfradrag-max"],
    jobSats: v["dk.jobfradrag-sats"],
    jobGraense: v["dk.jobfradrag-graense"],
    jobMax: v["dk.jobfradrag-max"],
  };
}

// Årsskat af lønindkomst for en person over 18 år uden kapitalindkomst. Am-bidraget af lønnen beregnes
// efter egen pension og ATP (am-bidraget af pensionen trækker pensionsselskabet). Beskæftigelses- og
// jobfradrag (LL §§ 9 J og 9 K) beregnes af arbejdsindkomsten, hvor pension og ATP indgår: her lønnen.
// Skatteloftet (PSL § 19) nedsætter mellemskatten med det, kommuneskat, bundskat og mellemskat
// tilsammen overstiger loftet. Kirkeskatten tæller ikke med.
export function aarsskat(
  loen: number,
  egenPension: number,
  atp: number,
  kommune: number,
  kirke: number,
  s: SatserSkat,
  redondear: (n: number) => number,
): Aarsskat {
  const amGrundlag = Math.max(0, loen - egenPension - atp);
  const am = redondear(porcentaje(amGrundlag, s.am));
  const personlig = amGrundlag - am;
  const arbejdsindkomst = Math.max(0, loen);
  const besk = redondear(Math.min(porcentaje(arbejdsindkomst, s.beskSats), s.beskMax));
  const job = redondear(Math.min(porcentaje(Math.max(0, arbejdsindkomst - s.jobGraense), s.jobSats), s.jobMax));
  const skattepligtig = Math.max(0, personlig - besk - job);
  const kommunalBase = Math.max(0, skattepligtig - s.personfradrag);
  const kommuneskat = redondear(porcentaje(kommunalBase, kommune));
  const kirkeskat = redondear(porcentaje(kommunalBase, kirke));
  const bundskat = redondear(porcentaje(Math.max(0, personlig - s.personfradrag), s.bund));
  const skatteloftsnedslag = Math.max(0, kommune + s.bund + s.mellemSats - s.skatteloft);
  const mellemSats = Math.max(0, s.mellemSats - skatteloftsnedslag);
  const mellemskat = redondear(porcentaje(Math.max(0, personlig - s.mellemGraense), mellemSats));
  const topskat = redondear(porcentaje(Math.max(0, personlig - s.topGraense), s.topSats));
  const toptopskat = redondear(porcentaje(Math.max(0, personlig - s.toptopGraense), s.toptopSats));
  const skat = redondear(kommuneskat + kirkeskat + bundskat + mellemskat + topskat + toptopskat);
  const netto = redondear(loen - egenPension - atp - am - skat);
  // Marginalskat af 100 kr. mere i løn: am-bidrag plus skatterne af det, der er tilbage.
  const efterAm = 1 - s.am / 100;
  let satsEfterAm = s.bund;
  if (skattepligtig > s.personfradrag) satsEfterAm += kommune + kirke;
  if (personlig > s.mellemGraense) satsEfterAm += mellemSats;
  if (personlig > s.topGraense) satsEfterAm += s.topSats;
  if (personlig > s.toptopGraense) satsEfterAm += s.toptopSats;
  const jobUnderMax = arbejdsindkomst > s.jobGraense && porcentaje(arbejdsindkomst - s.jobGraense, s.jobSats) < s.jobMax;
  const fradragAndel = (porcentaje(arbejdsindkomst, s.beskSats) < s.beskMax ? s.beskSats / 100 : 0) + (jobUnderMax ? s.jobSats / 100 : 0);
  const kommunalAndel = skattepligtig > s.personfradrag ? ((kommune + kirke) / 100) * fradragAndel : 0;
  const marginal = (s.am / 100 + efterAm * (satsEfterAm / 100) - kommunalAndel) * 100;
  return {
    amGrundlag: redondear(amGrundlag),
    am,
    personlig: redondear(personlig),
    besk,
    job,
    skattepligtig: redondear(skattepligtig),
    kommuneskat,
    kirkeskat,
    bundskat,
    mellemskat,
    topskat,
    toptopskat,
    skatteloftsnedslag,
    skat,
    netto,
    marginal,
  };
}
