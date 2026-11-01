import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.stimpilgjald",
  mercado: "is",
  concepto: "propio",
  slug: "stimpilgjald",
  estado: "publicado",
  requiere: { "is.stimpilgjald": "mapa", "is.thinglysingargjald": "numero" },
  campos: [
    { id: "mat", tipo: "moneda", etiqueta: "Fasteignamat", min: 0, porDefecto: 60000000 },
    { id: "kaupandi", tipo: "opcion-dato", dato: "is.stimpilgjald", etiqueta: "Kaupandi", porDefecto: "einstaklingur" },
    { id: "skjol", tipo: "entero", etiqueta: "Fjöldi skjala til þinglýsingar", min: 0, max: 20, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mat <= 0) throw new ErrorEntrada("Sláðu inn fasteignamat hærra en núll.", "mat");
    const gjald = redondear(porcentaje(e.mat, enMapa(v["is.stimpilgjald"], e.kaupandi)));
    const thinglysing = e.skjol * v["is.thinglysingargjald"];
    return { gjald, thinglysing, samtals: gjald + thinglysing };
  },
  resultado: [
    { clave: "gjald", etiqueta: "Stimpilgjald", formato: "moneda", destacada: true },
    { clave: "thinglysing", etiqueta: "Þinglýsingargjald", formato: "moneda", ocultarSiCero: true },
    { clave: "samtals", etiqueta: "Samtals", formato: "moneda" },
  ],
});
