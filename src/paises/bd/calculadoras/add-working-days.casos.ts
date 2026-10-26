import { definirCasos } from "@/motor/calculo";
import calculadora from "./add-working-days";

export default definirCasos(calculadora, [
  {
    nombre: "10 días hábiles desde un domingo, descanso viernes",
    origen: { tipo: "recalculado", detalle: "Desde el domingo 25/10/2026, saltando el viernes 30/10: el décimo día hábil es el jueves 5/11/2026." },
    fecha: "2026-10-24",
    entrada: { fecha: "2026-10-25", operacion: "sumar", dias: 10, tipo: "habiles", finde: "fri" },
    esperado: { resultado: "2026-11-05", diaSemana: "বৃহস্পতিবার", diasCorridos: 11 },
  },
  {
    nombre: "10 días hábiles en oficina pública",
    origen: { tipo: "recalculado", detalle: "Saltando viernes y sábado (30-31/10 y 6-7/11): domingo 8/11/2026." },
    fecha: "2026-10-24",
    entrada: { fecha: "2026-10-25", operacion: "sumar", dias: 10, tipo: "habiles", finde: "fri-sat" },
    esperado: { resultado: "2026-11-08", diaSemana: "রবিবার", diasCorridos: 14 },
  },
  {
    nombre: "30 días corridos",
    origen: { tipo: "recalculado", detalle: "24/10/2026 + 30 = 23/11/2026, lunes." },
    fecha: "2026-10-24",
    entrada: { fecha: "2026-10-24", operacion: "sumar", dias: 30, tipo: "corridos", finde: null },
    esperado: { resultado: "2026-11-23", diaSemana: "সোমবার", diasCorridos: 30 },
  },
]);
