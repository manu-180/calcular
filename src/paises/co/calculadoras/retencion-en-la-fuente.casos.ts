import { definirCasos } from "@/motor/calculo";
import retencion from "./retencion-en-la-fuente";

export default definirCasos(retencion, [
  {
    nombre: "8 millones sin deducciones (tramo del 19 %)",
    origen: {
      tipo: "recalculado",
      detalle: "Aportes 320.000 + 320.000 + 80.000 = 720.000. Exenta 25 % de 7.280.000 = 1.820.000. Base 5.460.000 = 104,25 UVT. (104,25 − 95) × 19 % × 52.374 = 92.049,3.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 8000000, dependiente: false, salud: 0 },
    esperado: { noConstitutivos: 720000, deducciones: 0, rentaExenta: 1820000, beneficios: 1820000, base: 5460000, baseUvt: 104.25, retencion: 92049 },
  },
  {
    nombre: "20 millones con dependiente y prepagada: se aplica el límite",
    origen: {
      tipo: "recalculado",
      detalle:
        "Deducciones 1.675.968 (32 UVT) + 837.984 (16 UVT) = 2.513.952. Exenta tope 3.447.955. Suma 5.961.907 > 1.340 / 12 × 52.374 = 5.848.430. Base 18.200.000 − 5.848.430 = 12.351.570. (12.351.570 − 7.856.100) × 28 % + 523.740 = 1.782.471,6.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 20000000, dependiente: true, salud: 1000000 },
    esperado: { deducciones: 2513952, rentaExenta: 3447955, beneficios: 5848430, base: 12351570, retencion: 1782472 },
  },
  {
    nombre: "3 millones: base debajo de 95 UVT",
    origen: { tipo: "recalculado", detalle: "Base (3.000.000 − 240.000) × 75 % = 2.070.000 = 39,52 UVT, tarifa 0 %." },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, dependiente: false, salud: null },
    esperado: { base: 2070000, retencion: 0 },
  },
]);
