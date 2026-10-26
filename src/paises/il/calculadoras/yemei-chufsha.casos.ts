import { definirCasos } from "@/motor/calculo";
import calculadora from "./yemei-chufsha";

export default definirCasos(calculadora, [
  {
    nombre: "Año 5, semana de 6 días, 150 días trabajados",
    origen: {
      tipo: "recalculado",
      detalle: "Regla de la página del ministerio (proporción sobre 200 días): 150 / 200 x 14 = 10,5 días. La página escribe 10 en su ejemplo, pero la cuenta da 10,5.",
    },
    fecha: "2026-10-24",
    entrada: { shana: 5, shavua: "6", tzav: false, yamimBafoal: 150, chelkit: false },
    esperado: { yamim: 10.5, male: 14 },
  },
  {
    nombre: "Ejemplo del ministerio: año parcial con 120 días",
    origen: { tipo: "oficial", url: "https://www.gov.il/he/pages/annual-vacations", detalle: "120 / 240 x 14 = 7 días." },
    fecha: "2026-10-24",
    entrada: { shana: 5, shavua: "6", tzav: false, yamimBafoal: 120, chelkit: true },
    esperado: { yamim: 7 },
  },
  {
    nombre: "Año 9, semana de 5 días, con צו ההרחבה",
    origen: { tipo: "recalculado", detalle: "Ley: 17 días; צו: 23 días. Vale la más favorable: 23." },
    fecha: "2026-10-24",
    entrada: { shana: 9, shavua: "5", tzav: true, yamimBafoal: 220, chelkit: false },
    esperado: { yamim: 23, chok: 17, tzav: 23 },
  },
  {
    nombre: "Primer año, semana de 5 días, con צו ההרחבה",
    origen: { tipo: "recalculado", detalle: "Ley: 12 días; צו: 10. Vale la ley: 12." },
    fecha: "2026-10-24",
    entrada: { shana: 1, shavua: "5", tzav: true, yamimBafoal: 240, chelkit: false },
    esperado: { yamim: 12, chok: 12, tzav: 10 },
  },
  {
    nombre: "Año 20, semana de 6 días, sin צו",
    origen: { tipo: "recalculado", detalle: "Ley, año 14 en adelante con semana de 6 días: 24." },
    fecha: "2026-10-24",
    entrada: { shana: 20, shavua: "6", tzav: false, yamimBafoal: 250, chelkit: false },
    esperado: { yamim: 24 },
  },
]);
