import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "₡100.000 de setiembre de 2025 llevados a setiembre de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bccr.fi.cr/content/bccr/cr/es/home/jcr:content/root/container/container/economicindicators/cardindicador.indicator.89638.json",
      detalle:
        "IPC setiembre 2025 = 108,236146 y setiembre 2026 = 108,607545 (cuadro 2732). 108,607545 / 108,236146 = 1,0034314: 100.000 × 1,0034314 = 100.343,14. El BCCR publica para setiembre 2026 una variación interanual de 0,34313787 %. Mensual: 108,607545 / 108,487849 = 0,11 %.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 100000, desde: "2025-09", hasta: "2026-09" },
    esperado: { actualizado: 100343.14, diferencia: 343.14, acumulada: 0.34, mensual: 0.11, interanual: 0.34 },
  },
  {
    nombre: "Desde la base del índice (diciembre 2020 = 100)",
    origen: { tipo: "recalculado", detalle: "IPC diciembre 2020 = 100 y setiembre 2026 = 108,607545. 2.000 × 1,08607545 = 2.172,15. Acumulada 8,61 %." },
    fecha: "2026-10-08",
    entrada: { monto: 2000, desde: "2020-12", hasta: "2026-09" },
    esperado: { actualizado: 2172.15, acumulada: 8.61, indiceInicial: 100 },
  },
  {
    nombre: "Un mes que todavía no estaba publicado en esa fecha",
    origen: { tipo: "recalculado", detalle: "Al 20/8/2026 la serie llega hasta agosto: pedir setiembre tiene que dar error." },
    fecha: "2026-08-20",
    entrada: { monto: 1000, desde: "2026-01", hasta: "2026-09" },
    esperaError: true,
  },
  {
    nombre: "Mes de origen posterior al mes final",
    origen: { tipo: "recalculado", detalle: "El mes de origen tiene que ser anterior al final." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2026-09", hasta: "2026-01" },
    esperaError: true,
  },
]);
