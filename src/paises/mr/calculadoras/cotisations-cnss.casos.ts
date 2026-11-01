import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisations-cnss";

export default definirCasos(calculadora, [
  {
    nombre: "Bruto 30.000 por mes con CNAM",
    origen: {
      tipo: "recalculado",
      detalle: "Base CNSS topada en 15.000 (decreto 2021-186). 14 % = 2.100: pensiones 1.350, riesgos 300, familia 450. Asalariado 1 % = 150, empleador 13 % = 1.950. CNAM 4 % y 5 % de 30.000 = 1.200 y 1.500. Total 4.800.",
    },
    fecha: "2026-10-29",
    entrada: { brut: 30000, periode: "mois", cnam: true },
    esperado: { base: 15000, cnss: 2100, pensions: 1350, risques: 300, famille: 450, cnssSal: 150, cnssEmp: 1950, cnamSal: 1200, cnamEmp: 1500, salarie: 1350, employeur: 3450, total: 4800 },
  },
  {
    nombre: "Bruto 10.000 por trimestre sin CNAM",
    origen: { tipo: "recalculado", detalle: "Debajo del tope: base 10.000 x 3 = 30.000. 1 % = 300, 13 % = 3.900. Total 4.200." },
    fecha: "2026-10-29",
    entrada: { brut: 10000, periode: "trimestre", cnam: false },
    esperado: { base: 30000, cnssSal: 300, cnssEmp: 3900, total: 4200, cnamSal: 0 },
  },
  {
    nombre: "Sin bruto",
    origen: { tipo: "recalculado", detalle: "Bruto 0." },
    fecha: "2026-10-29",
    entrada: { brut: 0, periode: "mois", cnam: true },
    esperaError: true,
  },
]);
