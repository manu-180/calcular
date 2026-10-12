import { definirCasos } from "@/motor/calculo";
import prenatalYPostnatal from "./prenatal-y-postnatal";

export default definirCasos(prenatalYPostnatal, [
  {
    nombre: "Parto en la fecha probable, parental completo",
    origen: {
      tipo: "recalculado",
      detalle:
        "Art. 195: 6 semanas antes (42 días) y 12 después (84). FPP 15/12/2026: prenatal desde 3/11/2026. Postnatal 15/12/2026 al 8/3/2027 (84 días). Art. 197 bis: parental de 12 semanas, del 9/3 al 31/5/2027.",
    },
    fecha: "2026-10-07",
    entrada: { fpp: "2026-12-15", parto: null, hijos: 1, prematuro: false, modalidad: "completa" },
    esperado: { inicioPrenatal: "03-11-2026", diasPostnatal: 84, finPostnatal: "08-03-2027", inicioParental: "09-03-2027", finParental: "31-05-2027", vuelta: "01-06-2027" },
  },
  {
    nombre: "Mellizos con parental a media jornada",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 196: 7 días más por el segundo bebé: 91 días. Parto 10/1/2027: postnatal hasta 10/4/2027. Parental parcial de 18 semanas (126 días): 11/4 al 14/8/2027.",
    },
    fecha: "2026-10-07",
    entrada: { fpp: "2027-01-20", parto: "2027-01-10", hijos: 2, prematuro: false, modalidad: "parcial" },
    esperado: { diasPostnatal: 91, finPostnatal: "10-04-2027", diasParental: 126, finParental: "14-08-2027" },
  },
  {
    nombre: "Prematuro con mellizos: rige el descanso más largo",
    origen: { tipo: "recalculado", detalle: "Art. 196: prematuro 18 semanas (126 días) contra 84 + 7 = 91: rige 126." },
    fecha: "2026-10-07",
    entrada: { fpp: "2027-02-01", parto: "2026-12-20", hijos: 2, prematuro: true, modalidad: "completa" },
    esperado: { diasPostnatal: 126 },
  },
]);
