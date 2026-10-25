import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.csg-income-allowance-calculator",
  mercado: "mu",
  concepto: "propio",
  slug: "csg-income-allowance-calculator",
  estado: "publicado",
  requiere: {
    "mu.csg-income-allowance-register": "escala",
    "mu.csg-income-allowance-other": "escala",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Your total income for the month", min: 0, porDefecto: 22000, ayuda: "From all your jobs and any self-employment, before deductions." },
    { id: "registro", tipo: "si-no", etiqueta: "You are on the Social Register of Mauritius", porDefecto: false },
  ],
  calcular(e, v) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter your income for the month.", "ingreso");
    const escala = e.registro ? v["mu.csg-income-allowance-register"] : v["mu.csg-income-allowance-other"];
    const subsidio = aplicarEscala(escala, e.ingreso);
    const conRegistro = aplicarEscala(v["mu.csg-income-allowance-register"], e.ingreso);
    const observaciones: string[] = [];
    if (subsidio === 0 && conRegistro === 0) observaciones.push("The allowance is paid only on a total monthly income of up to Rs 50,000.");
    observaciones.push("You must be over 16 and under 65, and CSG must have been paid on your income for the month. MRA pays it into your bank account.");
    return {
      subsidio,
      anual: subsidio * 12,
      conRegistro,
      observaciones,
    };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "CSG income allowance a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Over 12 months at this rate", formato: "moneda" },
    { clave: "conRegistro", etiqueta: "Amount for someone on the Social Register", formato: "moneda" },
  ],
});
