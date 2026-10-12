import { definirCasos } from "@/motor/calculo";
import prueba from "./periodo-de-prueba";

export default definirCasos(prueba, [
  {
    nombre: "Contrato indefinido desde el 1 de febrero",
    origen: { tipo: "recalculado", detalle: "CST art. 78: máximo 2 meses. Del 1 de febrero al 31 de marzo de 2026 (59 días)." },
    fecha: "2026-10-15",
    entrada: { contrato: "indefinido", meses: 12, inicio: "2026-02-01" },
    esperado: { dias: 59, fin: "2026-03-31" },
  },
  {
    nombre: "Contrato fijo de 6 meses",
    origen: { tipo: "recalculado", detalle: "Quinta parte de 180 días = 36 días: del 15 de octubre al 19 de noviembre de 2026." },
    fecha: "2026-10-15",
    entrada: { contrato: "fijo", meses: 6, inicio: "2026-10-15" },
    esperado: { dias: 36, fin: "2026-11-19", regla: "La quinta parte del término pactado" },
  },
  {
    nombre: "Contrato fijo de 11 meses llega al tope",
    origen: { tipo: "recalculado", detalle: "Quinta parte de 330 días = 66, más que 2 meses: rige el tope. Del 10 de enero al 9 de marzo de 2026." },
    fecha: "2026-10-15",
    entrada: { contrato: "fijo", meses: 11, inicio: "2026-01-10" },
    esperado: { fin: "2026-03-09", regla: "El máximo legal de 2 meses" },
  },
]);
