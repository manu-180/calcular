import { definirCasos } from "@/motor/calculo";
import feriados from "./feriados";

export default definirCasos(feriados, [
  {
    nombre: "Feriados de 2026 y dos trabajados con C$9,000",
    origen: {
      tipo: "recalculado",
      detalle: "Código del Trabajo art. 66. Pascua 2026: domingo 5 de abril, así que Jueves Santo 2/4 y Viernes Santo 3/4. Art. 57 y 62: 9000 / 30 = 300; 300 + 100 % = 600; × 2 = 1200.",
    },
    fecha: "2026-10-12",
    entrada: { anio: 2026, salario: 9000, trabajados: 2 },
    esperado: {
      anioNuevo: "2026-01-01",
      juevesSanto: "2026-04-02",
      viernesSanto: "2026-04-03",
      revolucion: "2026-07-19",
      independencia: "2026-09-15",
      navidad: "2026-12-25",
      porFeriado: 600,
      total: 1200,
    },
  },
  {
    nombre: "Semana Santa de 2027 sin salario",
    origen: { tipo: "recalculado", detalle: "Pascua 2027: domingo 28 de marzo. Jueves Santo 25/3 y Viernes Santo 26/3." },
    fecha: "2026-10-12",
    entrada: { anio: 2027, salario: null, trabajados: 0 },
    esperado: { juevesSanto: "2027-03-25", viernesSanto: "2027-03-26", sanJacinto: "2027-09-14", purisima: "2027-12-08" },
  },
]);
