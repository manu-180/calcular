import { definirCasos } from "@/motor/calculo";
import periodoDePrueba from "./periodo-de-prueba";

export default definirCasos(periodoDePrueba, [
  {
    nombre: "Trabajo no calificado que ya terminó la prueba",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Art. 58 a: 30 días. Del 1/9 al 30/9/2026 (el día de ingreso cuenta). Al 12/10 ya terminó.",
    },
    fecha: "2026-10-12",
    entrada: { ingreso: "2026-09-01", tipo: "no-calificado" },
    esperado: { dias: 30, fin: "2026-09-30", estado: "Ya terminó", diasRestantes: null },
  },
  {
    nombre: "Trabajo calificado en curso",
    origen: { tipo: "recalculado", detalle: "Art. 58 b: 60 días desde el 1/10/2026, último día el 29/11. Del 12/10 al 29/11 faltan 48 días." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2026-10-01", tipo: "calificado" },
    esperado: { dias: 60, fin: "2026-11-29", estado: "En curso", diasRestantes: 48 },
  },
]);
