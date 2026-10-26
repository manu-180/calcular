import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.barnbidrag",
  mercado: "se",
  concepto: "propio",
  slug: "barnbidrag",
  estado: "publicado",
  requiere: {
    "se.barnbidrag": "numero",
    "se.flerbarnstillagg": "mapa",
  },
  campos: [
    { id: "barn", tipo: "entero", etiqueta: "Antal barn som du får barnbidrag för", min: 1, max: 15, porDefecto: 2, ayuda: "Barn under 16 år, och barn som får förlängt barnbidrag eller studiebidrag." },
    { id: "delat", tipo: "si-no", etiqueta: "Bidraget delas lika mellan två föräldrar", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.barn < 1) throw new ErrorEntrada("Skriv minst ett barn.", "barn");
    const ft = v["se.flerbarnstillagg"];
    let tillagg = 0;
    for (let n = 2; n <= e.barn; n++) tillagg += enMapa(ft, String(Math.min(n, 5)));
    const bidrag = v["se.barnbidrag"] * e.barn;
    const summa = bidrag + tillagg;
    return {
      summa,
      bidrag,
      tillagg,
      perForalder: e.delat ? redondear(summa / 2) : null,
      perAr: summa * 12,
      observaciones: ["Barnbidraget lämnas från och med månaden efter att barnet har fötts."],
    };
  },
  resultado: [
    { clave: "summa", etiqueta: "Barnbidrag och flerbarnstillägg per månad", formato: "moneda", decimales: 0, destacada: true },
    { clave: "bidrag", etiqueta: "Barnbidrag per månad", formato: "moneda", decimales: 0 },
    { clave: "tillagg", etiqueta: "Flerbarnstillägg per månad", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "perForalder", etiqueta: "Per förälder när bidraget delas", formato: "moneda" },
    { clave: "perAr", etiqueta: "Per år", formato: "moneda", decimales: 0 },
  ],
});
