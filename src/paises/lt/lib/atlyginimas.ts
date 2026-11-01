import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";

// Todos los parámetros salen de datos.json. La fórmula queda sin contrastar con la ley mientras las
// calculadoras que la usan estén en borrador (scripts/paises/lt/INFORME.md).
export interface ParametraiAlgos {
  mma: number;
  vdu: number;
  npdDidziausias: number;
  npdKoeficientas: number;
  gpmTarifai: Readonly<Record<string, number>>;
  gpmRibosVdu: Readonly<Record<string, number>>;
  vsd: number;
  psd: number;
  kaupimas: number;
  lubosVdu: number;
}

export function npdPerMenesi(p: ParametraiAlgos, bruto: number): number {
  if (bruto <= p.mma) return p.npdDidziausias;
  return Math.max(0, p.npdDidziausias - p.npdKoeficientas * (bruto - p.mma));
}

export function gpmPerMetus(p: ParametraiAlgos, apmokestinama: number): number {
  const pirma = p.gpmRibosVdu.pirma * p.vdu;
  const antra = p.gpmRibosVdu.antra * p.vdu;
  return aplicarEscalaMarginal(
    [
      { desde: 0, hasta: pirma, tasa: p.gpmTarifai["iki-pirmos"] },
      { desde: pirma, hasta: antra, tasa: p.gpmTarifai["iki-antros"] },
      { desde: antra, hasta: null, tasa: p.gpmTarifai["virs-antros"] },
    ],
    apmokestinama,
  );
}

export interface Isskaidymas {
  npd: number;
  gpm: number;
  vsd: number;
  psd: number;
  kaupimas: number;
  neto: number;
}

export function isBruto(p: ParametraiAlgos, bruto: number, suKaupimu: boolean): Isskaidymas {
  const npd = npdPerMenesi(p, bruto);
  const gpm = gpmPerMetus(p, Math.max(0, bruto - npd) * 12) / 12;
  const baze = Math.min(bruto, (p.lubosVdu * p.vdu) / 12);
  const vsd = porcentaje(baze, p.vsd);
  const psd = porcentaje(bruto, p.psd);
  const kaupimas = suKaupimu ? porcentaje(baze, p.kaupimas) : 0;
  return { npd, gpm, vsd, psd, kaupimas, neto: bruto - gpm - vsd - psd - kaupimas };
}

// El neto crece con el bruto, así que alcanza una bisección para ir de la mano al papel.
export function isNeto(p: ParametraiAlgos, neto: number, suKaupimu: boolean): number {
  let zemiau = neto;
  let auksciau = neto * 3 + 1000;
  for (let i = 0; i < 80; i++) {
    const vidurys = (zemiau + auksciau) / 2;
    if (isBruto(p, vidurys, suKaupimu).neto < neto) zemiau = vidurys;
    else auksciau = vidurys;
  }
  return (zemiau + auksciau) / 2;
}
