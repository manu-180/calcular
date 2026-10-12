import { definirCasos } from "@/motor/calculo";
import cotizaciones from "./cotizaciones-previsionales";

export default definirCasos(cotizaciones, [
  {
    nombre: "$1.500.000, AFP Uno, indefinido, octubre 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "Trabajador: 10 % = 150.000; comisión 0,46 % = 6.900; salud 7 % = 105.000; cesantía 0,6 % = 9.000; total 270.900. Empleador: cesantía 2,4 % = 36.000; reforma 3,5 % = 52.500; accidentes 0,9 % + SANNA 0,03 % = 13.950; total 102.450.",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 1500000, afp: "uno", contrato: "indefinido" },
    esperado: { afpFondo: 150000, comision: 6900, salud: 105000, cesantiaTrabajador: 9000, totalTrabajador: 270900, cesantiaEmpleador: 36000, pensionesEmpleador: 52500, accidentes: 13950, totalEmpleador: 102450, total: 373350 },
  },
  {
    nombre: "Plazo fijo, AFP Habitat",
    origen: {
      tipo: "recalculado",
      detalle: "Plazo fijo: el trabajador no paga cesantía y el empleador paga 3 % = 30.000. Reforma 3,5 % = 35.000. Accidentes 0,93 % = 9.300. Comisión Habitat 1,27 % = 12.700.",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 1000000, afp: "habitat", contrato: "plazo-fijo" },
    esperado: { cesantiaTrabajador: 0, cesantiaEmpleador: 30000, pensionesEmpleador: 35000, accidentes: 9300, comision: 12700 },
  },
  {
    nombre: "Sueldo sobre los topes",
    origen: {
      tipo: "recalculado",
      detalle: "UF 41.114,54: tope 3.700.309 y tope cesantía 5.558.686. Sueldo 6.000.000: AFP 10 % = 370.031 (370.030,9); cesantía 0,6 % de 5.558.686 = 33.352 (33.352,1).",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 6000000, afp: "provida", contrato: "indefinido" },
    esperado: { afpFondo: 370031, cesantiaTrabajador: 33352 },
  },
]);
