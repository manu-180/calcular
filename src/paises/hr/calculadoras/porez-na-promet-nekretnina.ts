import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.porez-na-promet-nekretnina",
  mercado: "hr",
  concepto: "propio",
  slug: "porez-na-promet-nekretnina",
  estado: "publicado",
  requiere: { "hr.porez-promet-nekretnina": "numero", "hr.pdv": "mapa" },
  campos: [{ id: "vrijednost", tipo: "moneda", etiqueta: "Tržišna vrijednost nekretnine", min: 0, porDefecto: 200000 }],
  calcular(e, v, { redondear }) {
    if (e.vrijednost <= 0) throw new ErrorEntrada("Unesite vrijednost veću od nule.", "vrijednost");
    const porez = redondear((e.vrijednost * v["hr.porez-promet-nekretnina"]) / 100);
    return { porez, ukupno: redondear(e.vrijednost + porez), pdv: redondear((e.vrijednost * enMapa(v["hr.pdv"], "opca")) / 100) };
  },
  resultado: [
    { clave: "porez", etiqueta: "Porez na promet nekretnina", formato: "moneda", destacada: true },
    { clave: "ukupno", etiqueta: "Vrijednost s porezom", formato: "moneda" },
    { clave: "pdv", etiqueta: "Usporedba: PDV kad se plaća umjesto ovog poreza", formato: "moneda" },
  ],
});
