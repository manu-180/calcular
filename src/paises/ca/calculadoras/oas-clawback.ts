import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.oas-clawback",
  mercado: "ca",
  concepto: "propio",
  slug: "oas-clawback",
  estado: "publicado",
  requiere: {
    "ca.oas-recovery-threshold": "mapa",
    "ca.oas-recovery-rate": "numero",
  },
  campos: [
    {
      id: "anio",
      tipo: "opcion",
      etiqueta: "Income year",
      opciones: [
        { valor: "2026", etiqueta: "2026 (repaid from July 2027 to June 2028)" },
        { valor: "2025", etiqueta: "2025 (repaid from July 2026 to June 2027)" },
        { valor: "2024", etiqueta: "2024 (repaid from July 2025 to June 2026)" },
      ],
      porDefecto: "2026",
    },
    { id: "ingreso", tipo: "moneda", etiqueta: "Net world income for the year", min: 0, porDefecto: 110000 },
    { id: "oas", tipo: "moneda", etiqueta: "OAS pension you received in the year", min: 0, porDefecto: 8800 },
  ],
  calcular(entrada, v, { redondear }) {
    validarIngreso(entrada.ingreso, "ingreso");
    validarIngreso(entrada.oas, "oas");
    const umbral = enMapa(v["ca.oas-recovery-threshold"], entrada.anio);
    const tasa = v["ca.oas-recovery-rate"];
    const exceso = Math.max(0, entrada.ingreso - umbral);
    const repago = redondear(Math.min(entrada.oas, porcentaje(exceso, tasa)));
    return {
      repago,
      mensual: redondear(repago / 12),
      conservas: redondear(entrada.oas - repago),
      umbral,
      exceso: redondear(exceso),
      observaciones: repago >= entrada.oas && entrada.oas > 0 ? ["Your income is high enough that the whole pension is repaid."] : [],
    };
  },
  resultado: [
    { clave: "repago", etiqueta: "OAS recovery tax (clawback)", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "About a month over the recovery period", formato: "moneda" },
    { clave: "conservas", etiqueta: "OAS you keep", formato: "moneda" },
    { clave: "umbral", etiqueta: "Income threshold for that year", formato: "moneda" },
    { clave: "exceso", etiqueta: "Income above the threshold", formato: "moneda" },
  ],
});
