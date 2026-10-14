import { definirCasos } from "@/motor/calculo";
import retencionIrpf from "./retencion-irpf";

const ALGORITMO = "https://sede.agenciatributaria.gob.es/static_files/Sede/Programas_ayuda/Retenciones/2026/Algoritmo%20Retenciones-2026_10sept.pdf";
const familiaBase = { situacion: "3", hijos: 0, hijosMenores3: 0, hijosPorEntero: false, edad: "menos-65" } as const;

export default definirCasos(retencionIrpf, [
  {
    nombre: "Ejemplo de la Agencia Tributaria: 28.500 euros con 1.700 de cotizaciones",
    origen: {
      tipo: "oficial",
      url: "https://sede.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/modelos/rw/retenciones2026.pdf",
      detalle:
        "La ayuda de retenciones 2026 de la AEAT da un tipo del 15,96 % y 4.548,60 euros al año para 28.500 euros con unas cotizaciones de 1.700. Se toma sin hijos ni otras circunstancias: base 24.800, cuota 5.605,50 − 1.054,50 = 4.551.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 28500, cotizaciones: 1700, contrato: "indefinido", ...familiaBase },
    esperado: { tipo: 15.96, importeAnual: 4548.6, base: 24800, cuota: 4551 },
  },
  {
    nombre: "Cotizaciones calculadas solas con 25.000 euros",
    origen: { tipo: "recalculado", url: ALGORITMO, detalle: "Cotizaciones 135,41 × 12 = 1.624,92. Base 21.375,08. Cuota 3.523,52. Tipo 14,09 %, 3.522,50 al año." },
    fecha: "2026-10-14",
    entrada: { bruto: 25000, cotizaciones: null, contrato: "indefinido", ...familiaBase },
    esperado: { cotizaciones: 1624.92, tipo: 14.09, importeAnual: 3522.5 },
  },
  {
    nombre: "Sueldo por debajo del límite sin retención",
    origen: { tipo: "recalculado", url: ALGORITMO, detalle: "15.000 euros en situación 3 sin hijos: no supera 15.876, tipo 0." },
    fecha: "2026-10-14",
    entrada: { bruto: 15000, cotizaciones: null, contrato: "indefinido", ...familiaBase },
    esperado: { tipo: 0, importeAnual: 0 },
  },
  {
    nombre: "Familia monoparental con un hijo y 18.000 euros",
    origen: {
      tipo: "recalculado",
      url: ALGORITMO,
      detalle: "Cotizaciones 1.170. Reducción 7.302 − 1,75 × (16.830 − 14.852) = 3.840,50. Base 10.989,50. Mínimo 5.550 + 2.400 = 7.950. Cuota 2.088 − 1.510,50 = 577,50, limitada a (18.000 − 17.644) × 43 % = 153,08. Tipo 0,85 %.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 18000, cotizaciones: null, contrato: "indefinido", situacion: "1", hijos: 1, hijosMenores3: 0, hijosPorEntero: true, edad: "menos-65" },
    esperado: { reduccionTrabajo: 3840.5, minimo: 7950, cuota: 153.08, tipo: 0.85 },
  },
  {
    nombre: "Mayor de 65 con 40.000 euros",
    origen: { tipo: "recalculado", detalle: "Mínimo 5.550 + 1.150 = 6.700. Cotizaciones 2.600,04. Base 35.399,96. Cuota 8.799,49 − 1.273 = 7.526,49. Tipo 18,81 %." },
    fecha: "2026-10-14",
    entrada: { bruto: 40000, cotizaciones: null, contrato: "indefinido", situacion: "3", hijos: 0, hijosMenores3: 0, hijosPorEntero: false, edad: "65-74" },
    esperado: { minimo: 6700, tipo: 18.81 },
  },
  {
    nombre: "Monoparental sin hijos",
    origen: { tipo: "recalculado", detalle: "La situación 1 exige al menos un hijo." },
    fecha: "2026-10-14",
    entrada: { bruto: 30000, cotizaciones: null, contrato: "indefinido", situacion: "1", hijos: 0, hijosMenores3: 0, hijosPorEntero: false, edad: "menos-65" },
    esperaError: true,
  },
]);
