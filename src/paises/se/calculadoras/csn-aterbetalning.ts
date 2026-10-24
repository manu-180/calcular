import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";

export default definirCalculadora({
  id: "se.csn-aterbetalning",
  mercado: "se",
  concepto: "propio",
  slug: "csn-aterbetalning",
  estado: "publicado",
  requiere: {
    "se.csn-ranta": "numero",
    "se.csn-aterbetalning": "mapa",
    "se.csn-avgift": "numero",
    "se.prisbasbelopp": "numero",
  },
  campos: [
    { id: "skuld", tipo: "moneda", etiqueta: "Studieskuld vid årets början", min: 0, porDefecto: 250000 },
    { id: "alder", tipo: "entero", etiqueta: "Ålder du fyller det år du börjar betala", min: 18, max: 64, porDefecto: 26 },
  ],
  tablas: [{ clave: "plan", titulo: "Ungefärlig betalplan år för år", filasVisibles: 5 }],
  calcular(e, v, { redondear }) {
    if (e.skuld <= 0) throw new ErrorEntrada("Skriv hur stor studieskuld du har.", "skuld");
    const c = v["se.csn-aterbetalning"];
    const r = v["se.csn-ranta"] / 100;
    const g = enMapa(c, "okning") / 100;
    const minimum = (enMapa(c, "minimum") / 100) * v["se.prisbasbelopp"];
    let ar = Math.max(1, Math.min(enMapa(c, "tid"), enMapa(c, "alder") + 1 - e.alder));
    let arsbelopp: number;
    if (e.skuld < minimum) {
      arsbelopp = e.skuld * (1 + r);
      ar = 1;
    } else {
      const q = (1 + g) / (1 + r);
      arsbelopp = Math.abs(r - g) < 1e-9 ? (e.skuld * (1 + r)) / ar : (e.skuld * (r - g)) / (1 - q ** ar);
      if (arsbelopp < minimum) arsbelopp = minimum;
    }
    const filas: (string | number)[][] = [];
    let kvar = e.skuld;
    let summa = 0;
    let belopp = arsbelopp;
    for (let i = 1; i <= 60 && kvar > 0.5; i++) {
      const ranta = kvar * r;
      const betalning = Math.min(belopp, kvar + ranta);
      kvar = kvar + ranta - betalning;
      summa += betalning;
      filas.push([i, redondear(betalning), redondear(ranta), redondear(Math.max(0, kvar))]);
      if (arsbelopp > minimum + 1e-9) belopp *= 1 + g;
    }
    const plan: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "ar", etiqueta: "År", formato: "numero" },
        { clave: "betalning", etiqueta: "Årsbelopp", formato: "moneda" },
        { clave: "ranta", etiqueta: "Varav ränta", formato: "moneda" },
        { clave: "kvar", etiqueta: "Kvar att betala", formato: "moneda" },
      ],
      filas,
    };
    return {
      arsbelopp: redondear(arsbelopp),
      perManad: redondear(arsbelopp / 12),
      avgift: v["se.csn-avgift"],
      ar: filas.length,
      summa: redondear(summa),
      ranta: redondear(summa - e.skuld),
      plan,
      observaciones: [
        "Beräkningen är ungefärlig. CSN räknar med räntan för varje år och kan ändra årsbeloppet om räntan ändras eller om du betalar extra.",
        "Kalkylatorn gäller annuitetslån, alltså studielån som är tagna efter 30 juni 2001.",
      ],
    };
  },
  resultado: [
    { clave: "arsbelopp", etiqueta: "Årsbelopp första året", formato: "moneda", destacada: true },
    { clave: "perManad", etiqueta: "Ungefär per månad första året", formato: "moneda" },
    { clave: "avgift", etiqueta: "Expeditionsavgift per år", formato: "moneda", decimales: 0 },
    { clave: "ar", etiqueta: "Antal år att betala", formato: "anios" },
    { clave: "summa", etiqueta: "Totalt att betala", formato: "moneda" },
    { clave: "ranta", etiqueta: "Varav ränta", formato: "moneda" },
  ],
});
