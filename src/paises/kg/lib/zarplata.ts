export const MESYATSY = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"] as const;

const FORMAT_CHISLA = new Intl.NumberFormat("ru-KG", { maximumFractionDigits: 2 });

export function chislo(n: number): string {
  return FORMAT_CHISLA.format(n);
}

export function tyiyny(x: number): number {
  return (Math.sign(x) * Math.round(Math.abs(x) * 100 + 1e-7)) / 100;
}

export interface ParametryRabotnika {
  rp: number;
  sfRabotnik: number;
  predelnayaBaza: number;
  stavkaPn: number;
  personalnyyVychetRp: number;
  vychetIzhdivenetsRp: number;
  izhdiventsy: number;
  primenyatVychet: boolean;
}

export interface UderzhaniyaRabotnika {
  brutto: number;
  sf: number;
  vychet: number;
  baza: number;
  pn: number;
  netto: number;
}

// Страховые взносы работника: 10 % с зарплаты, но не выше предельной базы (Закон о тарифах, статьи 2-2
// и 13). Подоходный налог: 10 % с зарплаты за минусом взносов и стандартных вычетов (Налоговый кодекс,
// статьи 194, 197 и 200). Ставка плоская, поэтому месяц не зависит от того, что было раньше в году.
export function uderzhaniya(brutto: number, p: ParametryRabotnika): UderzhaniyaRabotnika {
  const sf = tyiyny((Math.min(brutto, p.predelnayaBaza) * p.sfRabotnik) / 100);
  const standartnyy = p.primenyatVychet ? (p.personalnyyVychetRp + p.izhdiventsy * p.vychetIzhdivenetsRp) * p.rp : 0;
  const vychet = Math.max(0, Math.min(standartnyy, brutto - sf));
  const baza = Math.max(0, tyiyny(brutto - sf - vychet));
  const pn = tyiyny((baza * p.stavkaPn) / 100);
  return { brutto, sf, vychet, baza, pn, netto: tyiyny(brutto - sf - pn) };
}

// На руки растет вместе с начисленной зарплатой, поэтому начисленную сумму ищем делением пополам
// и округляем вверх до целого сома, чтобы на руки было не меньше заданного.
export function bruttoIzNetto(naRuki: number, p: ParametryRabotnika): number {
  let niz = naRuki;
  let verkh = naRuki * 2 + 1;
  for (let i = 0; i < 80 && verkh - niz > 0.001; i++) {
    const s = (niz + verkh) / 2;
    if (uderzhaniya(s, p).netto >= naRuki) verkh = s;
    else niz = s;
  }
  let brutto = Math.ceil(verkh - 1e-6);
  while (brutto > 1 && uderzhaniya(brutto - 1, p).netto >= naRuki) brutto -= 1;
  return brutto;
}

export const TREBUET_RABOTNIK = {
  "kg.rp": "numero",
  "kg.sf-rabotnik": "numero",
  "kg.sf-predelnaya-baza": "numero",
  "kg.podokhodnyy-nalog": "numero",
  "kg.personalnyy-vychet-rp": "numero",
  "kg.vychet-izhdivenets-rp": "numero",
} as const;

type ZnacheniyaRabotnika = { readonly [K in keyof typeof TREBUET_RABOTNIK]: number };

export function parametry(v: ZnacheniyaRabotnika, izhdiventsy: number, primenyatVychet: boolean): ParametryRabotnika {
  return {
    rp: v["kg.rp"],
    sfRabotnik: v["kg.sf-rabotnik"],
    predelnayaBaza: v["kg.sf-predelnaya-baza"],
    stavkaPn: v["kg.podokhodnyy-nalog"],
    personalnyyVychetRp: v["kg.personalnyy-vychet-rp"],
    vychetIzhdivenetsRp: v["kg.vychet-izhdivenets-rp"],
    izhdiventsy,
    primenyatVychet,
  };
}

export interface VznosyRabotodatelya {
  baza: number;
  sfRabotodatel: number;
  minimumPrimenen: boolean;
}

// Взносы работодателя: ставка по категории (статьи 2 и 2-2) с той же предельной базой. Статья 13, часть 3:
// не меньше суммы, исчисленной от доли среднемесячной зарплаты (100 % у предпринимателей, 60 % у
// остальных), если эта зарплата известна.
export function vznosyRabotodatelya(brutto: number, stavka: number, predelnayaBaza: number, minimumDolya: number, srednyaya: number | null): VznosyRabotodatelya {
  const baza = Math.min(brutto, predelnayaBaza);
  const poFaktu = tyiyny((baza * stavka) / 100);
  const minimum = srednyaya === null ? 0 : tyiyny((((srednyaya * minimumDolya) / 100) * stavka) / 100);
  return { baza, sfRabotodatel: Math.max(poFaktu, minimum), minimumPrimenen: minimum > poFaktu };
}
