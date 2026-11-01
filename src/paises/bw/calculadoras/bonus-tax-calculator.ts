import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuesto, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.bonus-tax-calculator",
  mercado: "bw",
  concepto: "propio",
  slug: "bonus-tax-calculator",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.paye-non-resident": "escala",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Regular salary a month", min: 0, porDefecto: 10000 },
    { id: "bono", tipo: "moneda", etiqueta: "Bonus or other one-off payment", min: 0, porDefecto: 10000 },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Tax residence",
      opciones: [
        { valor: "resident", etiqueta: "Resident of Botswana" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bono <= 0) throw new ErrorEntrada("Enter the bonus amount.", "bono");
    const escala = entrada.residencia === "resident" ? v["bw.paye-resident"] : v["bw.paye-non-resident"];
    const regular = entrada.salario * 12;
    const impuestoBono = redondear(impuesto(escala, regular + entrada.bono) - impuesto(escala, regular));
    return {
      impuestoBono,
      netoBono: redondear(entrada.bono - impuestoBono),
      tasaBono: (impuestoBono / entrada.bono) * 100,
      regular: redondear(regular),
      marginal: tasaMarginal(escala, regular + entrada.bono),
    };
  },
  resultado: [
    { clave: "impuestoBono", etiqueta: "PAYE on the bonus", formato: "moneda", destacada: true },
    { clave: "netoBono", etiqueta: "Bonus after PAYE", formato: "moneda" },
    { clave: "tasaBono", etiqueta: "Share of the bonus that goes to tax", formato: "porcentaje", decimales: 1 },
    { clave: "regular", etiqueta: "Regular pay for the tax year", formato: "moneda" },
    { clave: "marginal", etiqueta: "Marginal rate with the bonus", formato: "porcentaje", decimales: 2 },
  ],
});
