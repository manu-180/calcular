import { definirCasos } from "@/motor/calculo";
import costoEmpleador from "./costo-empleador";

const UDAPE = "https://www.udape.gob.bo/wp-content/uploads/2026/03/Empleo-y-Legislacion-laboral-en-Bolivia.pdf" as const;

export default definirCasos(costoEmpleador, [
  {
    nombre: "Salario mínimo",
    origen: {
      tipo: "recalculado",
      url: UDAPE,
      detalle: "Caja de salud 10 % (Ley 924) = 330; Gestora 3,5 % + 1,71 % = 171,93; aguinaldo e indemnización 3.300 / 12 = 275 cada uno. Mensual 4.351,93; anual 52.223,16.",
    },
    fecha: "2026-10-12",
    entrada: { totalGanado: 3300 },
    esperado: { salud: 330, gestora: 171.93, provisionAguinaldo: 275, provisionIndemnizacion: 275, mensual: 4351.93, anual: 52223.16 },
  },
  {
    nombre: "Diez mil",
    origen: { tipo: "recalculado", detalle: "1.000 + 350 + 171 + 833,33 + 833,33 = 3.187,66 sobre 10.000. Mensual 13.187,66; anual 158.251,92." },
    fecha: "2026-10-12",
    entrada: { totalGanado: 10000 },
    esperado: { salud: 1000, gestora: 521, mensual: 13187.66, anual: 158251.92 },
  },
]);
