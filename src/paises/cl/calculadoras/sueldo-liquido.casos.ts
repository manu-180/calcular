import { definirCasos } from "@/motor/calculo";
import sueldoLiquido from "./sueldo-liquido";

export default definirCasos(sueldoLiquido, [
  {
    nombre: "$1.500.000, AFP Uno, Fonasa, indefinido",
    origen: {
      tipo: "recalculado",
      detalle:
        "UF 7/10/2026 41.114,54, UTM oct 72.151. AFP 10,46 % = 156.900; salud 7 % = 105.000; cesantía 0,6 % = 9.000. Tributable 1.229.100 → 1.229.100 × 0,04 − 38.961,54 = 10.202,46 → 10.202. Líquido 1.218.898.",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 1500000, noImponible: 0, afp: "uno", salud: "fonasa", planIsapre: 0, contrato: "indefinido" },
    esperado: { afp: 156900, salud: 105000, cesantia: 9000, tributable: 1229100, impuesto: 10202, liquido: 1218898, tope: 3700309 },
  },
  {
    nombre: "Sueldo sobre el tope imponible, ProVida, Isapre barata",
    origen: {
      tipo: "recalculado",
      detalle:
        "Tope 90 × 41.114,54 = 3.700.309. AFP 11,45 % = 423.685; salud 7 % = 259.022 (plan 4 UF = 164.458, menor); cesantía 0,6 % de 5.000.000 (bajo 135,2 UF) = 30.000. Tributable 4.287.293 → × 0,135 − 323.957,99 = 254.826,57 → 254.827. Líquido 5.000.000 − 967.534 + 50.000 = 4.082.466.",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 5000000, noImponible: 50000, afp: "provida", salud: "isapre", planIsapre: 4, contrato: "indefinido" },
    esperado: { afp: 423685, salud: 259022, cesantia: 30000, tributable: 4287293, impuesto: 254827, descuentos: 967534, liquido: 4082466 },
  },
  {
    nombre: "Plazo fijo con plan de Isapre sobre el 7 %",
    origen: {
      tipo: "recalculado",
      detalle:
        "AFP Habitat 11,27 % = 225.400; plan 5 UF = 205.573 (mayor que 140.000); sin cesantía. Tributable 2.000.000 − 225.400 − 140.000 = 1.634.600 → × 0,04 − 38.961,54 = 26.422,46 → 26.422. Líquido 1.542.605.",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 2000000, noImponible: 0, afp: "habitat", salud: "isapre", planIsapre: 5, contrato: "plazo-fijo" },
    esperado: { afp: 225400, salud: 205573, cesantia: 0, tributable: 1634600, impuesto: 26422, liquido: 1542605 },
  },
  {
    nombre: "Sueldo exento de impuesto",
    origen: { tipo: "recalculado", detalle: "AFP Modelo 10,58 % = 84.640; salud 56.000; cesantía 4.800. Tributable 654.560, bajo 13,5 UTM: impuesto 0." },
    fecha: "2026-10-07",
    entrada: { imponible: 800000, noImponible: 0, afp: "modelo", salud: "fonasa", planIsapre: 0, contrato: "indefinido" },
    esperado: { impuesto: 0, liquido: 654560 },
  },
]);
