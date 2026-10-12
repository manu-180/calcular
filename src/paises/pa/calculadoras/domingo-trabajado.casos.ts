import { definirCasos } from "@/motor/calculo";
import domingoTrabajado from "./domingo-trabajado";

export default definirCasos(domingoTrabajado, [
  {
    nombre: "Domingo completo con salario de B/. 1,000",
    origen: {
      tipo: "recalculado",
      detalle: "Hora 1,000 ÷ 208 = 4.8077. 8 horas = 38.46. Recargo del 50% (art. 48) = 19.23. Total 57.69.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000, jornada: "diurna", dia: "domingo", horas: null },
    esperado: { hora: 4.81, tasa: 50, base: 38.46, recargo: 19.23, total: 57.69 },
  },
  {
    nombre: "Día libre de semana corta en jornada nocturna",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 49, tercer párrafo: 75% en jornada mixta o nocturna. Hora 1,200 ÷ 182 = 6.5934; 4 horas = 26.37; recargo 19.78; total 46.15.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1200, jornada: "nocturna", dia: "libre-nocturna", horas: 4 },
    esperado: { tasa: 75, base: 26.37, recargo: 19.78, total: 46.15 },
  },
  {
    nombre: "Más horas que la jornada",
    origen: { tipo: "recalculado", detalle: "La jornada diurna es de 8 horas; lo demás son horas extra." },
    fecha: "2026-10-12",
    entrada: { salario: 1000, jornada: "diurna", dia: "domingo", horas: 10 },
    esperaError: true,
  },
]);
