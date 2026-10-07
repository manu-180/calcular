import { definirCasos } from "@/motor/calculo";
import impuesto from "./impuesto-al-salario";

export default definirCasos(impuesto, [
  {
    nombre: "Salario en el primer tramo gravado",
    origen: { tipo: "recalculado", detalle: "Decreto 45333-H: (1.200.000 − 918.000) × 10 % = 28.200. 28.200 / 1.200.000 = 2,35 %." },
    fecha: "2026-10-07",
    entrada: { salario: 1200000, hijos: 0, conyuge: false },
    esperado: { bruto: 28200, creditos: 0, impuesto: 28200, tasaEfectiva: 2.35 },
  },
  {
    nombre: "Tres tramos con dos hijos y cónyuge",
    origen: {
      tipo: "recalculado",
      detalle: "429.000 × 10 % = 42.900; 1.017.000 × 15 % = 152.550; 636.000 × 20 % = 127.200. Suma 322.650. Créditos 2 × 1.710 + 2.590 = 6.010. Impuesto 316.640.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 3000000, hijos: 2, conyuge: true },
    esperado: { bruto: 322650, creditos: 6010, impuesto: 316640, tasaEfectiva: 10.55 },
  },
  {
    nombre: "Último tramo del 25 %",
    origen: { tipo: "recalculado", detalle: "42.900 + 152.550 + 2.363.000 × 20 % (472.600) + 273.000 × 25 % (68.250) = 736.300." },
    fecha: "2026-10-07",
    entrada: { salario: 5000000, hijos: 0, conyuge: false },
    esperado: { impuesto: 736300 },
  },
  {
    nombre: "Justo en el límite exento",
    origen: { tipo: "recalculado", detalle: "Hasta 918.000 no paga impuesto." },
    fecha: "2026-10-07",
    entrada: { salario: 918000, hijos: 0, conyuge: false },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Los créditos no dejan el impuesto en negativo",
    origen: { tipo: "recalculado", detalle: "12.000 × 10 % = 1.200. Créditos 3 × 1.710 = 5.130, mayor que el impuesto: queda en 0." },
    fecha: "2026-10-07",
    entrada: { salario: 930000, hijos: 3, conyuge: false },
    esperado: { bruto: 1200, creditos: 1200, impuesto: 0 },
  },
]);
