import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/plirome-pleonasmou";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.plirome-pleonasmou",
  slug: "redundancy-pay-calculator",
  campos: {
    apo: { etiqueta: "Start date" },
    eos: { etiqueta: "End of employment" },
    misthos: { etiqueta: "Last gross salary" },
    periodos: { etiqueta: "The salary is", opciones: { mina: "Monthly", evdomada: "Weekly" } },
    pano64: { etiqueta: "You are 64 or older" },
    mines64: { etiqueta: "Full months after turning 64" },
  },
  filas: {
    pliromi: { etiqueta: "Redundancy payment" },
    eti: { etiqueta: "Years of service that count" },
    evdomadesPliromis: { etiqueta: "Weeks of pay" },
    evdomadiaios: { etiqueta: "Weekly wage used" },
    anotato: { etiqueta: "Maximum weekly wage for redundancy" },
    megistiApozimiosi: { etiqueta: "Maximum compensation for unfair dismissal (2 years' pay)" },
  },
  mensajes: MENSAJES,
});
