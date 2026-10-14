import { definirCalculadora } from "@/motor/calculo";
import { deduccionSenior, escalaDe, ESCALAS, estadoValido, impuestoFederal, OPCIONES_ESTADO_CIVIL, personasValidas } from "../lib/impuestos";

export default definirCalculadora({
  id: "us.senior-deduction",
  mercado: "us",
  concepto: "propio",
  slug: "senior-deduction",
  estado: "publicado",
  requiere: {
    ...ESCALAS,
    "us.senior-deduction": "numero",
    "us.senior-deduction-threshold": "mapa",
    "us.senior-deduction-phaseout-rate": "numero",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    { id: "personas", tipo: "entero", etiqueta: "People on the return who are 65 or older", min: 0, max: 2, porDefecto: 1, ayuda: "For 2026, born before January 2, 1962." },
    { id: "magi", tipo: "moneda", etiqueta: "Modified adjusted gross income (MAGI)", min: 0, porDefecto: 60000 },
    { id: "gravable", tipo: "moneda", etiqueta: "Taxable income before this deduction", min: 0, requerido: false, ayuda: "Optional. Lets the calculator estimate your tax savings." },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const personas = personasValidas(entrada.personas, estado, "personas");
    const d = deduccionSenior(
      valores["us.senior-deduction"],
      valores["us.senior-deduction-threshold"],
      valores["us.senior-deduction-phaseout-rate"],
      estado,
      entrada.magi,
      personas,
    );
    const total = redondear(d.total);
    let ahorro: number | null = null;
    if (entrada.gravable !== null) {
      const escala = escalaDe(valores, estado);
      ahorro = redondear(impuestoFederal(escala, entrada.gravable) - impuestoFederal(escala, entrada.gravable - total));
    }
    return {
      porPersona: redondear(d.porPersona),
      total,
      ahorro,
      observaciones: [
        ...(estado === "mfs" ? ["Married people must file a joint return to claim this deduction."] : []),
        "It is on top of the extra standard deduction for age 65, and you get it whether you itemize or not. It applies to tax years 2025 through 2028.",
      ],
    };
  },
  resultado: [
    { clave: "porPersona", etiqueta: "Deduction per eligible person", formato: "moneda" },
    { clave: "total", etiqueta: "Senior deduction on your return", formato: "moneda", destacada: true },
    { clave: "ahorro", etiqueta: "Estimated federal income tax saved", formato: "moneda" },
  ],
});
