import { definirCasos } from "@/motor/calculo";
import salarioNeto from "./salario-neto";

export default definirCasos(salarioNeto, [
  {
    nombre: "Salario de 3 millones con auxilio",
    origen: {
      tipo: "recalculado",
      detalle:
        "Salud 4 % = 120.000. Pensión 16 % × 25 % = 4 % = 120.000. FSP 0 (menos de 4 SMMLV). Retención: (3.000.000 − 240.000) × 75 % = 2.070.000 = 39,5 UVT, menos de 95: 0. Neto 3.000.000 + 249.095 − 240.000 = 3.009.095.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, auxilio: true, dependiente: false },
    esperado: { auxilio: 249095, salud: 120000, pension: 120000, fsp: 0, retencion: 0, neto: 3009095 },
  },
  {
    nombre: "Salario de 8 millones: FSP y retención",
    origen: {
      tipo: "recalculado",
      detalle:
        "8.000.000 = 4,57 SMMLV: FSP 1 % = 80.000. Salud y pensión 320.000 cada una. Ingreso neto 7.280.000; renta exenta 25 % = 1.820.000; base 5.460.000. Retención (5.460.000 − 95 × 52.374) × 19 % = 92.049,3. Neto 8.000.000 − 1.032.049 = 7.187.951.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 8000000, auxilio: true, dependiente: false },
    esperado: { auxilio: 0, salud: 320000, pension: 320000, fsp: 80000, retencion: 92049, neto: 7187951 },
  },
  {
    nombre: "Salario de 20 millones con dependiente",
    origen: {
      tipo: "recalculado",
      detalle:
        "FSP 1 % = 200.000; salud y pensión 800.000. Ingreso neto 18.200.000. Dependiente min(2.000.000; 32 × 52.374 = 1.675.968). Exenta min(25 % × 16.524.032; 790 / 12 × 52.374 = 3.447.955). Beneficios 5.123.923 < min(40 %; 1.340 / 12 UVT = 5.848.430). Base 13.076.077. Retención (13.076.077 − 150 × 52.374) × 28 % + 10 × 52.374 = 1.985.333,56.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 20000000, auxilio: false, dependiente: true },
    esperado: { salud: 800000, pension: 800000, fsp: 200000, retencion: 1985334, neto: 16214666 },
  },
  {
    nombre: "Salario sobre el tope de 25 SMMLV",
    origen: {
      tipo: "recalculado",
      detalle:
        "IBC = 25 × 1.750.905 = 43.772.625. Salud y pensión 1.750.905; FSP 2 % = 875.452,5. Exenta tope 3.447.955. Base 50.000.000 − 4.377.263 − 3.447.955 = 42.174.782. Retención (42.174.782 − 640 × 52.374) × 35 % + 162 × 52.374 = 11.513.985,7. Neto 34.108.751.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 50000000, auxilio: false, dependiente: false },
    esperado: { salud: 1750905, pension: 1750905, fsp: 875453, retencion: 11513986, neto: 34108751 },
  },
  {
    nombre: "Con salario 0 pide el salario y no calcula un neto",
    origen: { tipo: "recalculado", detalle: "Con salario 0 antes daba neto 109.023 (auxilio de transporte menos aportes sobre el mínimo). Ahora la función rechaza el 0." },
    fecha: "2026-10-15",
    entrada: { salario: 0, auxilio: true, dependiente: false },
    esperaError: true,
  },
]);
