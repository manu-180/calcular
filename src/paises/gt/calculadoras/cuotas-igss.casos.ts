import { definirCasos } from "@/motor/calculo";
import cuotasIgss from "./cuotas-igss";

export default definirCasos(cuotasIgss, [
  {
    nombre: "Salario mínimo no agrícola de la circunscripción 1",
    origen: {
      tipo: "recalculado",
      detalle: "IGSS en cifras 2024: laboral 1.83 + 3 = 4.83 % de 4002.28 = 193.31; patronal 3.67 + 7 = 10.67 % = 427.04; IRTRA y INTECAP 1 % = 40.02 cada uno. Patrono 507.08; total 700.39.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 4002.28 },
    esperado: { tasaLaboral: 4.83, laboral: 193.31, tasaPatronal: 10.67, patronal: 427.04, irtra: 40.02, intecap: 40.02, totalPatrono: 507.08, total: 700.39 },
  },
  {
    nombre: "Salario de Q10,000",
    origen: { tipo: "recalculado", detalle: "483 laboral; 1067 patronal; 100 IRTRA; 100 INTECAP; total 1750." },
    fecha: "2026-10-12",
    entrada: { salario: 10000 },
    esperado: { laboral: 483, patronal: 1067, totalPatrono: 1267, total: 1750 },
  },
]);
