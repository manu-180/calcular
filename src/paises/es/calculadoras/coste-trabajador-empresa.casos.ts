import { definirCasos } from "@/motor/calculo";
import coste from "./coste-trabajador-empresa";

export default definirCasos(coste, [
  {
    nombre: "24.000 euros, indefinido, accidentes al 1,5 %",
    origen: {
      tipo: "recalculado",
      url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-7296",
      detalle: "Base 2.000: 472 + 110 + 4 + 12 + 15 + 30 = 643 al mes, 7.716 al año. Coste 31.716.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 24000, contrato: "indefinido", accidentes: 1.5 },
    esperado: { cotizacionMensual: 643, cotizacionAnual: 7716, costeAnual: 31716, costeMensual: 2643, porcentajeSobreBruto: 32.15 },
  },
  {
    nombre: "24.000 euros, temporal",
    origen: { tipo: "recalculado", detalle: "Desempleo de la empresa al 6,70 %: 134 en vez de 110. 667 al mes, 8.004 al año. Coste 32.004." },
    fecha: "2026-10-14",
    entrada: { bruto: 24000, contrato: "temporal", accidentes: 1.5 },
    esperado: { cotizacionMensual: 667, costeAnual: 32004 },
  },
]);
