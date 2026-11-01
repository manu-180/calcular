import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.prosecna-plata",
  mercado: "rs",
  concepto: "propio",
  slug: "prosecna-plata",
  estado: "publicado",
  requiere: { "rs.prosecna-neto": "serie", "rs.prosecna-bruto": "serie", "rs.minimalna-cena-rada": "numero" },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Vaša mesečna neto plata", min: 0, porDefecto: 100000 }],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Unesite platu veću od nule.", "neto");
    const prosek = v["rs.prosecna-neto"];
    return {
      odnos: (e.neto / prosek.valor) * 100,
      razlika: redondear(e.neto - prosek.valor),
      prosekNeto: prosek.valor,
      prosekBruto: v["rs.prosecna-bruto"].valor,
      mesec: prosek.fecha,
    };
  },
  resultado: [
    { clave: "odnos", etiqueta: "Vaša plata u odnosu na prosek", formato: "porcentaje", decimales: 1, destacada: true },
    { clave: "razlika", etiqueta: "Razlika u odnosu na prosečnu neto zaradu", formato: "moneda" },
    { clave: "prosekNeto", etiqueta: "Prosečna neto zarada", formato: "moneda" },
    { clave: "prosekBruto", etiqueta: "Prosečna bruto zarada", formato: "moneda" },
    { clave: "mesec", etiqueta: "Mesec podatka", formato: "fecha" },
  ],
});
