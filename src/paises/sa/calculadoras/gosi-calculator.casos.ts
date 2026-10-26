import { definirCasos } from "@/motor/calculo";
import calculadora from "./gosi-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Saudí con aportes anteriores a julio de 2024",
    origen: {
      tipo: "recalculado",
      detalle: "Base 10.000 + 2.500 = 12.500. Empleado 9 % + 0,75 % = 1.218,75. Empleador 9 % + 0,75 % + 2 % = 1.468,75 (GOSI journey1).",
    },
    fecha: "2026-10-24",
    entrada: { basico: 10000, vivienda: 2500, nacionalidad: "saudi", regimen: "legacy" },
    esperado: { empleado: 1218.75, empleador: 1468.75, total: 2687.5, base: 12500 },
  },
  {
    nombre: "Sistema nuevo desde el 1 de julio de 2026 (10 %)",
    origen: {
      tipo: "oficial",
      url: "https://awareness.gosi.gov.sa/pdf/Contributions.pdf",
      detalle: "Tabla GOSI: 10 % cada parte desde el 1/7/2026. 12.500 x 10,75 % = 1.343,75; empleador 12,75 % = 1.593,75.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 10000, vivienda: 2500, nacionalidad: "saudi", regimen: "new" },
    esperado: { empleado: 1343.75, empleador: 1593.75, tasaPension: 10 },
  },
  {
    nombre: "Sistema nuevo el día antes del escalón (9,5 %)",
    origen: { tipo: "recalculado", detalle: "30/6/2026: 9,5 % + 0,75 % = 10,25 % de 12.500 = 1.281,25." },
    fecha: "2026-06-30",
    entrada: { basico: 10000, vivienda: 2500, nacionalidad: "saudi", regimen: "new" },
    esperado: { empleado: 1281.25, tasaPension: 9.5 },
  },
  {
    nombre: "Extranjero: solo riesgos laborales",
    origen: { tipo: "recalculado", detalle: "Ley 1445هـ art. 28 y 43: el extranjero aporta solo a riesgos, 2 % de 12.500 = 250 a cargo del empleador." },
    fecha: "2026-10-24",
    entrada: { basico: 10000, vivienda: 2500, nacionalidad: "non-saudi", regimen: null },
    esperado: { empleado: 0, empleador: 250, riesgos: 250 },
  },
  {
    nombre: "Tope de 45.000",
    origen: { tipo: "recalculado", detalle: "50.000 + 0 queda en 45.000. 45.000 x 9,75 % = 4.387,5." },
    fecha: "2026-10-24",
    entrada: { basico: 50000, vivienda: 0, nacionalidad: "saudi", regimen: "legacy" },
    esperado: { base: 45000, empleado: 4387.5 },
  },
  {
    nombre: "Sin sueldo básico",
    origen: { tipo: "recalculado", detalle: "Básico 0." },
    fecha: "2026-10-24",
    entrada: { basico: 0, vivienda: 0, nacionalidad: "saudi", regimen: "legacy" },
    esperaError: true,
  },
]);
