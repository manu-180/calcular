import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "TT$8,000 a month, baby due March 1, 2027",
    origen: {
      tipo: "oficial",
      url: "https://laws.gov.tt/ttdll-web2/revision/download/79174?type=act",
      detalle: "Section 9: 14 weeks, from 6 weeks before the expected birth; one month at full pay and two at half pay. 8,000 + 2 × 4,000 = 16,000. Leave from January 18 to April 26, 2027.",
    },
    fecha: "2026-10-27",
    entrada: { sueldo: 8000, parto: "2027-03-01" },
    esperado: { empleador: 16000, completo: 8000, medio: 8000, semanas: 14, inicio: "2027-01-18", regreso: "2027-04-26" },
  },
  {
    nombre: "No pay entered",
    origen: { tipo: "recalculado", detalle: "Pay of 0 is rejected." },
    fecha: "2026-10-27",
    entrada: { sueldo: 0, parto: "2027-03-01" },
    esperaError: true,
  },
]);
