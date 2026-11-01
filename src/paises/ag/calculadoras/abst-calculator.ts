import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.abst-calculator",
  mercado: "ag",
  concepto: "iva",
  slug: "abst-calculator",
  estado: "publicado",
  requiere: {
    "ag.abst-rate": "numero",
    "ag.abst-return-days": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What do you want to do?",
      opciones: [
        { valor: "add", etiqueta: "Add ABST to a price without ABST" },
        { valor: "remove", etiqueta: "Take ABST out of a price that includes it" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter an amount greater than zero.", "importe");
    const tasa = v["ag.abst-rate"];
    if (e.modo === "add") {
      const abst = redondear(porcentaje(e.importe, tasa));
      return { neto: e.importe, abst, total: redondear(e.importe + abst), tasa, dias: v["ag.abst-return-days"] };
    }
    const neto = redondear(e.importe / (1 + tasa / 100));
    return { neto, abst: redondear(e.importe - neto), total: e.importe, tasa, dias: v["ag.abst-return-days"] };
  },
  resultado: [
    { clave: "total", etiqueta: "Price including ABST", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Price before ABST", formato: "moneda" },
    { clave: "abst", etiqueta: "ABST", formato: "moneda" },
    { clave: "tasa", etiqueta: "ABST rate", formato: "porcentaje", decimales: 0 },
    { clave: "dias", etiqueta: "Days after the period to lodge the return", formato: "dias" },
  ],
});
