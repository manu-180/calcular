import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "gh.paye-calculator",
  mercado: "gh",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "gh.paye-annual-bands": "escala",
    "gh.non-resident-rate": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Chargeable income", min: 0, porDefecto: 5000, ayuda: "Your taxable pay after SSNIT and other reliefs." },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "This amount is",
      opciones: [
        { valor: "monthly", etiqueta: "Monthly" },
        { valor: "annual", etiqueta: "Annual" },
      ],
      porDefecto: "monthly",
    },
    { id: "residente", tipo: "si-no", etiqueta: "I am resident in Ghana", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your chargeable income.", "ingreso");
    const anual = entrada.periodo === "monthly" ? entrada.ingreso * 12 : entrada.ingreso;
    const escala = v["gh.paye-annual-bands"];
    const impuestoAno = entrada.residente ? impuestoAnual(escala, anual) : porcentaje(anual, v["gh.non-resident-rate"]);
    return {
      mensual: redondear(impuestoAno / 12),
      anual: redondear(impuestoAno),
      neto: redondear((anual - impuestoAno) / 12),
      efectiva: (impuestoAno / anual) * 100,
      marginal: entrada.residente ? tasaMarginal(escala, anual) : v["gh.non-resident-rate"],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Income tax a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Income tax a year", formato: "moneda" },
    { clave: "neto", etiqueta: "Income after tax a month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Your top band rate", formato: "porcentaje", decimales: 1 },
  ],
});
