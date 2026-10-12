import { definirCasos } from "@/motor/calculo";
import feriadoProgresivo from "./feriado-progresivo";

export default definirCasos(feriadoProgresivo, [
  {
    nombre: "10 años anteriores y 3 con el empleador actual",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 68: con 10 años de trabajo, un día más por cada 3 nuevos años. 10 + 3 = 13 años → 1 día. Feriado 15 + 1 = 16. El siguiente día llega con 16 años: 6 años desde el ingreso (1/3/2029).",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2023-03-01", fecha: "2026-10-07", aniosAnteriores: 10, zonaAustral: false },
    esperado: { aniosContados: 13, diasProgresivos: 1, feriadoTotal: 16, proximoDia: "01-03-2029" },
  },
  {
    nombre: "Más de 10 años anteriores no suman",
    origen: { tipo: "recalculado", detalle: "Art. 68 inciso 2: de empleadores anteriores cuentan hasta 10 años. 18 → 10, más 8 actuales = 18 años: (18 − 10) / 3 = 2 días." },
    fecha: "2026-10-07",
    entrada: { inicio: "2018-01-15", fecha: "2026-10-07", aniosAnteriores: 18, zonaAustral: false },
    esperado: { aniosContados: 18, diasProgresivos: 2, feriadoTotal: 17 },
  },
  {
    nombre: "12 años con el mismo empleador, zona austral",
    origen: { tipo: "recalculado", detalle: "12 años: todavía no hay 3 años nuevos sobre 10, sin progresivo. Feriado austral de 20 días (art. 67)." },
    fecha: "2026-10-07",
    entrada: { inicio: "2014-05-01", fecha: "2026-10-07", aniosAnteriores: 0, zonaAustral: true },
    esperado: { aniosContados: 12, diasProgresivos: 0, feriadoTotal: 20, proximoDia: "01-05-2027" },
  },
]);
