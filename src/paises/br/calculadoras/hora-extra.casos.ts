import { definirCasos } from "@/motor/calculo";
import horaExtra from "./hora-extra";

export default definirCasos(horaExtra, [
  {
    nombre: "R$ 2.200 com 44 horas: 10 horas a 50 % e 5 a 100 %",
    origen: { tipo: "recalculado", detalle: "Divisor 220; hora 10; a 50 % vale 15 × 10 = 150; a 100 % vale 20 × 5 = 100. Total 250." },
    fecha: "2026-10-14",
    entrada: { salario: 2200, jornada: 44, horasUteis: 10, adicionalUteis: 50, horasDomingos: 5, adicionalDomingos: 100 },
    esperado: { divisor: 220, valorHora: 10, horaUteis: 15, totalUteis: 150, horaDomingos: 20, totalDomingos: 100, total: 250 },
  },
  {
    nombre: "Jornada de 40 horas",
    origen: { tipo: "recalculado", detalle: "Divisor 200; hora 4000 / 200 = 20; a 60 % vale 32; 8 horas = 256." },
    fecha: "2026-10-14",
    entrada: { salario: 4000, jornada: 40, horasUteis: 8, adicionalUteis: 60, horasDomingos: 0, adicionalDomingos: 100 },
    esperado: { divisor: 200, valorHora: 20, horaUteis: 32, total: 256 },
  },
  {
    nombre: "Adicional abaixo do mínimo",
    origen: { tipo: "recalculado", detalle: "CF art. 7º, XVI: no mínimo 50 %." },
    fecha: "2026-10-14",
    entrada: { salario: 2200, jornada: 44, horasUteis: 10, adicionalUteis: 30, horasDomingos: 0, adicionalDomingos: 100 },
    esperaError: true,
  },
]);
