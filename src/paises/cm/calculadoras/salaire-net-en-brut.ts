import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQ_RETENUES, retenuesMensuelles } from "../lib/paie";

export default definirCalculadora({
  id: "cm.salaire-net-en-brut",
  mercado: "cm",
  concepto: "propio",
  slug: "salaire-net-en-brut",
  estado: "publicado",
  requiere: REQ_RETENUES,
  campos: [
    {
      id: "net",
      tipo: "moneda",
      etiqueta: "Salaire net souhaité par mois",
      min: 0,
      porDefecto: 400000,
      ayuda: "Le net après IRPP, CNPS, Crédit foncier, redevance audiovisuelle et taxe de développement local.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.net <= 0) throw new ErrorEntrada("Indiquez un net supérieur à zéro.", "net");
    const netDe = (brut: number) => brut - retenuesMensuelles(brut, brut, v, redondear).total;
    // Le net baisse d'un coup quand le brut passe une tranche de la CRTV ou de la TDL. On cherche donc
    // tranche par tranche : la première dont le haut donne le net voulu, puis une dichotomie dedans.
    const seuils = [...v["cm.rav-bareme"], ...v["cm.tdl-bareme"]]
      .map((f) => f.hasta)
      .filter((h): h is number => h !== null)
      .map((h) => Math.floor(h))
      .sort((a, b) => a - b);
    let haut = seuils.find((s) => s >= entrada.net && netDe(s) >= entrada.net) ?? Math.max(entrada.net, seuils[seuils.length - 1]) * 2;
    while (netDe(haut) < entrada.net) haut *= 2;
    const plafond = haut;
    let bas = Math.max(0, ...seuils.filter((s) => s < plafond));
    while (haut - bas > 1) {
      const milieu = Math.floor((bas + haut) / 2);
      if (netDe(milieu) >= entrada.net) haut = milieu;
      else bas = milieu;
    }
    const brut = haut;
    const r = retenuesMensuelles(brut, brut, v, redondear);
    return { brut, netObtenu: brut - r.total, retenues: r.total, irpp: r.irpp + r.cac, cnps: r.cnps };
  },
  resultado: [
    { clave: "brut", etiqueta: "Salaire brut à prévoir", formato: "moneda", destacada: true },
    { clave: "netObtenu", etiqueta: "Net obtenu avec ce brut", formato: "moneda" },
    { clave: "retenues", etiqueta: "Total des retenues", formato: "moneda" },
    { clave: "irpp", etiqueta: "dont IRPP et centimes communaux", formato: "moneda" },
    { clave: "cnps", etiqueta: "dont pension CNPS", formato: "moneda" },
  ],
});
