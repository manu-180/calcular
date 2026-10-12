import { definirCasos } from "@/motor/calculo";
import sueldoBruto from "./sueldo-bruto";

export default definirCasos(sueldoBruto, [
  {
    nombre: "Líquido de $1.218.898 vuelve a $1.500.000",
    origen: {
      tipo: "recalculado",
      detalle: "Es el caso inverso del sueldo líquido: $1.500.000 imponible, AFP Uno, Fonasa, indefinido, da $1.218.898 líquido el 7/10/2026 (AFP 156.900, salud 105.000, cesantía 9.000, impuesto 10.202).",
    },
    fecha: "2026-10-07",
    entrada: { liquido: 1218898, noImponible: 0, afp: "uno", salud: "fonasa", planIsapre: 0, contrato: "indefinido" },
    esperado: { imponible: 1500000, impuesto: 10202, liquido: 1218898 },
  },
  {
    nombre: "Líquido exento de impuesto",
    origen: { tipo: "recalculado", detalle: "800.000 con AFP Modelo da 654.560 líquido (10,58 % + 7 % + 0,6 % = 18,18 % de descuentos, sin impuesto)." },
    fecha: "2026-10-07",
    entrada: { liquido: 654560, noImponible: 0, afp: "modelo", salud: "fonasa", planIsapre: 0, contrato: "indefinido" },
    esperado: { imponible: 800000, impuesto: 0, liquido: 654560 },
  },
  {
    nombre: "Con colación y movilización",
    origen: { tipo: "recalculado", detalle: "Mismo caso de 1.500.000 imponible con 60.000 de colación: líquido 1.278.898." },
    fecha: "2026-10-07",
    entrada: { liquido: 1278898, noImponible: 60000, afp: "uno", salud: "fonasa", planIsapre: 0, contrato: "indefinido" },
    esperado: { imponible: 1500000, liquido: 1278898 },
  },
]);
