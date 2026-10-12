import { definirCasos } from "@/motor/calculo";
import impuestoDeSolidaridad from "./impuesto-de-solidaridad";

export default definirCasos(impuestoDeSolidaridad, [
  {
    nombre: "Ingresos mayores que el activo",
    origen: { tipo: "recalculado", detalle: "Decreto 73-2008 arts. 7 y 8: cuarta parte de 4000000 = 1000000 (mayor que 500000 del activo); 1 % = 10000 por trimestre; 40000 al año." },
    fecha: "2026-10-12",
    entrada: { activoNeto: 2000000, ingresosBrutos: 4000000 },
    esperado: { sobre: "Ingresos brutos", base: 1000000, trimestral: 10000, anual: 40000 },
  },
  {
    nombre: "Activo mayor que los ingresos, sin pasar cuatro veces",
    origen: { tipo: "recalculado", detalle: "3000000 no pasa 4 × 1000000: base mayor entre 750000 y 250000 = 750000; 1 % = 7500; 30000 al año." },
    fecha: "2026-10-12",
    entrada: { activoNeto: 3000000, ingresosBrutos: 1000000 },
    esperado: { sobre: "Activo neto", base: 750000, trimestral: 7500, anual: 30000 },
  },
  {
    nombre: "Activo de más de cuatro veces los ingresos",
    origen: { tipo: "recalculado", detalle: "Art. 7 último párrafo: 10000000 > 4 × 1000000, se usa la cuarta parte de los ingresos 250000; 1 % = 2500." },
    fecha: "2026-10-12",
    entrada: { activoNeto: 10000000, ingresosBrutos: 1000000 },
    esperado: { sobre: "Ingresos brutos", base: 250000, trimestral: 2500, anual: 10000 },
  },
]);
