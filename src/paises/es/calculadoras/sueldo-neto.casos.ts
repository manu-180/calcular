import { definirCasos } from "@/motor/calculo";
import sueldoNeto from "./sueldo-neto";

const ALGORITMO = "https://sede.agenciatributaria.gob.es/static_files/Sede/Programas_ayuda/Retenciones/2026/Algoritmo%20Retenciones-2026_10sept.pdf";
const familiaBase = { situacion: "3", hijos: 0, hijosMenores3: 0, hijosPorEntero: false, edad: "menos-65" } as const;

export default definirCasos(sueldoNeto, [
  {
    nombre: "25.000 euros en 14 pagas, indefinido, sin hijos",
    origen: {
      tipo: "recalculado",
      url: ALGORITMO,
      detalle:
        "Base 2.083,33: 97,92 + 32,29 + 2,08 + 3,12 = 135,41 al mes (1.624,92 al año). IRPF: 25.000 − 1.624,92 − 2.000 = 21.375,08; cuota 4.578,02 − 1.054,50 = 3.523,52; tipo 14,09 %. Paga 1.785,71 − 135,41 − 251,61 = 1.398,69.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 25000, pagas: "14", contrato: "indefinido", ...familiaBase },
    esperado: { cotizacion: 135.41, tipoIrpf: 14.09, irpfPaga: 251.61, netoMensual: 1398.69, netoPagaExtra: 1534.1, netoAnual: 19852.58 },
  },
  {
    nombre: "Salario mínimo 2026 (17.094 euros en 14 pagas)",
    origen: {
      tipo: "recalculado",
      detalle:
        "Cotización 92,59 al mes. Reducción por rendimientos del trabajo 7.302 − 1,75 × (15.982,92 − 14.852) = 5.322,89. Cuota 523,74 por el límite del 43 % sobre 17.094 − 15.876. Tipo 3,06 %.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 17094, pagas: "14", contrato: "indefinido", ...familiaBase },
    esperado: { cotizacion: 92.59, tipoIrpf: 3.06, netoMensual: 1091.05, netoAnual: 15459.84 },
  },
  {
    nombre: "80.000 euros en 12 pagas, por encima de la base máxima",
    origen: {
      tipo: "recalculado",
      detalle: "Base 5.101,20: 239,76 + 79,07 + 5,10 + 7,65 = 331,58, más solidaridad 0,97 + 2,22 = 3,19. Tipo IRPF 28,92 %.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 80000, pagas: "12", contrato: "indefinido", ...familiaBase },
    esperado: { cotizacion: 334.77, tipoIrpf: 28.92, netoMensual: 4403.9, netoPagaExtra: null },
  },
  {
    nombre: "30.000 euros con cónyuge a cargo y dos hijos, uno menor de 3",
    origen: { tipo: "recalculado", detalle: "Mínimo 5.550 + 2.400 + 2.700 + 2.800 = 13.450. Base 26.050. Cuota 5.980,50 − 2.605,50 = 3.375. Tipo 11,25 %." },
    fecha: "2026-10-14",
    entrada: { bruto: 30000, pagas: "14", contrato: "indefinido", situacion: "2", hijos: 2, hijosMenores3: 1, hijosPorEntero: true, edad: "menos-65" },
    esperado: { tipoIrpf: 11.25, netoMensual: 1739.29, irpfAnual: 3375 },
  },
  {
    nombre: "Contrato de menos de un año: retención mínima del 2 %",
    origen: { tipo: "recalculado", detalle: "16.000 en 12 pagas. El tipo calculado es 0,32 %, pero en contratos de menos de un año no puede bajar del 2 %." },
    fecha: "2026-10-14",
    entrada: { bruto: 16000, pagas: "12", contrato: "temporal-corto", ...familiaBase },
    esperado: { cotizacion: 87.33, tipoIrpf: 2, netoMensual: 1219.33 },
  },
  {
    nombre: "Más hijos menores de 3 que hijos en total",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-14",
    entrada: { bruto: 30000, pagas: "14", contrato: "indefinido", situacion: "3", hijos: 1, hijosMenores3: 2, hijosPorEntero: false, edad: "menos-65" },
    esperaError: true,
  },
]);
