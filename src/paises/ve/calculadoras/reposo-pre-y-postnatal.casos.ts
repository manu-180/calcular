import { definirCasos } from "@/motor/calculo";
import reposo from "./reposo-pre-y-postnatal";

export default definirCasos(reposo, [
  {
    nombre: "Parto en la fecha probable",
    origen: {
      tipo: "recalculado",
      detalle: "LOTTT arts. 335 y 336. Fecha probable 01/12/2026: prenatal desde el 20/10/2026 (42 días). Postnatal 140 días: hasta el 20/04/2027. Inamovilidad 2 años: hasta el 01/12/2028.",
    },
    fecha: "2026-10-12",
    entrada: { caso: "parto", fechaProbable: "2026-12-01", fechaParto: null },
    esperado: { inicioPrenatal: "2026-10-20", diasPrenatal: 42, diasPostnatal: 140, finDescanso: "2027-04-20", finInamovilidad: "2028-12-01" },
  },
  {
    nombre: "Parto adelantado una semana",
    origen: { tipo: "recalculado", detalle: "Art. 338: 7 días de prenatal sin usar pasan al postnatal: 147 días desde el 24/11/2026, hasta el 20/04/2027." },
    fecha: "2026-10-12",
    entrada: { caso: "parto", fechaProbable: "2026-12-01", fechaParto: "2026-11-24" },
    esperado: { diasPrenatal: 35, diasPostnatal: 147, finDescanso: "2027-04-20", finInamovilidad: "2028-11-24" },
  },
  {
    nombre: "Parto atrasado una semana",
    origen: { tipo: "recalculado", detalle: "Art. 337: el prenatal se alarga a 49 días y el postnatal sigue en 140: hasta el 27/04/2027." },
    fecha: "2026-10-12",
    entrada: { caso: "parto", fechaProbable: "2026-12-01", fechaParto: "2026-12-08" },
    esperado: { diasPrenatal: 49, diasPostnatal: 140, finDescanso: "2027-04-27", finInamovilidad: "2028-12-08" },
  },
  {
    nombre: "Adopción",
    origen: { tipo: "recalculado", detalle: "Art. 340: 26 semanas (182 días) desde la colocación del 01/10/2026: hasta el 31/03/2027." },
    fecha: "2026-10-12",
    entrada: { caso: "adopcion", fechaProbable: "2026-10-01", fechaParto: null },
    esperado: { inicioPrenatal: null, diasPostnatal: 182, finDescanso: "2027-03-31", finInamovilidad: "2028-10-01" },
  },
]);
