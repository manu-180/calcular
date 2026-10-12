import { definirCasos } from "@/motor/calculo";
import despidoEspecial from "./despido-especial";

const BASE = { sueldo: 50000, ingreso: "2023-03-01", egreso: "2026-10-07", incidencias: true } as const;
const COMUN = "Despido común (igual que en la calculadora de despido): 4 años, base 56.944,45, total 227.777,80.";

export default definirCasos(despidoEspecial, [
  {
    nombre: "Trabajadora embarazada",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/leyes/11577-1950/17", detalle: `${COMUN} Ley 11.577, art. 17: seis meses de sueldo más (300.000). Total 527.777,80.` },
    fecha: "2026-10-07",
    entrada: { ...BASE, causa: "embarazo" },
    esperado: { comun: 227777.8, especial: 300000, total: 527777.8 },
  },
  {
    nombre: "Despido durante la enfermedad: doble",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/decretos-ley/14407-1975/23", detalle: `${COMUN} Decreto-Ley 14.407, art. 23: el doble. Total 455.555,60.` },
    fecha: "2026-10-07",
    entrada: { ...BASE, causa: "enfermedad" },
    esperado: { especial: 227777.8, total: 455555.6 },
  },
  {
    nombre: "Accidente de trabajo: triple",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/leyes/16074-1989/69", detalle: `${COMUN} Ley 16.074, art. 69: el triple. Total 683.333,40.` },
    fecha: "2026-10-07",
    entrada: { ...BASE, causa: "accidente" },
    esperado: { especial: 455555.6, total: 683333.4 },
  },
  {
    nombre: "Acoso sexual",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/leyes/18561-2009/11", detalle: `${COMUN} Ley 18.561, art. 11: seis mensualidades acumulables (300.000).` },
    fecha: "2026-10-07",
    entrada: { ...BASE, causa: "acoso" },
    esperado: { especial: 300000, total: 527777.8 },
  },
  {
    nombre: "Después de la licencia por paternidad",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/leyes/19161-2013", detalle: `${COMUN} Ley 19.161: tres meses de salario más (150.000).` },
    fecha: "2026-10-07",
    entrada: { ...BASE, causa: "paternidad" },
    esperado: { especial: 150000, total: 377777.8 },
  },
]);
