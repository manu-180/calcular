import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "Actualizar Q1,000 con la inflación de septiembre de 2026",
    origen: { tipo: "recalculado", detalle: "Ritmo inflacionario de septiembre de 2026 (Banguat, datos del INE): 4.69 %. 1000 × 1.0469 = 1046.90." },
    fecha: "2026-10-12",
    entrada: { monto: 1000, sentido: "actualizar" },
    esperado: { tasa: 4.69, fecha: "2026-09-01", resultado: 1046.9, diferencia: 46.9 },
  },
  {
    nombre: "Al revés",
    origen: { tipo: "recalculado", detalle: "1046.90 / 1.0469 = 1000." },
    fecha: "2026-10-12",
    entrada: { monto: 1046.9, sentido: "descontar" },
    esperado: { resultado: 1000 },
  },
]);
