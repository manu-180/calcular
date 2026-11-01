import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ba.kalkulator-pdv",
  mercado: "ba",
  concepto: "iva",
  slug: "kalkulator-pdv",
  estado: "publicado",
  requiere: { "ba.pdv": "numero", "ba.pdv-prag": "numero" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Iznos", min: 0, porDefecto: 100 },
    {
      id: "smjer",
      tipo: "opcion",
      etiqueta: "Šta je upisani iznos",
      opciones: [
        { valor: "bez", etiqueta: "Cijena bez PDV-a" },
        { valor: "sa", etiqueta: "Cijena sa PDV-om" },
      ],
      porDefecto: "bez",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const stopa = v["ba.pdv"];
    const osnovica = e.smjer === "bez" ? e.iznos : redondear(e.iznos / (1 + stopa / 100));
    const pdv = e.smjer === "bez" ? redondear(porcentaje(osnovica, stopa)) : redondear(e.iznos - osnovica);
    return { pdv, osnovica, ukupno: e.smjer === "bez" ? redondear(osnovica + pdv) : e.iznos };
  },
  resultado: [
    { clave: "pdv", etiqueta: "PDV", formato: "moneda", destacada: true },
    { clave: "osnovica", etiqueta: "Cijena bez PDV-a", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Cijena sa PDV-om", formato: "moneda" },
  ],
});
