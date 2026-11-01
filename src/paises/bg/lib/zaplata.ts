// Месечна заплата по трудов договор: вноските се смятат поотделно по фондове върху брутната
// заплата до максималния осигурителен доход, а данъкът върху брутното минус вноските на лицето
// (чл. 6 КСО, чл. 40 ЗЗО). Сумата на ставките на лицето е една и съща и за родените преди 1960 г.
// (пенсията им е по-висока, но нямат универсален фонд), затова нетото не зависи от годината на раждане.

export const REQ_ZAPLATA = {
  "bg.vnoski-rabotnik": "mapa",
  "bg.zdravna-vnoska": "mapa",
  "bg.danak-dohodi": "numero",
  "bg.maks-osig-dohod": "numero",
} as const;

export interface ParametriZaplata {
  rabotnik: Readonly<Record<string, number>>;
  zdravna: Readonly<Record<string, number>>;
  danak: number;
  maks: number;
}

export interface Fish {
  bruto: number;
  osnova: number;
  pensii: number;
  ozm: number;
  bezrabotitsa: number;
  dzpo: number;
  zdravno: number;
  vnoski: number;
  danachnaOsnova: number;
  danak: number;
  neto: number;
}

function dyal(osnova: number, stavka: number | undefined, r: (n: number) => number): number {
  return r((osnova * (stavka ?? 0)) / 100);
}

export function netoOtBruto(bruto: number, p: ParametriZaplata, r: (n: number) => number): Fish {
  const osnova = Math.min(bruto, p.maks);
  const pensii = dyal(osnova, p.rabotnik.pensii, r);
  const ozm = dyal(osnova, p.rabotnik.ozm, r);
  const bezrabotitsa = dyal(osnova, p.rabotnik.bezrabotitsa, r);
  const dzpo = dyal(osnova, p.rabotnik.dzpo, r);
  const zdravno = dyal(osnova, p.zdravna.rabotnik, r);
  const vnoski = r(pensii + ozm + bezrabotitsa + dzpo + zdravno);
  const danachnaOsnova = r(bruto - vnoski);
  const danak = dyal(danachnaOsnova, p.danak, r);
  return { bruto, osnova, pensii, ozm, bezrabotitsa, dzpo, zdravno, vnoski, danachnaOsnova, danak, neto: r(bruto - vnoski - danak) };
}

// Най-малкото бруто, от което остава поне търсеното нето. Търси се в евроцентове.
export function brutoOtNeto(tseL: number, p: ParametriZaplata, r: (n: number) => number): Fish {
  let dolu = 0;
  let gore = Math.max(100000, Math.ceil(tseL * 400));
  while (netoOtBruto(gore / 100, p, r).neto < tseL) gore *= 2;
  while (gore - dolu > 1) {
    const sreda = Math.floor((dolu + gore) / 2);
    if (netoOtBruto(sreda / 100, p, r).neto >= tseL) gore = sreda;
    else dolu = sreda;
  }
  return netoOtBruto(gore / 100, p, r);
}
