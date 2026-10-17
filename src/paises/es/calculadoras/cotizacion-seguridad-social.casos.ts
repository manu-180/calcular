import { definirCasos } from "@/motor/calculo";
import cotizacion from "./cotizacion-seguridad-social";

export default definirCasos(cotizacion, [
  {
    nombre: "2.000 euros al mes, indefinido",
    origen: {
      tipo: "recalculado",
      url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-7296",
      detalle: "Trabajador: 4,70 % + 1,55 % + 0,10 % + 0,15 % = 94 + 31 + 2 + 3 = 130. Empresa: 472 + 110 + 4 + 12 + 15 + 30 (AT 1,5 %) = 643.",
    },
    fecha: "2026-10-14",
    entrada: { mensual: 2000, contrato: "indefinido", accidentes: 1.5 },
    esperado: { base: 2000, trabajadorTotal: 130, empresaTotal: 643, total: 773 },
  },
  {
    nombre: "6.000 euros al mes, temporal, por encima de la base máxima",
    origen: {
      tipo: "recalculado",
      detalle:
        "Base 5.101,20. Trabajador: 239,76 + 81,62 + 5,10 + 7,65 + solidaridad (510,12 × 0,19 % + 388,68 × 0,21 % = 1,79) = 335,92. Empresa: 1.203,88 + 341,78 + 10,20 + 30,61 + 38,26 + 76,52 + 8,94 = 1.710,19.",
    },
    fecha: "2026-10-14",
    entrada: { mensual: 6000, contrato: "temporal", accidentes: 1.5 },
    esperado: { base: 5101.2, trabajadorSolidaridad: 1.79, trabajadorTotal: 335.92, empresaSolidaridad: 8.94, empresaTotal: 1710.19 },
  },
]);
