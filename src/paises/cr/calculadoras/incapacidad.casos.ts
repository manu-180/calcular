import { definirCasos } from "@/motor/calculo";
import incapacidad from "./incapacidad";

export default definirCasos(incapacidad, [
  {
    nombre: "Diez días de incapacidad con ₡600.000",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 36: 4 × (5,50 + 9,25 + 0,25) = 60 %. Diario 600.000 / 30 = 20.000; subsidio 12.000. Art. 35: paga desde el cuarto día, 7 días: 84.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600000, dias: 10, prorroga: false },
    esperado: { porcentaje: 60, subsidioDiario: 12000, diasSinSubsidio: 3, diasPagados: 7, subsidio: 84000 },
  },
  {
    nombre: "Prórroga dentro de 30 días: paga desde el primer día",
    origen: { tipo: "recalculado", detalle: "450.000 / 30 = 15.000; 60 % = 9.000; 5 días desde el primero: 45.000." },
    fecha: "2026-10-12",
    entrada: { salario: 450000, dias: 5, prorroga: true },
    esperado: { diasSinSubsidio: 0, diasPagados: 5, subsidio: 45000 },
  },
  {
    nombre: "Incapacidad de tres días",
    origen: { tipo: "recalculado", detalle: "Los tres primeros días no los paga la Caja: subsidio 0." },
    fecha: "2026-10-12",
    entrada: { salario: 450000, dias: 3, prorroga: false },
    esperado: { diasSinSubsidio: 3, diasPagados: 0, subsidio: 0 },
  },
]);
