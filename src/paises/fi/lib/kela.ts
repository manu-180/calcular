import { enMapa } from "@/motor/calculo";

const plus = (n: number) => Math.max(0, n);

// Kelan laskukaavat (kela.fi, How daily allowances are calculated): päiväraha arkipäivältä (ma-la)
// vuosituloista, joista palkkatulosta on ensin tehty vakuutusmaksuvähennys.
export function vuositulo(palkka: number, vakuutusmaksuvahennys: number): number {
  return palkka * (1 - vakuutusmaksuvahennys / 100);
}

export function sairauspaivaraha(
  vuositulo: number,
  rajat: Readonly<Record<string, number>>,
  prosentit: Readonly<Record<string, number>>,
  vahimmais: number,
): number | null {
  if (vuositulo <= enMapa(rajat, "ei-paivarahaa")) return null;
  if (vuositulo <= enMapa(rajat, "vahimmais")) return vahimmais;
  const taite = enMapa(rajat, "taite");
  const maara = ((enMapa(prosentit, "perus") / 100) * vuositulo) / 300 - ((enMapa(prosentit, "pienennys") / 100) * plus(vuositulo - taite)) / 300;
  return Math.max(vahimmais, maara);
}

export function vanhempainpaivaraha(
  vuositulo: number,
  rajat: Readonly<Record<string, number>>,
  prosentit: Readonly<Record<string, number>>,
  vahimmais: number,
  korotettu: boolean,
): number {
  const p = (avain: string) => enMapa(prosentit, avain) / 100;
  if (korotettu) {
    if (vuositulo <= enMapa(rajat, "korotettu-vahimmais")) return vahimmais;
    const t = enMapa(rajat, "taite2");
    return Math.max(vahimmais, (p("korotettu1") * Math.min(vuositulo, t) + p("korotettu2") * plus(vuositulo - t)) / 300);
  }
  if (vuositulo <= enMapa(rajat, "vahimmais")) return vahimmais;
  const t1 = enMapa(rajat, "taite1");
  const t2 = enMapa(rajat, "taite2");
  const maara = p("p1") * Math.min(vuositulo, t1) + p("p2") * plus(Math.min(vuositulo, t2) - t1) + p("p3") * plus(vuositulo - t2);
  return Math.max(vahimmais, maara / 300);
}
