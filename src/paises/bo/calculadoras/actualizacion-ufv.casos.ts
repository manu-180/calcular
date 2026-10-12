import { definirCasos } from "@/motor/calculo";
import actualizacionUfv from "./actualizacion-ufv";

const BCB = "https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php" as const;

export default definirCasos(actualizacionUfv, [
  {
    nombre: "Bs 10.000 del 16 de septiembre de 2026",
    origen: { tipo: "recalculado", url: BCB, detalle: "UFV 16/09/2026 3,34497 y 12/10/2026 3,35681 (BCB). 10.000 / 3,34497 = 2.989,56 UFV; × 3,35681 = 10.035,40." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, ufvInicial: 3.34497 },
    esperado: { ufvs: 2989.56, ufvHoy: 3.35681, fecha: "2026-10-12", actualizado: 10035.4, diferencia: 35.4, variacion: 0.35 },
  },
  {
    nombre: "Una deuda vieja con UFV de 2,35",
    origen: { tipo: "recalculado", detalle: "50.000 × 3,35681 / 2,35 = 71.421,49; variación 42,84 %." },
    fecha: "2026-10-12",
    entrada: { monto: 50000, ufvInicial: 2.35 },
    esperado: { ufvs: 21276.6, actualizado: 71421.49, diferencia: 21421.49, variacion: 42.84 },
  },
]);
