import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Baby due on 10 March 2027",
    origen: { tipo: "recalculado", detalle: "Labour Act s. 191: from seven weeks before (20 Jan 2027) to seven weeks after (28 Apr 2027). s. 192: nursing for six months after return (28 Oct 2027)." },
    fecha: "2026-10-27",
    entrada: { parto: "2027-03-10", enfermedad: false },
    esperado: { inicio: "2027-01-20", regreso: "2027-04-28", semanasDespues: 7, lactancia: "2027-10-28", paternidad: 14 },
  },
  {
    nombre: "Illness after the birth",
    origen: { tipo: "recalculado", detalle: "s. 191(4): eight weeks after the birth. 10 Mar 2027 + 56 days = 5 May 2027." },
    fecha: "2026-10-27",
    entrada: { parto: "2027-03-10", enfermedad: true },
    esperado: { regreso: "2027-05-05", semanasDespues: 8 },
  },
]);
