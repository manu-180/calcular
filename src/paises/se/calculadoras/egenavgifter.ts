import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.egenavgifter",
  mercado: "se",
  concepto: "propio",
  slug: "egenavgifter",
  estado: "publicado",
  requiere: {
    "se.egenavgifter": "mapa",
    "se.schablonavdrag-egenavgifter": "mapa",
    "se.nedsattning-egenavgifter": "mapa",
  },
  campos: [
    { id: "overskott", tipo: "moneda", etiqueta: "Överskott i firman före avdrag för egenavgifter, per år", min: 0, porDefecto: 400000 },
    { id: "grupp", tipo: "opcion-dato", dato: "se.egenavgifter", etiqueta: "Din ålder", porDefecto: "full" },
  ],
  calcular(e, v, { redondear }) {
    if (e.overskott <= 0) throw new ErrorEntrada("Skriv ett överskott som är större än noll.", "overskott");
    const sats = enMapa(v["se.egenavgifter"], e.grupp);
    const schablonavdrag = Math.floor((e.overskott * enMapa(v["se.schablonavdrag-egenavgifter"], e.grupp)) / 100);
    const underlag = e.overskott - schablonavdrag;
    const n = v["se.nedsattning-egenavgifter"];
    const observaciones: string[] = [];
    if (underlag < 1000) {
      observaciones.push("Du betalar inga egenavgifter när avgiftsunderlaget är lägre än 1 000 kronor.");
      return { egenavgifter: 0, underlag, schablonavdrag, nedsattning: 0, andel: 0, kvar: e.overskott, observaciones };
    }
    const fore = Math.floor((underlag * sats) / 100);
    const nedsattning = e.grupp === "full" && underlag > enMapa(n, "golv") ? Math.min(Math.floor((underlag * enMapa(n, "sats")) / 100), enMapa(n, "max")) : 0;
    const egenavgifter = fore - nedsattning;
    observaciones.push("I deklarationen gör du ett schablonavdrag för egenavgifterna. Året därpå återförs det och du drar av de egenavgifter som faktiskt debiterades.");
    return {
      egenavgifter,
      underlag,
      schablonavdrag,
      nedsattning,
      andel: (egenavgifter / e.overskott) * 100,
      kvar: redondear(e.overskott - egenavgifter),
      observaciones,
    };
  },
  resultado: [
    { clave: "egenavgifter", etiqueta: "Egenavgifter att betala per år", formato: "moneda", decimales: 0, destacada: true },
    { clave: "schablonavdrag", etiqueta: "Schablonavdrag för egenavgifter", formato: "moneda", decimales: 0 },
    { clave: "underlag", etiqueta: "Avgiftsunderlag", formato: "moneda", decimales: 0 },
    { clave: "nedsattning", etiqueta: "Nedsättning av egenavgifter", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "andel", etiqueta: "Egenavgifter i procent av överskottet", formato: "porcentaje", decimales: 1 },
    { clave: "kvar", etiqueta: "Kvar efter egenavgifter, före inkomstskatt", formato: "moneda" },
  ],
});
