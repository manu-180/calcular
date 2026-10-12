import { definirCasos } from "@/motor/calculo";
import primaDominical from "./prima-dominical";

export default definirCasos(primaDominical, [
  {
    nombre: "Cuatro domingos con 15,000 al mes",
    origen: { tipo: "recalculado", detalle: "LFT art. 71: 25 % del salario diario. 500 × 25 % = 125 por domingo; × 4 = 500. LISR art. 93 fr. XIV: exento 1 UMA por domingo, 4 × 117.31 = 469.24; gravado 30.76." },
    fecha: "2026-10-15",
    entrada: { sueldo: 15000, periodo: "mensual", domingos: 4, prima: null },
    esperado: { diario: 500, porDomingo: 125, prima: 500, exento: 469.24, gravado: 30.76 },
  },
  {
    nombre: "Un domingo con 300 diarios",
    origen: { tipo: "recalculado", detalle: "300 × 25 % = 75, menor que una UMA: todo exento." },
    fecha: "2026-10-15",
    entrada: { sueldo: 300, periodo: "diario", domingos: 1, prima: null },
    esperado: { prima: 75, exento: 75, gravado: 0 },
  },
  {
    nombre: "Prima menor a la de ley",
    origen: { tipo: "recalculado", detalle: "LFT art. 71: por lo menos 25 %." },
    fecha: "2026-10-15",
    entrada: { sueldo: 300, periodo: "diario", domingos: 1, prima: 10 },
    esperaError: true,
  },
]);
