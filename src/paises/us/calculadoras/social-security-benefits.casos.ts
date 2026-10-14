import { definirCasos } from "@/motor/calculo";
import calculadora from "./social-security-benefits";

const FR = "https://www.govinfo.gov/content/pkg/FR-2025-11-03/html/2025-19763.htm" as const;

export default definirCasos(calculadora, [
  {
    nombre: "AIME of $5,000 at full retirement age",
    origen: { tipo: "recalculado", url: FR, detalle: "90% of 1286 = 1157.40; 32% of 3714 = 1188.48. PIA 2345.88, rounded down to 2345.80. Paid 2345." },
    fecha: "2026-10-14",
    entrada: { aime: 5000, anios: 67, meses: 0 },
    esperado: { pia: 2345.8, ajuste: 0, mensual: 2345, anual: 28140 },
  },
  {
    nombre: "Same earnings, starting at 62",
    origen: {
      tipo: "recalculado",
      url: "https://www.ecfr.gov/current/title-20/chapter-III/part-404/subpart-E/section-404.410",
      detalle: "60 months early: 36 x 5/9 = 20% plus 24 x 5/12 = 10%. 2345.80 x 0.70 = 1642.06, rounded down to 1642.",
    },
    fecha: "2026-10-14",
    entrada: { aime: 5000, anios: 62, meses: 0 },
    esperado: { ajuste: -30, mensual: 1642 },
  },
  {
    nombre: "Same earnings, starting at 70",
    origen: {
      tipo: "recalculado",
      url: "https://www.ecfr.gov/current/title-20/chapter-III/part-404/subpart-D/section-404.313",
      detalle: "36 months late x 2/3 = 24%. 2345.80 x 1.24 = 2908.79, rounded down to 2908.",
    },
    fecha: "2026-10-14",
    entrada: { aime: 5000, anios: 70, meses: 0 },
    esperado: { ajuste: 24, mensual: 2908 },
  },
  {
    nombre: "AIME above the second bend point",
    origen: { tipo: "recalculado", url: FR, detalle: "1157.40 + 32% of 6463 = 2068.16 + 15% of 1251 = 187.65. PIA 3413.21, rounded down to 3413.20." },
    fecha: "2026-10-14",
    entrada: { aime: 9000, anios: 67, meses: 0 },
    esperado: { pia: 3413.2, mensual: 3413 },
  },
  {
    nombre: "Past 70 is not allowed",
    origen: { tipo: "recalculado", detalle: "Delayed credits stop at 70." },
    fecha: "2026-10-14",
    entrada: { aime: 5000, anios: 70, meses: 6 },
    esperaError: true,
  },
]);
