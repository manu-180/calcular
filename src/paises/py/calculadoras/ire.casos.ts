import { definirCasos } from "@/motor/calculo";
import ire from "./ire";

const L6380 = "https://www.bacn.gov.py/leyes-paraguayas/9332/ley-n-6380-de-modernizacion-y-simplificacion-del-sistema-tributario-nacional" as const;

export default definirCasos(ire, [
  {
    nombre: "SIMPLE con renta presunta",
    origen: { tipo: "recalculado", url: L6380, detalle: "Art. 26: renta real 1.000.000.000 − 600.000.000 = 400.000.000; presunta 30 % = 300.000.000. Se toma la menor: 300.000.000 × 10 % = 30.000.000." },
    fecha: "2026-10-12",
    entrada: { regimen: "simple", ingresos: 1000000000, egresos: 600000000 },
    esperado: { rentaReal: 400000000, rentaPresunta: 300000000, rentaNeta: 300000000, impuesto: 30000000 },
  },
  {
    nombre: "SIMPLE con renta real menor",
    origen: { tipo: "recalculado", url: L6380, detalle: "Renta real 1.000.000.000 − 900.000.000 = 100.000.000, menor que la presunta de 300.000.000. IRE 10.000.000." },
    fecha: "2026-10-12",
    entrada: { regimen: "simple", ingresos: 1000000000, egresos: 900000000 },
    esperado: { rentaNeta: 100000000, impuesto: 10000000 },
  },
  {
    nombre: "Régimen general",
    origen: { tipo: "recalculado", detalle: "Art. 21: 10 % sobre la renta neta. 500.000.000 − 380.000.000 = 120.000.000; IRE 12.000.000." },
    fecha: "2026-10-12",
    entrada: { regimen: "general", ingresos: 500000000, egresos: 380000000 },
    esperado: { rentaReal: 120000000, rentaPresunta: null, rentaNeta: 120000000, impuesto: 12000000 },
  },
]);
