import { definirCalculadora, enMapa } from "@/motor/calculo";
import { CAMPO_ANIOS, CAMPO_SUELDO, etiquetaTramo, sueldoValido, tramoAntiguedad } from "../lib/empleo";

export default definirCalculadora({
  id: "my.notice-period",
  mercado: "my",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "my.notice-weeks": "mapa",
  },
  campos: [CAMPO_SUELDO, CAMPO_ANIOS],
  calcular(entrada, v, { redondear }) {
    sueldoValido(entrada.sueldo);
    const tramo = tramoAntiguedad(entrada.anios);
    const semanas = enMapa(v["my.notice-weeks"], tramo);
    const semanal = redondear((entrada.sueldo * 12) / 52);
    return {
      semanas,
      dias: semanas * 7,
      indemnizacion: redondear(semanal * semanas),
      semanal,
      tramo: etiquetaTramo(tramo),
      observaciones: ["This is the minimum when your contract says nothing in writing. A written notice period in your contract applies instead, and both sides can waive notice."],
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Minimum notice", formato: "numero", decimales: 0, destacada: true, ayuda: "Weeks." },
    { clave: "dias", etiqueta: "Notice in days", formato: "dias" },
    { clave: "indemnizacion", etiqueta: "Pay in lieu of notice (estimate)", formato: "moneda" },
    { clave: "semanal", etiqueta: "Weekly wages (monthly × 12 ÷ 52)", formato: "moneda" },
    { clave: "tramo", etiqueta: "Length of service", formato: "texto" },
  ],
});
