import { definirCasos } from "@/motor/calculo";
import itp from "./itp";

const URL = "https://www.impo.com.uy/bases/todgi2023/101-2024/7_T19" as const;

export default definirCasos(itp, [
  {
    nombre: "Compraventa con precio mayor que el valor real",
    origen: { tipo: "recalculado", url: URL, detalle: "TO 2023, T19, art. 5 y 7: base el valor real (2.000.000). 2 % cada parte: 40.000 y 40.000. Total 80.000." },
    fecha: "2026-10-12",
    entrada: { operacion: "compraventa", valorReal: 2000000, precio: 3000000 },
    esperado: { base: 2000000, vendedor: 40000, comprador: 40000, herederos: null, total: 80000 },
  },
  {
    nombre: "Compraventa con precio menor que el valor real",
    origen: { tipo: "recalculado", url: URL, detalle: "Art. 5: si el precio es menor, la base es el precio (1.500.000). 2 % = 30.000 cada parte." },
    fecha: "2026-10-12",
    entrada: { operacion: "compraventa", valorReal: 2000000, precio: 1500000 },
    esperado: { base: 1500000, vendedor: 30000, total: 60000 },
  },
  {
    nombre: "Herencia en línea recta",
    origen: { tipo: "recalculado", url: URL, detalle: "Art. 7: 3 % para herederos en línea recta. 2.000.000 × 3 % = 60.000." },
    fecha: "2026-10-12",
    entrada: { operacion: "herencia-directa", valorReal: 2000000, precio: null },
    esperado: { herederos: 60000, total: 60000 },
  },
  {
    nombre: "Herencia de otras personas",
    origen: { tipo: "recalculado", url: URL, detalle: "Art. 7: 4 % para los demás. 2.000.000 × 4 % = 80.000." },
    fecha: "2026-10-12",
    entrada: { operacion: "herencia-otros", valorReal: 2000000, precio: null },
    esperado: { total: 80000 },
  },
]);
