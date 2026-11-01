import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ba.bolovanje",
  mercado: "ba",
  concepto: "propio",
  slug: "bolovanje",
  estado: "publicado",
  requiere: { "ba.bolovanje-rs": "mapa", "ba.bolovanje-period-rs": "numero" },
  campos: [
    { id: "plata", tipo: "moneda", etiqueta: "Prosječna neto plata u zadnjih šest mjeseci", min: 0, porDefecto: 1500 },
    { id: "uzrok", tipo: "opcion-dato", etiqueta: "Razlog bolovanja", dato: "ba.bolovanje-rs", porDefecto: "opsta" },
    { id: "dani", tipo: "entero", etiqueta: "Kalendarski dani bolovanja", min: 1, max: 366, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.plata <= 0) throw new ErrorEntrada("Unesite platu veću od nule.", "plata");
    const stopa = enMapa(v["ba.bolovanje-rs"], e.uzrok);
    const mjesecna = redondear((e.plata * stopa) / 100);
    const dnevna = redondear(mjesecna / 30);
    return { naknada: redondear(dnevna * e.dani), mjesecna, stopa, observaciones: ["Dnevni iznos računamo kao mjesečni podijeljen s 30, radi procjene."] };
  },
  resultado: [
    { clave: "naknada", etiqueta: "Procjena naknade za te dane", formato: "moneda", destacada: true },
    { clave: "mjesecna", etiqueta: "Naknada za cio mjesec", formato: "moneda" },
    { clave: "stopa", etiqueta: "Procenat od osnova", formato: "porcentaje", decimales: 0 },
  ],
});
